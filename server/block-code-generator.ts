/**
 * Block to GDScript Code Generator
 * Converts block sequences to working GDScript code
 */

import type { Block, BlockSequence } from "@shared/block-schema";
import { getBlockDefinition } from "@shared/block-schema";

export class BlockCodeGenerator {
  private indentLevel: number = 0;
  private variables: Map<string, { type: string; value: string }> = new Map();

  generate(sequence: BlockSequence): string {
    this.indentLevel = 0;
    this.variables = new Map();

    // Add custom variables
    if (sequence.variables) {
      for (const v of sequence.variables) {
        this.variables.set(v.name, { type: v.type, value: v.value });
      }
    }

    const extendsClass = sequence.startNodeType || "CharacterBody3D";
    let code = `extends ${extendsClass}\n\n`;

    // Add variable declarations
    code += this.generateVariableDeclarations();

    // Add lifecycle functions
    code += `func _ready() -> void:\n\tpass\n\n`;
    code += `func _physics_process(delta: float) -> void:\n`;
    this.indentLevel = 1;
    code += this.generateBlockSequence(sequence.blocks, "delta");
    this.indentLevel = 0;

    return code;
  }

  private generateVariableDeclarations(): string {
    if (this.variables.size === 0) return "";

    let code = "# Variables\n";
    const entries = Array.from(this.variables.entries());
    for (const [name, info] of entries) {
      code += `var ${name}: ${info.type} = ${info.value}\n`;
    }
    code += "\n";

    return code;
  }

  private generateBlockSequence(blocks: Block[], delta?: string): string {
    let code = "";

    for (const block of blocks) {
      code += this.generateBlock(block, delta);
    }

    return code || `\tpass\n`;
  }

  private generateBlock(block: Block, delta?: string): string {
    const definition = getBlockDefinition(block.type);
    if (!definition) return "";

    // Simple template generation from block definition
    let template = `# Block: ${definition.label}\npass`;

    // Replace field placeholders if template exists
    for (const [fieldId, value] of Object.entries(block.fields)) {
      template = template.replace(`{${fieldId}}`, String(value));
    }

    // Replace body placeholders with nested blocks
    if (block.children.length > 0) {
      this.indentLevel++;
      const bodyCode = this.generateBlockSequence(block.children, delta);
      this.indentLevel--;

      template = template.replace("{body}", bodyCode.trimEnd());
      template = template.replace("{body_true}", bodyCode.trimEnd());
      template = template.replace("{body_false}", bodyCode.trimEnd());
    } else {
      template = template.replace("{body}", "pass");
      template = template.replace("{body_true}", "pass");
      template = template.replace("{body_false}", "pass");
    }

    // Add indentation and newline
    const indent = "\t".repeat(this.indentLevel);
    const lines = template.split("\n");
    const indentedCode = lines.map((line: string) => (line ? indent + line : "")).join("\n");

    return indentedCode + "\n";
  }
}

export async function generateBlockCode(sequence: BlockSequence): Promise<string> {
  const generator = new BlockCodeGenerator();
  return generator.generate(sequence);
}
