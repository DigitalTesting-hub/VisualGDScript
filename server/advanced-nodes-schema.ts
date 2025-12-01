/**
 * Advanced Nodes Schema - 20+ Professional Node Types
 * Scale, Camera, Audio, Condition, Signal, Tween, Timer nodes
 * Complete specification for production GDScript generation
 */

export const ADVANCED_NODES_SCHEMA = {
  // ============ SCALE NODES ============
  scaleNodeTypes: {
    "scale_continuous": {
      category: "transform",
      description: "Continuous scaling over time",
      parameters: {
        axis: ["uniform", "x", "y", "z"],
        speed: { type: "float", default: 0.5, min: 0, max: 5 },
        direction: ["grow", "shrink", "pulse"],
        min_scale: { type: "float", default: 0.5 },
        max_scale: { type: "float", default: 2.0 }
      }
    },
    "scale_to_target": {
      category: "transform",
      description: "Scale to target size",
      parameters: {
        target_scale: { type: "string", default: "Vector3(2,2,2)" },
        speed: { type: "float", default: 2.0, min: 0, max: 10 },
        smoothing: { type: "bool", default: true },
        reset_after: { type: "bool", default: false }
      }
    },
    "scale_on_collision": {
      category: "physics",
      description: "Scale on collision/contact",
      parameters: {
        multiplier: { type: "float", default: 1.2 },
        duration: { type: "float", default: 0.3 },
        reset: { type: "bool", default: true }
      }
    }
  },

  // ============ CAMERA NODES ============
  cameraNodeTypes: {
    "camera_follow": {
      category: "camera",
      description: "Camera follows target",
      parameters: {
        target: { type: "string", default: "$Player" },
        offset: { type: "string", default: "Vector3(0, 2, 5)" },
        smooth_speed: { type: "float", default: 5.0 },
        look_at_target: { type: "bool", default: true }
      }
    },
    "camera_shake": {
      category: "camera",
      description: "Camera shake effect",
      parameters: {
        intensity: { type: "float", default: 0.5 },
        duration: { type: "float", default: 0.5 },
        decay: ["none", "linear", "exponential"]
      }
    },
    "camera_zoom": {
      category: "camera",
      description: "Camera zoom in/out",
      parameters: {
        zoom_level: { type: "float", default: 0.5 },
        min_zoom: { type: "float", default: 0.1 },
        max_zoom: { type: "float", default: 2.0 }
      }
    }
  },

  // ============ AUDIO NODES ============
  audioNodeTypes: {
    "play_sound": {
      category: "audio",
      description: "Play audio file",
      parameters: {
        audio_file: { type: "string", default: "" },
        volume: { type: "float", default: 0.0, min: -80, max: 24 },
        pitch: { type: "float", default: 1.0 },
        loop: { type: "bool", default: false }
      }
    },
    "stop_sound": {
      category: "audio",
      description: "Stop playing audio",
      parameters: {
        fade_out: { type: "bool", default: false },
        fade_duration: { type: "float", default: 1.0 }
      }
    },
    "spatial_audio": {
      category: "audio",
      description: "3D spatial audio",
      parameters: {
        max_distance: { type: "float", default: 50.0 },
        attenuation: { type: "float", default: 1.0 }
      }
    }
  },

  // ============ CONDITION NODES ============
  conditionNodeTypes: {
    "if_condition": {
      category: "logic",
      description: "If condition check",
      parameters: {
        condition: { type: "string", default: "true" },
        comparison: ["==", "!=", ">", "<", ">=", "<="]
      }
    },
    "compare_variables": {
      category: "logic",
      description: "Compare two variables",
      parameters: {
        variable_a: { type: "string", default: "health" },
        operator: ["==", "!=", ">", "<"],
        variable_b: { type: "string", default: "0" }
      }
    },
    "range_check": {
      category: "logic",
      description: "Check if value is in range",
      parameters: {
        variable: { type: "string", default: "health" },
        min_value: { type: "float", default: 0 },
        max_value: { type: "float", default: 100 }
      }
    },
    "distance_check": {
      category: "logic",
      description: "Check distance between objects",
      parameters: {
        object_a: { type: "string", default: "$Player" },
        object_b: { type: "string", default: "$Enemy" },
        max_distance: { type: "float", default: 10.0 }
      }
    }
  },

  // ============ SIGNAL NODES ============
  signalNodeTypes: {
    "emit_signal": {
      category: "signal",
      description: "Emit a signal",
      parameters: {
        signal_name: { type: "string", default: "signal_name" },
        delay: { type: "float", default: 0.0 }
      }
    },
    "connect_signal": {
      category: "signal",
      description: "Connect signal to function",
      parameters: {
        source_node: { type: "string", default: "$Button" },
        signal_name: { type: "string", default: "pressed" },
        target_function: { type: "string", default: "_on_button_pressed" }
      }
    },
    "area_signal": {
      category: "signal",
      description: "Area collision signals",
      parameters: {
        signal_type: ["body_entered", "body_exited"],
        body_type: ["any", "player", "enemy"]
      }
    }
  },

  // ============ TWEEN NODES ============
  tweenNodeTypes: {
    "tween_property": {
      category: "animation",
      description: "Tween node property",
      parameters: {
        property: { type: "string", default: "position" },
        target_value: { type: "string", default: "Vector3(0, 10, 0)" },
        duration: { type: "float", default: 1.0 },
        trans_type: ["linear", "quad", "cubic", "bounce"],
        ease_type: ["in", "out", "in_out"]
      }
    },
    "tween_callback": {
      category: "animation",
      description: "Tween with callbacks",
      parameters: {
        function_name: { type: "string", default: "_on_tween_finished" }
      }
    }
  },

  // ============ TIMER NODES ============
  timerNodeTypes: {
    "start_timer": {
      category: "timing",
      description: "Start a timer",
      parameters: {
        timer_name: { type: "string", default: "Timer" },
        wait_time: { type: "float", default: 1.0 },
        one_shot: { type: "bool", default: false }
      }
    },
    "stop_timer": {
      category: "timing",
      description: "Stop a timer",
      parameters: {
        timer_name: { type: "string", default: "Timer" }
      }
    },
    "wait_timer": {
      category: "timing",
      description: "Wait for timer",
      parameters: {
        wait_time: { type: "float", default: 1.0 }
      }
    },
    "cooldown_timer": {
      category: "timing",
      description: "Cooldown timer for actions",
      parameters: {
        cooldown_time: { type: "float", default: 1.0 },
        ready_variable: { type: "string", default: "can_attack" }
      }
    }
  }
};

export function getAdvancedNodeConfig(type: string) {
  for (const [category, nodes] of Object.entries(ADVANCED_NODES_SCHEMA)) {
    if (category.endsWith("NodeTypes")) {
      const nodeTypes = nodes as any;
      if (nodeTypes[type]) {
        return nodeTypes[type];
      }
    }
  }
  return null;
}
