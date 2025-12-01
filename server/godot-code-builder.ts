// Godot 4.4 API-based code builder with official patterns

/**
 * Godot function contexts - determine where code is executed
 */
export enum GodotFunctionContext {
  READY = "_ready",
  PROCESS = "_process",
  PHYSICS_PROCESS = "_physics_process",
  INPUT = "_input",
  ENTER_TREE = "_enter_tree",
  TREE_EXITING = "_tree_exiting",
}

/**
 * Godot lifecycle and event function signatures
 */
export const GODOT_FUNCTIONS: Record<GodotFunctionContext, string> = {
  [GodotFunctionContext.READY]: "func _ready() -> void:",
  [GodotFunctionContext.PROCESS]: "func _process(delta: float) -> void:",
  [GodotFunctionContext.PHYSICS_PROCESS]: "func _physics_process(delta: float) -> void:",
  [GodotFunctionContext.INPUT]: "func _input(event: InputEvent) -> void:",
  [GodotFunctionContext.ENTER_TREE]: "func _enter_tree() -> void:",
  [GodotFunctionContext.TREE_EXITING]: "func _tree_exiting() -> void:",
};

/**
 * Built-in Godot types with type hints
 */
export const GODOT_TYPES = {
  INT: "int",
  FLOAT: "float",
  STRING: "String",
  BOOL: "bool",
  VECTOR2: "Vector2",
  VECTOR3: "Vector3",
  COLOR: "Color",
  TRANSFORM3D: "Transform3D",
  NODE: "Node",
  NODE2D: "Node2D",
  NODE3D: "Node3D",
  PHYSICS_BODY_2D: "PhysicsBody2D",
  PHYSICS_BODY_3D: "PhysicsBody3D",
  ANIMATION_PLAYER: "AnimationPlayer",
  SPRITE_2D: "Sprite2D",
  SPRITE_3D: "Sprite3D",
};

/**
 * Godot node references (child nodes accessed via $nodeName)
 */
export const GODOT_NODE_PATHS = {
  // Common children that user creates in editor
  AnimationPlayer: "$AnimationPlayer",
  AnimatedSprite2D: "$AnimatedSprite2D",
  AnimatedSprite3D: "$AnimatedSprite3D",
  AudioStreamPlayer: "$AudioStreamPlayer",
  AudioStreamPlayer2D: "$AudioStreamPlayer2D",
  AudioStreamPlayer3D: "$AudioStreamPlayer3D",
  Timer: "$Timer",
  Area2D: "$Area2D",
  Area3D: "$Area3D",
};

/**
 * Godot input system - key codes and actions
 */
export const GODOT_KEY_CODES: Record<string, string> = {
  A: "KEY_A",
  B: "KEY_B",
  C: "KEY_C",
  D: "KEY_D",
  E: "KEY_E",
  F: "KEY_F",
  G: "KEY_G",
  H: "KEY_H",
  I: "KEY_I",
  J: "KEY_J",
  K: "KEY_K",
  L: "KEY_L",
  M: "KEY_M",
  N: "KEY_N",
  O: "KEY_O",
  P: "KEY_P",
  Q: "KEY_Q",
  R: "KEY_R",
  S: "KEY_S",
  T: "KEY_T",
  U: "KEY_U",
  V: "KEY_V",
  W: "KEY_W",
  X: "KEY_X",
  Y: "KEY_Y",
  Z: "KEY_Z",
  SPACE: "KEY_SPACE",
  ENTER: "KEY_ENTER",
  ESCAPE: "KEY_ESCAPE",
  BACKSPACE: "KEY_BACKSPACE",
  TAB: "KEY_TAB",
  UP: "KEY_UP",
  DOWN: "KEY_DOWN",
  LEFT: "KEY_LEFT",
  RIGHT: "KEY_RIGHT",
  SHIFT: "KEY_SHIFT",
  CTRL: "KEY_CTRL",
  ALT: "KEY_ALT",
};

/**
 * Represents a line of GDScript code with indentation support
 */
export class CodeLine {
  constructor(
    public content: string,
    public indent: number = 0
  ) {}

  toString(tabSize: number = 1): string {
    const indentation = "\t".repeat(this.indent * tabSize);
    return this.content ? `${indentation}${this.content}` : "";
  }
}

/**
 * Godot GDScript code builder following official patterns
 */
export class GodotCodeBuilder {
  private lines: CodeLine[] = [];
  private exports: string[] = [];
  private onreadys: string[] = [];
  private variables: string[] = [];
  private functions: Map<GodotFunctionContext, CodeLine[]> = new Map();
  private currentIndent: number = 0;

