/**
 * Smart Flowchart to GDScript Generator
 * Context-aware code generation based on connected node types
 * Supports: Events → Movement → Animation chains + 18+ additional node types
 */

import type { FlowchartNode, FlowchartEdge } from "@shared/schema";
import { CHARACTER_CONTROLLER_CONFIG, getNodeConfig } from "./godot-schema";
import { RotationNodeGenerator } from "./rotation-generator";
import { AdvancedNodesGenerator } from "./advanced-nodes-generator";
import { CompleteNodesGenerator, COMPLETE_NODES_SCHEMA } from "./complete-nodes-schema";

interface EventData {
  key: string;
  keyCode: string;
  direction?: string;
  speed?: number;
  animationName?: string;
  animationSpeed?: number;
  animationBackward?: boolean;
}

/**
 * Main generator - analyzes flowchart and generates appropriate code
 */
export async function generateGDScriptFromFlowchart(
  nodes: FlowchartNode[],
  edges: FlowchartEdge[]
): Promise<string> {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const edgeMap = new Map<string, string[]>();

  // Build adjacency for edges
  for (const edge of edges) {
    const list = edgeMap.get(edge.source) || [];
    list.push(edge.target);
    edgeMap.set(edge.source, list);
  }

  // Find start node
  const startNode = nodes.find((n) => n.type === "start");
  if (!startNode) return `extends Node\n\nfunc _ready() -> void:\n\tpass\n`;

  const extendsClass = (startNode.data?.startNodeType as string) || "Node";
  const config = getNodeConfig(extendsClass);

  if (!config) {
    return `extends ${extendsClass}\n\nfunc _ready() -> void:\n\tpass\n`;
  }

  // Find event nodes and their chains
  const eventNodes = nodes.filter((n) => n.type === "event");
  const hasEvents = eventNodes.length > 0;

  // Build event data with movement and animation info
  const eventChains: EventData[] = [];
  if (hasEvents) {
    for (const eventNode of eventNodes) {
      const eventKey = eventNode.data?.eventParam as string;
      if (!eventKey) continue;

      // Map UI key name to Godot key code
      const keyCode = CHARACTER_CONTROLLER_CONFIG.keyCodeMap[eventKey as keyof typeof CHARACTER_CONTROLLER_CONFIG.keyCodeMap] || `KEY_${eventKey}`;

      const eventData: EventData = { 
        key: eventKey,
        keyCode: keyCode
      };

      // Find connected movement node
      const targets = edgeMap.get(eventNode.id) || [];
      const movementNode = targets
        .map((id) => nodeMap.get(id))
        .find((n) => n?.type === "movement");

      if (movementNode) {
        eventData.direction = movementNode.data?.direction as string;
        eventData.speed = parseFloat(movementNode.data?.speed || "1");

        // Find connected animation node
        const animTargets = edgeMap.get(movementNode.id) || [];
        const animNode = animTargets
          .map((id) => nodeMap.get(id))
          .find((n) => n?.type === "animation");

        if (animNode) {
          eventData.animationName = animNode.data?.animationName as string;
          eventData.animationSpeed = parseFloat(animNode.data?.animationSpeed || "1.0");
          eventData.animationBackward = animNode.data?.animationBackward as boolean || false;
        }
      }

      eventChains.push(eventData);
    }
  }

  // Determine if we have animations or movements
  const hasAnimations = eventChains.some((e) => e.animationName);
  const hasMovements = eventChains.some((e) => e.direction);

  // Find other node types (for generating additional code)
  const otherNodes = nodes.filter((n) => !["start", "event", "movement", "animation"].includes(n.type));

  // Generate appropriate code based on context
  if (hasAnimations) {
    let code = generateCharacterControllerWithAnimations(extendsClass, config, eventChains);
    code += generateOtherNodeCode(otherNodes, nodeMap, edgeMap);
    return code;
  } else if (hasMovements) {
    let code = generateCharacterControllerBasic(extendsClass, config, eventChains);
    code += generateOtherNodeCode(otherNodes, nodeMap, edgeMap);
    return code;
  } else if (eventChains.length > 0) {
    let code = generateEventOnlyController(extendsClass, config, eventChains);
    code += generateOtherNodeCode(otherNodes, nodeMap, edgeMap);
    return code;
  } else if (otherNodes.length > 0) {
    // No events, but other nodes exist
    let code = `extends ${extendsClass}\n\n`;
    code += `func _ready() -> void:\n\tpass\n\n`;
    code += generateOtherNodeCode(otherNodes, nodeMap, edgeMap);
    return code;
  } else {
    return `extends ${extendsClass}\n\nfunc _ready() -> void:\n\tpass\n`;
  }
}

