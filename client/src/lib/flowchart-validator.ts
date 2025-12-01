import type { Node, Edge } from 'reactflow';

export interface ValidationError {
  nodeId: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateFlowchart(nodes: Node[], edges: Edge[]): ValidationResult {
  const errors: ValidationError[] = [];

  if (nodes.length === 0) {
    return {
      isValid: false,
      errors: [{ nodeId: '', message: 'Flowchart must have at least one node', severity: 'error' }],
    };
  }

  const nodeMap = new Map<string, Node>();
  const incomingEdges = new Map<string, number>();
  const outgoingEdges = new Map<string, number>();

  nodes.forEach((node) => {
    nodeMap.set(node.id, node);
    incomingEdges.set(node.id, 0);
    outgoingEdges.set(node.id, 0);
  });

  edges.forEach((edge) => {
    if (!nodeMap.has(edge.source)) {
      errors.push({
        nodeId: edge.id,
        message: `Source node ${edge.source} not found`,
        severity: 'error',
      });
    }
    if (!nodeMap.has(edge.target)) {
      errors.push({
        nodeId: edge.id,
        message: `Target node ${edge.target} not found`,
        severity: 'error',
      });
    }

    incomingEdges.set(edge.target, (incomingEdges.get(edge.target) || 0) + 1);
    outgoingEdges.set(edge.source, (outgoingEdges.get(edge.source) || 0) + 1);
  });

  nodes.forEach((node) => {
    const data = (node.data as Record<string, any>) || {};
    
    if (node.type === 'condition' && !data.condition?.trim()) {
      errors.push({
        nodeId: node.id,
        message: 'Condition node must have a condition',
        severity: 'error',
      });
    }

    if (node.type === 'loop' && !data.loopCount) {
      errors.push({
        nodeId: node.id,
        message: 'Loop node must have a loop count',
        severity: 'error',
      });
    }

    if (node.type === 'variable' && !data.varName?.trim()) {
      errors.push({
        nodeId: node.id,
        message: 'Variable node must have a name',
        severity: 'error',
      });
    }
  });

  const hasErrors = errors.some((e) => e.severity === 'error');
  return { isValid: !hasErrors, errors };
}