  constructor() {
    // Initialize function contexts
    Object.values(GodotFunctionContext).forEach((ctx) => {
      this.functions.set(ctx, []);
    });
  }

  /**
   * Add class declaration (extends Node, Node2D, etc)
   */
  addClassDeclaration(extendsClass: string = "Node"): this {
    this.lines.push(new CodeLine(`extends ${extendsClass}`));
    this.lines.push(new CodeLine(""));
    return this;
  }

  /**
   * Add exported variable (visible in inspector)
   */
  addExport(varName: string, varType: string, defaultValue: string = ""): this {
    const value = defaultValue ? ` = ${defaultValue}` : "";
    this.exports.push(`@export var ${varName}: ${varType}${value}`);
    return this;
  }

  /**
   * Add onready variable (cache node reference)
   */
  addOnReady(varName: string, nodePath: string): this {
    this.onreadys.push(`@onready var ${varName}: Node = $${nodePath}`);
    return this;
  }

  /**
   * Add class variable
   */
  addVariable(varName: string, varType: string, defaultValue: string = ""): this {
    const value = defaultValue ? ` = ${defaultValue}` : "";
    this.variables.push(`var ${varName}: ${varType}${value}`);
    return this;
  }

  /**
   * Add code to specific Godot lifecycle function
   */
  addToFunction(context: GodotFunctionContext, code: string, indent: number = 1): this {
    const lines = this.functions.get(context) || [];
    lines.push(new CodeLine(code, indent));
    this.functions.set(context, lines);
    return this;
  }

  /**
   * Add raw code line with indentation
   */
  addLine(content: string, indent: number = 0): this {
    this.lines.push(new CodeLine(content, indent));
    return this;
  }

  /**
   * Get indentation string
   */
  private getIndent(level: number): string {
    return "\t".repeat(level);
  }

  /**
   * Build complete GDScript code following Godot official patterns
   * Structure: extends → exports → onreadys → variables → functions
   */
  build(): string {
    const output: string[] = [];

    // 1. Class declaration (use what was added via addClassDeclaration)
    if (this.lines.length > 0) {
      output.push(this.lines[0].toString());
      output.push("");
    } else {
      output.push("extends Node\n");
    }

    // 2. Exports (visible in inspector, highest priority)
    if (this.exports.length > 0) {
      output.push(this.exports.join("\n"));
      output.push("");
    }

    // 3. Onreadys (cache node references)
    if (this.onreadys.length > 0) {
      output.push(this.onreadys.join("\n"));
      output.push("");
    }

    // 4. Variables (class members)
    if (this.variables.length > 0) {
      output.push(this.variables.join("\n"));
      output.push("");
    }

    // 5. Lifecycle functions (in standard Godot order)
    const functionOrder = [
      GodotFunctionContext.ENTER_TREE,
      GodotFunctionContext.READY,
      GodotFunctionContext.TREE_EXITING,
      GodotFunctionContext.PROCESS,
      GodotFunctionContext.PHYSICS_PROCESS,
      GodotFunctionContext.INPUT,
    ];

    for (const ctx of functionOrder) {
      const funcLines = this.functions.get(ctx) || [];
      if (funcLines.length > 0) {
        output.push(GODOT_FUNCTIONS[ctx]);
        funcLines.forEach((line) => {
          output.push(line.toString());
        });
        output.push("");
      }
    }

    return output.join("\n").trim() + "\n";
  }
}

/**
 * Godot Vector types with component access
 */
export const VectorHelpers = {
  Vector3: (x: number | string, y: number | string, z: number | string) =>
    `Vector3(${x}, ${y}, ${z})`,
  Vector2: (x: number | string, y: number | string) => `Vector2(${x}, ${y})`,
};

/**
 * Godot signal and event helpers
 */
export const SignalHelpers = {
  emit: (signalName: string, ...args: string[]) =>
    `${signalName}.emit(${args.join(", ")})`,
  connect: (signalName: string, callback: string) =>
    `${signalName}.connect(${callback})`,
};

/**
 * Godot node access patterns
 */
export const NodeHelpers = {
  // Access child node: $NodeName
  child: (nodeName: string) => `$${nodeName}`,
  // Get node by path
  getNode: (path: string) => `get_node("${path}")`,
  // Add child
  addChild: (node: string) => `add_child(${node})`,
  // Instantiate scene
  instantiate: (scenePath: string) => `load("${scenePath}").instantiate()`,
  // Queue for deletion
  queueFree: () => `queue_free()`,
};

/**
 * Godot property access helpers
 */
export const PropertyHelpers = {
  // Set property: node.property = value
  set: (node: string, property: string, value: string) =>
    `${node}.${property} = ${value}`,
  // Get property: node.property
  get: (node: string, property: string) => `${node}.${property}`,
  // Increment property
  increment: (node: string, property: string, amount: string = "1") =>
    `${node}.${property} += ${amount}`,
};

