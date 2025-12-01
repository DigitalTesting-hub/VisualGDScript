/**
 * Advanced Nodes Generator - 20+ Node Types
 * Generates production-ready GDScript for all advanced node types
 */

import { ADVANCED_NODES_SCHEMA, getAdvancedNodeConfig } from "./advanced-nodes-schema";

export class AdvancedNodesGenerator {
  generateAdvancedNodeCode(node: any, dimension: string = "3D", nodeType: string = "Node3D"): string {
    const nodeCategory = node.type?.split("_")[0]; // "scale", "camera", "audio", etc.
    let code = "";
    const indent = "\t";

    switch (nodeCategory) {
      case "scale":
        code += this.generateScaleCode(node, dimension, indent);
        break;
      case "camera":
        code += this.generateCameraCode(node, dimension, indent);
        break;
      case "audio":
        code += this.generateAudioCode(node, indent);
        break;
      case "if":
      case "compare":
      case "range":
      case "distance":
        code += this.generateConditionCode(node, indent);
        break;
      case "emit":
      case "connect":
      case "area":
        code += this.generateSignalCode(node, indent);
        break;
      case "tween":
        code += this.generateTweenCode(node, indent);
        break;
      case "start":
      case "stop":
      case "wait":
      case "cooldown":
        code += this.generateTimerCode(node, indent);
        break;
      default:
        code += `${indent}# Unknown node type: ${node.type}\n`;
    }

    return code;
  }

  private generateScaleCode(node: any, dimension: string, indent: string): string {
    const nodeType = node.type;
    let code = `\n${indent}# Scale: ${nodeType}\n`;

    if (nodeType === "scale_continuous") {
      const axis = node.data?.scaleAxis || "uniform";
      const speed = node.data?.scaleSpeed || 0.5;
      const direction = node.data?.scaleDirection || "grow";

      if (direction === "grow") {
        if (dimension === "2D") {
          code += `${indent}scale += Vector2(${speed}, ${speed}) * delta\n`;
        } else {
          code += `${indent}scale += Vector3(${speed}, ${speed}, ${speed}) * delta\n`;
        }
      } else if (direction === "shrink") {
        if (dimension === "2D") {
          code += `${indent}scale -= Vector2(${speed}, ${speed}) * delta\n`;
        } else {
          code += `${indent}scale -= Vector3(${speed}, ${speed}, ${speed}) * delta\n`;
        }
      } else if (direction === "pulse") {
        code += `${indent}scale = Vector3.ONE * (1.0 + sin(Time.get_ticks_msec() / 1000.0) * 0.2)\n`;
      }
    } else if (nodeType === "scale_to_target") {
      const targetScale = node.data?.scaleTargetScale || "Vector3(2,2,2)";
      const speed = node.data?.scaleSpeed || 2.0;
      code += `${indent}scale = scale.lerp(${targetScale}, ${speed} * delta)\n`;
    } else if (nodeType === "scale_on_collision") {
      const multiplier = node.data?.scaleMultiplier || 1.2;
      const duration = node.data?.scaleDuration || 0.3;
      code += `${indent}# Bounce on collision\nvar original_scale = scale\nscale = original_scale * ${multiplier}\nawait get_tree().create_timer(${duration}).timeout\nscale = original_scale\n`;
    }

    return code;
  }

  private generateCameraCode(node: any, dimension: string, indent: string): string {
    const nodeType = node.type;
    let code = `\n${indent}# Camera: ${nodeType}\n`;

    if (nodeType === "camera_follow") {
      const target = node.data?.cameraTarget || "$Player";
      const offset = node.data?.cameraOffset || "Vector3(0, 2, 5)";
      const smoothSpeed = node.data?.cameraSmoothSpeed || 5.0;
      code += `${indent}global_position = global_position.lerp(${target}.global_position + ${offset}, ${smoothSpeed} * delta)\n`;
      code += `${indent}look_at(${target}.global_position)\n`;
    } else if (nodeType === "camera_shake") {
      const intensity = node.data?.cameraIntensity || 0.5;
      const duration = node.data?.cameraDuration || 0.5;
      code += `${indent}# Camera shake\nvar original_pos = position\nvar elapsed = 0.0\nwhile elapsed < ${duration}:\n${indent}\tposition = original_pos + Vector3(randf_range(-${intensity}, ${intensity}), randf_range(-${intensity}, ${intensity}), 0)\n${indent}\telapsed += get_physics_process_delta_time()\n${indent}\tyield(get_tree(), "physics_frame")\n${indent}position = original_pos\n`;
    } else if (nodeType === "camera_zoom") {
      const zoomLevel = node.data?.cameraZoomLevel || 0.5;
      code += `${indent}fov = lerp(fov, 75.0 * ${zoomLevel}, 5.0 * delta)\n`;
    }

    return code;
  }

