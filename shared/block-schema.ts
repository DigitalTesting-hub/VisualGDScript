/**
 * Complete Block Editor Schema - 67+ Blocks
 * All flowchart nodes + advanced nodes organized by category
 */

export type BlockCategory =
  | "events"
  | "movement"
  | "animation"
  | "control"
  | "variables"
  | "loops"
  | "signals"
  | "groups"
  | "data"
  | "labels"
  | "conditions"
  | "rotation"
  | "scale"
  | "physics"
  | "advanced";

export interface BlockField {
  id: string;
  label: string;
  type: "text" | "number" | "dropdown" | "variable" | "boolean";
  default?: string | number | boolean;
  options?: Array<{ label: string; value: string }>;
}

export interface BlockDefinition {
  id: string;
  label: string;
  category: BlockCategory;
  color: string;
  fields: BlockField[];
  description: string;
}

// Define all 67+ blocks organized by category
export const BLOCK_DEFINITIONS: Record<string, BlockDefinition> = {
  // ===== INPUT EVENTS (4) =====
  "event_keyboard": {
    id: "event_keyboard",
    label: "Keyboard Input",
    category: "events",
    color: "#FF6B6B",
    description: "Trigger on keyboard input",
    fields: [
      {
        id: "key",
        label: "Key",
        type: "dropdown",
        default: "W",
        options: [
          // Movement
          { label: "W", value: "W" },
          { label: "A", value: "A" },
          { label: "S", value: "S" },
          { label: "D", value: "D" },
          // Common
          { label: "Space", value: "SPACE" },
          { label: "Shift", value: "SHIFT" },
          { label: "Ctrl", value: "CTRL" },
          { label: "Alt", value: "ALT" },
          { label: "Enter", value: "ENTER" },
          { label: "Escape", value: "ESCAPE" },
          // Arrow Keys
          { label: "Up", value: "UP" },
          { label: "Down", value: "DOWN" },
          { label: "Left", value: "LEFT" },
          { label: "Right", value: "RIGHT" },
          // Function Keys
          { label: "F1", value: "F1" },
          { label: "F2", value: "F2" },
          { label: "F3", value: "F3" },
          { label: "F4", value: "F4" },
          { label: "Tab", value: "TAB" },
          { label: "Backspace", value: "BACKSPACE" },
          { label: "Delete", value: "DELETE" },
          { label: "Home", value: "HOME" },
          { label: "End", value: "END" },
          // Letters
          { label: "Q", value: "Q" },
          { label: "E", value: "E" },
          { label: "R", value: "R" },
          { label: "T", value: "T" },
          { label: "Y", value: "Y" },
          { label: "U", value: "U" },
          { label: "I", value: "I" },
          { label: "O", value: "O" },
          { label: "P", value: "P" },
          { label: "X", value: "X" },
          { label: "Z", value: "Z" },
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ],
      },
      {
        id: "key_event",
        label: "Event Type",
        type: "dropdown",
        default: "pressed",
        options: [
          { label: "Pressed", value: "pressed" },
          { label: "Released", value: "released" },
          { label: "Held", value: "held" },
        ],
      },
    ],
  },

  "event_mouse": {
    id: "event_mouse",
    label: "Mouse Input",
    category: "events",
    color: "#FF9999",
    description: "Trigger on mouse input",
    fields: [
      {
        id: "mouse_event",
        label: "Mouse Event",
        type: "dropdown",
        default: "left_click",
        options: [
          { label: "Left Click", value: "left_click" },
          { label: "Right Click", value: "right_click" },
          { label: "Middle Click", value: "middle_click" },
          { label: "Left Released", value: "left_released" },
          { label: "Right Released", value: "right_released" },
          { label: "Move", value: "move" },
          { label: "Scroll Up", value: "scroll_up" },
          { label: "Scroll Down", value: "scroll_down" },
          { label: "Enter Area", value: "enter_area" },
          { label: "Exit Area", value: "exit_area" },
        ],
      },
      { id: "target", label: "Target (path)", type: "text", default: "." },
    ],
  },

  "event_touch": {
    id: "event_touch",
    label: "Touch Input",
    category: "events",
    color: "#FFCC99",
    description: "Trigger on touch input",
    fields: [
      {
        id: "touch_event",
        label: "Touch Event",
        type: "dropdown",
        default: "tap",
        options: [
          { label: "Tap", value: "tap" },
          { label: "Double Tap", value: "double_tap" },
          { label: "Long Press", value: "long_press" },
          { label: "Drag", value: "drag" },
          { label: "Swipe Left", value: "swipe_left" },
          { label: "Swipe Right", value: "swipe_right" },
          { label: "Swipe Up", value: "swipe_up" },
          { label: "Swipe Down", value: "swipe_down" },
          { label: "Pinch", value: "pinch" },
          { label: "Two Finger", value: "two_finger" },
        ],
      },
      { id: "target", label: "Target (path)", type: "text", default: "." },
    ],
  },

  "event_action": {
    id: "event_action",
    label: "Input Action",
    category: "events",
    color: "#FFDDAA",
    description: "Trigger on named input action",
    fields: [
      {
        id: "action_name",
        label: "Action",
        type: "dropdown",
        default: "ui_accept",
        options: [
          { label: "ui_accept", value: "ui_accept" },
          { label: "ui_select", value: "ui_select" },
          { label: "ui_cancel", value: "ui_cancel" },
          { label: "ui_focus_next", value: "ui_focus_next" },
          { label: "ui_focus_prev", value: "ui_focus_prev" },
          { label: "ui_left", value: "ui_left" },
          { label: "ui_right", value: "ui_right" },
          { label: "ui_up", value: "ui_up" },
          { label: "ui_down", value: "ui_down" },
          { label: "ui_page_up", value: "ui_page_up" },
          { label: "ui_page_down", value: "ui_page_down" },
          { label: "ui_home", value: "ui_home" },
          { label: "ui_end", value: "ui_end" },
          { label: "ui_cut", value: "ui_cut" },
          { label: "ui_copy", value: "ui_copy" },
          { label: "ui_paste", value: "ui_paste" },
          { label: "ui_undo", value: "ui_undo" },
          { label: "ui_redo", value: "ui_redo" },
          { label: "ui_text_submit", value: "ui_text_submit" },
          { label: "ui_text_completion_query", value: "ui_text_completion_query" },
        ],
      },
      {
        id: "action_event",
        label: "Event Type",
        type: "dropdown",
        default: "pressed",
        options: [
          { label: "Pressed", value: "pressed" },
          { label: "Released", value: "released" },
          { label: "Just Pressed", value: "just_pressed" },
          { label: "Just Released", value: "just_released" },
        ],
      },
    ],
  },

  "movement_set": {
    id: "movement_set",
    label: "Set Movement",
    category: "movement",
    color: "#4ECDC4",
    description: "Set movement direction and speed",
    fields: [
      {
        id: "direction",
        label: "Direction",
        type: "dropdown",
        default: "X",
        options: [
          { label: "X (Right)", value: "X" },
          { label: "-X (Left)", value: "-X" },
          { label: "Y (Up)", value: "Y" },
          { label: "-Y (Down)", value: "-Y" },
          { label: "Z (Forward)", value: "Z" },
          { label: "-Z (Back)", value: "-Z" },
        ],
      },
      { id: "speed", label: "Speed", type: "number", default: 5 },
    ],
  },

  "animation_play": {
    id: "animation_play",
    label: "Play Animation",
    category: "animation",
    color: "#95E1D3",
    description: "Play animation with speed",
    fields: [
      { id: "name", label: "Animation", type: "text", default: "walk" },
      { id: "speed", label: "Speed", type: "number", default: 1.0 },
      { id: "backward", label: "Backward", type: "boolean", default: false },
    ],
  },

  "rotation_set": {
    id: "rotation_set",
    label: "Set Rotation",
    category: "rotation",
    color: "#FFD93D",
    description: "Set rotation on axis",
    fields: [
      {
        id: "axis",
        label: "Axis",
        type: "dropdown",
        default: "Y",
        options: [
          { label: "X", value: "X" },
          { label: "Y", value: "Y" },
          { label: "Z", value: "Z" },
        ],
      },
      { id: "degrees", label: "Degrees", type: "number", default: 45 },
    ],
  },

  // ===== CONTROL FLOW (4) =====
  "control_if": {
    id: "control_if",
    label: "If - Check Condition",
    category: "control",
    color: "#FFA500",
    description: "Execute if condition is true",
    fields: [
      { id: "condition", label: "Condition", type: "text", default: "true" },
    ],
  },

  "control_if_else": {
    id: "control_if_else",
    label: "If Else - Branch",
    category: "control",
    color: "#FF8C00",
    description: "Execute one of two branches",
    fields: [
      { id: "condition", label: "Condition", type: "text", default: "true" },
    ],
  },

  "switch_case": {
    id: "switch_case",
    label: "Switch Case",
    category: "control",
    color: "#FF6347",
    description: "Switch statement",
    fields: [
      { id: "variable", label: "Variable", type: "text", default: "state" },
      { id: "cases", label: "Cases", type: "text", default: "case1,case2,case3" },
    ],
  },

  "ternary_op": {
    id: "ternary_op",
    label: "Ternary Operator",
    category: "control",
    color: "#FF4500",
    description: "Inline if/else",
    fields: [
      { id: "condition", label: "Condition", type: "text", default: "x > 0" },
      { id: "true_val", label: "True Value", type: "text", default: "1" },
      { id: "false_val", label: "False Value", type: "text", default: "0" },
    ],
  },

  // ===== VARIABLES (7) =====
  "var_set": {
    id: "var_set",
    label: "Set Variable",
    category: "variables",
    color: "#2196F3",
    description: "Set variable value",
    fields: [
      { id: "var_name", label: "Variable", type: "text", default: "my_var" },
      { id: "value", label: "Value", type: "text", default: "0" },
      {
        id: "operation",
        label: "Operation",
        type: "dropdown",
        default: "set",
        options: [
          { label: "Set", value: "set" },
          { label: "Add", value: "add" },
          { label: "Subtract", value: "subtract" },
          { label: "Multiply", value: "multiply" },
          { label: "Divide", value: "divide" },
        ],
      },
    ],
  },

  "var_get": {
    id: "var_get",
    label: "Get Variable",
    category: "variables",
    color: "#03A9F4",
    description: "Get variable value",
    fields: [{ id: "var_name", label: "Variable", type: "text", default: "my_var" }],
  },

  "var_random": {
    id: "var_random",
    label: "Random Value",
    category: "variables",
    color: "#00BCD4",
    description: "Generate random number",
    fields: [
      { id: "var_name", label: "Variable", type: "text", default: "rand_val" },
      { id: "min", label: "Min", type: "number", default: 0 },
      { id: "max", label: "Max", type: "number", default: 100 },
    ],
  },

  "var_lerp": {
    id: "var_lerp",
    label: "Linear Interpolate",
    category: "variables",
    color: "#009688",
    description: "Lerp between values",
    fields: [
      { id: "var_name", label: "Variable", type: "text", default: "lerp_val" },
      { id: "start", label: "Start", type: "number", default: 0 },
      { id: "end", label: "End", type: "number", default: 1 },
      { id: "weight", label: "Weight", type: "number", default: 0.5 },
    ],
  },

  "var_clamp": {
    id: "var_clamp",
    label: "Clamp Variable",
    category: "variables",
    color: "#4CAF50",
    description: "Clamp between min/max",
    fields: [
      { id: "var_name", label: "Variable", type: "text", default: "clamped" },
      { id: "min", label: "Min", type: "number", default: 0 },
      { id: "max", label: "Max", type: "number", default: 100 },
    ],
  },

  "var_array": {
    id: "var_array",
    label: "Array Operation",
    category: "variables",
    color: "#8BC34A",
    description: "Array push/pop/append",
    fields: [
      { id: "array_name", label: "Array", type: "text", default: "arr" },
      {
        id: "operation",
        label: "Operation",
        type: "dropdown",
        default: "push",
        options: [
          { label: "Push", value: "push" },
          { label: "Pop", value: "pop" },
          { label: "Append", value: "append" },
          { label: "Remove", value: "remove" },
        ],
      },
      { id: "value", label: "Value", type: "text", default: "" },
    ],
  },

  "var_dict": {
    id: "var_dict",
    label: "Dictionary Operation",
    category: "variables",
    color: "#CDDC39",
    description: "Dictionary set/get",
    fields: [
      { id: "dict_name", label: "Dictionary", type: "text", default: "dict" },
      {
        id: "operation",
        label: "Operation",
        type: "dropdown",
        default: "set",
        options: [
          { label: "Set", value: "set" },
          { label: "Get", value: "get" },
          { label: "Has", value: "has" },
          { label: "Erase", value: "erase" },
        ],
      },
      { id: "key", label: "Key", type: "text", default: "key" },
      { id: "value", label: "Value", type: "text", default: "value" },
    ],
  },

  // ===== LOOPS (6) =====
  "loop_for": {
    id: "loop_for",
    label: "For - Range Counter",
    category: "loops",
    color: "#FF9800",
    description: "Loop from start to end",
    fields: [
      { id: "start", label: "Start", type: "number", default: 0 },
      { id: "end", label: "End", type: "number", default: 10 },
      { id: "step", label: "Step", type: "number", default: 1 },
      { id: "var_name", label: "Counter", type: "text", default: "i" },
    ],
  },

  "loop_repeat": {
    id: "loop_repeat",
    label: "Repeat - N Times",
    category: "loops",
    color: "#E91E63",
    description: "Repeat exactly N times",
    fields: [
      { id: "times", label: "Times", type: "number", default: 5 },
      { id: "counter_var", label: "Counter", type: "text", default: "count" },
    ],
  },

  "loop_while": {
    id: "loop_while",
    label: "While - Condition Based",
    category: "loops",
    color: "#FF5722",
    description: "Loop while condition is true",
    fields: [
      { id: "condition", label: "Condition", type: "text", default: "true" },
      { id: "max_iter", label: "Max Iterations", type: "number", default: 100 },
    ],
  },

  "loop_foreach": {
    id: "loop_foreach",
    label: "For Each - Array Iterator",
    category: "loops",
    color: "#F44336",
    description: "Loop through each array item",
    fields: [
      { id: "array_name", label: "Array", type: "text", default: "items" },
      { id: "item_var", label: "Item Variable", type: "text", default: "item" },
      { id: "index_var", label: "Index Variable", type: "text", default: "i" },
    ],
  },

  "loop_control": {
    id: "loop_control",
    label: "Loop Control",
    category: "loops",
    color: "#9C27B0",
    description: "Break/Continue/Return",
    fields: [
      {
        id: "control",
        label: "Control Type",
        type: "dropdown",
        default: "break",
        options: [
          { label: "Break", value: "break" },
          { label: "Continue", value: "continue" },
          { label: "Return", value: "return" },
        ],
      },
    ],
  },

  "loop_interval": {
    id: "loop_interval",
    label: "Interval Loop",
    category: "loops",
    color: "#673AB7",
    description: "Loop with time interval",
    fields: [
      { id: "interval", label: "Interval (sec)", type: "number", default: 1.0 },
      { id: "times", label: "Times", type: "number", default: 5 },
      { id: "unlimited", label: "Unlimited", type: "boolean", default: false },
    ],
  },

  // ===== SIGNALS (5) =====
  "signal_custom": {
    id: "signal_custom",
    label: "Custom Signal",
    category: "signals",
    color: "#3F51B5",
    description: "Define custom signal",
    fields: [
      { id: "signal_name", label: "Signal Name", type: "text", default: "my_signal" },
      { id: "params", label: "Parameters", type: "text", default: "" },
    ],
  },

  "signal_emit": {
    id: "signal_emit",
    label: "Emit Signal",
    category: "signals",
    color: "#2196F3",
    description: "Emit signal with args",
    fields: [
      { id: "signal_name", label: "Signal", type: "text", default: "my_signal" },
      { id: "arg1", label: "Arg 1", type: "text", default: "" },
      { id: "arg2", label: "Arg 2", type: "text", default: "" },
    ],
  },

  "signal_bus": {
    id: "signal_bus",
    label: "Signal Bus",
    category: "signals",
    color: "#00BCD4",
    description: "Global signal bus",
    fields: [
      { id: "bus_name", label: "Bus", type: "text", default: "GlobalSignalBus" },
      {
        id: "action",
        label: "Action",
        type: "dropdown",
        default: "emit",
        options: [
          { label: "Emit", value: "emit" },
          { label: "Connect", value: "connect" },
          { label: "Disconnect", value: "disconnect" },
        ],
      },
      { id: "signal_name", label: "Signal", type: "text", default: "" },
    ],
  },

  "signal_debounce": {
    id: "signal_debounce",
    label: "Debounce Signal",
    category: "signals",
    color: "#009688",
    description: "Debounce signal emissions",
    fields: [
      { id: "signal_name", label: "Signal", type: "text", default: "signal" },
      { id: "delay", label: "Delay (sec)", type: "number", default: 0.5 },
    ],
  },

  "signal_throttle": {
    id: "signal_throttle",
    label: "Throttle Signal",
    category: "signals",
    color: "#4CAF50",
    description: "Throttle signal emissions",
    fields: [
      { id: "signal_name", label: "Signal", type: "text", default: "signal" },
      { id: "cooldown", label: "Cooldown (sec)", type: "number", default: 0.1 },
    ],
  },

  // ===== GROUPS (6) =====
  "group_add": {
    id: "group_add",
    label: "Add to Group",
    category: "groups",
    color: "#FFC107",
    description: "Add node to group",
    fields: [
      { id: "group_name", label: "Group", type: "text", default: "enemies" },
      { id: "persistent", label: "Persistent", type: "boolean", default: false },
    ],
  },

  "group_remove": {
    id: "group_remove",
    label: "Remove from Group",
    category: "groups",
    color: "#FF9800",
    description: "Remove from group",
    fields: [{ id: "group_name", label: "Group", type: "text", default: "enemies" }],
  },

  "group_get": {
    id: "group_get",
    label: "Get Group Nodes",
    category: "groups",
    color: "#FF5722",
    description: "Get all nodes in group",
    fields: [
      { id: "group_name", label: "Group", type: "text", default: "enemies" },
      { id: "var_name", label: "Store in", type: "text", default: "nodes" },
    ],
  },

  "group_check": {
    id: "group_check",
    label: "Is in Group",
    category: "groups",
    color: "#F44336",
    description: "Check if node in group",
    fields: [{ id: "group_name", label: "Group", type: "text", default: "enemies" }],
  },

  "group_foreach": {
    id: "group_foreach",
    label: "Group For Each",
    category: "groups",
    color: "#E91E63",
    description: "Loop through group nodes",
    fields: [
      { id: "group_name", label: "Group", type: "text", default: "enemies" },
      { id: "node_var", label: "Node Variable", type: "text", default: "enemy" },
    ],
  },

  "group_call": {
    id: "group_call",
    label: "Call on Group",
    category: "groups",
    color: "#9C27B0",
    description: "Call method on group nodes",
    fields: [
      { id: "group_name", label: "Group", type: "text", default: "enemies" },
      { id: "method_name", label: "Method", type: "text", default: "take_damage" },
      { id: "args", label: "Arguments", type: "text", default: "" },
    ],
  },

  // ===== DATA (5) =====
  "data_save": {
    id: "data_save",
    label: "Save Data",
    category: "data",
    color: "#795548",
    description: "Save data to file",
    fields: [
      { id: "file_path", label: "File Path", type: "text", default: "user://save.json" },
      { id: "data_var", label: "Data Variable", type: "text", default: "game_data" },
      { id: "encrypt", label: "Encrypt", type: "boolean", default: false },
    ],
  },

  "data_load": {
    id: "data_load",
    label: "Load Data",
    category: "data",
    color: "#607D8B",
    description: "Load data from file",
    fields: [
      { id: "file_path", label: "File Path", type: "text", default: "user://save.json" },
      { id: "var_name", label: "Store in", type: "text", default: "game_data" },
      { id: "default_val", label: "Default", type: "text", default: "{}" },
    ],
  },

  "config_save": {
    id: "config_save",
    label: "Save Config",
    category: "data",
    color: "#9E9E9E",
    description: "Save to config file",
    fields: [
      { id: "section", label: "Section", type: "text", default: "settings" },
      { id: "key", label: "Key", type: "text", default: "volume" },
      { id: "value", label: "Value", type: "text", default: "0.8" },
    ],
  },

  "config_load": {
    id: "config_load",
    label: "Load Config",
    category: "data",
    color: "#757575",
    description: "Load from config file",
    fields: [
      { id: "section", label: "Section", type: "text", default: "settings" },
      { id: "key", label: "Key", type: "text", default: "volume" },
      { id: "default_val", label: "Default", type: "text", default: "0.8" },
    ],
  },

  "prefs": {
    id: "prefs",
    label: "Player Preferences",
    category: "data",
    color: "#616161",
    description: "Save player preferences",
    fields: [
      { id: "pref_name", label: "Preference", type: "text", default: "high_score" },
      {
        id: "action",
        label: "Action",
        type: "dropdown",
        default: "get",
        options: [
          { label: "Get", value: "get" },
          { label: "Set", value: "set" },
          { label: "Has", value: "has" },
          { label: "Erase", value: "erase" },
        ],
      },
      { id: "value", label: "Value", type: "text", default: "" },
    ],
  },

  // ===== LABELS (5) =====
  "label_set": {
    id: "label_set",
    label: "Set Label Text",
    category: "labels",
    color: "#2196F3",
    description: "Set label text",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$Label" },
      { id: "text", label: "Text", type: "text", default: "Hello World!" },
      { id: "format", label: "Format Vars", type: "boolean", default: false },
    ],
  },

  "label_update": {
    id: "label_update",
    label: "Update Label",
    category: "labels",
    color: "#03A9F4",
    description: "Update label with variable",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$Label" },
      { id: "template", label: "Template", type: "text", default: "Score: {score}" },
      { id: "update_rate", label: "Update Rate", type: "number", default: 0.1 },
    ],
  },

  "label_animate": {
    id: "label_animate",
    label: "Animate Label",
    category: "labels",
    color: "#00BCD4",
    description: "Animate label text",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$Label" },
      {
        id: "anim_type",
        label: "Animation",
        type: "dropdown",
        default: "typewriter",
        options: [
          { label: "Typewriter", value: "typewriter" },
          { label: "Fade", value: "fade" },
          { label: "Scale", value: "scale" },
          { label: "Color Change", value: "color_change" },
        ],
      },
      { id: "speed", label: "Speed", type: "number", default: 0.05 },
      { id: "final_text", label: "Final Text", type: "text", default: "" },
    ],
  },

  "label_rich": {
    id: "label_rich",
    label: "Rich Text Label",
    category: "labels",
    color: "#009688",
    description: "Rich text with BBCode",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$RichTextLabel" },
      { id: "bbcode", label: "Use BBCode", type: "boolean", default: true },
      { id: "text", label: "Text", type: "text", default: "[color=red]Warning![/color]" },
    ],
  },

  "label_visibility": {
    id: "label_visibility",
    label: "Label Visibility",
    category: "labels",
    color: "#4CAF50",
    description: "Show/Hide/Toggle label",
    fields: [
      { id: "label_path", label: "Label Path", type: "text", default: "$Label" },
      {
        id: "action",
        label: "Action",
        type: "dropdown",
        default: "show",
        options: [
          { label: "Show", value: "show" },
          { label: "Hide", value: "hide" },
          { label: "Toggle", value: "toggle" },
        ],
      },
      { id: "fade", label: "Fade", type: "boolean", default: false },
      { id: "duration", label: "Duration", type: "number", default: 0.5 },
    ],
  },

  // ===== CONDITIONS (4) =====
  "cond_null_check": {
    id: "cond_null_check",
    label: "Null Check",
    category: "conditions",
    color: "#F44336",
    description: "Check if null/none",
    fields: [
      { id: "variable", label: "Variable", type: "text", default: "target" },
      {
        id: "check_type",
        label: "Check Type",
        type: "dropdown",
        default: "is_null",
        options: [
          { label: "Is Null", value: "is_null" },
          { label: "Is Not Null", value: "is_not_null" },
          { label: "Is Valid", value: "is_instance_valid" },
        ],
      },
    ],
  },

  "cond_type_check": {
    id: "cond_type_check",
    label: "Type Check",
    category: "conditions",
    color: "#E91E63",
    description: "Check variable type",
    fields: [
      { id: "variable", label: "Variable", type: "text", default: "node" },
      { id: "type", label: "Type", type: "text", default: "RigidBody3D" },
      {
        id: "check_method",
        label: "Method",
        type: "dropdown",
        default: "is",
        options: [
          { label: "Is", value: "is" },
          { label: "Get Class", value: "get_class" },
        ],
      },
    ],
  },

  "cond_compare": {
    id: "cond_compare",
    label: "Compare Values",
    category: "conditions",
    color: "#9C27B0",
    description: "Compare two values",
    fields: [
      { id: "left", label: "Left", type: "text", default: "a" },
      {
        id: "operator",
        label: "Operator",
        type: "dropdown",
        default: "==",
        options: [
          { label: "==", value: "==" },
          { label: "!=", value: "!=" },
          { label: "<", value: "<" },
          { label: ">", value: ">" },
          { label: "<=", value: "<=" },
          { label: ">=", value: ">=" },
        ],
      },
      { id: "right", label: "Right", type: "text", default: "b" },
    ],
  },

  "cond_logic": {
    id: "cond_logic",
    label: "Logic Operations",
    category: "conditions",
    color: "#673AB7",
    description: "AND, OR, NOT operations",
    fields: [
      {
        id: "operation",
        label: "Operation",
        type: "dropdown",
        default: "and",
        options: [
          { label: "AND", value: "and" },
          { label: "OR", value: "or" },
          { label: "NOT", value: "not" },
        ],
      },
      { id: "left", label: "Left", type: "text", default: "condition1" },
      { id: "right", label: "Right", type: "text", default: "condition2" },
    ],
  },

  // ===== ROTATION (3) =====
  "rotate_x": {
    id: "rotate_x",
    label: "Rotate X",
    category: "rotation",
    color: "#FF5252",
    description: "Rotate around X axis",
    fields: [{ id: "degrees", label: "Degrees", type: "number", default: 45 }],
  },

  "rotate_y": {
    id: "rotate_y",
    label: "Rotate Y",
    category: "rotation",
    color: "#FF5252",
    description: "Rotate around Y axis",
    fields: [{ id: "degrees", label: "Degrees", type: "number", default: 45 }],
  },

  "rotate_z": {
    id: "rotate_z",
    label: "Rotate Z",
    category: "rotation",
    color: "#FF5252",
    description: "Rotate around Z axis",
    fields: [{ id: "degrees", label: "Degrees", type: "number", default: 45 }],
  },

  // ===== SCALE (3) =====
  "scale_uniform": {
    id: "scale_uniform",
    label: "Scale (Uniform)",
    category: "scale",
    color: "#66BB6A",
    description: "Scale equally on all axes",
    fields: [{ id: "scale", label: "Scale", type: "number", default: 1.5 }],
  },

  "scale_xyz": {
    id: "scale_xyz",
    label: "Scale (X/Y/Z)",
    category: "scale",
    color: "#66BB6A",
    description: "Scale per axis",
    fields: [
      { id: "x", label: "X", type: "number", default: 1 },
      { id: "y", label: "Y", type: "number", default: 1 },
      { id: "z", label: "Z", type: "number", default: 1 },
    ],
  },

  "scale_2d": {
    id: "scale_2d",
    label: "Scale (2D)",
    category: "scale",
    color: "#66BB6A",
    description: "Scale X and Y",
    fields: [
      { id: "x", label: "X", type: "number", default: 1 },
      { id: "y", label: "Y", type: "number", default: 1 },
    ],
  },

  // ===== PHYSICS (4) =====
  "physics_apply_force": {
    id: "physics_apply_force",
    label: "Apply Force",
    category: "physics",
    color: "#42A5F5",
    description: "Apply force to body",
    fields: [
      {
        id: "direction",
        label: "Direction",
        type: "dropdown",
        default: "forward",
        options: [
          { label: "Forward", value: "forward" },
          { label: "Up", value: "up" },
          { label: "Right", value: "right" },
        ],
      },
      { id: "magnitude", label: "Magnitude", type: "number", default: 10 },
    ],
  },

  "physics_apply_impulse": {
    id: "physics_apply_impulse",
    label: "Apply Impulse",
    category: "physics",
    color: "#2196F3",
    description: "Apply impulse to body",
    fields: [
      { id: "direction", label: "Direction", type: "text", default: "0,1,0" },
      { id: "impulse", label: "Impulse", type: "number", default: 5 },
    ],
  },

  "physics_set_velocity": {
    id: "physics_set_velocity",
    label: "Set Velocity",
    category: "physics",
    color: "#1976D2",
    description: "Set velocity directly",
    fields: [
      { id: "x", label: "X", type: "number", default: 0 },
      { id: "y", label: "Y", type: "number", default: 0 },
      { id: "z", label: "Z", type: "number", default: 0 },
    ],
  },

  "physics_gravity": {
    id: "physics_gravity",
    label: "Set Gravity",
    category: "physics",
    color: "#1565C0",
    description: "Set gravity scale",
    fields: [{ id: "gravity", label: "Gravity Scale", type: "number", default: 1 }],
  },

  // ===== ADVANCED (6) =====
  "advanced_print": {
    id: "advanced_print",
    label: "Print Debug",
    category: "advanced",
    color: "#9C27B0",
    description: "Print to console",
    fields: [{ id: "message", label: "Message", type: "text", default: "Debug message" }],
  },

  "advanced_spawn": {
    id: "advanced_spawn",
    label: "Spawn Node",
    category: "advanced",
    color: "#8B008B",
    description: "Instantiate node",
    fields: [
      { id: "scene_path", label: "Scene Path", type: "text", default: "res://enemy.tscn" },
      { id: "position", label: "Position", type: "text", default: "0,0,0" },
      { id: "parent", label: "Parent Path", type: "text", default: "." },
    ],
  },

  "advanced_destroy": {
    id: "advanced_destroy",
    label: "Destroy Node",
    category: "advanced",
    color: "#800000",
    description: "Destroy/free node",
    fields: [
      { id: "delay", label: "Delay (sec)", type: "number", default: 0 },
      { id: "immediate", label: "Immediate", type: "boolean", default: false },
    ],
  },

  "advanced_tween": {
    id: "advanced_tween",
    label: "Tween Animation",
    category: "advanced",
    color: "#FF1493",
    description: "Create tween animation",
    fields: [
      { id: "property", label: "Property", type: "text", default: "position" },
      { id: "end_value", label: "End Value", type: "text", default: "10" },
      { id: "duration", label: "Duration (sec)", type: "number", default: 1 },
      { id: "easing", label: "Easing", type: "text", default: "ease_in_out" },
    ],
  },

  "advanced_audio": {
    id: "advanced_audio",
    label: "Play Audio",
    category: "advanced",
    color: "#20B2AA",
    description: "Play audio stream",
    fields: [
      { id: "audio_path", label: "Audio Path", type: "text", default: "res://sound.ogg" },
      { id: "volume", label: "Volume (dB)", type: "number", default: 0 },
      { id: "pitch", label: "Pitch Scale", type: "number", default: 1 },
    ],
  },

  "advanced_timer": {
    id: "advanced_timer",
    label: "Wait for Time",
    category: "advanced",
    color: "#00CED1",
    description: "Wait/delay action",
    fields: [{ id: "seconds", label: "Seconds", type: "number", default: 1 }],
  },
};

