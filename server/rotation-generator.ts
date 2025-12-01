/**
 * Rotation Node Code Generator - Advanced rotation system
 * Generates production-ready GDScript for all 7 rotation types
 */

import { ROTATION_NODE_SCHEMA } from "./rotation-schema";

export class RotationNodeGenerator {
  generateRotationCode(node: any, dimension: string = "3D", nodeType: string = "Node3D"): string {
    const rotationType = node.data?.rotationType || "rotate_continuous";
    let code = "";
    const indent = "\t";

    code += `\n${indent}# Rotation: ${rotationType}\n`;

    switch (rotationType) {
      case "rotate_continuous":
        code += this.generateContinuousRotation(node, dimension, indent);
        break;
      case "rotate_to_target":
        code += this.generateRotateToTarget(node, dimension, indent);
        break;
      case "rotate_on_input":
        code += this.generateInputRotation(node, dimension, indent);
        break;
      case "rotate_between_angles":
        code += this.generateAngleRotation(node, dimension, indent);
        break;
      case "rotate_snap":
        code += this.generateSnapRotation(node, dimension, indent);
        break;
      case "rotate_shake":
        code += this.generateShakeRotation(node, dimension, indent);
        break;
      case "rotate_physics":
        code += this.generatePhysicsRotation(node, nodeType, indent);
        break;
      default:
        code += `${indent}# Unknown rotation type\n`;
    }

    return code;
  }

  private generateContinuousRotation(node: any, dimension: string, indent: string): string {
    const axis = node.data?.rotationAxis || "y";
    const speed = node.data?.rotationSpeed || 1.0;
    const direction = node.data?.rotationDirection || "counterclockwise";
    const space = node.data?.rotationSpace || "local";

    const dirMultiplier = ROTATION_NODE_SCHEMA.rotationConstants.direction_multipliers[direction as keyof typeof ROTATION_NODE_SCHEMA.rotationConstants.direction_multipliers] || 1;

    if (dimension === "2D") {
      if (space === "local") {
        return `${indent}rotation += deg_to_rad(${speed} * ${dirMultiplier}) * delta\n`;
      } else {
        return `${indent}global_rotation += deg_to_rad(${speed} * ${dirMultiplier}) * delta\n`;
      }
    } else {
      if (space === "local") {
        return `${indent}rotate_${axis}(deg_to_rad(${speed} * ${dirMultiplier} * delta))\n`;
      } else {
        return `${indent}global_rotate(Vector3.${axis.toUpperCase()}, deg_to_rad(${speed} * ${dirMultiplier} * delta))\n`;
      }
    }
  }

  private generateRotateToTarget(node: any, dimension: string, indent: string): string {
    const targetType = node.data?.rotationTargetType || "position";
    const speed = node.data?.rotationSpeed || 2.0;
    const smooth = node.data?.rotationSmoothing !== false;

    if (targetType === "player") {
      if (dimension === "2D") {
        return `${indent}look_at(get_tree().get_first_node_in_group("player").global_position)\n`;
      } else {
        return `${indent}look_at(get_tree().get_first_node_in_group("player").global_position)\n`;
      }
    } else if (targetType === "mouse") {
      if (dimension === "2D") {
        return `${indent}look_at(get_global_mouse_position())\n`;
      } else {
        return `${indent}look_at(get_global_mouse_position())\n`;
      }
    }

    if (smooth) {
      return `${indent}rotation.y = lerp_angle(rotation.y, 0, ${speed} * delta)\n`;
    } else {
      return `${indent}rotation.y += ${speed} * delta\n`;
    }
  }

