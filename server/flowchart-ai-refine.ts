/**
 * Flowchart AI Refinement Pipeline
 * 
 * Flow:
 * 1. Generate hardcoded GDScript from flowchart nodes
 * 2. Build prompt from node selections + Godot API templates
 * 3. Send hardcoded code + prompt to AI for refinement
 * 4. Get single refined, polished script back
 * 5. Return refined script
 * 
 * Uses Godot API templates for Animation, Movement, etc. patterns
 */

import type { FlowchartNode } from "@shared/schema";
import { generateWithIntelligentFallback } from "./ai-fallback-enhanced";

/**
 * Godot API Template Patterns for consistent code generation
 */
const GODOT_TEMPLATES = {
  animation: {
    description: "AnimationPlayer API for playing animations",
    pattern: `$AnimationPlayer.play(animation_name, -1.0, speed, backwards)
# Example: $AnimationPlayer.play("Walk", -1.0, 1.0, false)`,
    parameters: {
      animation_name: "String - animation name from library",
      speed: "float - playback speed (1.0 = normal)",
      backwards: "bool - play in reverse if true",
    }
  },
  movement: {
    description: "Character movement with proper velocity handling",
    pattern: `velocity = direction * speed
position += velocity * delta
# Or for CharacterBody: position += velocity * delta
# Or use move_and_slide() for physics bodies`,
    parameters: {
      direction: "Vector3 - normalized movement direction",
      speed: "float - movement speed in units/second",
      delta: "float - delta time from _physics_process",
    }
  },
  scale: {
    description: "Transform scaling for Node2D and Node3D",
    pattern: `# Node2D uses Vector2
scale = Vector2(scale_x, scale_y)
# Node3D uses Vector3
scale = Vector3(scale_x, scale_y, scale_z)`,
    parameters: {
      scale_x: "float - X axis scale (1.0 = normal)",
      scale_y: "float - Y axis scale (1.0 = normal)",
      scale_z: "float - Z axis scale (only for Node3D)",
    }
  },
  rotation: {
    description: "Transform rotation for Node2D and Node3D",
    pattern: `# Node2D uses single float (radians)
rotation += rotation_amount
# Node3D uses Vector3 (radians)
rotation += Vector3(rot_x, rot_y, rot_z)`,
    parameters: {
      rotation_amount: "float - rotation in radians",
      rot_x: "float - X-axis rotation (radians)",
      rot_y: "float - Y-axis rotation (radians)",
      rot_z: "float - Z-axis rotation (radians)",
    }
  },
  input: {
    description: "Input detection in _input() function",
    pattern: `func _input(event: InputEvent) -> void:
  if event is InputEventKey and event.pressed:
    if event.keycode == KEY_W:
      # handle W key
  elif event is InputEventAction and Input.is_action_just_pressed("action_name"):
    # handle action`,
    parameters: {
      event: "InputEvent - input event from system",
      keycode: "Key constant (KEY_W, KEY_A, etc.)",
      action: "String - action name from InputMap",
    }
  },
  lifecycle: {
    description: "Godot lifecycle functions",
    functions: {
      _ready: "Called when node enters the scene tree",
      _process: "Called every frame (use for non-physics updates)",
      _physics_process: "Called every physics tick (use for movement, rotation, physics)",
      _input: "Called for input events (use only for input detection)",
    }
  }
};

/**
 * Extract node selections to build refinement context
 */
function buildNodeContext(nodes: FlowchartNode[]): string {
  const contexts: string[] = [];
  
  nodes.forEach(node => {
    const { type, data, label } = node;
    
    switch (type) {
      case "animation":
        contexts.push(`ANIMATION (${label}):
  - Node Type: ${data.animationNodeType || "AnimationPlayer"}
  - Animation Name: ${data.animationName || "default"}
  - Speed: ${data.animationSpeed || 1.0}
  - Template: ${GODOT_TEMPLATES.animation.pattern}`);
        break;
        
      case "movement":
        contexts.push(`MOVEMENT (${label}):
  - Node Type: ${data.movementNodeType || "Node2D"}
  - Direction: (${data.directionX || 0}, ${data.directionY || 0}, ${data.directionZ || 0})
  - Speed: ${data.speed || 1}
  - Template: ${GODOT_TEMPLATES.movement.pattern}`);
        break;
        
      case "scale":
        contexts.push(`SCALE (${label}):
  - Node Type: ${data.scaleNodeType || "Node2D"}
  - Mode: ${data.scaleMode || "linked"}
  - Scale: ${data.scaleMode === "linked" ? data.scaleUniform || 1 : `X=${data.scaleX || 1}, Y=${data.scaleY || 1}, Z=${data.scaleZ || 1}`}
  - Template: ${GODOT_TEMPLATES.scale.pattern}`);
        break;
        
      case "rotation":
        contexts.push(`ROTATION (${label}):
  - Node Type: ${data.rotationNodeType || "Node2D"}
  - Rotation: (${data.rotationX || 0}, ${data.rotationY || 0}, ${data.rotationZ || 0}) radians
  - Template: ${GODOT_TEMPLATES.rotation.pattern}`);
        break;
        
      case "event":
        contexts.push(`EVENT (${label}):
  - Input Type: ${data.inputType || "action"}
  - ${data.inputType === "key" ? `Key: ${data.keyPress || "Space"}` : `Action: ${data.actionName || "ui_accept"}`}
  - Template: ${GODOT_TEMPLATES.input.pattern}`);
        break;
        
      case "print":
        contexts.push(`PRINT (${label}):
  - Message: "${data.printMessage || ""}"`);
        break;
        
      case "comment":
        contexts.push(`COMMENT (${label}):
  - Text: "${data.commentText || ""}"`);
        break;
    }
  });
  
  return contexts.join("\n\n");
}

