/**
 * Godot Official API Generators
 * Maps each user selection EXACTLY to official Godot 4.4 API code
 * NO templates, NO assumptions - only selection-driven generation
 */

import type { FlowchartNode } from "@shared/schema";

/**
 * Generate code based on EXACT node selections
 * Each node type has its own generator that respects user's specific choices
 */
export function generateCodeFromSelection(node: FlowchartNode): string {
  const { type, data } = node;

  switch (type) {
    case "movement":
      return generateMovement(data);
    case "rotation":
      return generateRotation(data);
    case "scale":
      return generateScale(data);
    case "animation":
      return generateAnimation(data);
    case "audio":
      return generateAudio(data);
    case "physics":
      return generatePhysics(data);
    case "collision":
      return generateCollision(data);
    case "camera":
      return generateCamera(data);
    case "spawn":
      return generateSpawn(data);
    case "tween":
      return generateTween(data);
    case "print":
      return generatePrint(data);
    case "variable":
      return generateVariable(data);
    case "condition":
      return generateCondition(data);
    case "event":
      return generateEvent(data);
    case "timer":
      return generateTimer(data);
    default:
      return "";
  }
}

// ============ MOVEMENT GENERATORS ============
// Each node type gets its own API call
function generateMovement(data: any): string {
  const nodeType = data.movementNodeType || "Node2D";
  const x = data.directionX || 0;
  const y = data.directionY || 0;
  const z = data.directionZ || 0;
  const speed = data.speed || 1;

  // Official Godot 4.4 API for each node type
  switch (nodeType) {
    case "Node2D":
      return `position += Vector2(${x}, ${y}) * ${speed}`;
    case "Node3D":
      return `position += Vector3(${x}, ${y}, ${z}) * ${speed}`;
    case "CharacterBody2D":
      return `velocity = Vector2(${x}, ${y}) * ${speed}`;
    case "CharacterBody3D":
      return `velocity = Vector3(${x}, ${y}, ${z}) * ${speed}`;
    case "RigidBody2D":
      return `linear_velocity = Vector2(${x}, ${y}) * ${speed}`;
    case "RigidBody3D":
      return `linear_velocity = Vector3(${x}, ${y}, ${z}) * ${speed}`;
    case "Area2D":
      return `position += Vector2(${x}, ${y}) * ${speed}`;
    case "Area3D":
      return `position += Vector3(${x}, ${y}, ${z}) * ${speed}`;
    case "PathFollow2D":
      return `progress += ${speed}`;
    case "PathFollow3D":
      return `progress += ${speed}`;
    default:
      return `# Unknown movement type: ${nodeType}`;
  }
}

// ============ ROTATION GENERATORS ============
function generateRotation(data: any): string {
  const nodeType = data.rotationNodeType || "Node2D";
  const x = parseFloat(data.rotationX || 0);
  const y = parseFloat(data.rotationY || 0);
  const z = parseFloat(data.rotationZ || 0);

  // Official Godot 4.4 API for each node type
  switch (nodeType) {
    case "Node2D":
    case "Sprite2D":
      return `rotation += ${z}`;
    case "Node3D":
    case "Sprite3D":
      return `rotation += Vector3(${x}, ${y}, ${z})`;
    case "CharacterBody2D":
      return `rotation += ${z}`;
    case "CharacterBody3D":
      return `rotation += Vector3(${x}, ${y}, ${z})`;
    case "RigidBody2D":
      return `rotation += ${z}`;
    case "RigidBody3D":
      return `rotation += Vector3(${x}, ${y}, ${z})`;
    case "Area2D":
      return `rotation += ${z}`;
    case "Area3D":
      return `rotation += Vector3(${x}, ${y}, ${z})`;
    default:
      return `# Unknown rotation type: ${nodeType}`;
  }
}

// ============ SCALE GENERATORS ============
function generateScale(data: any): string {
  const nodeType = data.scaleNodeType || "Node2D";
  const scaleMode = data.scaleMode || "linked";

  let scaleCode: string;
  if (scaleMode === "linked") {
    const uniform = parseFloat(data.scaleUniform || 1);
    scaleCode = `scale = Vector2(${uniform}, ${uniform})` + 
               (nodeType.includes("3D") ? "" : "\n# For 3D: scale = Vector3(${uniform}, ${uniform}, ${uniform})");
  } else {
    const sx = parseFloat(data.scaleX || 1);
    const sy = parseFloat(data.scaleY || 1);
    const sz = parseFloat(data.scaleZ || 1);
    scaleCode = nodeType.includes("3D") 
      ? `scale = Vector3(${sx}, ${sy}, ${sz})`
      : `scale = Vector2(${sx}, ${sy})`;
  }

  // Official Godot 4.4 API for each node type
  switch (nodeType) {
    case "Node2D":
    case "Sprite2D":
    case "CharacterBody2D":
    case "RigidBody2D":
    case "Area2D":
      return scaleCode;
    case "Node3D":
    case "Sprite3D":
    case "CharacterBody3D":
    case "RigidBody3D":
    case "Area3D":
      return scaleCode;
    default:
      return `# Unknown scale type: ${nodeType}`;
  }
}

