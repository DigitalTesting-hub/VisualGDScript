/**
 * Enhanced AI Fallback System
 * Intelligent retry logic with Gemini → Groq fallback chain
 */

import { generateWithGemini } from "./gemini";
import { generateWithGroq } from "./groq";

export interface AIGenerationOptions {
  retries?: number;
  timeout?: number;
  preferProvider?: "gemini" | "groq";
}

export interface AIGenerationResult {
  code: string;
  provider: "gemini" | "groq";
  model: string;
  retryCount: number;
  fallbackUsed: boolean;
  error?: string;
}

/**
 * Intelligent fallback: Try Gemini with retries, then Groq
 */
export async function generateWithIntelligentFallback(
  prompt: string,
  options: AIGenerationOptions = {}
): Promise<AIGenerationResult> {
  const {
    retries = 2,
    timeout = 30000,
    preferProvider = "gemini",
  } = options;

  const useGemini = process.env.GEMINI_API_KEY?.trim().length > 0;
  const useGroq = process.env.GROQ_API_KEY?.trim().length > 0;

  if (!useGemini && !useGroq) {
    throw new Error("No AI providers configured (Gemini or Groq)");
  }

  // Try primary provider first
  if (preferProvider === "gemini" && useGemini) {
    try {
      return await tryGeminiWithRetries(prompt, retries, timeout);
    } catch (geminiError) {
      console.warn("[AI] Gemini failed, attempting Groq fallback:", geminiError);
      if (useGroq) {
        try {
          const result = await tryGroqWithRetries(prompt, retries, timeout);
          result.fallbackUsed = true;
          return result;
        } catch (groqError) {
          throw new Error(`Both Gemini and Groq failed. Gemini: ${geminiError}, Groq: ${groqError}`);
        }
      }
      throw geminiError;
    }
  }

  // Try Groq first if specified or Gemini not available
  if (useGroq) {
    try {
      return await tryGroqWithRetries(prompt, retries, timeout);
    } catch (groqError) {
      console.warn("[AI] Groq failed, attempting Gemini fallback:", groqError);
      if (useGemini) {
        try {
          const result = await tryGeminiWithRetries(prompt, retries, timeout);
          result.fallbackUsed = true;
          return result;
        } catch (geminiError) {
          throw new Error(`Both Groq and Gemini failed. Groq: ${groqError}, Gemini: ${geminiError}`);
        }
      }
      throw groqError;
    }
  }

  throw new Error("No AI providers available");
}

/**
 * Try Gemini with intelligent retry logic
 */
async function tryGeminiWithRetries(
  prompt: string,
  maxRetries: number,
  timeout: number
): Promise<AIGenerationResult> {
  let lastError: Error | null = null;
  let retryCount = 0;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Gemini] Attempt ${attempt + 1}/${maxRetries + 1}...`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const code = await generateWithGemini("gemini-2.0-flash", prompt);
        clearTimeout(timeoutId);
        return {
          code,
          provider: "gemini",
          model: "gemini-2.0-flash",
          retryCount: attempt,
          fallbackUsed: false,
        };
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const errorMsg = lastError.message.toLowerCase();

      // Check if it's a rate limit (should retry) or other error
      const isRateLimit = 
        errorMsg.includes("429") ||
        errorMsg.includes("quota") ||
        errorMsg.includes("rate limit") ||
        errorMsg.includes("resource_exhausted");

      if (!isRateLimit && attempt < maxRetries) {
        // Non-rate-limit errors: throw immediately
        throw lastError;
      }

      // Rate limit: wait before retry
      if (attempt < maxRetries) {
        const delayMs = Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff
        console.log(`[Gemini] Rate limited. Waiting ${delayMs}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        retryCount++;
      }
    }
  }

  throw lastError || new Error("Gemini generation failed after all retries");
}

/**
 * Try Groq with intelligent retry logic
 */
async function tryGroqWithRetries(
  prompt: string,
  maxRetries: number,
  timeout: number
): Promise<AIGenerationResult> {
  let lastError: Error | null = null;
  let retryCount = 0;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Groq] Attempt ${attempt + 1}/${maxRetries + 1}...`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const code = await generateWithGroq("llama-3.3-70b-versatile", prompt);
        clearTimeout(timeoutId);
        return {
          code,
          provider: "groq",
          model: "llama-3.3-70b-versatile",
          retryCount: attempt,
          fallbackUsed: false,
        };
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const errorMsg = lastError.message.toLowerCase();

      // Check if it's a rate limit
      const isRateLimit =
        errorMsg.includes("429") ||
        errorMsg.includes("quota") ||
        errorMsg.includes("rate limit") ||
        errorMsg.includes("too many requests");

      if (!isRateLimit && attempt < maxRetries) {
        // Non-rate-limit errors: throw immediately
        throw lastError;
      }

      // Rate limit: wait before retry
      if (attempt < maxRetries) {
        const delayMs = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.log(`[Groq] Rate limited. Waiting ${delayMs}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        retryCount++;
      }
    }
  }

  throw lastError || new Error("Groq generation failed after all retries");
}
