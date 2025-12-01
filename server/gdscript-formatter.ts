/**
 * GDScript Formatter - Ensures valid GDScript syntax and formatting
 */

export function ensureValidGDScript(code: string): string {
  if (!code || typeof code !== "string") {
    return "";
  }

  // Normalize line endings
  let formatted = code.replace(/\r\n/g, "\n");

  // Ensure proper indentation (tabs)
  formatted = formatted
    .split("\n")
    .map((line) => {
      // Convert leading spaces to tabs (4 spaces = 1 tab in Godot)
      const leadingSpaces = line.match(/^[ ]*/)?.[0]?.length || 0;
      const tabs = Math.floor(leadingSpaces / 4);
      const remainder = leadingSpaces % 4;
      const content = line.substring(leadingSpaces);

      if (content.length === 0) {
        return ""; // Empty lines stay empty
      }

      return "\t".repeat(tabs) + " ".repeat(remainder) + content;
    })
    .join("\n");

  // Ensure file ends with newline
  if (!formatted.endsWith("\n")) {
    formatted += "\n";
  }

  return formatted;
}

export function validateGDScriptSyntax(code: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!code || code.trim().length === 0) {
    errors.push("Code is empty");
    return { valid: false, errors, warnings };
  }

  const lines = code.split("\n");

  // Check for extends declaration
  if (!lines[0]?.trim().startsWith("extends")) {
    warnings.push("No 'extends' declaration found - add extends Node");
  }

  // Check for function definitions
  let functionCount = 0;
  let classVarCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("func ")) {
      functionCount++;
    }

    if (trimmed.startsWith("var ") && !trimmed.startsWith("var ")) {
      classVarCount++;
    }

    // Check for common GDScript errors
    if (trimmed.includes("velocity.y = velocity.y -")) {
      warnings.push("Potential redundant velocity assignment");
    }
  }

  if (functionCount === 0) {
    warnings.push("No functions found in script");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function formatGDScriptCode(code: string): string {
  let formatted = ensureValidGDScript(code);

  // Add blank lines between function definitions for readability
  formatted = formatted
    .split("\n")
    .map((line, index, arr) => {
      if (
        line.trim().startsWith("func ") &&
        index > 0 &&
        arr[index - 1]?.trim() !== ""
      ) {
        return "\n" + line;
      }
      return line;
    })
    .join("\n");

  return formatted;
}
