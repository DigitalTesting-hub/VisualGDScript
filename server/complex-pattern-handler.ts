/**
 * Complex Pattern Handler - Analyzes and generates complex flowchart patterns
 */

import type { FlowchartNode } from "@shared/schema";

export interface PatternAnalysis {
  hasLoops: boolean;
  hasConditionals: boolean;
  loopNodes: string[];
  conditionalNodes: string[];
}

export interface GeneratedPattern {
  code: string;
  functions: string[];
  variables: string[];
}

export function analyzeNodeChain(nodes: FlowchartNode[]): PatternAnalysis {
  const loopNodes: string[] = [];
  const conditionalNodes: string[] = [];

  for (const node of nodes) {
    if (node.type === "loop-start" || node.type === "for-loop" || node.type === "while-loop") {
      loopNodes.push(node.id);
    }
    if (node.type === "condition" || node.type === "if-statement") {
      conditionalNodes.push(node.id);
    }
  }

  return {
    hasLoops: loopNodes.length > 0,
    hasConditionals: conditionalNodes.length > 0,
    loopNodes,
    conditionalNodes,
  };
}

export function generateComplexPattern(
  nodes: FlowchartNode[],
  pattern: PatternAnalysis
): GeneratedPattern {
  const functions: string[] = [];
  const variables: string[] = [];
  let code = "";

  if (pattern.hasLoops) {
    code += "# Complex pattern: loops detected\n";
    functions.push("_process_loop");
  }

  if (pattern.hasConditionals) {
    code += "# Complex pattern: conditionals detected\n";
    functions.push("_evaluate_condition");
  }

  return {
    code,
    functions,
    variables,
  };
}
