/**
 * Complete Advanced Nodes Schema - 38+ Node Types
 * Variables (7), Loops (6), Signals (5), Groups (6), Data (5), Labels (5), Conditions (4+)
 * All categories with full parameter specs and code templates
 */

export const COMPLETE_NODES_SCHEMA = {
  // ================= VARIABLE NODES (7) =================
  "set_variable": {
    category: "variable",
    color: "#2196F3",
    description: "Set variable value",
    parameters: {
      "variable_name": { type: "string", default: "my_variable" },
      "value": { type: "string", default: "0" },
      "value_type": ["int", "float", "bool", "string", "vector2", "vector3"],
      "operation": ["set", "add", "subtract", "multiply", "divide", "increment", "decrement"]
    }
  },
  "get_variable": {
    category: "variable",
    color: "#03A9F4",
    description: "Get variable value",
    parameters: {
      "variable_name": { type: "string", default: "my_variable" },
      "default_value": { type: "string", default: "0" }
    }
  },
  "random_variable": {
    category: "variable",
    color: "#00BCD4",
    description: "Set random value",
    parameters: {
      "variable_name": { type: "string", default: "random_value" },
      "min_value": { type: "float", default: "0" },
      "max_value": { type: "float", default: "1" },
      "integer_only": { type: "bool", default: false }
    }
  },
  "lerp_variable": {
    category: "variable",
    color: "#009688",
    description: "Linear interpolation",
    parameters: {
      "variable_name": { type: "string", default: "lerped_value" },
      "start_value": { type: "float", default: "0" },
      "end_value": { type: "float", default: "1" },
      "weight": { type: "float", default: "0.5" }
    }
  },
  "clamp_variable": {
    category: "variable",
    color: "#4CAF50",
    description: "Clamp variable between min/max",
    parameters: {
      "variable_name": { type: "string", default: "clamped_value" },
      "min_value": { type: "float", default: "0" },
      "max_value": { type: "float", default: "100" }
    }
  },
  "array_variable": {
    category: "variable",
    color: "#8BC34A",
    description: "Array operations",
    parameters: {
      "array_name": { type: "string", default: "my_array" },
      "operation": ["push", "pop", "append", "remove", "clear", "get", "set"],
      "value": { type: "string", default: "" },
      "index": { type: "int", default: "0" }
    }
  },
  "dictionary_variable": {
    category: "variable",
    color: "#CDDC39",
    description: "Dictionary operations",
    parameters: {
      "dict_name": { type: "string", default: "my_dict" },
      "operation": ["set", "get", "has", "erase", "clear"],
      "key": { type: "string", default: "key" },
      "value": { type: "string", default: "value" }
    }
  },

  // ================= LOOP NODES (6) =================
  "for_loop": {
    category: "loop",
    color: "#FF9800",
    description: "For loop with counter",
    parameters: {
      "start": { type: "int", default: "0" },
      "end": { type: "int", default: "10" },
      "step": { type: "int", default: "1" },
      "variable_name": { type: "string", default: "i" }
    }
  },
  "while_loop": {
    category: "loop",
    color: "#FF5722",
    description: "While loop with condition",
    parameters: {
      "condition": { type: "string", default: "true" },
      "max_iterations": { type: "int", default: "100" }
    }
  },
  "for_each_loop": {
    category: "loop",
    color: "#F44336",
    description: "For each item in array",
    parameters: {
      "array_name": { type: "string", default: "my_array" },
      "item_variable": { type: "string", default: "item" },
      "index_variable": { type: "string", default: "index" },
      "include_index": { type: "bool", default: false }
    }
  },
  "repeat_loop": {
    category: "loop",
    color: "#E91E63",
    description: "Repeat N times",
    parameters: {
      "times": { type: "int", default: "5" },
      "counter_variable": { type: "string", default: "count" }
    }
  },
  "loop_control": {
    category: "loop",
    color: "#9C27B0",
    description: "Loop control statements",
    parameters: {
      "control_type": ["break", "continue", "return"],
      "condition": { type: "string", default: "" }
    }
  },
  "interval_loop": {
    category: "loop",
    color: "#673AB7",
    description: "Loop with time interval",
    parameters: {
      "interval": { type: "float", default: "1.0" },
      "times": { type: "int", default: "5" },
      "unlimited": { type: "bool", default: false }
    }
  },

  // ================= SIGNAL NODES (5) =================
  "custom_signal": {
    category: "signal",
    color: "#3F51B5",
    description: "Define custom signal",
    parameters: {
      "signal_name": { type: "string", default: "my_signal" },
      "parameters": { type: "array", default: [] }
    }
  },
  "signal_with_args": {
    category: "signal",
    color: "#2196F3",
    description: "Emit signal with arguments",
    parameters: {
      "signal_name": { type: "string", default: "signal_name" },
      "arg1": { type: "string", default: "" },
      "arg2": { type: "string", default: "" },
      "arg3": { type: "string", default: "" }
    }
  },
  "signal_bus": {
    category: "signal",
    color: "#00BCD4",
    description: "Global signal bus",
    parameters: {
      "bus_name": { type: "string", default: "GlobalSignalBus" },
      "action": ["emit", "connect", "disconnect"],
      "signal_name": { type: "string", default: "" }
    }
  },
  "signal_debounce": {
    category: "signal",
    color: "#009688",
    description: "Debounce signal emissions",
    parameters: {
      "signal_name": { type: "string", default: "debounced_signal" },
      "delay": { type: "float", default: "0.5" }
    }
  },
  "signal_throttle": {
    category: "signal",
    color: "#4CAF50",
    description: "Throttle signal emissions",
    parameters: {
      "signal_name": { type: "string", default: "throttled_signal" },
      "cooldown": { type: "float", default: "0.1" }
    }
  },

  // ================= GROUP NODES (6) =================
  "add_to_group": {
    category: "group",
    color: "#FFC107",
    description: "Add node to group",
    parameters: {
      "group_name": { type: "string", default: "enemies" },
      "persistent": { type: "bool", default: false }
    }
  },
  "remove_from_group": {
    category: "group",
    color: "#FF9800",
    description: "Remove node from group",
    parameters: {
      "group_name": { type: "string", default: "enemies" }
    }
  },
  "get_group_nodes": {
    category: "group",
    color: "#FF5722",
    description: "Get all nodes in group",
    parameters: {
      "group_name": { type: "string", default: "enemies" }
    }
  },
  "is_in_group": {
    category: "group",
    color: "#F44336",
    description: "Check if node is in group",
    parameters: {
      "group_name": { type: "string", default: "enemies" }
    }
  },
  "group_foreach": {
    category: "group",
    color: "#E91E63",
    description: "Loop through group nodes",
    parameters: {
      "group_name": { type: "string", default: "enemies" },
      "node_variable": { type: "string", default: "enemy" }
    }
  },
  "call_group": {
    category: "group",
    color: "#9C27B0",
    description: "Call method on all group nodes",
    parameters: {
      "group_name": { type: "string", default: "enemies" },
      "method_name": { type: "string", default: "take_damage" },
      "args": { type: "array", default: [] }
    }
  },

  // ================= DATA NODES (5) =================
  "save_data": {
    category: "data",
    color: "#795548",
    description: "Save data to file",
    parameters: {
      "file_path": { type: "string", default: "user://save_data.json" },
      "data_variable": { type: "string", default: "game_data" },
      "encrypt": { type: "bool", default: false }
    }
  },
  "load_data": {
    category: "data",
    color: "#607D8B",
    description: "Load data from file",
    parameters: {
      "file_path": { type: "string", default: "user://save_data.json" },
      "default_value": { type: "string", default: "{}" }
    }
  },
  "save_config": {
    category: "data",
    color: "#9E9E9E",
    description: "Save to config file",
    parameters: {
      "section": { type: "string", default: "game_settings" },
      "key": { type: "string", default: "volume" },
      "value": { type: "string", default: "0.8" }
    }
  },
  "load_config": {
    category: "data",
    color: "#757575",
    description: "Load from config file",
    parameters: {
      "section": { type: "string", default: "game_settings" },
      "key": { type: "string", default: "volume" },
      "default_value": { type: "string", default: "0.8" }
    }
  },
  "player_prefs": {
    category: "data",
    color: "#616161",
    description: "Player preferences",
    parameters: {
      "pref_name": { type: "string", default: "high_score" },
      "action": ["get", "set", "has", "erase"],
      "value": { type: "string", default: "0" }
    }
  },

  // ================= LABEL NODES (5) =================
  "set_label_text": {
    category: "label",
    color: "#2196F3",
    description: "Set label text",
    parameters: {
      "label_path": { type: "string", default: "$Label" },
      "text": { type: "string", default: "Hello World!" },
      "format_variables": { type: "bool", default: false }
    }
  },
  "update_label": {
    category: "label",
    color: "#03A9F4",
    description: "Update label with variable",
    parameters: {
      "label_path": { type: "string", default: "$Label" },
      "template": { type: "string", default: "Score: {score}" },
      "update_rate": { type: "float", default: "0.1" }
    }
  },
  "label_animation": {
    category: "label",
    color: "#00BCD4",
    description: "Animate label text",
    parameters: {
      "label_path": { type: "string", default: "$Label" },
      "animation_type": ["typewriter", "fade", "scale", "color_change"],
      "speed": { type: "float", default: "0.05" },
      "final_text": { type: "string", default: "" }
    }
  },
  "rich_text_label": {
    category: "label",
    color: "#009688",
    description: "Rich text label",
    parameters: {
      "label_path": { type: "string", default: "$RichTextLabel" },
      "bbcode": { type: "bool", default: true },
      "text": { type: "string", default: "[color=red]Warning![/color]" }
    }
  },
  "label_visibility": {
    category: "label",
    color: "#4CAF50",
    description: "Control label visibility",
    parameters: {
      "label_path": { type: "string", default: "$Label" },
      "action": ["show", "hide", "toggle"],
      "fade": { type: "bool", default: false },
      "duration": { type: "float", default: "0.5" }
    }
  },

  // ================= CONDITION NODES (4) =================
  "switch_case": {
    category: "condition",
    color: "#FF9800",
    description: "Switch case statement",
    parameters: {
      "variable": { type: "string", default: "state" },
      "cases": { type: "array", default: ["idle", "walk", "run"] },
      "default_action": { type: "string", default: "pass" }
    }
  },
  "ternary_operator": {
    category: "condition",
    color: "#FF5722",
    description: "Ternary operator (if/else in one line)",
    parameters: {
      "condition": { type: "string", default: "health > 0" },
      "true_value": { type: "string", default: "\"Alive\"" },
      "false_value": { type: "string", default: "\"Dead\"" }
    }
  },
  "null_check": {
    category: "condition",
    color: "#F44336",
    description: "Null/none check",
    parameters: {
      "variable": { type: "string", default: "target" },
      "check_type": ["is_null", "is_not_null", "is_instance_valid"]
    }
  },
  "type_check": {
    category: "condition",
    color: "#E91E63",
    description: "Type checking",
    parameters: {
      "variable": { type: "string", default: "node" },
      "type": { type: "string", default: "RigidBody3D" },
      "check_method": ["is", "get_class"]
    }
  }
};

export function getCompleteNodeConfig(type: string): any {
  return (COMPLETE_NODES_SCHEMA as any)[type] || null;
}

export function getAllNodeTypes(): string[] {
  return Object.keys(COMPLETE_NODES_SCHEMA);
}

export function getNodesByCategory(category: string): string[] {
  return Object.entries(COMPLETE_NODES_SCHEMA)
    .filter(([_, config]: [string, any]) => config.category === category)
    .map(([type, _]) => type);
}
