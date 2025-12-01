/**
 * Flowchart Node Generators
 * Converts flowchart nodes to GDScript code (100% hardcoded)
 */

import { ALL_NODE_SCHEMAS } from "./flowchart-node-schema";

export interface FlowchartNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    [key: string]: any;
  };
}

export interface FlowchartEdge {
  id: string;
  source: string;
  sourceHandle: string | null;
  target: string;
  targetHandle: string | null;
}

export interface FlowchartData {
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
}

/**
 * Generate GDScript from flowchart nodes and edges
 * Simple chain implementation - follows sequential execution
 */
export function generateGDScriptFromFlowchart(flowchart: FlowchartData): {
  code: string;
  errors: string[];
} {
  const errors: string[] = [];

  try {
    // Validate flowchart
    if (!flowchart.nodes || flowchart.nodes.length === 0) {
      errors.push("No nodes in flowchart");
      return { code: "", errors };
    }

    // Find start node
    const startNode = flowchart.nodes.find(n => n.type === "start");
    if (!startNode) {
      errors.push("No start node found");
      return { code: "", errors };
    }

    // Build execution chain from start node
    const nodeMap = new Map(flowchart.nodes.map(n => [n.id, n]));
    const edgeMap = buildEdgeMap(flowchart.edges);

    // Generate code for start node and follow the chain
    const generatedCode: string[] = [];
    const visitedNodes = new Set<string>();

    // Generate start function
    const startCode = generateNodeCode(startNode, {
      nodeMap,
      edgeMap,
      generatedCode,
      visitedNodes,
      errors
    });

    generatedCode.push(startCode);

    // Build final script
    const finalCode = `extends Node3D

# Auto-generated from flowchart
# Don't edit manually

${generatedCode.join("\n\n")}
`;

    return {
      code: finalCode,
      errors
    };
  } catch (error) {
    errors.push(`Generation error: ${error}`);
    return { code: "", errors };
  }
}

interface GenerationContext {
  nodeMap: Map<string, FlowchartNode>;
  edgeMap: Map<string, string[]>; // source node id -> target node ids
  generatedCode: string[];
  visitedNodes: Set<string>;
  errors: string[];
}

/**
 * Generate code for a single node
 */
function generateNodeCode(
  node: FlowchartNode,
  context: GenerationContext
): string {
  if (context.visitedNodes.has(node.id)) {
    return ""; // Already generated
  }

  context.visitedNodes.add(node.id);

  const schema = ALL_NODE_SCHEMAS[node.type];
  if (!schema) {
    context.errors.push(`Unknown node type: ${node.type}`);
    return "";
  }

  // Get template and fill in values
  let code = schema.gdscriptTemplate;

  // Replace input values
  for (const input of schema.inputs) {
    const value = node.data[input.id] || input.default;
    code = code.replace(`{{${input.id}}}`, String(value));
  }

  // Handle execution flow
  const nextEdges = context.edgeMap.get(node.id) || [];

  if (node.type === "if") {
    // Special handling for if nodes
    const trueTarget = nextEdges.find(id => {
      const edge = findEdgeForNode(node.id, id, context.edgeMap);
      return edge?.sourceHandle === "true_exec";
    });
    const falseTarget = nextEdges.find(id => {
      const edge = findEdgeForNode(node.id, id, context.edgeMap);
      return edge?.sourceHandle === "false_exec";
    });

    let trueBranch = "";
    let falseBranch = "";

    if (trueTarget) {
      const targetNode = context.nodeMap.get(trueTarget);
      if (targetNode) {
        trueBranch = generateNodeCode(targetNode, context);
      }
    }

    if (falseTarget) {
      const targetNode = context.nodeMap.get(falseTarget);
      if (targetNode) {
        falseBranch = generateNodeCode(targetNode, context);
      }
    }

    code = code.replace("{{true_branch}}", trueBranch || "\tpass");
    code = code.replace("{{false_branch}}", falseBranch || "\tpass");
  } else if (node.type === "loop_for" || node.type === "loop_while") {
    // Loop handling
    const loopTarget = nextEdges[0];
    let loopBody = "";

    if (loopTarget) {
      const targetNode = context.nodeMap.get(loopTarget);
      if (targetNode) {
        loopBody = generateNodeCode(targetNode, context);
      }
    }

    code = code.replace("{{loop_body}}", loopBody || "\tpass");
    code = code.replace("{{after_loop}}", "");
  } else {
    // Linear execution
    let nextCode = "";
    if (nextEdges.length > 0) {
      const nextNode = context.nodeMap.get(nextEdges[0]);
      if (nextNode) {
        nextCode = generateNodeCode(nextNode, context);
      }
    }
    code = code.replace("{{next_execution}}", nextCode);
  }

  return code;
}

/**
 * Build edge map for quick lookup
 */
function buildEdgeMap(edges: FlowchartEdge[]): Map<string, string[]> {
  const map = new Map<string, string[]>();

  for (const edge of edges) {
    const targets = map.get(edge.source) || [];
    targets.push(edge.target);
    map.set(edge.source, targets);
  }

  return map;
}

/**
 * Find edge connecting source to target
 */
function findEdgeForNode(
  source: string,
  target: string,
  edgeMap: Map<string, string[]>
): any {
  // Simplified - would need full edge data
  return null;
}

/**
 * Validate flowchart structure
 */
export function validateFlowchart(flowchart: FlowchartData): string[] {
  const errors: string[] = [];

  // Check for start node
  if (!flowchart.nodes.find(n => n.type === "start")) {
    errors.push("Missing start node");
  }

  // Check for end node or terminal state
  const hasTerminal = flowchart.nodes.some(n => 
    n.type === "print" || n.type === "comment" || n.type === "stop"
  );
  
  if (!hasTerminal && flowchart.nodes.length > 1) {
    errors.push("No terminal node found");
  }

  // Check for disconnected nodes
  const edgeMap = buildEdgeMap(flowchart.edges);
  for (const node of flowchart.nodes) {
    if (node.type !== "start" && !edgeMap.has(node.id)) {
      errors.push(`Node ${node.id} has no incoming connections`);
    }
  }

  return errors;
}