/**
 * Godot input system helpers
 */
export const InputHelpers = {
  // Check if key pressed: Input.is_key_pressed(KEY_CODE)
  isKeyPressed: (keyCode: string) => `Input.is_key_pressed(${keyCode})`,
  // Check if action pressed: Input.is_action_pressed("action_name")
  isActionPressed: (actionName: string) => `Input.is_action_pressed("${actionName}")`,
  // Check if action just pressed: Input.is_action_just_pressed("action_name")
  isActionJustPressed: (actionName: string) =>
    `Input.is_action_just_pressed("${actionName}")`,
};

/**
 * Godot animation helpers
 */
export const AnimationHelpers = {
  // Play animation: node.play("animation_name", -1.0, 1.0)
  play: (node: string, animName: string, fromPos: string = "-1.0", speed: string = "1.0") =>
    `${node}.play("${animName}", ${fromPos}, ${speed})`,
  // Stop animation: node.stop()
  stop: (node: string) => `${node}.stop()`,
  // Check if playing: node.is_playing()
  isPlaying: (node: string) => `${node}.is_playing()`,
};

/**
 * Godot timer helpers
 */
export const TimerHelpers = {
  // Set timer duration
  setWaitTime: (timerNode: string, duration: number | string) =>
    `${timerNode}.wait_time = ${duration}`,
  // Start timer
  start: (timerNode: string) => `${timerNode}.start()`,
  // Stop timer
  stop: (timerNode: string) => `${timerNode}.stop()`,
};

/**
 * Godot audio helpers
 */
export const AudioHelpers = {
  // Set audio stream
  setStream: (node: string, audioPath: string) =>
    `${node}.stream = load("${audioPath}")`,
  // Set volume (in dB)
  setVolume: (node: string, volumeDb: number | string) =>
    `${node}.volume_db = ${volumeDb}`,
  // Play audio
  play: (node: string, fromPosition: string = "0.0") =>
    `${node}.play(${fromPosition})`,
  // Stop audio
  stop: (node: string) => `${node}.stop()`,
};

/**
 * Godot physics helpers
 */
export const PhysicsHelpers = {
  // Apply velocity to 2D physics body
  setVelocity2D: (node: string, velocity: string) =>
    `${node}.velocity = ${velocity}`,
  // Apply velocity to 3D physics body
  setVelocity3D: (node: string, velocity: string) =>
    `${node}.velocity = ${velocity}`,
  // Apply force
  applyForce: (node: string, force: string) => `${node}.apply_central_force(${force})`,
};

/**
 * Godot tween helpers for animations
 */
export const TweenHelpers = {
  // Create tween
  create: () => `create_tween()`,
  // Tween property
  tweenProperty: (
    node: string,
    property: string,
    finalValue: string,
    duration: string
  ) => `tween.tween_property(${node}, "${property}", ${finalValue}, ${duration})`,
  // Tween callback
  tweenCallback: (callback: string) => `tween.tween_callback(${callback})`,
};

/**
 * Godot scene/tree helpers
 */
export const SceneHelpers = {
  // Change scene
  changeScene: (scenePath: string) => `get_tree().change_scene_to_file("${scenePath}")`,
  // Reload current scene
  reloadScene: () =>
    `get_tree().reload_current_scene()`,
  // Get root node
  getRoot: () => `get_tree().root`,
  // Pause tree
  setPaused: (paused: boolean) => `get_tree().paused = ${paused}`,
  // Create timer
  createTimer: (duration: string) => `get_tree().create_timer(${duration})`,
};

/**
 * Godot group helpers
 */
export const GroupHelpers = {
  // Add node to group
  addToGroup: (node: string, groupName: string) =>
    `${node}.add_to_group("${groupName}")`,
  // Remove node from group
  removeFromGroup: (node: string, groupName: string) =>
    `${node}.remove_from_group("${groupName}")`,
  // Check if in group
  isInGroup: (node: string, groupName: string) =>
    `${node}.is_in_group("${groupName}")`,
  // Get all nodes in group
  getNodesInGroup: (groupName: string) =>
    `get_tree().get_nodes_in_group("${groupName}")`,
};

/**
 * Godot logging and debugging
 */
export const DebugHelpers = {
  // Print to console
  print: (message: string) => `print(${message})`,
  // Print error
  printError: (message: string) => `printerr(${message})`,
  // Assert condition
  assert: (condition: string, message: string = "") =>
    message ? `assert(${condition}, "${message}")` : `assert(${condition})`,
};
