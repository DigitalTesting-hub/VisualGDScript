/**
 * Optional AI Code Enhancement
 * Takes hardcoded flowchart GDScript and enhances it with AI based on user prompt
 * Separate from core generation - user chooses to enhance
 */

import { generateWithIntelligentFallback } from "./ai-fallback-enhanced";

export interface EnhancementRequest {
  code: string;
  prompt: string;
}

export interface EnhancementResult {
  enhancedCode: string;
  provider: "gemini" | "groq";
  model: string;
}

/**
 * Enhance hardcoded GDScript with AI based on user prompt
 */
export async function enhanceGDScriptWithAI(
  code: string,
  userPrompt: string
): Promise<EnhancementResult> {
  const prompt = `You are a professional Godot 4.4 GDScript developer. 
The following is existing GDScript code generated from a visual flowchart:

\`\`\`gdscript
${code}
\`\`\`

User enhancement request:
${userPrompt}

REQUIREMENTS:
1. Keep the existing code structure and functionality
2. Only modify/add based on the user's request
3. Maintain all original variables and functions
4. Use Godot 4.4 syntax and APIs
5. Preserve proper indentation with TABS
6. Add only necessary changes - don't refactor unnecessarily
7. Return ONLY the enhanced GDScript code in backticks

Generate the enhanced code now:`;

  try {
    const result = await generateWithIntelligentFallback(prompt, {
      retries: 2,
      timeout: 45000,
      preferProvider: "gemini",
    });

    // Extract code from backticks if present
    let enhancedCode = result.code;
    const codeBlockMatch = result.code.match(/```(?:gdscript|gd)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      enhancedCode = codeBlockMatch[1].trim();
    }

    return {
      enhancedCode,
      provider: result.provider,
      model: result.model,
    };
  } catch (error) {
    console.error("AI enhancement failed:", error);
    throw new Error(`Failed to enhance code: ${error instanceof Error ? error.message : String(error)}`);
  }
}
