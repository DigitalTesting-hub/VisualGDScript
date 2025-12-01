import type { FlowchartNode, FlowchartEdge } from "@shared/schema";

export interface ValidationError {
  nodeId: string;
  message: string;
  severity: "error" | "warning";
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateFlowchart(
  nodes: FlowchartNode[],
  edges: FlowchartEdge[]
): ValidationResult {
  const errors: ValidationError[] = [];

  if (nodes.length === 0) {
    return {
      isValid: false,
      errors: [{ nodeId: "", message: "Flowchart must have at least one node", severity: "error" }],
    };
  }

  // Build adjacency map
  const nodeMap = new Map<string, FlowchartNode>();
  const incomingEdges = new Map<string, number>();
  const outgoingEdges = new Map<string, number>();

  nodes.forEach((node) => {
    nodeMap.set(node.id, node);
    incomingEdges.set(node.id, 0);
    outgoingEdges.set(node.id, 0);
  });

  edges.forEach((edge) => {
    // Validate edge connections exist
    if (!nodeMap.has(edge.source)) {
      errors.push({
        nodeId: edge.id,
        message: `Source node ${edge.source} not found`,
        severity: "error",
      });
    }
    if (!nodeMap.has(edge.target)) {
      errors.push({
        nodeId: edge.id,
        message: `Target node ${edge.target} not found`,
        severity: "error",
      });
    }

    incomingEdges.set(edge.target, (incomingEdges.get(edge.target) || 0) + 1);
    outgoingEdges.set(edge.source, (outgoingEdges.get(edge.source) || 0) + 1);
  });

  // Validate node configurations
  nodes.forEach((node) => {
    if (node.type === "condition") {
      if (!node.data?.condition || node.data.condition.trim() === "") {
        errors.push({
          nodeId: node.id,
          message: "Condition node must have a condition expression",
          severity: "error",
        });
      }
      // Conditions should have at least 2 outgoing edges (true/false paths)
      if (outgoingEdges.get(node.id)! < 1) {
        errors.push({
          nodeId: node.id,
          message: "Condition node should connect to at least one node",
          severity: "warning",
        });
      }
    }

    if (node.type === "loop") {
      if (!node.data?.loopCount || node.data.loopCount === "") {
        errors.push({
          nodeId: node.id,
          message: "Loop node must have a loop count",
          severity: "error",
        });
      }
    }

    if (node.type === "action") {
      if (!node.data?.code || node.data.code.trim() === "") {
        errors.push({
          nodeId: node.id,
          message: "Action node must have GDScript code",
          severity: "warning",
        });
      }
    }

    if (node.type === "variable") {
      if (!node.data?.varName || node.data.varName.trim() === "") {
        errors.push({
          nodeId: node.id,
          message: "Variable node must have a variable name",
          severity: "error",
        });
      }
    }
  });

  // Check for disconnected components (nodes with no edges)
  nodes.forEach((node) => {
    if (node.type !== "event" && incomingEdges.get(node.id) === 0) {
      errors.push({
        nodeId: node.id,
        message: "Node has no incoming connections",
        severity: "warning",
      });
    }
  });

  const hasErrors = errors.some((e) => e.severity === "error");
  return {
    isValid: !hasErrors,
    errors,
  };
}
