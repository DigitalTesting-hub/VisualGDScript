/**
 * Enemy AI Generator
 * Generates enhanced enemy scripts using Gemini/Groq AI
 */

import * as genaiModule from "@google/genai";

const geminiApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;

export async function generateEnemyAIScript(
  baseCode: string,
  selectedFunctions: string[],
  enhancementPrompt?: string
): Promise<string> {
  try {
    if (geminiApiKey) {
      return await generateWithGemini(baseCode, selectedFunctions, enhancementPrompt);
    } else if (groqApiKey) {
      return await generateWithGroq(baseCode, selectedFunctions, enhancementPrompt);
    } else {
      console.warn("No AI API keys available, returning base code");
      return baseCode;
    }
  } catch (error) {
    console.error("Error generating enemy AI script:", error);
    return baseCode;
  }
}

async function generateWithGemini(
  baseCode: string,
  selectedFunctions: string[],
  enhancementPrompt?: string
): Promise<string> {
  const genAI = new (genaiModule as any).GoogleGenerativeAI(geminiApiKey!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are a GDScript expert. Enhance this enemy AI script:

Original Code:
\`\`\`gdscript
${baseCode}
\`\`\`

Selected Functions to Keep: ${selectedFunctions.join(", ")}

${enhancementPrompt ? `Enhancement Request: ${enhancementPrompt}` : ""}

Requirements:
1. Keep ONLY the selected functions from the list
2. Maintain all @export variables
3. Remove unused functions
4. Keep the class structure intact
5. Ensure the code is 100% working GDScript
6. ${enhancementPrompt ? `Apply this enhancement: ${enhancementPrompt}` : "Keep the original behavior"}

Return ONLY valid GDScript code without explanation.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  // Clean markdown if present
  const cleanCode = response
    .replace(/```gdscript\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return cleanCode;
}

async function generateWithGroq(
  baseCode: string,
  selectedFunctions: string[],
  enhancementPrompt?: string
): Promise<string> {
  const axios = (await import("axios")).default;
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "user",
          content: `You are a GDScript expert. Enhance this enemy AI script:

Original Code:
\`\`\`gdscript
${baseCode}
\`\`\`

Selected Functions to Keep: ${selectedFunctions.join(", ")}

${enhancementPrompt ? `Enhancement Request: ${enhancementPrompt}` : ""}

Requirements:
1. Keep ONLY the selected functions from the list
2. Maintain all @export variables
3. Remove unused functions
4. Keep the class structure intact
5. Ensure the code is 100% working GDScript
6. ${enhancementPrompt ? `Apply this enhancement: ${enhancementPrompt}` : "Keep the original behavior"}

Return ONLY valid GDScript code without explanation.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    },
    {
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
      },
    }
  );

  const content = response.data.choices[0].message.content;
  const cleanCode = content
    .replace(/```gdscript\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return cleanCode;
}