// ============ ANIMATION GENERATORS ============
function generateAnimation(data: any): string {
  const nodeType = data.animationNodeType || "AnimationPlayer";
  const animName = data.animationName || "idle";
  const action = data.animationAction || "play";
  const speed = parseFloat(data.animationSpeed || 1);

  // Official Godot 4.4 API for each animation node type
  switch (nodeType) {
    case "AnimationPlayer":
      if (action === "play") {
        return `$AnimationPlayer.play("${animName}", -1, ${speed})`;
      } else if (action === "stop") {
        return `$AnimationPlayer.stop()`;
      } else if (action === "seek") {
        return `$AnimationPlayer.seek(0)`;
      }
      return `$AnimationPlayer.play("${animName}")`;

    case "AnimatedSprite2D":
      if (action === "play") {
        return `$AnimatedSprite2D.animation = "${animName}"\n$AnimatedSprite2D.speed_scale = ${speed}\n$AnimatedSprite2D.play()`;
      } else if (action === "stop") {
        return `$AnimatedSprite2D.stop()`;
      }
      return `$AnimatedSprite2D.animation = "${animName}"\n$AnimatedSprite2D.play()`;

    case "Sprite2D":
      return `$Sprite2D.animation = "${animName}"`;

    case "AnimationTree":
      return `$AnimationTree.set("parameters/playback/travel", "${animName}")`;

    case "Tween":
      return `var tween = create_tween()\ntween.set_trans(Tween.TRANS_LINEAR)\ntween.tween_property($, "position", Vector2(0, 0), ${speed})`;

    default:
      return `# Unknown animation type: ${nodeType}`;
  }
}

// ============ AUDIO GENERATORS ============
function generateAudio(data: any): string {
  const nodeType = data.audioNodeType || "AudioStreamPlayer";
  const audioFile = data.audioFile || "res://sound.ogg";
  const volume = parseFloat(data.audioVolume || 0);
  const loop = data.audioLoop ? "true" : "false";

  // Convert volume to dB (Godot uses decibels)
  const volumeDb = volume <= 0 ? -80 : Math.log10(Math.max(0.001, volume)) * 20;

  // Official Godot 4.4 API for each audio node type
  switch (nodeType) {
    case "AudioStreamPlayer":
      return `$AudioStreamPlayer.stream = load("${audioFile}")\n$AudioStreamPlayer.volume_db = ${volumeDb}\n$AudioStreamPlayer.bus = "Master"\n$AudioStreamPlayer.play()`;

    case "AudioStreamPlayer2D":
      return `$AudioStreamPlayer2D.stream = load("${audioFile}")\n$AudioStreamPlayer2D.volume_db = ${volumeDb}\n$AudioStreamPlayer2D.play()`;

    case "AudioStreamPlayer3D":
      return `$AudioStreamPlayer3D.stream = load("${audioFile}")\n$AudioStreamPlayer3D.volume_db = ${volumeDb}\n$AudioStreamPlayer3D.play()`;

    case "AudioStreamPlayback":
      return `var playback = $AudioStreamPlayer.get_stream_playback()\nif playback:\n\tplayback.play()`;

    default:
      return `# Unknown audio type: ${nodeType}`;
  }
}

// ============ PHYSICS GENERATORS ============
function generatePhysics(data: any): string {
  const bodyType = data.physicsBodyType || "RigidBody3D";
  const gameMode = data.physicsGameMode || "3d";
  const physicsType = data.physicsType || "velocity";
  const x = parseFloat(data.physicsX || 0);
  const y = parseFloat(data.physicsY || 0);
  const z = parseFloat(data.physicsZ || 0);

  // Official Godot 4.4 API for each physics body type
  switch (bodyType) {
    case "RigidBody2D":
      if (physicsType === "velocity") {
        return `linear_velocity = Vector2(${x}, ${y})`;
      } else if (physicsType === "force") {
        return `apply_force(Vector2(${x}, ${y}))`;
      } else if (physicsType === "impulse") {
        return `apply_central_impulse(Vector2(${x}, ${y}))`;
      }
      break;

    case "RigidBody3D":
      if (physicsType === "velocity") {
        return `linear_velocity = Vector3(${x}, ${y}, ${z})`;
      } else if (physicsType === "force") {
        return `apply_force(Vector3(${x}, ${y}, ${z}))`;
      } else if (physicsType === "impulse") {
        return `apply_central_impulse(Vector3(${x}, ${y}, ${z}))`;
      }
      break;

    case "CharacterBody2D":
      return `velocity = Vector2(${x}, ${y})\nmove_and_slide()`;

    case "CharacterBody3D":
      return `velocity = Vector3(${x}, ${y}, ${z})\nmove_and_slide()`;

    case "StaticBody2D":
    case "StaticBody3D":
      return `# StaticBody does not move - remove from flowchart or use RigidBody instead`;

    case "Area2D":
    case "Area3D":
      return `position += Vector${gameMode === "3d" ? "3" : "2"}(${x}, ${y}${gameMode === "3d" ? ", " + z : ""})`;

    default:
      return `# Unknown physics body: ${bodyType}`;
  }
  return "";
}