  private generateAudioCode(node: any, indent: string): string {
    const nodeType = node.type;
    let code = `\n${indent}# Audio: ${nodeType}\n`;

    if (nodeType === "play_sound") {
      const audioFile = node.data?.audioFile || "res://sounds/effect.wav";
      const volume = node.data?.audioVolume || 0.0;
      const pitch = node.data?.audioPitch || 1.0;
      code += `${indent}@onready var audio_player = $AudioStreamPlayer\n${indent}audio_player.stream = load("${audioFile}")\n${indent}audio_player.volume_db = ${volume}\n${indent}audio_player.pitch_scale = ${pitch}\n${indent}audio_player.play()\n`;
    } else if (nodeType === "stop_sound") {
      const fadeOut = node.data?.audioFadeOut || false;
      if (fadeOut) {
        const fadeDuration = node.data?.audioFadeDuration || 1.0;
        code += `${indent}create_tween().tween_property(audio_player, "volume_db", -80, ${fadeDuration})\n${indent}await get_tree().create_timer(${fadeDuration}).timeout\n${indent}audio_player.stop()\n`;
      } else {
        code += `${indent}audio_player.stop()\n`;
      }
    } else if (nodeType === "spatial_audio") {
      const maxDistance = node.data?.audioMaxDistance || 50.0;
      code += `${indent}@onready var audio_3d = $AudioStreamPlayer3D\n${indent}audio_3d.max_distance = ${maxDistance}\n`;
    }

    return code;
  }

  private generateConditionCode(node: any, indent: string): string {
    const nodeType = node.type;
    let code = `\n${indent}# Condition: ${nodeType}\n`;

    if (nodeType === "if_condition") {
      const condition = node.data?.conditionExpression || "true";
      code += `${indent}if ${condition}:\n${indent}\tpass\n${indent}else:\n${indent}\tpass\n`;
    } else if (nodeType === "compare_variables") {
      const varA = node.data?.compareVarA || "health";
      const operator = node.data?.compareOperator || ">";
      const varB = node.data?.compareVarB || "0";
      code += `${indent}if ${varA} ${operator} ${varB}:\n${indent}\tpass\n`;
    } else if (nodeType === "range_check") {
      const variable = node.data?.rangeVariable || "health";
      const minValue = node.data?.rangeMin || 0;
      const maxValue = node.data?.rangeMax || 100;
      code += `${indent}if ${variable} >= ${minValue} and ${variable} <= ${maxValue}:\n${indent}\tpass\n`;
    } else if (nodeType === "distance_check") {
      const objA = node.data?.distanceObjectA || "$Player";
      const objB = node.data?.distanceObjectB || "$Enemy";
      const maxDist = node.data?.distanceMax || 10.0;
      code += `${indent}if ${objA}.global_position.distance_to(${objB}.global_position) < ${maxDist}:\n${indent}\tpass\n`;
    }

    return code;
  }

  private generateSignalCode(node: any, indent: string): string {
    const nodeType = node.type;
    let code = `\n${indent}# Signal: ${nodeType}\n`;

    if (nodeType === "emit_signal") {
      const signalName = node.data?.signalName || "signal_name";
      code += `${indent}emit_signal("${signalName}")\n`;
    } else if (nodeType === "connect_signal") {
      const sourceNode = node.data?.signalSource || "$Button";
      const signalName = node.data?.signalName || "pressed";
      const targetFunc = node.data?.signalTarget || "_on_button_pressed";
      code += `${indent}${sourceNode}.${signalName}.connect(${targetFunc})\n`;
    } else if (nodeType === "area_signal") {
      const signalType = node.data?.areaSignalType || "body_entered";
      code += `${indent}func _on_area_${signalType}(body: Node) -> void:\n${indent}\tpass\n`;
    }

    return code;
  }

  private generateTweenCode(node: any, indent: string): string {
    const nodeType = node.type;
    let code = `\n${indent}# Tween: ${nodeType}\n`;

    if (nodeType === "tween_property") {
      const property = node.data?.tweenProperty || "position";
      const targetValue = node.data?.tweenTargetValue || "Vector3(0, 10, 0)";
      const duration = node.data?.tweenDuration || 1.0;
      code += `${indent}var tween = create_tween()\n${indent}tween.tween_property(self, "${property}", ${targetValue}, ${duration})\n`;
    } else if (nodeType === "tween_callback") {
      const funcName = node.data?.tweenCallback || "_on_tween_finished";
      code += `${indent}tween.tween_callback(${funcName})\n`;
    }

    return code;
  }

  private generateTimerCode(node: any, indent: string): string {
    const nodeType = node.type;
    let code = `\n${indent}# Timer: ${nodeType}\n`;

    if (nodeType === "start_timer") {
      const timerName = node.data?.timerName || "Timer";
      const waitTime = node.data?.timerWaitTime || 1.0;
      code += `${indent}@onready var timer = $${timerName}\n${indent}timer.start(${waitTime})\n`;
    } else if (nodeType === "stop_timer") {
      const timerName = node.data?.timerName || "Timer";
      code += `${indent}timer.stop()\n`;
    } else if (nodeType === "wait_timer") {
      const waitTime = node.data?.timerWaitTime || 1.0;
      code += `${indent}await get_tree().create_timer(${waitTime}).timeout\n`;
    } else if (nodeType === "cooldown_timer") {
      const cooldownTime = node.data?.cooldownTime || 1.0;
      const readyVar = node.data?.cooldownVariable || "can_attack";
      code += `${indent}if ${readyVar}:\n${indent}\t${readyVar} = false\n${indent}\tawait get_tree().create_timer(${cooldownTime}).timeout\n${indent}\t${readyVar} = true\n`;
    }

    return code;
  }
}