export interface Block {
  id: string;
  type: string;
  fields: Record<string, string | number | boolean>;
  children: Block[];
}

export interface BlockSequence {
  blocks: Block[];
  startNodeType?: string;
  variables?: Array<{ name: string; type: string; value: string }>;
}

export function getBlockDefinition(blockType: string): BlockDefinition | undefined {
  return BLOCK_DEFINITIONS[blockType];
}

export function getCategoryColor(category: BlockCategory): string {
  const colors: Record<BlockCategory, string> = {
    events: "#FF6B6B",
    movement: "#4ECDC4",
    animation: "#95E1D3",
    control: "#FFA500",
    variables: "#2196F3",
    loops: "#FF9800",
    signals: "#3F51B5",
    groups: "#FFC107",
    data: "#795548",
    labels: "#2196F3",
    conditions: "#F44336",
    rotation: "#FF5252",
    scale: "#66BB6A",
    physics: "#42A5F5",
    advanced: "#9C27B0",
  };
  return colors[category];
}

export function getBlocksByCategory(category: BlockCategory): BlockDefinition[] {
  return Object.values(BLOCK_DEFINITIONS).filter((b) => b.category === category);
}

export const CATEGORIES: BlockCategory[] = [
  "events",
  "movement",
  "animation",
  "control",
  "variables",
  "loops",
  "signals",
  "groups",
  "data",
  "labels",
  "conditions",
  "rotation",
  "scale",
  "physics",
  "advanced",
];
