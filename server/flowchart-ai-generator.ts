import type { FlowchartNode, FlowchartEdge } from "@shared/schema";
import { generateWithFallback } from "./ai-fallback";

/**
 * AI-based code validation and error checking
 * Takes hardcoded GDScript and validates it against Godot best practices
 */
export async function validateAndFixCodeWithAI(
  gdscriptCode: string,
  nodes: FlowchartNode[],
  model: string = "gemini-2.5-flash"
): Promise<string> {
  const prompt = `You are a Godot 4.4 GDScript code validator and fixer. Review this code and fix any issues:

${gdscriptCode}

Nodes in flowchart: ${nodes.map((n) => `${n.label} (${n.type})`).join(", ")}

Requirements:
1. Fix any syntax errors
2. Ensure proper indentation
3. Add missing type hints where appropriate
4. Use proper Godot 4.4 conventions
5. Ensure the code is executable
6. Keep the logic and structure intact

Return ONLY the fixed GDScript code, no explanations.`;

  try {
    const code = await generateWithFallback(model, prompt, "flowchart-validation");
    return code;
  } catch (error) {
    console.error("AI validation failed, returning original code:", error);
    return gdscriptCode;
  }
}

function createFlowchartDescription(nodes: FlowchartNode[]): string {
  let description = "Flowchart nodes:\n";
  nodes.forEach((node) => {
    description += `- ${node.label} (${node.type})\n`;
    if (node.data?.code) description += `  Code: ${node.data.code}\n`;
    if (node.data?.condition) description += `  Condition: ${node.data.condition}\n`;
  });
  return description;
}
