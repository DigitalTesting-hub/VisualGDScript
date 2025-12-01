/**
 * Flowchart Node Schema & Types
 * Defines all 27+ node types with inputs, outputs, and validation
 */

export type NodeCategory = 
  | "flow_control"
  | "variables"
  | "movement"
  | "physics"
  | "collision"
  | "animation"
  | "audio"
  | "input"
  | "ui"
  | "math"
  | "logic"
  | "timing"
  | "communication"
  | "debugging";

export interface NodeInput {
  id: string;
  label: string;
  type: "string" | "number" | "boolean" | "vector3" | "color" | "enum";
  required: boolean;
  default?: string | number | boolean;
  options?: string[]; // For enums
}

export interface NodeOutput {
  id: string;
  label: string;
  type: "execution" | "boolean" | "string" | "number" | "vector3";
  position?: "top" | "bottom"; // "bottom" = can have multiple connections, "top" = single input
}

export interface NodeConstraints {
  maxInputs: number; // 1 for single top input
  maxOutputs: number; // unlimited for bottom outputs (-1 = unlimited)
}

export interface NodeSchema {
  id: string;
  name: string;
  category: NodeCategory;
  description: string;
  icon: string;
  color: string;
  inputs: NodeInput[];
  outputs: NodeOutput[];
  gdscriptTemplate: string; // Hardcoded template with {{variable}} placeholders
  example: string; // Simple one-liner example
  constraints?: {
    maxInputConnections: number; // 1 = only one top input allowed, -1 = unlimited
    maxOutputConnections: number; // -1 = unlimited bottom outputs
  };
}

// ============ FLOW CONTROL NODES ============

export const START_NODE: NodeSchema = {
  id: "start",
  name: "Start",
  category: "flow_control",
  description: "Entry point - runs once when game starts",
  icon: "Play",
  color: "#10B981",
  inputs: [],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `func _ready():
\t{{next_execution}}`,
  example: "_ready(): Entry point called when node enters scene tree",
  constraints: {
    maxInputConnections: 0, // Start node has no inputs
    maxOutputConnections: 1 // Only one output connection
  }
};

