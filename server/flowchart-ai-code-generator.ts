/**
 * AI-Powered Flowchart Code Generator
 * Uses structured prompts with Gemini/Groq fallback for professional GDScript generation
 */

import { generateWithIntelligentFallback, type AIGenerationResult } from "./ai-fallback-enhanced";
import { buildFlowchartPrompt as buildPrompt } from "./flowchart-prompt-builder";
import { validateNodeData } from "./flowchart-generation-schema";
import type { FlowchartNode } from "@shared/schema";

/**
 * Generates professional GDScript from a flowchart chain using AI
 * Uses structured prompts and intelligent fallback
 */
export async function generateFlowchartCodeWithAI(
  nodes: FlowchartNode[]
): Promise<{
  code: string;
  provider: string;
  model: string;
  fallbackUsed: boolean;
}> {
  // Validate node data
  for (const node of nodes) {
    const validation = validateNodeData(node.type, node.data);
    if (!validation.isValid) {
      console.warn(`[Validation] Node ${node.id} (${node.type}) has issues:`, validation.errors);
    }
  }

  // Build structured prompt
  const prompt = buildPrompt(nodes);

  try {
    const result = await generateWithIntelligentFallback(prompt, {
      retries: 2,
      timeout: 45000,
      preferProvider: "gemini",
    });

    console.log(`[AI] Code generation successful with ${result.provider} (${result.model})`);

    return {
      code: result.code,
      provider: result.provider,
      model: result.model,
      fallbackUsed: result.fallbackUsed,
    };
  } catch (error) {
    console.error("AI code generation failed:", error);
    throw new Error(`Failed to generate flowchart code: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Builds a detailed prompt for AI code generation from flowchart nodes
 */
function buildFlowchartPrompt(nodes: FlowchartNode[]): string {
  // Extract key information from each node
  const nodeDescriptions = nodes.map((node) => describeNode(node)).join("\n");

  return `You are a professional Godot 4.4 GDScript developer. Generate complete, working GDScript code based on this flowchart:

${nodeDescriptions}

REQUIREMENTS:
1. Use Godot 4.4 syntax and APIs
2. Properly organize code into _ready(), _input(), and _physics_process() functions as needed
3. All class variables must be declared at the top of the class
4. Use proper type hints (Vector3, Vector2, float, bool, etc.)
5. For 3D movement: use Vector3, for 2D use Vector2
6. Movement code should go in _physics_process() with velocity handling
7. Input detection should go in _input() with proper InputEvent checking
8. Animation should only play when character is moving (velocity.length() > 0.1)
9. Rotation should be applied in _physics_process()
10. Use CharacterBody2D/3D's move_and_slide() for movement
11. Include all variable declarations with types
12. Make the code production-ready and fully functional

Generate ONLY the GDScript code, no explanations. Return complete class with proper structure.`;
}

/**
 * Describes a single flowchart node in natural language for the AI
 */
function describeNode(node: FlowchartNode): string {
  const data = node.data || {};

  switch (node.type) {
    case "start":
      return "START: Entry point of the script";

    case "event":
      return describeEventNode(data);

    case "movement":
      return describeMovementNode(data);

    case "rotation":
      return describeRotationNode(data);

    case "animation":
      return describeAnimationNode(data);

    case "audio":
      return describeAudioNode(data);

    case "timer":
      return describeTimerNode(data);

    case "destroy":
      return describeDestroyNode(data);

    case "print":
      return describePrintNode(data);

    case "comment":
      return describeCommentNode(data);

    default:
      return `NODE: ${node.type} - ${node.label}`;
  }
}

function describeEventNode(data: Record<string, any>): string {
  const inputType = data.inputType || "action";
  const keyPress = data.keyPress || "Space";
  const actionName = data.actionName || "ui_accept";

  if (inputType === "key" || inputType === "key_press") {
    return `EVENT: Detect key press for "${keyPress}" key. When pressed, set movement direction and trigger movement/animation.`;
  } else if (inputType === "hold") {
    return `EVENT: Detect held key "${keyPress}". Continuously set movement direction while held.`;
  } else {
    return `EVENT: Detect input action "${actionName}". Trigger movement and animation when detected.`;
  }
}

function describeMovementNode(data: Record<string, any>): string {
  const nodeType = data.movementNodeType || "Node2D";
  const dirX = data.directionX || 0;
  const dirY = data.directionY || 0;
  const dirZ = data.directionZ || 0;
  const speed = data.speed || 1;

  return `MOVEMENT: ${nodeType} based movement. Direction: (${dirX}, ${dirY}, ${dirZ}). Speed: ${speed}. Apply in _physics_process() with velocity handling. Use move_and_slide() if CharacterBody.`;
}

function describeRotationNode(data: Record<string, any>): string {
  const nodeType = data.rotationNodeType || "Node2D";
  const rotX = data.rotationX || 0;
  const rotY = data.rotationY || 0;
  const rotZ = data.rotationZ || 0;

  if (nodeType.includes("3D")) {
    return `ROTATION: ${nodeType} rotation. Rotate around X=${rotX}, Y=${rotY}, Z=${rotZ} radians. Apply in _physics_process().`;
  } else {
    return `ROTATION: ${nodeType} rotation. Rotate around Z=${rotZ} radians. Apply in _physics_process().`;
  }
}

function describeAnimationNode(data: Record<string, any>): string {
  const animName = data.animationName || "default";
  const nodeType = data.animationNodeType || "AnimationPlayer";

  return `ANIMATION: Play "${animName}" animation using ${nodeType}. Only play when character is moving (velocity > 0.1). Apply in _physics_process().`;
}

function describeAudioNode(data: Record<string, any>): string {
  const audioFile = data.audioFile || "res://audio/default.ogg";
  const nodeType = data.audioNodeType || "AudioStreamPlayer";

  return `AUDIO: Play sound file "${audioFile}" using ${nodeType}. Apply when triggered.`;
}

function describeTimerNode(data: Record<string, any>): string {
  const duration = data.timerDuration || 1;
  const autostart = data.timerAutostart ? "auto-start" : "manual start";

  return `TIMER: Create timer with ${duration}s duration. Use ${autostart}.`;
}

function describeDestroyNode(data: Record<string, any>): string {
  const delay = data.destroyDelay || 0;

  if (delay > 0) {
    return `DESTROY: Queue node for deletion after ${delay} seconds delay.`;
  }
  return `DESTROY: Queue node for immediate deletion.`;
}

function describePrintNode(data: Record<string, any>): string {
  const text = data.printText || "Debug message";

  return `PRINT: Output debug message: "${text}"`;
}

function describeCommentNode(data: Record<string, any>): string {
  const text = data.commentText || "Comment";

  return `COMMENT: Add code comment: ${text}`;
}
