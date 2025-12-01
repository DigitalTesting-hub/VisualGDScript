import { z } from "zod";

export const playerAIGenerationRequestSchema = z.object({
  fullScript: z.string().describe("Complete original player.gd script"),
  selectedFunctions: z.array(z.string()).describe("List of function names to keep"),
  customVariables: z.record(z.string(), z.string()).describe("Updated variable values"),
  totalFunctions: z.number().describe("Total functions available"),
  enhancementPrompt: z.string().optional().describe("User request for additional features or changes"),
});

export type PlayerAIGenerationRequest = z.infer<typeof playerAIGenerationRequestSchema>;

export const playerAIGenerationResponseSchema = z.object({
  code: z.string().describe("Generated working GDScript"),
  explanation: z.string().optional().describe("What was changed"),
  provider: z.string().describe("AI provider used (gemini/groq)"),
  model: z.string().describe("Model name"),
});

export type PlayerAIGenerationResponse = z.infer<typeof playerAIGenerationResponseSchema>;
