/**
 * Godot 4.4 Schema for Flowchart Code Generation
 * Complete specification for character controller generation
 * Supports 150+ Godot node types with intelligent fallbacks
 */

export const GODOT_INPUT_SCHEMA = {
  inputEvents: {
    "keyboard_key_pressed": {
      name: "Keyboard Key Pressed",
      template: (keyCode: string, actionCode: string) =>
        `if Input.is_key_pressed(KEY_${keyCode}):\n${actionCode}`,
      usesInputEvent: false,
      requiresParam: true
    },
    "keyboard_key_released": {
      name: "Keyboard Key Released",
      template: (keyCode: string, actionCode: string) =>
        `if Input.is_key_pressed(KEY_${keyCode}):\n${actionCode}`,
      usesInputEvent: false,
      requiresParam: true
    },
    "mouse_button_pressed": {
      name: "Mouse Button Pressed",
      template: (buttonId: string, actionCode: string) =>
        `if Input.is_mouse_button_pressed(MOUSE_BUTTON_${buttonId}):\n${actionCode}`,
      usesInputEvent: false,
      requiresParam: true
    }
  },

  actions: {
    "move_position": {
      name: "Movement",
      template: (direction: string, speed: any = 1) => {
        const directionMap: Record<string, string> = {
          "X": "Vector2.RIGHT",
          "Y": "Vector2.DOWN",
          "-X": "Vector2.LEFT",
          "-Y": "Vector2.UP",
          "Z": "Vector3.FORWARD",
          "-Z": "Vector3.BACK"
        };
        const vector = directionMap[direction] || "Vector2.RIGHT";
        return `velocity = ${vector} * ${speed}`;
      },
      params: ["direction", "speed"]
    }
  }
};

// Default configuration for any node type (fallback)
const DEFAULT_NODE_CONFIG = {
  dimension: "2D" as const,
  defaultSpeed: 200.0,
  vectorType: "Vector2",
  supportsPhysics: false,
  supportsJump: false
};

// Base config for 3D nodes
const DEFAULT_3D_CONFIG = {
  dimension: "3D" as const,
  defaultSpeed: 5.0,
  vectorType: "Vector3",
  supportsPhysics: false,
  supportsJump: false
};

