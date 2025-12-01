/**
 * Block Prompt Builder
 * Creates structured prompts describing block sequences for AI refinement
 */

import type { Block, BlockSequence } from "@shared/block-schema";
import { getBlockDefinition } from "@shared/block-schema";

export function buildBlockSequencePrompt(
  sequence: BlockSequence,
  baseCode: string
): string {
  const blockDescriptions = sequence.blocks
    .map((block, index) => describeBlock(block, index))
    .join("\n");

  return `You are a professional Godot 4.4 GDScript code generator. 

I have created a block sequence that should be converted to production-ready GDScript code. Here's what the blocks represent:

${blockDescriptions}

The script extends: ${sequence.startNodeType || "Node"}

Here is the initial generated code:
\`\`\`gdscript
${baseCode}
\`\`\`

Your task:
1. Refine and optimize this code
2. Ensure all Godot 4.4 API is correct
3. Add proper variable declarations and type hints
4. Organize code into _ready(), _input(), and _physics_process() functions as needed
5. Ensure the code is production-ready and fully functional
6. Keep the exact same functionality but make it cleaner and more robust

Return ONLY the optimized GDScript code, no explanations.`;
}

function describeBlock(block: Block, index: number): string {
  const definition = getBlockDefinition(block.type);
  if (!definition) return "";

  const fieldDescriptions = definition.fields
    .map((field) => {
      const value = block.fields[field.id];
      return `  - ${field.label}: ${value ?? field.default}`;
    })
    .join("\n");

  return `Block ${index + 1}: ${definition.label}
Description: ${definition.description}
Fields:
${fieldDescriptions}`;
}

/**
 * Builds a summary of block sequence for logging
 */
export function summarizeBlockSequence(sequence: BlockSequence): string {
  return `Block Sequence: ${sequence.blocks.length} blocks, extends ${sequence.startNodeType || "Node"}
Blocks: ${sequence.blocks.map((b) => getBlockDefinition(b.type)?.label || "Unknown").join(", ")}`;
}
