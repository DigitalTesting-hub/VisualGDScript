/**
 * Flowchart Prompt Builder
 * Creates structured, consistent prompts for AI code generation
 * Each node type has a specific template ensuring consistent output
 */

import type { FlowchartNode, FlowchartEdge } from "@shared/schema";

/**
 * Build structured prompt for AI code generation from flowchart sequence
 */
export function buildFlowchartPrompt(nodes: FlowchartNode[], edges?: FlowchartEdge[]): string {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const edgeMap = new Map<string, string[]>();

  if (edges) {
    for (const edge of edges) {
      const list = edgeMap.get(edge.source) || [];
      list.push(edge.target);
      edgeMap.set(edge.source, list);
    }
  }

  const startNode = nodes.find(n => n.type === "start");
  const extendsClass = startNode?.data?.startNodeType as string || "CharacterBody3D";

  // Build flowchart sequence description
  const chainParts: string[] = [];
  const visited = new Set<string>();

  function traverseNodes(nodeId: string, depth: number = 0) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodeMap.get(nodeId);
    if (!node) return;

    const indent = "  ".repeat(depth);
    const num = chainParts.length + 1;

    switch (node.type) {
      case "start":
        chainParts.push(`${indent}${num}. START: Class extends ${node.data?.startNodeType || "Node"}`);
        break;
      case "event":
        chainParts.push(`${indent}${num}. EVENT: When user presses "${node.data?.eventParam || "key"}"`);
        break;
      case "movement":
        chainParts.push(`${indent}${num}. MOVEMENT: Move in direction "${node.data?.direction || "X"}" at speed ${node.data?.speed || 5.0}`);
        break;
      case "animation":
        chainParts.push(`${indent}${num}. ANIMATION: Play animation "${node.data?.animationName || "idle"}" at ${node.data?.animationSpeed || 1.0}x speed`);
        break;
      case "rotation":
        chainParts.push(`${indent}${num}. ROTATION: Rotate ${node.data?.axis || "x"}-axis by ${node.data?.degrees || 45}°`);
        break;
      case "scale":
        chainParts.push(`${indent}${num}. SCALE: Set scale to ${node.data?.scaleValue || 1.0}`);
        break;
      case "audio":
        chainParts.push(`${indent}${num}. AUDIO: Play sound "${node.data?.audioClip || "sound"}"`);
        break;
      case "timer":
        chainParts.push(`${indent}${num}. TIMER: Wait ${node.data?.delay || 1} second(s)`);
        break;
      case "condition":
        chainParts.push(`${indent}${num}. CONDITION: If ${node.data?.condition || "true"} then continue`);
        break;
      case "loop":
        chainParts.push(`${indent}${num}. LOOP: ${node.data?.loopType || "for"} loop`);
        break;
      case "variable":
        chainParts.push(`${indent}${num}. VARIABLE: ${node.data?.operation || "set"} ${node.data?.variable_name || "var"}`);
        break;
    }

    const targets = edgeMap.get(nodeId) || [];
    for (const targetId of targets) {
      traverseNodes(targetId, depth + 1);
    }
  }

  if (startNode) {
    traverseNodes(startNode.id);
  }

  return `You are a professional Godot 4.4 GDScript developer. The user has created a visual flowchart diagram that was auto-converted to hardcoded GDScript. Your job is to refine the code to make it production-ready while keeping it simple and following the flowchart sequence exactly.

FLOWCHART SEQUENCE FOR ${extendsClass}:
${chainParts.join("\n")}

REFINEMENT REQUIREMENTS:
1. Code must be 100% working and executable in Godot 4.4
2. Use ONLY official Godot 4.4 API (no custom functions, no templates)
3. Keep code SIMPLE and maintainable - no over-engineering
4. Follow proper lifecycle: _ready() → _input() → _physics_process() or _process()
5. Declare ALL variables at top with proper type hints
6. Input handling in _input() only, movement in _physics_process()
7. Use Vector3 for 3D, Vector2 for 2D
8. Add minimal but clear comments
9. Ensure proper null checks
10. Output ONLY the complete, working GDScript class - NO explanations

Follow the flowchart sequence EXACTLY. Generate production-ready code:

FLOWCHART EXECUTION CHAIN:
${chainParts.join("\n")}

CRITICAL CODE STRUCTURE (FOLLOW EXACTLY):
1. USE TABS FOR INDENTATION (not spaces)
2. CLASS VARIABLES AT TOP:
   var move_speed: float = ${movementData.speed || 1}
   var move_direction: Vector3 = Vector3.ZERO
   var velocity: Vector3 = Vector3.ZERO

3. THREE FUNCTIONS ONLY:
   _ready() - initialization
   _input(event) - ONLY FOR INPUT DETECTION
   _physics_process(delta) - ONLY FOR MOVEMENT/ROTATION/ANIMATION

4. FUNCTION PURPOSES (STRICT SEPARATION):
   • _input(): Set move_direction based on key/action. NO movement, NO animation
   • _physics_process(): Apply velocity, rotation, animation. NO input detection

5. INPUT LOGIC (in _input only):
   if event is InputEventKey and event.pressed:
   ${eventData.inputType === "key" ? `    if event.keycode == KEY_${(eventData.keyPress || "W").toUpperCase()}:` : `    if Input.is_action_pressed("${eventData.actionName || "ui_accept"}") :`}
         move_direction = Vector3(${movementData.directionX || 0}, ${movementData.directionY || 0}, ${movementData.directionZ || 1})

6. PHYSICS LOGIC (in _physics_process):
   velocity = move_direction * move_speed
   ${movementData.movementNodeType?.includes("CharacterBody") ? "position += velocity * delta  # or use move_and_slide()" : "position += velocity * delta"}
   ${rotationNode ? `rotation += Vector3(${rotationData.rotationX || 0}, ${rotationData.rotationY || 0}, ${rotationData.rotationZ || 0})` : ""}
   if velocity.length() > 0.1:
       $AnimationPlayer.play("${animationData.animationName || "walk"}")
   else:
       $AnimationPlayer.play("idle")

ABSOLUTE REQUIREMENTS:
✓ All variables typed: var name: Type = value
✓ All functions typed: func name(param: Type) -> ReturnType:
✓ Proper indentation with TABS only
✓ NO DUPLICATE CODE between functions
✓ NO ANIMATION in _input()
✓ NO INPUT DETECTION in _physics_process()
✓ Animation ONLY plays when velocity > 0.1
✓ Use exact animation name: "${animationData.animationName || "walk"}"
✓ No hardcoded values - use configuration from nodes
✓ Minimal comments - only essential explanations
✓ Valid Godot 4.4 syntax only

WHAT NOT TO DO:
✗ Don't mix tabs and spaces
✗ Don't play animations in _input()
✗ Don't detect input in _physics_process()
✗ Don't create duplicate animation logic
✗ Don't use hardcoded animation names
✗ Don't forget type hints

Generate ONLY the complete GDScript class. No explanations. Make it compile and run.`;
}
