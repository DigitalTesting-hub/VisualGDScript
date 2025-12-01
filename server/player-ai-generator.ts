/**
 * AI-Powered Player Script Generator
 * Generates intelligent GDScript when functions are partially selected
 * Uses Gemini with Groq fallback
 */

import { generateWithIntelligentFallback } from "./ai-fallback-enhanced";
import type { PlayerAIGenerationRequest } from "@shared/player-ai-schema";

export async function generatePlayerScriptWithAI(
  request: PlayerAIGenerationRequest
): Promise<{
  code: string;
  provider: string;
  model: string;
}> {
  const prompt = buildPlayerAIPrompt(request);

  try {
    const result = await generateWithIntelligentFallback(prompt, {
      retries: 2,
      timeout: 45000,
      preferProvider: "gemini",
    });

    console.log(`[Player AI] Generated with ${result.provider}:${result.model}`);

    return {
      code: result.code,
      provider: result.provider,
      model: result.model,
    };
  } catch (error) {
    console.error("Player AI generation failed:", error);
    throw new Error(`Failed to generate player script with AI: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function buildPlayerAIPrompt(request: PlayerAIGenerationRequest): string {
  const selectedCount = request.selectedFunctions.length;
  const totalCount = request.totalFunctions;
  const deselectedFuncs = totalCount - selectedCount;

  const variablesText = Object.entries(request.customVariables)
    .map(([name, value]) => `  - ${name} = ${value}`)
    .join("\n");

  const enhancementSection = request.enhancementPrompt 
    ? `\nADDITIONAL REQUIREMENTS FROM USER:\n${request.enhancementPrompt}\n`
    : '';

  return `You are a professional Godot 4.4 GDScript developer specializing in script customization.

TASK: Generate a working, executable GDScript by:
1. Removing ${deselectedFuncs} function(s) not in the selection
2. Keeping ${selectedCount} selected functions
3. Applying updated variable values
4. ${request.enhancementPrompt ? 'Implementing user enhancements/changes' : 'Ensuring NO ERRORS'}
5. The script must be 100% functional in Godot 4.4${request.enhancementPrompt ? ' and production-ready' : ''}

SELECTED FUNCTIONS TO KEEP:
${request.selectedFunctions.map((f) => `  - ${f}`).join("\n")}

UPDATED VARIABLES:
${variablesText}
${enhancementSection}
ORIGINAL SCRIPT:
\`\`\`gdscript
${request.fullScript}
\`\`\`

REQUIREMENTS:
1. Keep ALL class variables, exports, and constants (they may be used by functions)
2. Keep the extends declaration and @export_category declarations
3. Remove function bodies that are NOT in the selected functions list
4. Update variable values as specified
5. Ensure all dependencies between kept functions are satisfied
6. Remove any @onready variables or references that are no longer needed
7. ${request.enhancementPrompt ? 'Apply user enhancements intelligently without breaking existing code' : 'Keep one-liners like "pass" for removed functions'}
8. Output ONLY valid GDScript code, nothing else

Generate the complete, working GDScript:`;
}