export const CHARACTER_CONTROLLER_CONFIG = {
  nodeTypes: {
    // Physics Bodies - Character Controller (supports physics + jump)
    "CharacterBody2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      jumpVelocity: -400.0,
      gravityPath: "physics/2d/default_gravity",
      gravitySign: "+",
      vectorType: "Vector2",
      supportsPhysics: true,
      supportsJump: true
    },
    "CharacterBody3D": {
      dimension: "3D",
      defaultSpeed: 5,
      jumpVelocity: 4,
      gravityPath: "physics/3d/default_gravity",
      gravitySign: "-",
      vectorType: "Vector3",
      supportsPhysics: true,
      supportsJump: true
    },

    // Physics Bodies - No Jump
    "RigidBody2D": {
      dimension: "2D",
      defaultSpeed: 500.0,
      vectorType: "Vector2",
      supportsPhysics: true,
      supportsJump: false
    },
    "RigidBody3D": {
      dimension: "3D",
      defaultSpeed: 500.0,
      vectorType: "Vector3",
      supportsPhysics: true,
      supportsJump: false
    },
    "StaticBody2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "StaticBody3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Areas (Physics-aware but no velocity)
    "Area2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Area3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Base Nodes
    "Node": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Node2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Node3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Sprites
    "Sprite2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Sprite3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "AnimatedSprite2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AnimatedSprite3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Animation & Audio
    "AnimationPlayer": {
      dimension: "2D",
      defaultSpeed: 1.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AnimationTree": {
      dimension: "2D",
      defaultSpeed: 1.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AudioStreamPlayer": {
      dimension: "2D",
      defaultSpeed: 1.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AudioStreamPlayer2D": {
      dimension: "2D",
      defaultSpeed: 1.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "AudioStreamPlayer3D": {
      dimension: "3D",
      defaultSpeed: 1.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Cameras
    "Camera2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Camera3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Path followers
    "PathFollow2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "PathFollow3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Path nodes
    "Path2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Path3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Physics shapes
    "CollisionShape2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "CollisionShape3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // UI
    "Control": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Button": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Label": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Panel": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },

    // Containers
    "VBoxContainer": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "HBoxContainer": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "GridContainer": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },

    // Lights & Meshes
    "MeshInstance3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "Light3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "DirectionalLight3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "OmniLight3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "SpotLight3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Markers
    "Marker2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Marker3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Particles
    "CPUParticles2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "CPUParticles3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },
    "GPUParticles2D": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "GPUParticles3D": {
      dimension: "3D",
      defaultSpeed: 5.0,
      vectorType: "Vector3",
      supportsPhysics: false,
      supportsJump: false
    },

    // Timer
    "Timer": {
      dimension: "2D",
      defaultSpeed: 1.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },

    // Canvas & Viewport
    "CanvasLayer": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "CanvasGroup": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },
    "Viewport": {
      dimension: "2D",
      defaultSpeed: 200.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    },

    // Tween
    "Tween": {
      dimension: "2D",
      defaultSpeed: 1.0,
      vectorType: "Vector2",
      supportsPhysics: false,
      supportsJump: false
    }
  },

  // Direction mappings for 2D and 3D
  // Format: direction => { inputDir: axis to modify, operator: += or -=, value: 1.0 }
  // 2D: X=right, Y=down, -X=left, -Y=up
  // 3D: X=right, Y=up, Z=forward, -X=left, -Y=down, -Z=backward
  directionMappings: {
    "2D": {
      "X": { inputDir: "x", operator: "-=", value: 1.0, label: "Right" },
      "Y": { inputDir: "y", operator: "+=", value: 1.0, label: "Down" },
      "-X": { inputDir: "x", operator: "+=", value: 1.0, label: "Left" },
      "-Y": { inputDir: "y", operator: "-=", value: 1.0, label: "Up" }
    },
    "3D": {
      "X": { inputDir: "x", operator: "-=", value: 1.0, label: "Right" },
      "Y": { inputDir: "y", operator: "+=", value: 1.0, label: "Up" },
      "Z": { inputDir: "z", operator: "-=", value: 1.0, label: "Forward" },
      "-X": { inputDir: "x", operator: "+=", value: 1.0, label: "Left" },
      "-Y": { inputDir: "y", operator: "-=", value: 1.0, label: "Down" },
      "-Z": { inputDir: "z", operator: "+=", value: 1.0, label: "Backward" }
    }
  },

  // All supported keyboard keys for event configuration
  allKeyboardKeys: [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "Space", "Enter", "Tab", "Escape", "Backspace", "Delete",
    "Up", "Down", "Left", "Right", "Home", "End", "Page Up", "Page Down",
    "Shift", "Control", "Alt", "Meta",
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
    "Plus", "Minus", "Equal", "Slash", "Backslash", "Comma", "Period",
    "Semicolon", "Apostrophe", "Bracket Left", "Bracket Right", "Grave"
  ],

  // Key mapping from UI labels to Godot KEY_* constants
  keyCodeMap: {
    "A": "KEY_A", "B": "KEY_B", "C": "KEY_C", "D": "KEY_D", "E": "KEY_E", "F": "KEY_F", "G": "KEY_G", "H": "KEY_H", "I": "KEY_I", "J": "KEY_J", "K": "KEY_K", "L": "KEY_L", "M": "KEY_M",
    "N": "KEY_N", "O": "KEY_O", "P": "KEY_P", "Q": "KEY_Q", "R": "KEY_R", "S": "KEY_S", "T": "KEY_T", "U": "KEY_U", "V": "KEY_V", "W": "KEY_W", "X": "KEY_X", "Y": "KEY_Y", "Z": "KEY_Z",
    "0": "KEY_0", "1": "KEY_1", "2": "KEY_2", "3": "KEY_3", "4": "KEY_4", "5": "KEY_5", "6": "KEY_6", "7": "KEY_7", "8": "KEY_8", "9": "KEY_9",
    "Space": "KEY_SPACE", "Enter": "KEY_ENTER", "Tab": "KEY_TAB", "Escape": "KEY_ESCAPE", "Backspace": "KEY_BACKSPACE", "Delete": "KEY_DELETE",
    "Up": "KEY_UP", "Down": "KEY_DOWN", "Left": "KEY_LEFT", "Right": "KEY_RIGHT", "Home": "KEY_HOME", "End": "KEY_END", "Page Up": "KEY_PAGEUP", "Page Down": "KEY_PAGEDOWN",
    "Shift": "KEY_SHIFT", "Control": "KEY_CTRL", "Alt": "KEY_ALT", "Meta": "KEY_META",
    "F1": "KEY_F1", "F2": "KEY_F2", "F3": "KEY_F3", "F4": "KEY_F4", "F5": "KEY_F5", "F6": "KEY_F6", "F7": "KEY_F7", "F8": "KEY_F8", "F9": "KEY_F9", "F10": "KEY_F10", "F11": "KEY_F11", "F12": "KEY_F12",
    "Plus": "KEY_PLUS", "Minus": "KEY_MINUS", "Equal": "KEY_EQUAL", "Slash": "KEY_SLASH", "Backslash": "KEY_BACKSLASH", "Comma": "KEY_COMMA", "Period": "KEY_PERIOD",
    "Semicolon": "KEY_SEMICOLON", "Apostrophe": "KEY_APOSTROPHE", "Bracket Left": "KEY_BRACKETLEFT", "Bracket Right": "KEY_BRACKETRIGHT", "Grave": "KEY_GRAVE"
  },

  runToggleKey: "SHIFT",
  runSpeedMultiplier: 2.0,
  jumpKey: "SPACE"
};

/**
 * Get configuration for any node type with intelligent fallback
 */
export function getNodeConfig(nodeType: string): any {
  const config = CHARACTER_CONTROLLER_CONFIG.nodeTypes[nodeType as keyof typeof CHARACTER_CONTROLLER_CONFIG.nodeTypes];
  if (config) return config;

  // Intelligent fallback based on node type suffix
  if (nodeType.includes("3D")) {
    return DEFAULT_3D_CONFIG;
  }
  if (nodeType.includes("2D") || nodeType.includes("Body") || nodeType.includes("Area")) {
    return DEFAULT_NODE_CONFIG;
  }

  return DEFAULT_NODE_CONFIG; // Ultimate fallback
}