// ============ COLLISION GENERATORS ============
function generateCollision(data: any): string {
  const collisionType = data.collisionType || "Area2D";
  const signal = data.collisionDetect || "body_entered";

  // Generate signal connection code
  return `func _on_${collisionType.toLowerCase()}_${signal}(other):
\tprint("Collision detected: ", other.name)`;
}

// ============ CAMERA GENERATORS ============
function generateCamera(data: any): string {
  const cameraType = data.cameraType || "Camera2D";
  const action = data.cameraAction || "enable";
  const isCurrent = data.cameraCurrent ? "true" : "false";

  // Official Godot 4.4 API for each camera type
  switch (cameraType) {
    case "Camera2D":
      if (action === "enable") {
        return `$Camera2D.enabled = true`;
      } else if (action === "disable") {
        return `$Camera2D.enabled = false`;
      } else if (action === "set_target") {
        return `$Camera2D.global_position = get_global_mouse_position()`;
      }
      return `$Camera2D.make_current()`;

    case "Camera3D":
      if (action === "enable") {
        return `$Camera3D.current = true`;
      } else if (action === "disable") {
        return `$Camera3D.current = false`;
      } else if (action === "set_target") {
        return `$Camera3D.look_at(Vector3(0, 0, 0), Vector3.UP)`;
      }
      return `$Camera3D.make_current()`;

    default:
      return `# Unknown camera type: ${cameraType}`;
  }
}

// ============ SPAWN GENERATORS ============
function generateSpawn(data: any): string {
  const spawnNodeType = data.spawnNodeType || "Node2D";
  const scenePath = data.spawnScene || "res://scene.tscn";
  const x = parseFloat(data.spawnX || 0);
  const y = parseFloat(data.spawnY || 0);
  const z = parseFloat(data.spawnZ || 0);
  const gameMode = data.spawnGameMode || "2d";

  const position = gameMode === "3d" ? `Vector3(${x}, ${y}, ${z})` : `Vector2(${x}, ${y})`;

  return `var instance = load("${scenePath}").instantiate() as ${spawnNodeType}
instance.position = ${position}
add_child(instance)`;
}

// ============ TWEEN GENERATORS ============
function generateTween(data: any): string {
  const gameMode = data.tweenGameMode || "2d";
  const duration = parseFloat(data.tweenDuration || 1);
  const easing = data.tweenEasing || "Linear";
  const property = data.tweenProperty || "position";

  const transitionType = `Tween.TRANS_${easing.toUpperCase()}`;

  return `var tween = create_tween()
tween.set_trans(${transitionType})
tween.tween_property($, "${property}", Vector${gameMode === "3d" ? "3" : "2"}(0, 0), ${duration})`;
}

// ============ PRINT GENERATORS ============
function generatePrint(data: any): string {
  const text = data.printText || "Debug";
  return `print("${text}")`;
}

// ============ VARIABLE GENERATORS ============
function generateVariable(data: any): string {
  const varName = data.varName || "var_name";
  const varValue = data.varValue || "0";

  return `var ${varName} = ${varValue}`;
}

// ============ CONDITION GENERATORS ============
function generateCondition(data: any): string {
  const condition = data.condition || "true";

  return `if ${condition}:
\tpass`;
}

// ============ EVENT GENERATORS ============
function generateEvent(data: any): string {
  const eventType = data.eventType || "process";

  if (eventType === "ready") {
    return `func _ready() -> void:
\tpass`;
  } else if (eventType === "process") {
    return `func _process(delta: float) -> void:
\tpass`;
  } else if (eventType === "input") {
    return `func _input(event: InputEvent) -> void:
\tif event is InputEventKey:
\t\tpass`;
  }

  return `func _${eventType}() -> void:
\tpass`;
}

// ============ TIMER GENERATORS ============
function generateTimer(data: any): string {
  const duration = parseFloat(data.timerDuration || 1);
  const autostart = data.timerAutostart ? "true" : "false";

  return `await get_tree().create_timer(${duration}).timeout`;
}