/**
 * Build refinement prompt from hardcoded code and node selections
 */
function buildRefinementPrompt(hardcodedCode: string, nodes: FlowchartNode[]): string {
  const nodeContext = buildNodeContext(nodes);
  
  return `You are a professional Godot 4.4 GDScript developer. 

Your task: Refine and improve the following hardcoded GDScript code to be production-quality, ensuring proper indentation, no duplication, and correct Godot 4.4 API usage.

HARDCODED CODE (generated from visual flowchart):
\`\`\`gdscript
${hardcodedCode}
\`\`\`

NODE SELECTIONS AND GODOT API TEMPLATES:
${nodeContext}

GODOT LIFECYCLE FUNCTIONS (Strict Separation):
${Object.entries(GODOT_TEMPLATES.lifecycle.functions)
  .map(([fn, desc]) => `- ${fn}(): ${desc}`)
  .join("\n")}

CRITICAL REQUIREMENTS FOR REFINEMENT:
1. FIX INDENTATION: Use TABS ONLY (not spaces), proper nesting
2. REMOVE DUPLICATION: No repeated code patterns, consolidate logic
3. VERIFY API CALLS: Ensure all Godot calls match 4.4 API exactly
   - Animation: \`$AnimationPlayer.play(name, -1.0, speed, backwards)\`
   - Movement: Proper velocity handling with delta
   - Input: Only in _input() function, NOT in _process()
4. PROPER VARIABLE TYPING: All variables must have explicit types
5. PROPER FUNCTION TYPING: All functions must have return types
6. SEPARATION OF CONCERNS:
   - _input(): Input detection ONLY - set flags/direction
   - _physics_process(): Apply physics - movement, rotation, animation
   - _ready(): Initialization ONLY
7. CLEAN CODE: Remove any commented-out code, keep only essential comments
8. VALID GODOT 4.4: Must compile and run without errors

WHAT TO FIX:
- Wrong indentation (spaces to tabs)
- Duplicate code blocks
- Input detection mixed with physics
- Missing or incorrect type hints
- Incorrect Godot API calls
- Animation calls in wrong function
- Any syntax errors

WHAT TO KEEP:
- Original code structure and logic
- All variable names and meanings
- All function purposes
- Performance-critical patterns

Generate ONLY the complete, refined GDScript code in a single code block. No explanations, no multiple suggestions. Return ONLY valid, executable code that compiles in Godot 4.4.`;
}

/**
 * Refine hardcoded GDScript with AI using Godot templates and selections
 */
export async function refineGDScriptWithAI(
  hardcodedCode: string,
  nodes: FlowchartNode[]
): Promise<{
  refinedCode: string;
  provider: "gemini" | "groq";
  model: string;
}> {
  const prompt = buildRefinementPrompt(hardcodedCode, nodes);
  
  try {
    const result = await generateWithIntelligentFallback(prompt, {
      retries: 2,
      timeout: 60000,
      preferProvider: "gemini",
    });

    // Extract code from backticks if present
    let refinedCode = result.code;
    const codeBlockMatch = result.code.match(/```(?:gdscript|gd)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      refinedCode = codeBlockMatch[1].trim();
    }

    // Validate that we got code back
    if (!refinedCode || refinedCode.length < 20) {
      console.warn("AI returned empty or very short code, using hardcoded version");
      return {
        refinedCode: hardcodedCode,
        provider: result.provider,
        model: result.model,
      };
    }

    return {
      refinedCode,
      provider: result.provider,
      model: result.model,
    };
  } catch (error) {
    console.error("AI refinement failed, falling back to hardcoded code:", error);
    // Return hardcoded code as fallback
    return {
      refinedCode: hardcodedCode,
      provider: "gemini",
      model: "gemini-2.5-flash",
    };
  }
}