/**
 * Generate code for all other node types (rotation, scale, spawn, etc)
 */
function generateOtherNodeCode(
  nodes: FlowchartNode[],
  nodeMap: Map<string, FlowchartNode>,
  edgeMap: Map<string, string[]>
): string {
  let code = "";

  // Group by node type and generate code for each
  const nodesByType = new Map<string, FlowchartNode[]>();
  for (const node of nodes) {
    const list = nodesByType.get(node.type) || [];
    list.push(node);
    nodesByType.set(node.type, list);
  }

  // Generate code for print nodes
  const printNodes = nodesByType.get("print") || [];
  if (printNodes.length > 0) {
    for (const node of printNodes) {
      const text = node.data?.printText || "Debug message";
      code += `\n# Print: ${text}\nprint("${text}")\n`;
    }
  }

  // Generate code for rotation nodes (7 advanced types)
  const rotationNodes = nodesByType.get("rotation") || [];
  if (rotationNodes.length > 0) {
    const rotGen = new RotationNodeGenerator();
    for (const node of rotationNodes) {
      const startNode = nodes.find((n) => n.type === "start");
      const extendsClass = (startNode?.data?.startNodeType as string) || "Node3D";
      const dimension = extendsClass.includes("3D") ? "3D" : "2D";
      code += rotGen.generateRotationCode(node, dimension, extendsClass);
    }
  }

  // Generate code for advanced nodes (scale, camera, audio, condition, signal, tween, timer)
  const advancedNodeGen = new AdvancedNodesGenerator();
  const startNode = nodes.find((n) => n.type === "start");
  const extendsClass = (startNode?.data?.startNodeType as string) || "Node3D";
  const dimension = extendsClass.includes("3D") ? "3D" : "2D";

  // Scale nodes
  const scaleNodes = nodesByType.get("scale") || [];
  if (scaleNodes.length > 0) {
    for (const node of scaleNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }

  // Camera nodes
  const cameraNodes = nodesByType.get("camera") || [];
  if (cameraNodes.length > 0) {
    for (const node of cameraNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }

  // Audio nodes (advanced)
  const audioNodes = nodesByType.get("audio") || [];
  if (audioNodes.length > 0) {
    for (const node of audioNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }

  // Condition nodes
  const conditionNodes = nodesByType.get("if") || [];
  const compareNodes = nodesByType.get("compare") || [];
  const rangeNodes = nodesByType.get("range") || [];
  const distanceNodes = nodesByType.get("distance") || [];
  const allConditions = [...conditionNodes, ...compareNodes, ...rangeNodes, ...distanceNodes];
  if (allConditions.length > 0) {
    for (const node of allConditions) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }

  // Signal nodes
  const signalNodes = nodesByType.get("signal") || [];
  if (signalNodes.length > 0) {
    for (const node of signalNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }

  // Tween nodes
  const tweenNodes = nodesByType.get("tween") || [];
  if (tweenNodes.length > 0) {
    for (const node of tweenNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }

  // Timer nodes (advanced)
  const timerNodes = nodesByType.get("timer") || [];
  if (timerNodes.length > 0) {
    for (const node of timerNodes) {
      code += advancedNodeGen.generateAdvancedNodeCode(node, dimension, extendsClass);
    }
  }

  // Spawn nodes
  const spawnNodes = nodesByType.get("spawn") || [];
  if (spawnNodes.length > 0) {
    for (const node of spawnNodes) {
      const scenePath = node.data?.spawnScenePath || "res://scenes/spawned.tscn";
      code += `\n# Spawn node\nvar spawned = load("${scenePath}").instantiate()\nadd_child(spawned)\nspawned.global_position = global_position\n`;
    }
  }

  // Destroy nodes
  const destroyNodes = nodesByType.get("destroy") || [];
  if (destroyNodes.length > 0) {
    for (const node of destroyNodes) {
      const delay = node.data?.destroyDelay || 0;
      if (delay > 0) {
        code += `\n# Destroy after ${delay}s\nawait get_tree().create_timer(${delay}).timeout\nqueue_free()\n`;
      } else {
        code += `\n# Destroy node\nqueue_free()\n`;
      }
    }
  }

  // Generate code for variable nodes
  const variableNodes = nodesByType.get("variable") || [];
  if (variableNodes.length > 0) {
    for (const node of variableNodes) {
      const varName = node.data?.variableName || "var_" + Math.random().toString(36).substr(2, 9);
      const varValue = node.data?.variableValue || "0";
      const varType = node.data?.variableType || "float";
      code += `\n# Variable: ${varName}\nvar ${varName}: ${varType} = ${varValue}\n`;
    }
  }

  // Generate code for property nodes
  const propertyNodes = nodesByType.get("property") || [];
  if (propertyNodes.length > 0) {
    for (const node of propertyNodes) {
      const propName = node.data?.propertyName || "position";
      const propValue = node.data?.propertyValue || "Vector3.ZERO";
      code += `\n# Set property: ${propName}\n${propName} = ${propValue}\n`;
    }
  }

  // Generate code for scene nodes
  const sceneNodes = nodesByType.get("scene") || [];
  if (sceneNodes.length > 0) {
    for (const node of sceneNodes) {
      const scenePath = node.data?.scenePath || "res://scenes/main.tscn";
      code += `\n# Change scene\nget_tree().change_scene_to_file("${scenePath}")\n`;
    }
  }

  // Generate code for collision nodes
  const collisionNodes = nodesByType.get("collision") || [];
  if (collisionNodes.length > 0) {
    for (const node of collisionNodes) {
      code += `\n# Collision detection\nfunc _on_body_entered(body):\n\tprint("Collided with: ", body.name)\n`;
    }
  }

  // Generate code for code nodes (custom GDScript)
  const codeNodes = nodesByType.get("code") || [];
  if (codeNodes.length > 0) {
    for (const node of codeNodes) {
      const customCode = node.data?.customCode || "# Custom code";
      code += `\n# Custom Code\n${customCode}\n`;
    }
  }

  return code;
}

/**
 * Generate event-only controller (just input handling, no movement)
 */
function generateEventOnlyController(
  extendsClass: string,
  config: any,
  eventChains: EventData[]
): string {
  let code = `extends ${extendsClass}\n\n`;
  code += `func _ready() -> void:\n\tpass\n\n`;
  code += `func _physics_process(delta: float) -> void:\n`;

  for (let i = 0; i < eventChains.length; i++) {
    const event = eventChains[i];
    code += `\t# Event ${i + 1}: ${event.key}\n`;
    code += `\tif Input.is_key_pressed(${event.keyCode}):\n`;
    code += `\t\tpass\n`;
  }

  return code;
}

/**
 * Generate basic character controller (Event + Movement only)
 */
function generateCharacterControllerBasic(
  extendsClass: string,
  config: any,
  eventChains: EventData[]
): string {
  let code = `extends ${extendsClass}\n\n`;

  // Variables
  code += `# Movement Variables\n`;
  const speedVal = Number.isInteger(config.defaultSpeed) ? config.defaultSpeed : config.defaultSpeed.toFixed(1);
  code += `var speed: float = ${speedVal}\n`;

  if (config.supportsJump) {
    const jumpVal = Number.isInteger(config.jumpVelocity) ? config.jumpVelocity : config.jumpVelocity.toFixed(1);
    code += `var jump_velocity: float = ${jumpVal}\n`;
    code += `var gravity = ProjectSettings.get_setting("${config.gravityPath}")\n`;
  }

  code += `var is_running: bool = false\n\n`;

  // Ready function
  code += `func _ready() -> void:\n\tpass\n\n`;

  // Physics process function
  code += `func _physics_process(delta: float) -> void:\n`;

  if (config.supportsJump) {
    code += `\t# Apply gravity\n`;
    code += `\tif not is_on_floor():\n`;
    code += `\t\tvelocity.y ${config.gravitySign}= gravity * delta\n\t\n`;

    code += `\t# Handle jump\n`;
    code += `\tif Input.is_action_just_pressed("ui_accept") and is_on_floor():\n`;
    code += `\t\tvelocity.y = jump_velocity\n\t\n`;
  }

  code += `\t# Toggle run mode\n`;
  code += `\tif Input.is_action_just_pressed("ui_shift"):\n`;
  code += `\t\tis_running = !is_running\n\t\n`;

  code += `\t# Calculate speed multiplier\n`;
  code += `\tvar speed_multiplier = 2.0 if is_running else 1.0\n\t\n`;

  // Input handling
  code += `\t# Get input direction\n`;
  const vectorType = config.vectorType;
  code += `\tvar input_dir = ${vectorType}.ZERO\n`;

  for (let i = 0; i < eventChains.length; i++) {
    const event = eventChains[i];
    if (!event.direction) continue;

    code += `\t\n\t# Event ${i + 1}: ${event.key}\n`;
    code += `\tif Input.is_key_pressed(${event.keyCode}):\n`;

    const dimMappings = CHARACTER_CONTROLLER_CONFIG.directionMappings[config.dimension as "2D" | "3D"];
    const dir = dimMappings?.[event.direction as keyof typeof dimMappings];
    if (dir) {
      code += `\t\tinput_dir.${dir.inputDir} ${dir.operator} ${(dir.value as number).toFixed(1)}\n`;
    }
  }

  // Movement application
  code += `\t\n`;
  if (config.dimension === "3D" && config.supportsPhysics) {
    code += `\t# Normalize if there's any input\n`;
    code += `\tif input_dir.length() > 0:\n`;
    code += `\t\tinput_dir = input_dir.normalized()\n\t\n`;
    code += `\t# Apply movement\n`;
    code += `\tvar direction = (transform.basis * input_dir).normalized()\n`;
    code += `\tif direction and input_dir.length() > 0:\n`;
    code += `\t\tvelocity.x = direction.x * speed * speed_multiplier\n`;
    code += `\t\tvelocity.z = direction.z * speed * speed_multiplier\n`;
    code += `\telse:\n`;
    code += `\t\tvelocity.x = move_toward(velocity.x, 0, speed)\n`;
    code += `\t\tvelocity.z = move_toward(velocity.z, 0, speed)\n`;
  } else if (config.dimension === "2D" && config.supportsPhysics) {
    code += `\t# Normalize if there's any input\n`;
    code += `\tif input_dir.length() > 0:\n`;
    code += `\t\tinput_dir = input_dir.normalized()\n\t\n`;
    code += `\t# Apply movement\n`;
    code += `\tif input_dir.length() > 0:\n`;
    code += `\t\tvelocity.x = input_dir.x * speed * speed_multiplier\n`;
    code += `\t\tvelocity.y = input_dir.y * speed * speed_multiplier\n`;
    code += `\telse:\n`;
    code += `\t\tvelocity.x = move_toward(velocity.x, 0, speed)\n`;
    code += `\t\tvelocity.y = move_toward(velocity.y, 0, speed)\n`;
  }

  if (config.supportsPhysics) {
    code += `\tmove_and_slide()\n`;
  }

  return code;
}

/**
 * Generate full character controller with animations
 */
function generateCharacterControllerWithAnimations(
  extendsClass: string,
  config: any,
  eventChains: EventData[]
): string {
  let code = `extends ${extendsClass}\n\n`;

  // Variables
  code += `# Movement Variables\n`;
  const speedValue = Number.isInteger(config.defaultSpeed) ? config.defaultSpeed : config.defaultSpeed.toFixed(1);
  code += `var speed: float = ${speedValue}\n`;

  if (config.supportsJump) {
    const jumpValue = Number.isInteger(config.jumpVelocity) ? config.jumpVelocity : config.jumpVelocity.toFixed(1);
    code += `var jump_velocity: float = ${jumpValue}\n`;
    code += `var gravity = ProjectSettings.get_setting("${config.gravityPath}")\n`;
  }

  code += `var is_running: bool = false\n\n`;
  code += `@onready var animation_player = $AnimationPlayer\n\n`;

  // Ready function
  code += `func _ready() -> void:\n\tpass\n\n`;

  // Physics process function
  code += `func _physics_process(delta: float) -> void:\n`;

  if (config.supportsJump) {
    code += `\t# Apply gravity\n`;
    code += `\tif not is_on_floor():\n`;
    code += `\t\tvelocity.y ${config.gravitySign}= gravity * delta\n\t\n`;

    code += `\t# Handle jump\n`;
    code += `\tif Input.is_action_just_pressed("ui_accept") and is_on_floor():\n`;
    code += `\t\tvelocity.y = jump_velocity\n\t\n`;
  }

  code += `\t# Toggle run mode\n`;
  code += `\tif Input.is_action_just_pressed("ui_shift"):\n`;
  code += `\t\tis_running = !is_running\n\t\n`;

  code += `\t# Calculate speed multiplier\n`;
  code += `\tvar speed_multiplier = 2.0 if is_running else 1.0\n\t\n`;

  // Input handling
  code += `\t# Get input direction\n`;
  const vectorType = config.vectorType;
  code += `\tvar input_dir = ${vectorType}.ZERO\n`;
  code += `\tvar is_moving = false\n\t\n`;

  for (let i = 0; i < eventChains.length; i++) {
    const event = eventChains[i];
    if (!event.direction) continue;

    code += `\t# Event ${i + 1}: ${event.key} - Move ${event.direction}\n`;
    code += `\tif Input.is_key_pressed(${event.keyCode}):\n`;

    const dimMappings = CHARACTER_CONTROLLER_CONFIG.directionMappings[config.dimension as "2D" | "3D"];
    const dir = dimMappings?.[event.direction as keyof typeof dimMappings];
    if (dir) {
      code += `\t\tinput_dir.${dir.inputDir} ${dir.operator} ${(dir.value as number).toFixed(1)}\n`;
    }
    code += `\t\tis_moving = true\n`;
  }

  // Normalize and play animations
  code += `\t\n`;
  code += `\t# Normalize input direction if moving\n`;
  code += `\tif is_moving:\n`;
  code += `\t\tinput_dir = input_dir.normalized()\n`;
  
  // Find first event with animation for playing it
  const firstAnimEvent = eventChains.find(e => e.animationName && e.direction);
  if (firstAnimEvent) {
    const animSpeedValue = firstAnimEvent.animationSpeed === 1 || firstAnimEvent.animationSpeed === 1.0 ? "1" : firstAnimEvent.animationSpeed;
    code += `\t\tif animation_player:\n`;
    code += `\t\t\tanimation_player.play("${firstAnimEvent.animationName}", -1, ${animSpeedValue}, ${firstAnimEvent.animationBackward})\n`;
  }
  code += `\telse:\n`;
  code += `\t\tif animation_player:\n`;
  code += `\t\t\tanimation_player.play("idle", -1, 1.0, false)\n`;

  // Movement application
  code += `\t\n`;
  if (config.dimension === "3D" && config.supportsPhysics) {
    code += `\t# Normalize if there's any input\n`;
    code += `\tif input_dir.length() > 0:\n`;
    code += `\t\tinput_dir = input_dir.normalized()\n\t\n`;
    code += `\t# Apply movement\n`;
    code += `\tvar direction = (transform.basis * input_dir).normalized()\n`;
    code += `\tif direction and input_dir.length() > 0:\n`;
    code += `\t\tvelocity.x = direction.x * speed * speed_multiplier\n`;
    code += `\t\tvelocity.z = direction.z * speed * speed_multiplier\n`;
    code += `\telse:\n`;
    code += `\t\tvelocity.x = move_toward(velocity.x, 0, speed)\n`;
    code += `\t\tvelocity.z = move_toward(velocity.z, 0, speed)\n`;
  } else if (config.dimension === "2D" && config.supportsPhysics) {
    code += `\t# Normalize if there's any input\n`;
    code += `\tif input_dir.length() > 0:\n`;
    code += `\t\tinput_dir = input_dir.normalized()\n\t\n`;
    code += `\t# Apply movement\n`;
    code += `\tif input_dir.length() > 0:\n`;
    code += `\t\tvelocity.x = input_dir.x * speed * speed_multiplier\n`;
    code += `\t\tvelocity.y = input_dir.y * speed * speed_multiplier\n`;
    code += `\telse:\n`;
    code += `\t\tvelocity.x = move_toward(velocity.x, 0, speed)\n`;
    code += `\t\tvelocity.y = move_toward(velocity.y, 0, speed)\n`;
  }

  if (config.supportsPhysics) {
    code += `\t\n\tmove_and_slide()\n`;
  }

  return code;
}

/**
 * Validate flowchart structure
 */
export function validateFlowchart(
  nodes: FlowchartNode[],
  edges: FlowchartEdge[]
): { isValid: boolean; errors: Array<{nodeId: string; message: string; severity: string}> } {
  const errors: any[] = [];

  if (nodes.length === 0) {
    return { isValid: false, errors: [{ nodeId: "", message: "Flowchart must have at least one node", severity: "error" }] };
  }

  const nodeMap = new Map<string, FlowchartNode>();
  nodes.forEach(node => nodeMap.set(node.id, node));

  edges.forEach(edge => {
    if (!nodeMap.has(edge.source)) {
      errors.push({ nodeId: edge.id, message: `Source node ${edge.source} not found`, severity: "error" });
    }
    if (!nodeMap.has(edge.target)) {
      errors.push({ nodeId: edge.id, message: `Target node ${edge.target} not found`, severity: "error" });
    }
  });

  const hasErrors = errors.some((e) => e.severity === "error");
  return { isValid: !hasErrors, errors };
}