  private generateInputRotation(node: any, dimension: string, indent: string): string {
    const inputType = node.data?.rotationInputType || "mouse";
    const axis = node.data?.rotationAxis || "y";
    const sensitivity = node.data?.rotationSensitivity || 1.0;
    const invert = node.data?.rotationInvert ? "-" : "";

    if (inputType === "keyboard") {
      return `${indent}rotation.${axis} += Input.get_axis("A", "D") * deg_to_rad(${sensitivity}) * ${invert}1.0 * delta\n`;
    } else if (inputType === "mouse") {
      return `${indent}# Mouse input rotation\nif Input.is_action_pressed("ui_focus_next"):\n${indent}\trotation.${axis} += Input.get_relative().y * deg_to_rad(${sensitivity}) * ${invert}0.001 * delta\n`;
    } else {
      return `${indent}rotation.${axis} += Input.get_joy_axis(0, JOY_AXIS_RIGHT_X) * deg_to_rad(${sensitivity}) * ${invert}1.0 * delta\n`;
    }
  }

  private generateAngleRotation(node: any, dimension: string, indent: string): string {
    const minAngle = node.data?.rotationMinAngle || -45;
    const maxAngle = node.data?.rotationMaxAngle || 45;
    const duration = node.data?.rotationDuration || 1.0;
    const easing = node.data?.rotationEasing || "linear";

    const easingValue = ROTATION_NODE_SCHEMA.easingFunctions[easing as keyof typeof ROTATION_NODE_SCHEMA.easingFunctions] || "Tween.TRANS_LINEAR";

    return `${indent}var tween = create_tween()\n${indent}tween.set_trans(${easingValue})\n${indent}tween.tween_property(self, "rotation:y", deg_to_rad(${maxAngle}), ${duration})\n`;
  }

  private generateSnapRotation(node: any, dimension: string, indent: string): string {
    const snapAngle = node.data?.rotationSnapAngle || 45;
    const axis = node.data?.rotationAxis || "y";
    const smooth = node.data?.rotationSmooth || false;
    const smoothSpeed = node.data?.rotationSmoothSpeed || 5.0;

    if (dimension === "2D") {
      if (smooth) {
        return `${indent}rotation = lerp_angle(rotation, round(rotation / deg_to_rad(${snapAngle})) * deg_to_rad(${snapAngle}), ${smoothSpeed} * delta)\n`;
      } else {
        return `${indent}rotation = round(rotation / deg_to_rad(${snapAngle})) * deg_to_rad(${snapAngle})\n`;
      }
    } else {
      return `${indent}rotation.${axis} = round(rotation.${axis} / deg_to_rad(${snapAngle})) * deg_to_rad(${snapAngle})\n`;
    }
  }

  private generateShakeRotation(node: any, dimension: string, indent: string): string {
    const intensity = node.data?.rotationIntensity || 0.5;
    const duration = node.data?.rotationDuration || 0.5;
    const axis = node.data?.rotationAxis || "y";

    return `${indent}# Shake rotation\nvar original_rot = rotation.${axis}\nvar elapsed = 0.0\nwhile elapsed < ${duration}:\n${indent}\trotation.${axis} = original_rot + randf_range(-${intensity}, ${intensity})\n${indent}\telapsed += get_physics_process_delta_time()\n${indent}\tyield(get_tree(), "physics_frame")\n${indent}rotation.${axis} = original_rot\n`;
  }

  private generatePhysicsRotation(node: any, nodeType: string, indent: string): string {
    const method = node.data?.rotationPhysicsMethod || "torque";
    const force = node.data?.rotationForce || 100.0;
    const axis = node.data?.rotationAxis || "y";

    if (nodeType.includes("3D")) {
      if (method === "torque") {
        return `${indent}apply_torque(Vector3.${axis.toUpperCase()} * ${force})\n`;
      } else if (method === "angular_velocity") {
        return `${indent}angular_velocity = Vector3.${axis.toUpperCase()} * ${force}\n`;
      }
    } else {
      if (method === "torque") {
        return `${indent}apply_torque(${force})\n`;
      } else if (method === "angular_velocity") {
        return `${indent}angular_velocity = ${force}\n`;
      }
    }

    return `${indent}# Physics rotation\n`;
  }
}