export const EVENT_NODE: NodeSchema = {
  id: "event",
  name: "Event",
  category: "flow_control",
  description: "Trigger on specific game event or input",
  icon: "Zap",
  color: "#F59E0B",
  inputs: [
    { id: "event_type", label: "Event Type", type: "enum", required: true, 
      options: [
        "ready", 
        "process", 
        "physics_process", 
        "input", 
        "unhandled_input",
        "input_action_pressed",
        "input_action_released",
        "input_key_pressed",
        "input_key_released",
        "input_mouse_button_pressed",
        "input_mouse_button_released",
        "input_mouse_motion",
        "input_mouse_scroll",
        "input_touch_pressed",
        "input_touch_released",
        "input_touch_motion",
        "input_joypad_button_pressed",
        "input_joypad_button_released",
        "input_joypad_motion",
        "tree_exiting",
        "visibility_changed",
        "modulation_changed"
      ] }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `func _{{event_type}}({{event_param}}):
\t{{next_execution}}`,
  example: "_process(delta): Called every frame",
  constraints: {
    maxInputConnections: 1, // One top input
    maxOutputConnections: -1 // Unlimited bottom outputs
  }
};

export const IF_NODE: NodeSchema = {
  id: "if",
  name: "If Condition",
  category: "flow_control",
  description: "Conditional branching (if/else)",
  icon: "GitBranch",
  color: "#8B5CF6",
  inputs: [
    { id: "condition", label: "Condition", type: "string", required: true, default: "true" }
  ],
  outputs: [
    { id: "true_exec", label: "True", type: "execution", position: "bottom" },
    { id: "false_exec", label: "False", type: "execution", position: "bottom" }
  ],
  gdscriptTemplate: `if {{condition}}:
\t{{true_branch}}
else:
\t{{false_branch}}`,
  example: "if health > 0: Continue else: Die",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const LOOP_FOR_NODE: NodeSchema = {
  id: "loop_for",
  name: "For Loop",
  category: "flow_control",
  description: "Fixed iteration loop",
  icon: "Repeat",
  color: "#6366F1",
  inputs: [
    { id: "count", label: "Count", type: "number", required: true, default: "10" }
  ],
  outputs: [
    { id: "loop_exec", label: "Loop Body", type: "execution", position: "bottom" },
    { id: "complete", label: "Complete", type: "execution", position: "bottom" }
  ],
  gdscriptTemplate: `for i in range({{count}}):
\t{{loop_body}}
{{after_loop}}`,
  example: "for i in range(10): Spawn enemy",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const LOOP_WHILE_NODE: NodeSchema = {
  id: "loop_while",
  name: "While Loop",
  category: "flow_control",
  description: "Conditional loop",
  icon: "RotateCw",
  color: "#6366F1",
  inputs: [
    { id: "condition", label: "Condition", type: "string", required: true, default: "true" }
  ],
  outputs: [
    { id: "loop_exec", label: "Loop Body", type: "execution", position: "bottom" },
    { id: "complete", label: "Complete", type: "execution", position: "bottom" }
  ],
  gdscriptTemplate: `while {{condition}}:
\t{{loop_body}}
{{after_loop}}`,
  example: "while count > 0: Decrease count",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ VARIABLE NODES ============

export const VARIABLE_GET_NODE: NodeSchema = {
  id: "var_get",
  name: "Get Variable",
  category: "variables",
  description: "Read a variable value",
  icon: "Eye",
  color: "#06B6D4",
  inputs: [
    { id: "var_name", label: "Variable Name", type: "string", required: true, default: "health" }
  ],
  outputs: [
    { id: "value", label: "Value", type: "string", position: "bottom" },
    { id: "exec", label: "Execute", type: "execution", position: "bottom" }
  ],
  gdscriptTemplate: `var {{output}} = {{var_name}}`,
  example: "var current_health = health",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const VARIABLE_SET_NODE: NodeSchema = {
  id: "var_set",
  name: "Set Variable",
  category: "variables",
  description: "Assign a value to variable",
  icon: "Edit",
  color: "#06B6D4",
  inputs: [
    { id: "var_name", label: "Variable Name", type: "string", required: true, default: "health" },
    { id: "value", label: "Value", type: "string", required: true, default: "100" }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `{{var_name}} = {{value}}`,
  example: "health = 100",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ MOVEMENT NODES ============

export const MOVE_VELOCITY_NODE: NodeSchema = {
  id: "move_velocity",
  name: "Apply Velocity",
  category: "movement",
  description: "Set character velocity for movement",
  icon: "ArrowRight",
  color: "#EC4899",
  inputs: [
    { id: "velocity_x", label: "X", type: "number", required: true, default: "0" },
    { id: "velocity_y", label: "Y", type: "number", required: true, default: "0" },
    { id: "velocity_z", label: "Z", type: "number", required: true, default: "0" }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `velocity = Vector3({{velocity_x}}, {{velocity_y}}, {{velocity_z}})`,
  example: "velocity = Vector3(10, 0, 5)",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const MOVE_AND_SLIDE_NODE: NodeSchema = {
  id: "move_and_slide",
  name: "Move and Slide",
  category: "movement",
  description: "Apply velocity with collision handling (CharacterBody3D)",
  icon: "Move",
  color: "#EC4899",
  inputs: [],
  outputs: [
    { id: "collision_occurred", label: "Collision", type: "boolean", position: "bottom" },
    { id: "no_collision", label: "No Collision", type: "boolean", position: "bottom" },
    { id: "exec", label: "Execute", type: "execution", position: "bottom" }
  ],
  gdscriptTemplate: `var {{collision_var}} = move_and_slide()`,
  example: "move_and_slide() returns true if collision",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const IS_ON_FLOOR_NODE: NodeSchema = {
  id: "is_on_floor",
  name: "Is On Floor",
  category: "movement",
  description: "Check if character touches floor",
  icon: "ArrowDown",
  color: "#EC4899",
  inputs: [],
  outputs: [
    { id: "true", label: "On Floor", type: "boolean", position: "bottom" },
    { id: "false", label: "In Air", type: "boolean", position: "bottom" }
  ],
  gdscriptTemplate: `if is_on_floor():
\t{{true_branch}}
else:
\t{{false_branch}}`,
  example: "is_on_floor() → true if grounded",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ PHYSICS NODES ============

export const APPLY_GRAVITY_NODE: NodeSchema = {
  id: "apply_gravity",
  name: "Apply Gravity",
  category: "physics",
  description: "Apply downward gravity force",
  icon: "ChevronDown",
  color: "#14B8A6",
  inputs: [
    { id: "gravity", label: "Gravity", type: "number", required: true, default: "9.8" }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `if not is_on_floor():
\tvelocity.y -= {{gravity}} * delta`,
  example: "velocity.y -= 9.8 * delta",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const APPLY_FORCE_NODE: NodeSchema = {
  id: "apply_force",
  name: "Apply Force",
  category: "physics",
  description: "Apply force to RigidBody3D",
  icon: "Zap",
  color: "#14B8A6",
  inputs: [
    { id: "force_x", label: "Force X", type: "number", required: true, default: "0" },
    { id: "force_y", label: "Force Y", type: "number", required: true, default: "0" },
    { id: "force_z", label: "Force Z", type: "number", required: true, default: "0" }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `apply_force(Vector3({{force_x}}, {{force_y}}, {{force_z}}))`,
  example: "apply_force(Vector3(100, 0, 0))",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ COLLISION NODES ============

export const COLLISION_DETECT_NODE: NodeSchema = {
  id: "collision_detect",
  name: "On Collision",
  category: "collision",
  description: "Detect collision with bodies/areas",
  icon: "AlertTriangle",
  color: "#F97316",
  inputs: [
    { id: "collision_type", label: "Type", type: "enum", required: true,
      options: ["body_entered", "body_exited", "area_entered", "area_exited"] }
  ],
  outputs: [
    { id: "collider", label: "Collider", type: "string", position: "bottom" },
    { id: "exec", label: "Execute", type: "execution", position: "bottom" }
  ],
  gdscriptTemplate: `func _on_{{collision_type}}(body):
\t{{collision_body}} = body
\t{{next_execution}}`,
  example: "func _on_body_entered(body): collided_object = body",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ ANIMATION NODES ============

export const PLAY_ANIMATION_NODE: NodeSchema = {
  id: "play_animation",
  name: "Play Animation",
  category: "animation",
  description: "Play AnimationPlayer animation",
  icon: "Play",
  color: "#A855F7",
  inputs: [
    { id: "anim_name", label: "Animation", type: "string", required: true, default: "idle" },
    { id: "speed", label: "Speed", type: "number", required: false, default: "1.0" }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `animation_player.play("{{anim_name}}", -1, {{speed}})`,
  example: "animation_player.play('run', -1, 1.5)",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const STOP_ANIMATION_NODE: NodeSchema = {
  id: "stop_animation",
  name: "Stop Animation",
  category: "animation",
  description: "Stop current animation",
  icon: "Square",
  color: "#A855F7",
  inputs: [],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `animation_player.stop()`,
  example: "animation_player.stop()",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ AUDIO NODES ============

export const PLAY_AUDIO_NODE: NodeSchema = {
  id: "play_audio",
  name: "Play Sound",
  category: "audio",
  description: "Play AudioStreamPlayer sound",
  icon: "Volume2",
  color: "#EC4899",
  inputs: [
    { id: "audio_path", label: "Sound Path", type: "string", required: true, default: "res://sounds/effect.ogg" }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `audio_player.stream = preload("{{audio_path}}")
audio_player.play()`,
  example: "audio_player.stream = preload('res://sounds/hit.ogg')",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ INPUT NODES ============

export const INPUT_ACTION_NODE: NodeSchema = {
  id: "input_action",
  name: "Input Action",
  category: "input",
  description: "Check if input action pressed",
  icon: "Keyboard",
  color: "#3B82F6",
  inputs: [
    { id: "action_name", label: "Action", type: "string", required: true, default: "ui_accept" },
    { id: "action_type", label: "Type", type: "enum", required: true,
      options: ["pressed", "just_pressed", "just_released"] }
  ],
  outputs: [
    { id: "true", label: "Yes", type: "boolean", position: "bottom" },
    { id: "false", label: "No", type: "boolean", position: "bottom" }
  ],
  gdscriptTemplate: `if Input.is_action_{{action_type}}("{{action_name}}"):
\t{{true_branch}}
else:
\t{{false_branch}}`,
  example: "if Input.is_action_pressed('ui_right'): Move right",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ MATH NODES ============

export const MATH_OPERATION_NODE: NodeSchema = {
  id: "math_op",
  name: "Math Operation",
  category: "math",
  description: "Basic arithmetic (+, -, *, /)",
  icon: "Zap",
  color: "#8B5CF6",
  inputs: [
    { id: "value_a", label: "A", type: "number", required: true, default: "10" },
    { id: "operation", label: "Operation", type: "enum", required: true,
      options: ["+", "-", "*", "/"] },
    { id: "value_b", label: "B", type: "number", required: true, default: "5" }
  ],
  outputs: [{ id: "result", label: "Result", type: "number", position: "bottom" }],
  gdscriptTemplate: `{{result}} = {{value_a}} {{operation}} {{value_b}}`,
  example: "result = 10 + 5",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ LOGIC NODES ============

export const LOGIC_AND_NODE: NodeSchema = {
  id: "logic_and",
  name: "AND Logic",
  category: "logic",
  description: "Logical AND gate",
  icon: "GitBranch",
  color: "#06B6D4",
  inputs: [
    { id: "a", label: "A", type: "boolean", required: true },
    { id: "b", label: "B", type: "boolean", required: true }
  ],
  outputs: [{ id: "result", label: "Result", type: "boolean", position: "bottom" }],
  gdscriptTemplate: `{{result}} = {{a}} and {{b}}`,
  example: "result = true and false",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const LOGIC_OR_NODE: NodeSchema = {
  id: "logic_or",
  name: "OR Logic",
  category: "logic",
  description: "Logical OR gate",
  icon: "GitBranch",
  color: "#06B6D4",
  inputs: [
    { id: "a", label: "A", type: "boolean", required: true },
    { id: "b", label: "B", type: "boolean", required: true }
  ],
  outputs: [{ id: "result", label: "Result", type: "boolean", position: "bottom" }],
  gdscriptTemplate: `{{result}} = {{a}} or {{b}}`,
  example: "result = true or false",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ TIMING NODES ============

export const TIMER_START_NODE: NodeSchema = {
  id: "timer_start",
  name: "Start Timer",
  category: "timing",
  description: "Start a timer with duration",
  icon: "Clock",
  color: "#F59E0B",
  inputs: [
    { id: "duration", label: "Duration (s)", type: "number", required: true, default: "1.0" }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `await get_tree().create_timer({{duration}}).timeout
{{after_timer}}`,
  example: "await get_tree().create_timer(2.0).timeout",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

// ============ COMMUNICATION NODES ============

export const PRINT_NODE: NodeSchema = {
  id: "print",
  name: "Print (Debug)",
  category: "debugging",
  description: "Print debug message to console",
  icon: "MessageSquare",
  color: "#10B981",
  inputs: [
    { id: "message", label: "Message", type: "string", required: true, default: "Debug message" }
  ],
  outputs: [{ id: "exec", label: "Execute", type: "execution", position: "bottom" }],
  gdscriptTemplate: `print("{{message}}")`,
  example: "print('Player health: ', health)",
  constraints: {
    maxInputConnections: 1,
    maxOutputConnections: -1
  }
};

export const COMMENT_NODE: NodeSchema = {
  id: "comment",
  name: "Comment",
  category: "debugging",
  description: "Code comment (no execution)",
  icon: "MessageCircle",
  color: "#64748B",
  inputs: [
    { id: "text", label: "Comment", type: "string", required: true, default: "TODO: Add logic here" }
  ],
  outputs: [],
  gdscriptTemplate: `# {{text}}`,
  example: "# Check if enemy is in range"
};

// ============ ALL NODE SCHEMAS ============

export const ALL_NODE_SCHEMAS: Record<string, NodeSchema> = {
  start: START_NODE,
  event: EVENT_NODE,
  if: IF_NODE,
  loop_for: LOOP_FOR_NODE,
  loop_while: LOOP_WHILE_NODE,
  var_get: VARIABLE_GET_NODE,
  var_set: VARIABLE_SET_NODE,
  move_velocity: MOVE_VELOCITY_NODE,
  move_and_slide: MOVE_AND_SLIDE_NODE,
  is_on_floor: IS_ON_FLOOR_NODE,
  apply_gravity: APPLY_GRAVITY_NODE,
  apply_force: APPLY_FORCE_NODE,
  collision_detect: COLLISION_DETECT_NODE,
  play_animation: PLAY_ANIMATION_NODE,
  stop_animation: STOP_ANIMATION_NODE,
  play_audio: PLAY_AUDIO_NODE,
  input_action: INPUT_ACTION_NODE,
  math_op: MATH_OPERATION_NODE,
  logic_and: LOGIC_AND_NODE,
  logic_or: LOGIC_OR_NODE,
  timer_start: TIMER_START_NODE,
  print: PRINT_NODE,
  comment: COMMENT_NODE,
};

export function getNodeSchema(nodeId: string): NodeSchema | null {
  return ALL_NODE_SCHEMAS[nodeId] || null;
}

export function getNodesByCategory(category: NodeCategory): NodeSchema[] {
  return Object.values(ALL_NODE_SCHEMAS).filter(node => node.category === category);
}

export function getAllNodeSchemas(): NodeSchema[] {
  return Object.values(ALL_NODE_SCHEMAS);
}
