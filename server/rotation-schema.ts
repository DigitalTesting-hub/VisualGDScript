/**
 * Advanced Rotation Node Schema - 7 Professional Rotation Types
 * Supports 2D/3D, input-driven, physics-based, and animated rotations
 */

export const ROTATION_NODE_SCHEMA = {
  rotationNodeTypes: {
    "rotate_continuous": {
      category: "transform",
      description: "Continuous rotation over time",
      parameters: {
        axis: ["x", "y", "z", "all"],
        speed: { type: "float", default: 1.0, min: 0, max: 10 },
        direction: ["clockwise", "counterclockwise", "pingpong"],
        space: ["local", "global"],
        condition: { type: "string", default: "true" }
      }
    },
    "rotate_to_target": {
      category: "transform",
      description: "Rotate towards a target point or object",
      parameters: {
        target_type: ["position", "node", "mouse", "player"],
        target_path: { type: "string", default: "" },
        speed: { type: "float", default: 2.0, min: 0, max: 10 },
        axis_lock: ["none", "x", "y", "z"],
        smoothing: { type: "bool", default: true }
      }
    },
    "rotate_on_input": {
      category: "input",
      description: "Rotate based on keyboard/mouse/gamepad input",
      parameters: {
        input_type: ["keyboard", "mouse", "gamepad"],
        axis: ["x", "y", "z"],
        sensitivity: { type: "float", default: 1.0, min: 0.1, max: 5.0 },
        invert: { type: "bool", default: false },
        clamp: { type: "bool", default: false },
        min_angle: { type: "float", default: -180 },
        max_angle: { type: "float", default: 180 }
      }
    },
    "rotate_between_angles": {
      category: "animation",
      description: "Rotate between min/max angles with easing",
      parameters: {
        min_angle: { type: "float", default: -45 },
        max_angle: { type: "float", default: 45 },
        duration: { type: "float", default: 1.0 },
        easing: ["linear", "ease_in", "ease_out", "ease_in_out"],
        loop: ["none", "cycle", "pingpong"],
        auto_start: { type: "bool", default: true }
      }
    },
    "rotate_snap": {
      category: "transform",
      description: "Snap rotation to specific angles",
      parameters: {
        snap_angle: { type: "float", default: 45 },
        smooth: { type: "bool", default: false },
        smooth_speed: { type: "float", default: 5.0 },
        axis: ["x", "y", "z", "all"]
      }
    },
    "rotate_shake": {
      category: "effect",
      description: "Screen/camera shake rotation effect",
      parameters: {
        intensity: { type: "float", default: 0.5 },
        duration: { type: "float", default: 0.5 },
        frequency: { type: "float", default: 15.0 },
        decay: ["none", "linear", "exponential"],
        axis: ["x", "y", "z", "all"]
      }
    },
    "rotate_physics": {
      category: "physics",
      description: "Physics-based rotation (torque/angular velocity)",
      parameters: {
        method: ["torque", "angular_velocity", "impulse"],
        force: { type: "float", default: 100.0 },
        axis: ["x", "y", "z"],
        local: { type: "bool", default: true },
        damping: { type: "float", default: 0.1 }
      }
    }
  },

  rotationInputs: {
    keyboard_pairs: {
      rotate_left_right: { negative: "A", positive: "D" },
      rotate_up_down: { negative: "S", positive: "W" },
      rotate_roll: { negative: "Q", positive: "E" }
    }
  },

  easingFunctions: {
    linear: "Tween.TRANS_LINEAR",
    sine: "Tween.TRANS_SINE",
    quad: "Tween.TRANS_QUAD",
    cubic: "Tween.TRANS_CUBIC",
    back: "Tween.TRANS_BACK",
    bounce: "Tween.TRANS_BOUNCE"
  },

  rotationConstants: {
    common_angles: {
      "0": 0,
      "45": 45,
      "90": 90,
      "180": 180,
      "270": 270,
      "360": 360
    },
    direction_multipliers: {
      clockwise: -1,
      counterclockwise: 1,
      pingpong: 0.5
    }
  }
};

export function getRotationTypeConfig(type: string) {
  return ROTATION_NODE_SCHEMA.rotationNodeTypes[type as keyof typeof ROTATION_NODE_SCHEMA.rotationNodeTypes];
}
