import fs from 'fs';
import path from 'path';
import type { FlowchartNode } from '@shared/schema';

const __dirname = process.cwd();
const PLAYER_GD_PATH = path.join(__dirname, 'player.gd');

interface PlayerTemplate {
  id: string;
  name: string;
  code: string;
  variables: Array<{ name: string; value: string; type: string }>;
  functions: Array<{ name: string; enabled: boolean }>;
}

export async function getPlayerTemplate(): Promise<PlayerTemplate> {
  try {
    const rawCode = fs.readFileSync(PLAYER_GD_PATH, 'utf-8');
    
    // Parse variables from const and @export declarations
    const variables = parseVariables(rawCode);
    
    // Parse functions
    const functions = parseFunctions(rawCode);
    
    return {
      id: 'player-template',
      name: 'Player Controller',
      code: rawCode,
      variables,
      functions,
    };
  } catch (error) {
    console.error('Failed to load player template:', error);
    throw new Error('Failed to load player template');
  }
}

function parseVariables(code: string): Array<{ name: string; value: string; type: string }> {
  const variables: Array<{ name: string; value: string; type: string }> = [];
  
  // Match const declarations
  const constRegex = /const\s+(\w+)\s*(?::\s*([^\s]+))?\s*=\s*([^\n]+)/g;
  let match;
  
  while ((match = constRegex.exec(code)) !== null) {
    variables.push({
      name: match[1],
      value: match[3].trim(),
      type: match[2] || 'auto',
    });
  }
  
  // Match @export declarations
  const exportRegex = /@export\s+var\s+(\w+)\s*(?::\s*([^\s]+))?\s*=\s*([^\n]+)/g;
  
  while ((match = exportRegex.exec(code)) !== null) {
    variables.push({
      name: match[1],
      value: match[3]?.trim() || 'null',
      type: match[2] || 'auto',
    });
  }
  
  return variables;
}

function parseFunctions(code: string): Array<{ name: string; enabled: boolean }> {
  const functions: Array<{ name: string; enabled: boolean }> = [];
  
  // Match func declarations
  const funcRegex = /func\s+(_?\w+)\s*\(/g;
  let match;
  const seen = new Set<string>();
  
  while ((match = funcRegex.exec(code)) !== null) {
    const funcName = match[1];
    if (!seen.has(funcName)) {
      functions.push({
        name: funcName,
        enabled: true,
      });
      seen.add(funcName);
    }
  }
  
  return functions;
}

export async function generatePlayerScript(
  selectedFunctions: string[],
  customVariables: Record<string, string>,
  useAI: boolean = false,
  enhancementPrompt?: string
): Promise<string> {
  try {
    const template = await getPlayerTemplate();
    
    // If not all functions are selected and AI is available, or enhancement prompt provided, use AI
    if (useAI && selectedFunctions.length > 0 && (selectedFunctions.length < template.functions.length || enhancementPrompt?.trim())) {
      console.log(`[Player] Using AI for generation (${selectedFunctions.length}/${template.functions.length})${enhancementPrompt ? ' with enhancement' : ''}`);
      const { generatePlayerScriptWithAI } = await import("./player-ai-generator");
      
      const result = await generatePlayerScriptWithAI({
        fullScript: template.code,
        selectedFunctions,
        customVariables,
        totalFunctions: template.functions.length,
        enhancementPrompt: enhancementPrompt?.trim(),
      });
      
      return result.code;
    }
    
    // Otherwise use direct method
    let code = template.code;
    
    // Replace custom variables
    for (const [varName, value] of Object.entries(customVariables)) {
      if (value && value.trim()) {
        // Replace const value
        code = code.replace(
          new RegExp(`(const\\s+${varName}\\s*(?::\\s*[^\\s]+)?\\s*=\\s*)([^\\n]+)`),
          `$1${value}`
        );
        
        // Replace @export value
        code = code.replace(
          new RegExp(`(@export\\s+var\\s+${varName}\\s*(?::\\s*[^\\s]+)?\\s*=\\s*)([^\\n]+)`),
          `$1${value}`
        );
      }
    }
    
    // Filter to only selected functions if specified
    if (selectedFunctions.length > 0 && selectedFunctions.length === template.functions.length) {
      // Only filter if ALL functions are explicitly selected (not partial)
      code = filterFunctions(code, selectedFunctions);
    }
    
    return code;
  } catch (error) {
    console.error('Failed to generate player script:', error);
    throw new Error('Failed to generate player script');
  }
}

function filterFunctions(code: string, selectedFunctions: string[]): string {
  const lines = code.split('\n');
  const result: string[] = [];
  let currentFunc = '';
  let inFunction = false;
  let indent = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check if this is a function declaration
    const funcMatch = trimmed.match(/^func\s+(_?\w+)\s*\(/);
    
    if (funcMatch) {
      currentFunc = funcMatch[1];
      inFunction = selectedFunctions.includes(currentFunc);
      indent = line.match(/^\t*/)?.[0].length || 0;
      
      if (inFunction) {
        result.push(line);
      }
    } else if (inFunction) {
      // Check if we're still in the function (look at indentation)
      if (trimmed.length === 0) {
        result.push(line);
      } else {
        const currentIndent = line.match(/^\t*/)?.[0].length || 0;
        if (currentIndent > indent || trimmed.startsWith('#')) {
          result.push(line);
        } else {
          inFunction = false;
          // Check if this is a new function/class member
          if (!funcMatch && !line.startsWith('@') && !line.startsWith('const ') && !line.startsWith('var ')) {
            // End of file or class content - might still include
            result.push(line);
          }
        }
      }
    } else if (!inFunction && !funcMatch) {
      // Include class-level variables, constants, and exports
      if (line.startsWith('const ') || line.startsWith('@') || line.startsWith('var ') || 
          line.startsWith('extends ') || trimmed.length === 0 || line.startsWith('#')) {
        result.push(line);
      }
    }
  }
  
  return result.join('\n').trim();
}
