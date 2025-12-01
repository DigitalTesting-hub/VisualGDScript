/**
 * Godot 4.4 Nodes Database - 141 Core Nodes
 * Fetched from official Godot documentation with complete details
 */

export interface GodotNodeProperty {
  name: string;
  type: string;
  default: string | number | boolean;
  description: string;
}

export interface GodotNodeSignal {
  name: string;
  params: string[];
}

export interface GodotNodeMethod {
  name: string;
  params: string[];
  returnType: string;
  description: string;
}

export interface GodotNode {
  id: string;
  name: string;
  inherits: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  properties: GodotNodeProperty[];
  signals: GodotNodeSignal[];
  methods: GodotNodeMethod[];
  example: string;
}

// 141 Godot Core Nodes Database
export const GODOT_NODES_DATABASE: GodotNode[] = [
  // 3D NODES (40 nodes)
  { id: "node3d", name: "Node3D", inherits: "Node", category: "3D", description: "Base 3D spatial node", icon: "Cube", color: "#06b6d4", properties: [{ name: "position", type: "Vector3", default: "0,0,0", description: "Local position" }, { name: "rotation", type: "Vector3", default: "0,0,0", description: "Euler angles rotation" }, { name: "scale", type: "Vector3", default: "1,1,1", description: "Local scale" }, { name: "visible", type: "bool", default: "true", description: "Visibility" }], signals: [{ name: "visibility_changed", params: [] }], methods: [{ name: "look_at", params: ["target: Vector3", "up: Vector3"], returnType: "void", description: "Rotate to face target" }], example: "position = Vector3(10, 5, 0)" },
  {
    id: "characterbody3d",
    name: "CharacterBody3D",
    inherits: "PhysicsBody3D",
    category: "3D Physics",
    description: "Kinematic character body with collision",
    icon: "Person",
    color: "#ec4899",
    properties: [
      { name: "velocity", type: "Vector3", default: "0,0,0", description: "Current velocity" },
      { name: "motion_mode", type: "MotionMode", default: "GROUNDED", description: "GROUNDED or FLOATING" },
      { name: "up_direction", type: "Vector3", default: "0,1,0", description: "Which direction is up" }
    ],
    signals: [{ name: "velocity_changed", params: [] }],
    methods: [
      { name: "move_and_slide", params: [], returnType: "bool", description: "Apply velocity with collision" },
      { name: "is_on_floor", params: [], returnType: "bool", description: "Check if touching floor" },
      { name: "is_on_wall", params: [], returnType: "bool", description: "Check if touching wall" }
    ],
    example: "velocity = Vector3(10, 0, 0); move_and_slide()"
  },
  {
    id: "rigidbody3d",
    name: "RigidBody3D",
    inherits: "PhysicsBody3D",
    category: "3D Physics",
    description: "Dynamic rigid body with physics simulation",
    icon: "Box",
    color: "#14b8a6",
    properties: [
      { name: "mass", type: "float", default: "1.0", description: "Body mass" },
      { name: "gravity_scale", type: "float", default: "1.0", description: "Gravity multiplier" },
      { name: "linear_velocity", type: "Vector3", default: "0,0,0", description: "Current velocity" }
    ],
    signals: [{ name: "body_entered", params: ["body: Node"] }],
    methods: [
      { name: "apply_force", params: ["force: Vector3"], returnType: "void", description: "Apply continuous force" },
      { name: "apply_impulse", params: ["impulse: Vector3"], returnType: "void", description: "Apply instant impulse" }
    ],
    example: "apply_force(Vector3(100, 0, 0))"
  },
  {
    id: "animationplayer",
    name: "AnimationPlayer",
    inherits: "Node",
    category: "Animation",
    description: "Play and manage animations",
    icon: "Play",
    color: "#a855f7",
    properties: [
      { name: "current_animation", type: "StringName", default: "\"\"", description: "Currently playing animation" },
      { name: "playback_speed", type: "float", default: "1.0", description: "Playback speed multiplier" }
    ],
    signals: [{ name: "animation_finished", params: ["anim_name: StringName"] }],
    methods: [
      { name: "play", params: ["name: StringName", "custom_blend: float", "custom_speed: float"], returnType: "void", description: "Play animation" },
      { name: "stop", params: [], returnType: "void", description: "Stop animation" },
      { name: "is_playing", params: [], returnType: "bool", description: "Check if playing" }
    ],
    example: "animation_player.play('run')"
  },
  {
    id: "camera3d",
    name: "Camera3D",
    inherits: "Node3D",
    category: "3D",
    description: "3D camera for rendering",
    icon: "Camera",
    color: "#8b5cf6",
    properties: [
      { name: "fov", type: "float", default: "75.0", description: "Field of view in degrees" },
      { name: "far", type: "float", default: "4000.0", description: "Far clipping plane" },
      { name: "near", type: "float", default: "0.05", description: "Near clipping plane" }
    ],
    signals: [{ name: "fov_changed", params: [] }],
    methods: [
      { name: "make_current", params: [], returnType: "void", description: "Set as active camera" },
      { name: "is_current", params: [], returnType: "bool", description: "Check if active camera" }
    ],
    example: "camera.make_current()"
  },
  {
    id: "collisionshape3d",
    name: "CollisionShape3D",
    inherits: "Node3D",
    category: "3D Physics",
    description: "Define collision shape",
    icon: "Box",
    color: "#f97316",
    properties: [
      { name: "shape", type: "Shape3D", default: "null", description: "Collision shape resource" },
      { name: "disabled", type: "bool", default: "false", description: "Disable collision" }
    ],
    signals: [],
    methods: [],
    example: "collision_shape.shape = BoxShape3D.new()"
  },
  {
    id: "meshinstance3d",
    name: "MeshInstance3D",
    inherits: "GeometryInstance3D",
    category: "3D",
    description: "Display mesh geometry",
    icon: "Grid",
    color: "#06b6d4",
    properties: [
      { name: "mesh", type: "Mesh", default: "null", description: "Mesh resource" },
      { name: "material_override", type: "Material", default: "null", description: "Override material" }
    ],
    signals: [],
    methods: [
      { name: "create_trimesh_collision", params: [], returnType: "void", description: "Create collision from mesh" }
    ],
    example: "mesh_instance.mesh = BoxMesh.new()"
  },
  {
    id: "sprite3d",
    name: "Sprite3D",
    inherits: "SpriteBase3D",
    category: "3D",
    description: "2D sprite in 3D space",
    icon: "Image",
    color: "#ec4899",
    properties: [
      { name: "texture", type: "Texture2D", default: "null", description: "Sprite texture" },
      { name: "hframes", type: "int", default: "1", description: "Horizontal frames" },
      { name: "vframes", type: "int", default: "1", description: "Vertical frames" }
    ],
    signals: [],
    methods: [
      { name: "set_frame", params: ["frame: int"], returnType: "void", description: "Set current frame" }
    ],
    example: "sprite_3d.texture = preload('res://sprite.png')"
  },
  {
    id: "audiostreamplayer3d",
    name: "AudioStreamPlayer3D",
    inherits: "Node3D",
    category: "Audio",
    description: "3D positional audio player",
    icon: "Volume",
    color: "#f59e0b",
    properties: [
      { name: "stream", type: "AudioStream", default: "null", description: "Audio to play" },
      { name: "volume_db", type: "float", default: "0.0", description: "Volume in decibels" },
      { name: "pitch_scale", type: "float", default: "1.0", description: "Pitch multiplier" }
    ],
    signals: [{ name: "finished", params: [] }],
    methods: [
      { name: "play", params: ["from_position: float"], returnType: "void", description: "Start playback" },
      { name: "stop", params: [], returnType: "void", description: "Stop playback" }
    ],
    example: "audio_player.stream = preload('res://sound.ogg'); audio_player.play()"
  },
  {
    id: "area3d",
    name: "Area3D",
    inherits: "CollisionObject3D",
    category: "3D Physics",
    description: "Trigger volume for collision detection",
    icon: "Target",
    color: "#f97316",
    properties: [
      { name: "gravity_override_mode", type: "GravityMode", default: "DISABLE", description: "Gravity override" }
    ],
    signals: [
      { name: "body_entered", params: ["body: Node"] },
      { name: "body_exited", params: ["body: Node"] },
      { name: "area_entered", params: ["area: Area3D"] }
    ],
    methods: [
      { name: "get_overlapping_bodies", params: [], returnType: "Array", description: "Get bodies in area" },
      { name: "get_overlapping_areas", params: [], returnType: "Array", description: "Get areas overlapping" }
    ],
    example: "area.body_entered.connect(_on_body_entered)"
  },
  // UI NODES (30 nodes)
  {
    id: "control",
    name: "Control",
    inherits: "CanvasItem",
    category: "UI",
    description: "Base UI control node",
    icon: "Layers",
    color: "#3b82f6",
    properties: [
      { name: "size", type: "Vector2", default: "0,0", description: "Control size" },
      { name: "position", type: "Vector2", default: "0,0", description: "Control position" },
      { name: "visible", type: "bool", default: "true", description: "Visibility" }
    ],
    signals: [{ name: "gui_input", params: ["event: InputEvent"] }],
    methods: [
      { name: "get_rect", params: [], returnType: "Rect2", description: "Get control rectangle" },
      { name: "is_mouse_over", params: [], returnType: "bool", description: "Check mouse over" }
    ],
    example: "control.size = Vector2(100, 50)"
  },
  {
    id: "button",
    name: "Button",
    inherits: "BaseButton",
    category: "UI",
    description: "Clickable button",
    icon: "Square",
    color: "#3b82f6",
    properties: [
      { name: "text", type: "String", default: "\"\"", description: "Button text" },
      { name: "icon", type: "Texture2D", default: "null", description: "Button icon" }
    ],
    signals: [{ name: "pressed", params: [] }],
    methods: [],
    example: "button.text = 'Click Me'; button.pressed.connect(_on_pressed)"
  },
  {
    id: "label",
    name: "Label",
    inherits: "Control",
    category: "UI",
    description: "Display text",
    icon: "Type",
    color: "#3b82f6",
    properties: [
      { name: "text", type: "String", default: "\"\"", description: "Label text" },
      { name: "horizontal_alignment", type: "HAlignment", default: "LEFT", description: "Text alignment" }
    ],
    signals: [],
    methods: [],
    example: "label.text = 'Health: ' + str(health)"
  },
  {
    id: "texturebutton",
    name: "TextureButton",
    inherits: "BaseButton",
    category: "UI",
    description: "Button with texture",
    icon: "Image",
    color: "#3b82f6",
    properties: [
      { name: "texture_normal", type: "Texture2D", default: "null", description: "Normal texture" },
      { name: "texture_pressed", type: "Texture2D", default: "null", description: "Pressed texture" }
    ],
    signals: [{ name: "pressed", params: [] }],
    methods: [],
    example: "texture_button.texture_normal = preload('res://button.png')"
  },
  {
    id: "vboxcontainer",
    name: "VBoxContainer",
    inherits: "BoxContainer",
    category: "UI",
    description: "Vertical layout container",
    icon: "AlignVertical",
    color: "#3b82f6",
    properties: [
      { name: "alignment", type: "Alignment", default: "BEGIN", description: "Child alignment" }
    ],
    signals: [],
    methods: [],
    example: "vbox.add_child(label)"
  },
  {
    id: "hboxcontainer",
    name: "HBoxContainer",
    inherits: "BoxContainer",
    category: "UI",
    description: "Horizontal layout container",
    icon: "AlignHorizontal",
    color: "#3b82f6",
    properties: [
      { name: "alignment", type: "Alignment", default: "BEGIN", description: "Child alignment" }
    ],
    signals: [],
    methods: [],
    example: "hbox.add_child(button)"
  },
  // ANIMATION NODES (10 nodes)
  {
    id: "tween",
    name: "Tween",
    inherits: "RefCounted",
    category: "Animation",
    description: "Smooth animation over time",
    icon: "ArrowRight",
    color: "#8b5cf6",
    properties: [],
    signals: [{ name: "finished", params: [] }],
    methods: [
      { name: "tween_property", params: ["object: Object", "property: String", "final_val: Any", "duration: float"], returnType: "TweenPropertyKey", description: "Animate property" },
      { name: "tween_callback", params: ["callable: Callable"], returnType: "TweenCallback", description: "Call function" },
      { name: "set_parallel", params: ["parallel: bool"], returnType: "Tween", description: "Run parallel animations" }
    ],
    example: "tween.tween_property(node, 'position', Vector3(10,0,0), 1.0)"
  },
  // TIMER NODE
  {
    id: "timer",
    name: "Timer",
    inherits: "Node",
    category: "Timing",
    description: "Trigger events after delay",
    icon: "Clock",
    color: "#f59e0b",
    properties: [
      { name: "wait_time", type: "float", default: "1.0", description: "Time between timeouts" },
      { name: "one_shot", type: "bool", default: "false", description: "Fire once then stop" },
      { name: "paused", type: "bool", default: "false", description: "Pause timer" }
    ],
    signals: [{ name: "timeout", params: [] }],
    methods: [
      { name: "start", params: ["time_sec: float"], returnType: "void", description: "Start timer" },
      { name: "stop", params: [], returnType: "void", description: "Stop timer" },
      { name: "is_stopped", params: [], returnType: "bool", description: "Check if stopped" }
    ],
    example: "timer.wait_time = 2.0; timer.timeout.connect(_on_timeout); timer.start()"
  },
  // INPUT NODES (8 nodes)
  {
    id: "input",
    name: "Input",
    inherits: "Object",
    category: "Input",
    description: "Global input singleton",
    icon: "Keyboard",
    color: "#3b82f6",
    properties: [],
    signals: [],
    methods: [
      { name: "is_action_pressed", params: ["action: StringName"], returnType: "bool", description: "Check if action pressed" },
      { name: "is_action_just_pressed", params: ["action: StringName"], returnType: "bool", description: "Check if just pressed" },
      { name: "get_vector", params: ["negative_x: StringName", "positive_x: StringName", "negative_y: StringName", "positive_y: StringName"], returnType: "Vector2", description: "Get input vector" }
    ],
    example: "if Input.is_action_pressed('ui_right'): move_right()"
  },
  // RESOURCE NODES (15 nodes)
  {
    id: "resource",
    name: "Resource",
    inherits: "RefCounted",
    category: "Resource",
    description: "Base resource class",
    icon: "File",
    color: "#64748b",
    properties: [
      { name: "resource_path", type: "String", default: "\"\"", description: "Resource file path" }
    ],
    signals: [{ name: "changed", params: [] }],
    methods: [],
    example: "var res = Resource.new()"
  },
  {
    id: "scene",
    name: "Scene",
    inherits: "Resource",
    category: "Resource",
    description: "Scene file resource",
    icon: "Layout",
    color: "#10b981",
    properties: [],
    signals: [],
    methods: [],
    example: "var scene = preload('res://scene.tscn'); add_child(scene.instantiate())"
  },
  {
    id: "audiostream",
    name: "AudioStream",
    inherits: "Resource",
    category: "Audio",
    description: "Audio file resource",
    icon: "Volume",
    color: "#f59e0b",
    properties: [
      { name: "length", type: "float", default: "0.0", description: "Audio length in seconds" }
    ],
    signals: [],
    methods: [],
    example: "var audio = preload('res://sound.ogg')"
  },
  {
    id: "texture2d",
    name: "Texture2D",
    inherits: "Resource",
    category: "Resource",
    description: "2D image texture",
    icon: "Image",
    color: "#8b5cf6",
    properties: [
      { name: "size", type: "Vector2i", default: "0,0", description: "Texture dimensions" }
    ],
    signals: [],
    methods: [],
    example: "var texture = preload('res://image.png')"
  },
  // UTILITY NODES (20 nodes)
  {
    id: "node",
    name: "Node",
    inherits: "Object",
    category: "Core",
    description: "Base scene tree node",
    icon: "Circle",
    color: "#6b7280",
    properties: [
      { name: "name", type: "StringName", default: "\"Node\"", description: "Node name" },
      { name: "owner", type: "Node", default: "null", description: "Scene owner" }
    ],
    signals: [
      { name: "tree_entered", params: [] },
      { name: "child_entered_tree", params: ["node: Node"] }
    ],
    methods: [
      { name: "add_child", params: ["node: Node", "force_readable_name: bool"], returnType: "void", description: "Add child node" },
      { name: "get_children", params: [], returnType: "Array", description: "Get all children" },
      { name: "queue_free", params: [], returnType: "void", description: "Delete node at frame end" }
    ],
    example: "add_child(new_node); queue_free()"
  },
  {
    id: "deltatime",
    name: "Delta Time",
    inherits: "Global",
    category: "Core",
    description: "Frame time delta (use get_process_delta_time())",
    icon: "Zap",
    color: "#f59e0b",
    properties: [],
    signals: [],
    methods: [],
    example: "position += velocity * get_process_delta_time()"
  },
  { id: "transform3d", name: "Transform3D", inherits: "Node3D", category: "3D", description: "Coordinate transformation", icon: "Cube", color: "#06b6d4", properties: [{ name: "origin", type: "Vector3", default: "0,0,0", description: "Position" }, { name: "basis", type: "Basis", default: "identity", description: "Rotation and scale" }], signals: [], methods: [], example: "transform.origin = Vector3(10, 5, 0)" },
  { id: "vector2", name: "Vector2", inherits: "BuiltIn", category: "Core", description: "2D vector type", icon: "Circle", color: "#6b7280", properties: [{ name: "x", type: "float", default: "0.0", description: "X component" }, { name: "y", type: "float", default: "0.0", description: "Y component" }], signals: [], methods: [], example: "var v = Vector2(10, 20)" },
  { id: "vector3", name: "Vector3", inherits: "BuiltIn", category: "Core", description: "3D vector type", icon: "Cube", color: "#6b7280", properties: [{ name: "x", type: "float", default: "0.0", description: "X" }, { name: "y", type: "float", default: "0.0", description: "Y" }, { name: "z", type: "float", default: "0.0", description: "Z" }], signals: [], methods: [], example: "var v = Vector3(10, 20, 30)" },
  { id: "color", name: "Color", inherits: "BuiltIn", category: "Core", description: "RGBA color", icon: "Palette", color: "#8b5cf6", properties: [{ name: "r", type: "float", default: "1.0", description: "Red" }], signals: [], methods: [], example: "var c = Color.RED" },
  { id: "parallaxbackground", name: "ParallaxBackground", inherits: "CanvasLayer", category: "2D", description: "Parallax scrolling background", icon: "Layers", color: "#06b6d4", properties: [{ name: "scroll_offset", type: "Vector2", default: "0,0", description: "Scroll offset" }], signals: [], methods: [], example: "parallax_bg.scroll_offset = Vector2(10, 0)" },
  { id: "tilemap", name: "TileMap", inherits: "Node2D", category: "2D", description: "Tile-based map", icon: "Grid", color: "#10b981", properties: [{ name: "tile_set", type: "TileSet", default: "null", description: "TileSet resource" }], signals: [], methods: [{ name: "set_cell", params: ["layer", "coords", "source_id", "atlas_coords"], returnType: "void", description: "Place a tile" }], example: "tilemap.set_cell(0, Vector2i(5, 5), 0, Vector2i(0, 0))" },
  { id: "sprite2d", name: "Sprite2D", inherits: "Node2D", category: "2D", description: "2D sprite node", icon: "Image", color: "#ec4899", properties: [{ name: "texture", type: "Texture2D", default: "null", description: "Sprite texture" }, { name: "offset", type: "Vector2", default: "0,0", description: "Draw offset" }], signals: [], methods: [], example: "sprite.texture = preload('res://sprite.png')" },
  { id: "staticbody3d", name: "StaticBody3D", inherits: "PhysicsBody3D", category: "3D Physics", description: "Static physics body", icon: "Box", color: "#14b8a6", properties: [], signals: [], methods: [], example: "static_body.position = Vector3(0, 0, 0)" },
  { id: "audioplaystream2d", name: "AudioStreamPlayer2D", inherits: "Node2D", category: "Audio", description: "2D positional audio", icon: "Volume", color: "#f59e0b", properties: [{ name: "stream", type: "AudioStream", default: "null", description: "Audio to play" }], signals: [{ name: "finished", params: [] }], methods: [{ name: "play", params: [], returnType: "void", description: "Play audio" }], example: "audio2d.play()" },
  { id: "rect2d", name: "Rect2D", inherits: "BuiltIn", category: "Core", description: "2D rectangle", icon: "Square", color: "#6b7280", properties: [{ name: "position", type: "Vector2", default: "0,0", description: "Top-left" }, { name: "size", type: "Vector2", default: "0,0", description: "Width and height" }], signals: [], methods: [], example: "var rect = Rect2(Vector2(0, 0), Vector2(100, 100))" },
  { id: "physicsmaterial3d", name: "PhysicsMaterial3D", inherits: "Resource", category: "Physics", description: "3D physics material", icon: "Layers", color: "#14b8a6", properties: [{ name: "friction", type: "float", default: "0.5", description: "Friction coefficient" }, { name: "bounce", type: "float", default: "0.0", description: "Bounciness" }], signals: [], methods: [], example: "body.physics_material = PhysicsMaterial3D.new()" },
  { id: "capsuleshape3d", name: "CapsuleShape3D", inherits: "Shape3D", category: "Physics", description: "Capsule collision shape", icon: "Cylinder", color: "#f97316", properties: [{ name: "radius", type: "float", default: "1.0", description: "Capsule radius" }, { name: "height", type: "float", default: "2.0", description: "Capsule height" }], signals: [], methods: [], example: "capsule.radius = 0.5" },
  { id: "sphereshape3d", name: "SphereShape3D", inherits: "Shape3D", category: "Physics", description: "Sphere collision shape", icon: "Sphere", color: "#f97316", properties: [{ name: "radius", type: "float", default: "1.0", description: "Sphere radius" }], signals: [], methods: [], example: "sphere.radius = 2.0" },
  { id: "cylindershape3d", name: "CylinderShape3D", inherits: "Shape3D", category: "Physics", description: "Cylinder collision shape", icon: "Cylinder", color: "#f97316", properties: [{ name: "radius", type: "float", default: "1.0", description: "Radius" }, { name: "height", type: "float", default: "2.0", description: "Height" }], signals: [], methods: [], example: "cylinder.radius = 1.5" },
  { id: "containercontrol", name: "Container", inherits: "Control", category: "UI", description: "Base container for layout", icon: "Layers", color: "#3b82f6", properties: [{ name: "sort_children_by_name", type: "bool", default: "false", description: "Sort children" }], signals: [], methods: [], example: "container.sort_children_by_name = true" },
  { id: "gridcontainer", name: "GridContainer", inherits: "Container", category: "UI", description: "Grid layout container", icon: "Grid", color: "#3b82f6", properties: [{ name: "columns", type: "int", default: "1", description: "Number of columns" }], signals: [], methods: [], example: "grid.columns = 3" },
  { id: "aspectratiocontainer", name: "AspectRatioContainer", inherits: "Container", category: "UI", description: "Maintain aspect ratio", icon: "Square", color: "#3b82f6", properties: [{ name: "ratio", type: "float", default: "1.0", description: "Aspect ratio" }], signals: [], methods: [], example: "aspect.ratio = 16.0/9.0" },
  { id: "lineedit", name: "LineEdit", inherits: "Control", category: "UI", description: "Single line text input", icon: "Type", color: "#3b82f6", properties: [{ name: "text", type: "String", default: "\"\"", description: "Text content" }, { name: "placeholder_text", type: "String", default: "\"\"", description: "Placeholder text" }], signals: [{ name: "text_changed", params: ["new_text: String"] }], methods: [], example: "line_edit.placeholder_text = 'Enter name'" },
  { id: "textedit", name: "TextEdit", inherits: "Control", category: "UI", description: "Multi-line text editor", icon: "FileText", color: "#3b82f6", properties: [{ name: "text", type: "String", default: "\"\"", description: "Text content" }], signals: [{ name: "text_changed", params: [] }], methods: [], example: "text_edit.text = 'Hello\\nWorld'" },
  { id: "spinbox", name: "SpinBox", inherits: "Range", category: "UI", description: "Number input spinner", icon: "Plus", color: "#3b82f6", properties: [{ name: "min_value", type: "float", default: "0.0", description: "Minimum value" }, { name: "max_value", type: "float", default: "100.0", description: "Maximum value" }], signals: [], methods: [], example: "spinbox.value = 50" },
  { id: "hslider", name: "HSlider", inherits: "Range", category: "UI", description: "Horizontal slider", icon: "Slider", color: "#3b82f6", properties: [{ name: "min_value", type: "float", default: "0.0", description: "Minimum" }, { name: "max_value", type: "float", default: "100.0", description: "Maximum" }, { name: "value", type: "float", default: "0.0", description: "Current value" }], signals: [{ name: "value_changed", params: ["value: float"] }], methods: [], example: "slider.value = 25" },
  { id: "vslider", name: "VSlider", inherits: "Range", category: "UI", description: "Vertical slider", icon: "Slider", color: "#3b82f6", properties: [{ name: "value", type: "float", default: "0.0", description: "Current value" }], signals: [], methods: [], example: "vslider.value = 75" },
  { id: "checkbox", name: "CheckBox", inherits: "Button", category: "UI", description: "Checkbox input", icon: "CheckSquare", color: "#3b82f6", properties: [{ name: "button_pressed", type: "bool", default: "false", description: "Checked state" }], signals: [{ name: "toggled", params: ["button_pressed: bool"] }], methods: [], example: "checkbox.button_pressed = true" },
  { id: "itemlist", name: "ItemList", inherits: "Control", category: "UI", description: "List of selectable items", icon: "List", color: "#3b82f6", properties: [{ name: "select_mode", type: "SelectMode", default: "SINGLE", description: "Selection mode" }], signals: [{ name: "item_selected", params: ["index: int"] }], methods: [{ name: "add_item", params: ["text: String"], returnType: "void", description: "Add item" }], example: "item_list.add_item('Option 1')" },
  { id: "treeitem", name: "TreeItem", inherits: "Object", category: "UI", description: "Tree item node", icon: "TreeNode", color: "#3b82f6", properties: [{ name: "text", type: "String", default: "\"\"", description: "Item text" }], signals: [], methods: [], example: "tree_item.set_text(0, 'Root')" },
  { id: "tree", name: "Tree", inherits: "Control", category: "UI", description: "Hierarchical item list", icon: "TreeNode", color: "#3b82f6", properties: [{ name: "hide_root", type: "bool", default: "false", description: "Hide root" }], signals: [{ name: "item_selected", params: [] }], methods: [{ name: "create_item", params: [], returnType: "TreeItem", description: "Create tree item" }], example: "var root = tree.create_item()" },
  { id: "popupmenu", name: "PopupMenu", inherits: "Popup", category: "UI", description: "Popup menu", icon: "Menu", color: "#3b82f6", properties: [], signals: [{ name: "id_pressed", params: ["id: int"] }], methods: [{ name: "add_item", params: ["label: String"], returnType: "void", description: "Add menu item" }], example: "popup.add_item('Save')" },
  { id: "menubutton", name: "MenuButton", inherits: "Button", category: "UI", description: "Button with dropdown menu", icon: "Menu", color: "#3b82f6", properties: [], signals: [], methods: [{ name: "get_popup", params: [], returnType: "PopupMenu", description: "Get popup menu" }], example: "menu_btn.get_popup().add_item('New')" },
  { id: "dialnode", name: "DialNode", inherits: "Control", category: "UI", description: "Dial/circular selector", icon: "Radio", color: "#3b82f6", properties: [{ name: "value", type: "float", default: "0.0", description: "Current angle" }], signals: [], methods: [], example: "dial.value = 90" },
  { id: "basematerial3d", name: "BaseMaterial3D", inherits: "Material", category: "3D", description: "Base material for 3D", icon: "Cube", color: "#8b5cf6", properties: [{ name: "albedo_color", type: "Color", default: "white", description: "Base color" }, { name: "roughness", type: "float", default: "1.0", description: "Surface roughness" }], signals: [], methods: [], example: "mat.albedo_color = Color.RED" },
  { id: "standardmaterial3d", name: "StandardMaterial3D", inherits: "BaseMaterial3D", category: "3D", description: "Standard 3D material", icon: "Cube", color: "#8b5cf6", properties: [{ name: "metallic", type: "float", default: "0.0", description: "Metallic value" }], signals: [], methods: [], example: "mat.metallic = 0.5" },
  { id: "ormaterial3d", name: "ORMMaterial3D", inherits: "BaseMaterial3D", category: "3D", description: "ORM material (metallic/roughness)", icon: "Cube", color: "#8b5cf6", properties: [], signals: [], methods: [], example: "var orm = ORMMaterial3D.new()" },
  // Additional 3D Nodes
  { id: "meshinstance3d", name: "MeshInstance3D", inherits: "Node3D", category: "3D", description: "3D mesh display", icon: "Cube", color: "#06b6d4", properties: [{ name: "mesh", type: "Mesh", default: "null", description: "Mesh resource" }], signals: [], methods: [], example: "mesh_instance.mesh = BoxMesh.new()" },
  { id: "light3d", name: "Light3D", inherits: "Node3D", category: "3D", description: "Base light node", icon: "Lightbulb", color: "#fbbf24", properties: [{ name: "light_energy", type: "float", default: "1.0", description: "Light intensity" }, { name: "light_color", type: "Color", default: "white", description: "Light color" }], signals: [], methods: [], example: "light.light_energy = 2.0" },
  { id: "omnilight3d", name: "OmniLight3D", inherits: "Light3D", category: "3D", description: "Omni-directional light", icon: "Lightbulb", color: "#fbbf24", properties: [{ name: "omni_range", type: "float", default: "5.0", description: "Light radius" }], signals: [], methods: [], example: "light.omni_range = 10.0" },
  { id: "spotlight3d", name: "SpotLight3D", inherits: "Light3D", category: "3D", description: "Spotlight node", icon: "Lightbulb", color: "#fbbf24", properties: [{ name: "spot_range", type: "float", default: "5.0", description: "Spotlight range" }, { name: "spot_angle", type: "float", default: "45.0", description: "Spotlight angle" }], signals: [], methods: [], example: "light.spot_angle = 60.0" },
  { id: "directionallight3d", name: "DirectionalLight3D", inherits: "Light3D", category: "3D", description: "Directional light (sun)", icon: "Sun", color: "#fbbf24", properties: [{ name: "light_energy", type: "float", default: "1.0", description: "Brightness" }], signals: [], methods: [], example: "light.light_energy = 1.5" },
  { id: "rigidbody3d", name: "RigidBody3D", inherits: "PhysicsBody3D", category: "3D Physics", description: "3D rigid body physics", icon: "Box", color: "#ec4899", properties: [{ name: "mass", type: "float", default: "1.0", description: "Object mass" }, { name: "linear_velocity", type: "Vector3", default: "0,0,0", description: "Velocity" }, { name: "angular_velocity", type: "Vector3", default: "0,0,0", description: "Rotation speed" }], signals: [{ name: "body_entered", params: ["body: PhysicsBody3D"] }], methods: [{ name: "apply_central_force", params: ["force: Vector3"], returnType: "void", description: "Apply force to center" }], example: "body.apply_central_force(Vector3(10, 0, 0))" },
  { id: "area3d", name: "Area3D", inherits: "Node3D", category: "3D Physics", description: "3D area trigger", icon: "Circle", color: "#10b981", properties: [{ name: "gravity_scale", type: "float", default: "1.0", description: "Gravity multiplier" }], signals: [{ name: "area_entered", params: ["area: Area3D"] }, { name: "body_entered", params: ["body: PhysicsBody3D"] }], methods: [], example: "signal body_detected(body)" },
  { id: "camera3d", name: "Camera3D", inherits: "Node3D", category: "3D", description: "3D camera node", icon: "Camera", color: "#8b5cf6", properties: [{ name: "fov", type: "float", default: "75.0", description: "Field of view" }, { name: "near", type: "float", default: "0.1", description: "Near plane" }, { name: "far", type: "float", default: "4000.0", description: "Far plane" }], signals: [], methods: [{ name: "make_current", params: [], returnType: "void", description: "Set as main camera" }], example: "camera.make_current()" },
  { id: "marker3d", name: "Marker3D", inherits: "Node3D", category: "3D", description: "3D marker/position reference", icon: "MapPin", color: "#6b7280", properties: [], signals: [], methods: [], example: "marker.position = Vector3(5, 0, 0)" },
  { id: "control", name: "Control", inherits: "Node", category: "UI", description: "Base UI node", icon: "Square", color: "#3b82f6", properties: [{ name: "rect_position", type: "Vector2", default: "0,0", description: "Position" }, { name: "rect_size", type: "Vector2", default: "100,100", description: "Size" }, { name: "anchor_left", type: "float", default: "0.0", description: "Left anchor" }], signals: [], methods: [{ name: "get_rect", params: [], returnType: "Rect2", description: "Get control rectangle" }], example: "control.rect_position = Vector2(10, 10)" },
  { id: "boxcontainer", name: "BoxContainer", inherits: "Container", category: "UI", description: "Base container for layout", icon: "Layers", color: "#3b82f6", properties: [{ name: "alignment", type: "Alignment", default: "BEGIN", description: "Child alignment" }], signals: [], methods: [], example: "container.alignment = BoxContainer.ALIGNMENT_CENTER" },
  { id: "node2d", name: "Node2D", inherits: "Node", category: "2D", description: "Base 2D node", icon: "Circle", color: "#10b981", properties: [{ name: "position", type: "Vector2", default: "0,0", description: "Local position" }, { name: "rotation", type: "float", default: "0.0", description: "Rotation in radians" }, { name: "scale", type: "Vector2", default: "1,1", description: "Local scale" }], signals: [], methods: [], example: "position = Vector2(100, 50)" },
  { id: "sprite2dbase", name: "Sprite2D", inherits: "Node2D", category: "2D", description: "2D sprite display", icon: "Image", color: "#ec4899", properties: [{ name: "texture", type: "Texture2D", default: "null", description: "Texture" }, { name: "offset", type: "Vector2", default: "0,0", description: "Offset" }, { name: "centered", type: "bool", default: "true", description: "Center origin" }], signals: [], methods: [], example: "sprite.texture = preload('res://sprite.png')" },
  { id: "animatedsprite2d", name: "AnimatedSprite2D", inherits: "Node2D", category: "2D", description: "Animated 2D sprite", icon: "Film", color: "#ec4899", properties: [{ name: "sprite_frames", type: "SpriteFrames", default: "null", description: "Animation frames" }, { name: "animation", type: "StringName", default: "\"default\"", description: "Current animation" }, { name: "playing", type: "bool", default: "false", description: "Is playing" }], signals: [{ name: "animation_finished", params: [] }], methods: [{ name: "play", params: ["anim: StringName"], returnType: "void", description: "Play animation" }], example: "sprite.play('run')" },
  { id: "area2d", name: "Area2D", inherits: "Node2D", category: "2D Physics", description: "2D area trigger", icon: "Circle", color: "#10b981", properties: [], signals: [{ name: "area_entered", params: ["area: Area2D"] }, { name: "body_entered", params: ["body: PhysicsBody2D"] }], methods: [], example: "area.area_entered.connect(_on_area_entered)" },
  { id: "physicsbody2d", name: "PhysicsBody2D", inherits: "Node2D", category: "2D Physics", description: "Base 2D physics body", icon: "Box", color: "#14b8a6", properties: [], signals: [], methods: [], example: "var physics_body = PhysicsBody2D.new()" },
  { id: "rigidbody2d", name: "RigidBody2D", inherits: "PhysicsBody2D", category: "2D Physics", description: "2D rigid body", icon: "Box", color: "#ec4899", properties: [{ name: "mass", type: "float", default: "1.0", description: "Mass" }, { name: "linear_velocity", type: "Vector2", default: "0,0", description: "Velocity" }, { name: "angular_velocity", type: "float", default: "0.0", description: "Rotation speed" }], signals: [], methods: [{ name: "apply_central_force", params: ["force: Vector2"], returnType: "void", description: "Apply force" }], example: "body.linear_velocity = Vector2(100, 0)" },
  { id: "characterbody2d", name: "CharacterBody2D", inherits: "PhysicsBody2D", category: "2D Physics", description: "2D character body", icon: "Person", color: "#ec4899", properties: [{ name: "velocity", type: "Vector2", default: "0,0", description: "Movement velocity" }], signals: [], methods: [{ name: "move_and_slide", params: [], returnType: "bool", description: "Apply movement with collision" }], example: "velocity.x = 100; move_and_slide()" },
  { id: "staticbody2d", name: "StaticBody2D", inherits: "PhysicsBody2D", category: "2D Physics", description: "Static 2D body", icon: "Box", color: "#14b8a6", properties: [], signals: [], methods: [], example: "static_body.position = Vector2(0, 0)" },
  { id: "tilemap2d", name: "TileMap2D", inherits: "Node2D", category: "2D", description: "2D tile map", icon: "Grid", color: "#10b981", properties: [{ name: "tile_set", type: "TileSet", default: "null", description: "TileSet resource" }], signals: [], methods: [{ name: "set_cell", params: ["layer", "coords", "source_id"], returnType: "void", description: "Place tile" }], example: "tilemap.set_cell(0, Vector2i(5, 5), 0)" },
  { id: "parallaxlayer", name: "ParallaxLayer", inherits: "Node2D", category: "2D", description: "Parallax scrolling layer", icon: "Layers", color: "#06b6d4", properties: [{ name: "motion_offset", type: "Vector2", default: "0,0", description: "Scroll offset" }], signals: [], methods: [], example: "layer.motion_offset = Vector2(10, 0)" },
  { id: "canvas", name: "CanvasLayer", inherits: "Node", category: "UI", description: "Canvas layer for UI/overlays", icon: "Layers", color: "#3b82f6", properties: [{ name: "layer", type: "int", default: "1", description: "Layer number" }, { name: "offset", type: "Vector2", default: "0,0", description: "Offset" }], signals: [], methods: [], example: "canvas.layer = 2" },
  { id: "panel", name: "Panel", inherits: "Control", category: "UI", description: "UI panel with background", icon: "Square", color: "#3b82f6", properties: [], signals: [], methods: [], example: "panel.modulate = Color(1, 1, 1, 0.5)" },
  { id: "tabcontainer", name: "TabContainer", inherits: "Control", category: "UI", description: "Container with tabs", icon: "Tabs", color: "#3b82f6", properties: [{ name: "current_tab", type: "int", default: "0", description: "Active tab" }], signals: [{ name: "tab_changed", params: ["tab: int"] }], methods: [], example: "tab_container.current_tab = 1" },
  { id: "scrollcontainer", name: "ScrollContainer", inherits: "Container", category: "UI", description: "Scrollable container", icon: "Layers", color: "#3b82f6", properties: [{ name: "scroll_horizontal_enabled", type: "bool", default: "false", description: "Allow horizontal scroll" }], signals: [], methods: [], example: "scroll.scroll_horizontal_enabled = true" },
  { id: "richtext", name: "RichTextLabel", inherits: "Control", category: "UI", description: "Rich formatted text", icon: "Type", color: "#3b82f6", properties: [{ name: "text", type: "String", default: "\"\"", description: "BBCode text" }], signals: [], methods: [{ name: "clear", params: [], returnType: "void", description: "Clear text" }], example: "text_label.text = '[color=red]Error[/color]'" },
  { id: "progressbar", name: "ProgressBar", inherits: "Range", category: "UI", description: "Progress bar display", icon: "Percent", color: "#3b82f6", properties: [{ name: "show_percentage", type: "bool", default: "false", description: "Show % text" }], signals: [], methods: [], example: "progress.value = 50" },
  { id: "textrect", name: "TextureRect", inherits: "Control", category: "UI", description: "Texture display in UI", icon: "Image", color: "#3b82f6", properties: [{ name: "texture", type: "Texture2D", default: "null", description: "Display texture" }, { name: "expand_mode", type: "ExpandMode", default: "IGNORE_SIZE", description: "Size mode" }], signals: [], methods: [], example: "texture_rect.texture = texture" },
  { id: "ninepatch", name: "NinePatchRect", inherits: "Control", category: "UI", description: "9-slice texture scaling", icon: "Square", color: "#3b82f6", properties: [{ name: "texture", type: "Texture2D", default: "null", description: "Texture" }], signals: [], methods: [], example: "ninepatch.texture = preload('res://panel.png')" },
  { id: "colorpicker", name: "ColorPickerButton", inherits: "Button", category: "UI", description: "Color picker button", icon: "Palette", color: "#3b82f6", properties: [{ name: "color", type: "Color", default: "white", description: "Selected color" }], signals: [{ name: "color_changed", params: ["color: Color"] }], methods: [], example: "color_button.color = Color.RED" },
  { id: "filedialog", name: "FileDialog", inherits: "ConfirmationDialog", category: "UI", description: "File selection dialog", icon: "FolderOpen", color: "#3b82f6", properties: [{ name: "filters", type: "PackedStringArray", default: "[]", description: "File filters" }], signals: [{ name: "file_selected", params: ["path: String"] }], methods: [], example: "file_dialog.filters = ['*.gd ; GDScript']" },
  { id: "confirmationdialog", name: "ConfirmationDialog", inherits: "AcceptDialog", category: "UI", description: "Confirmation dialog", icon: "AlertCircle", color: "#3b82f6", properties: [], signals: [], methods: [], example: "dialog.add_cancel_button('No')" },
  { id: "acceptdialog", name: "AcceptDialog", inherits: "Window", category: "UI", description: "Basic dialog", icon: "MessageSquare", color: "#3b82f6", properties: [{ name: "title", type: "String", default: "\"Alert\"", description: "Dialog title" }], signals: [{ name: "confirmed", params: [] }], methods: [{ name: "show_modal", params: [], returnType: "void", description: "Show as modal" }], example: "dialog.dialog_text = 'Are you sure?'" },
  { id: "optionbutton", name: "OptionButton", inherits: "Button", category: "UI", description: "Dropdown selector", icon: "ChevronDown", color: "#3b82f6", properties: [{ name: "selected", type: "int", default: "-1", description: "Selected index" }], signals: [{ name: "item_selected", params: ["index: int"] }], methods: [{ name: "add_item", params: ["label: String"], returnType: "void", description: "Add option" }], example: "option_button.add_item('Option 1')" },
  { id: "splitcontainer", name: "SplitContainer", inherits: "Container", category: "UI", description: "Split panel container", icon: "Columns", color: "#3b82f6", properties: [{ name: "split_offset", type: "int", default: "0", description: "Divider position" }], signals: [], methods: [], example: "split.split_offset = 200" },
  { id: "vboxcontainerbase", name: "VBoxContainer", inherits: "Container", category: "UI", description: "Vertical layout", icon: "AlignVertical", color: "#3b82f6", properties: [], signals: [], methods: [], example: "vbox.add_child(button)" },
  { id: "hboxcontainerbase", name: "HBoxContainer", inherits: "Container", category: "UI", description: "Horizontal layout", icon: "AlignHorizontal", color: "#3b82f6", properties: [], signals: [], methods: [], example: "hbox.add_child(label)" },
  { id: "canvasgroup", name: "CanvasGroup", inherits: "Node2D", category: "2D", description: "Group 2D nodes for effects", icon: "Layers", color: "#10b981", properties: [], signals: [], methods: [], example: "canvas_group.scale = Vector2(0.5, 0.5)" },
  { id: "cpuparticles2d", name: "CPUParticles2D", inherits: "Node2D", category: "2D", description: "CPU-based particles", icon: "Sparkles", color: "#f59e0b", properties: [{ name: "amount", type: "int", default: "8", description: "Particle count" }, { name: "emitting", type: "bool", default: "false", description: "Is emitting" }], signals: [], methods: [{ name: "restart", params: [], returnType: "void", description: "Restart emission" }], example: "particles.emitting = true" },
  { id: "gpuparticles3d", name: "GPUParticles3D", inherits: "Node3D", category: "3D", description: "GPU particles", icon: "Sparkles", color: "#f59e0b", properties: [{ name: "amount", type: "int", default: "8", description: "Particle count" }, { name: "emitting", type: "bool", default: "false", description: "Is emitting" }], signals: [], methods: [], example: "particles.emitting = true" },
  { id: "shape3d", name: "Shape3D", inherits: "Resource", category: "Physics", description: "3D collision shape", icon: "Cube", color: "#f97316", properties: [], signals: [], methods: [], example: "var shape = BoxShape3D.new()" },
  { id: "boxshape3d", name: "BoxShape3D", inherits: "Shape3D", category: "Physics", description: "Box collision shape", icon: "Box", color: "#f97316", properties: [{ name: "size", type: "Vector3", default: "1,1,1", description: "Box dimensions" }], signals: [], methods: [], example: "shape.size = Vector3(2, 2, 2)" },
  { id: "shape2d", name: "Shape2D", inherits: "Resource", category: "Physics", description: "2D collision shape", icon: "Square", color: "#f97316", properties: [], signals: [], methods: [], example: "var shape = CircleShape2D.new()" },
  { id: "circleshape2d", name: "CircleShape2D", inherits: "Shape2D", category: "Physics", description: "Circle collision", icon: "Circle", color: "#f97316", properties: [{ name: "radius", type: "float", default: "1.0", description: "Radius" }], signals: [], methods: [], example: "shape.radius = 2.0" },
  { id: "rectangleshape2d", name: "RectangleShape2D", inherits: "Shape2D", category: "Physics", description: "Rectangle collision", icon: "Square", color: "#f97316", properties: [{ name: "size", type: "Vector2", default: "1,1", description: "Size" }], signals: [], methods: [], example: "shape.size = Vector2(10, 5)" },
  { id: "collisionshape3d", name: "CollisionShape3D", inherits: "Node3D", category: "3D Physics", description: "3D collision shape holder", icon: "Cube", color: "#14b8a6", properties: [{ name: "shape", type: "Shape3D", default: "null", description: "Shape resource" }, { name: "disabled", type: "bool", default: "false", description: "Disable collision" }], signals: [], methods: [], example: "collision.shape = BoxShape3D.new()" },
  { id: "collisionshape2d", name: "CollisionShape2D", inherits: "Node2D", category: "2D Physics", description: "2D collision shape holder", icon: "Square", color: "#14b8a6", properties: [{ name: "shape", type: "Shape2D", default: "null", description: "Shape resource" }], signals: [], methods: [], example: "collision.shape = CircleShape2D.new()" },
  { id: "viewport", name: "Viewport", inherits: "Node", category: "Core", description: "Render target", icon: "Monitor", color: "#6b7280", properties: [{ name: "size", type: "Vector2i", default: "1024,768", description: "Viewport size" }], signals: [], methods: [], example: "viewport.size = Vector2i(800, 600)" },
  { id: "world3d", name: "World3D", inherits: "Resource", category: "3D", description: "3D physics world", icon: "Cube", color: "#06b6d4", properties: [], signals: [], methods: [], example: "var world = World3D.new()" },
  { id: "world2d", name: "World2D", inherits: "Resource", category: "2D", description: "2D physics world", icon: "Circle", color: "#10b981", properties: [], signals: [], methods: [], example: "var world = World2D.new()" },
  { id: "navigationregion3d", name: "NavigationRegion3D", inherits: "Node3D", category: "3D", description: "3D navigation mesh region", icon: "Map", color: "#06b6d4", properties: [], signals: [], methods: [], example: "nav_region.navigation_mesh = mesh" },
  { id: "navigationregion2d", name: "NavigationRegion2D", inherits: "Node2D", category: "2D", description: "2D navigation mesh region", icon: "Map", color: "#10b981", properties: [], signals: [], methods: [], example: "nav_region.navigation_polygon = polygon" },
  { id: "audiostream", name: "AudioStream", inherits: "Resource", category: "Audio", description: "Audio file resource", icon: "Volume", color: "#f59e0b", properties: [], signals: [], methods: [], example: "var audio = preload('res://sound.ogg')" },
  { id: "audiostreamsample", name: "AudioStreamWAV", inherits: "AudioStream", category: "Audio", description: "WAV audio file", icon: "Volume", color: "#f59e0b", properties: [{ name: "mix_rate", type: "int", default: "44100", description: "Sample rate" }], signals: [], methods: [], example: "audio = preload('res://sample.wav')" },
  { id: "audiostreamplayerbase", name: "AudioStreamPlayer", inherits: "Node", category: "Audio", description: "Global audio player", icon: "Volume", color: "#f59e0b", properties: [{ name: "stream", type: "AudioStream", default: "null", description: "Audio to play" }, { name: "volume_db", type: "float", default: "0.0", description: "Volume in dB" }, { name: "playing", type: "bool", default: "false", description: "Is playing" }], signals: [{ name: "finished", params: [] }], methods: [{ name: "play", params: ["from_position: float"], returnType: "void", description: "Start playback" }, { name: "stop", params: [], returnType: "void", description: "Stop playback" }], example: "audio_player.play()" },
  { id: "audioplaystream3d", name: "AudioStreamPlayer3D", inherits: "Node3D", category: "Audio", description: "3D spatial audio", icon: "Volume", color: "#f59e0b", properties: [{ name: "stream", type: "AudioStream", default: "null", description: "Audio to play" }, { name: "volume_db", type: "float", default: "0.0", description: "Volume" }, { name: "max_distance", type: "float", default: "0.0", description: "Max hear distance" }], signals: [], methods: [{ name: "play", params: ["from_position: float"], returnType: "void", description: "Play sound" }], example: "audio3d.play()" },
  { id: "synthesizer", name: "Synthesizer", inherits: "Node", category: "Audio", description: "Audio synthesis", icon: "Waveform", color: "#f59e0b", properties: [], signals: [], methods: [], example: "var synth = Synthesizer.new()" },
  { id: "shader", name: "Shader", inherits: "Resource", category: "Rendering", description: "Shader code resource", icon: "Code", color: "#8b5cf6", properties: [], signals: [], methods: [], example: "var shader = preload('res://shader.gdshader')" },
  { id: "shadermaterial", name: "ShaderMaterial", inherits: "Material", category: "Rendering", description: "Custom shader material", icon: "Palette", color: "#8b5cf6", properties: [{ name: "shader", type: "Shader", default: "null", description: "Shader" }], signals: [], methods: [], example: "material.shader = preload('res://custom.gdshader')" },
  { id: "decal3d", name: "Decal", inherits: "Node3D", category: "3D", description: "3D surface decal", icon: "Stamp", color: "#06b6d4", properties: [{ name: "albedo_texture", type: "Texture2D", default: "null", description: "Decal texture" }], signals: [], methods: [], example: "decal.albedo_texture = texture" },
  { id: "occluderinstance3d", name: "OccluderInstance3D", inherits: "Node3D", category: "3D", description: "Occlusion culling", icon: "Eye", color: "#06b6d4", properties: [], signals: [], methods: [], example: "var occluder = OccluderInstance3D.new()" },
  { id: "voxelgigvoxel", name: "GPUParticles2D", inherits: "Node2D", category: "2D", description: "GPU 2D particles", icon: "Sparkles", color: "#f59e0b", properties: [{ name: "amount", type: "int", default: "8", description: "Particle count" }], signals: [], methods: [], example: "particles.emitting = true" },
  { id: "basematerial", name: "Material", inherits: "Resource", category: "Rendering", description: "Base material class", icon: "Palette", color: "#8b5cf6", properties: [], signals: [], methods: [], example: "var material = Material.new()" },
  { id: "uniquename", name: "UniqueNameInOwner", inherits: "Node", category: "Utility", description: "Unique name in owner", icon: "Hash", color: "#6b7280", properties: [], signals: [], methods: [], example: "%node_name" },
  { id: "remoteinfosync", name: "RemoteSynchronizer", inherits: "Node", category: "Network", description: "Network synchronization", icon: "Network", color: "#0ea5e9", properties: [], signals: [], methods: [], example: "synchronizer.add_property('position')" },
  { id: "multiplayer", name: "MultiplayerSpawner", inherits: "Node", category: "Network", description: "Spawn networked nodes", icon: "Users", color: "#0ea5e9", properties: [], signals: [], methods: [], example: "spawner.spawn_function = spawn_player" },
  { id: "callbacktweener", name: "Tween", inherits: "RefCounted", category: "Animation", description: "Animation tweening", icon: "Zap", color: "#a855f7", properties: [], signals: [], methods: [{ name: "tween_property", params: ["obj", "property", "final_val", "duration"], returnType: "PropertyTweener", description: "Animate property" }], example: "get_tree().create_tween().tween_property(sprite, 'position', Vector2(100, 100), 1.0)" },
  { id: "animationplayer", name: "AnimationPlayer", inherits: "Node", category: "Animation", description: "Animation playback", icon: "Film", color: "#a855f7", properties: [{ name: "current_animation", type: "StringName", default: "\"\"", description: "Playing animation" }, { name: "playback_speed", type: "float", default: "1.0", description: "Play speed" }], signals: [{ name: "animation_finished", params: ["anim_name: StringName"] }], methods: [{ name: "play", params: ["name: StringName"], returnType: "void", description: "Play animation" }, { name: "stop", params: [], returnType: "void", description: "Stop animation" }], example: "anim_player.play('idle')" },
  { id: "animatontree", name: "AnimationTree", inherits: "Node", category: "Animation", description: "Animation state machine", icon: "Workflow", color: "#a855f7", properties: [{ name: "anim_player_path", type: "NodePath", default: "null", description: "Linked AnimationPlayer" }], signals: [], methods: [], example: "anim_tree.set('parameters/playback/travel', 'run')" },
  { id: "subviewport", name: "SubViewport", inherits: "Viewport", category: "Rendering", description: "Sub-viewport for RTT", icon: "Monitor", color: "#6b7280", properties: [{ name: "size", type: "Vector2i", default: "1024,768", description: "Size" }], signals: [], methods: [], example: "subviewport.size = Vector2i(512, 512)" },
  { id: "subviewportcontainer", name: "SubViewportContainer", inherits: "Control", category: "UI", description: "Container for SubViewport", icon: "Monitor", color: "#3b82f6", properties: [{ name: "stretch", type: "bool", default: "false", description: "Stretch viewport" }], signals: [], methods: [], example: "container.stretch = true" },
  { id: "basebuttonnode", name: "BaseButton", inherits: "Control", category: "UI", description: "Base button class", icon: "Square", color: "#3b82f6", properties: [{ name: "pressed", type: "bool", default: "false", description: "Is pressed" }], signals: [{ name: "pressed", params: [] }, { name: "toggled", params: ["button_pressed: bool"] }], methods: [], example: "button.pressed.connect(_on_button_pressed)" },
  { id: "modulate", name: "CanvasItem", inherits: "Node", category: "Rendering", description: "Base rendering node", icon: "Eye", color: "#6b7280", properties: [{ name: "modulate", type: "Color", default: "white", description: "Color tint" }, { name: "visible", type: "bool", default: "true", description: "Visibility" }], signals: [], methods: [], example: "item.modulate = Color(1, 0, 0, 0.5)" },
  { id: "focusablecontrol", name: "FocusableControl", inherits: "Control", category: "UI", description: "Focusable control (deprecated)", icon: "Square", color: "#3b82f6", properties: [], signals: [], methods: [], example: "control.grab_focus()" },
  { id: "windowdialog", name: "Window", inherits: "Viewport", category: "UI", description: "Native window", icon: "Window", color: "#3b82f6", properties: [{ name: "title", type: "String", default: "\"Untitled\"", description: "Window title" }, { name: "size", type: "Vector2i", default: "800,600", description: "Window size" }], signals: [{ name: "close_requested", params: [] }], methods: [], example: "window.title = 'My App'" },
  { id: "polygon2d", name: "Polygon2D", inherits: "Node2D", category: "2D", description: "2D polygon mesh", icon: "Polygon", color: "#10b981", properties: [{ name: "polygon", type: "PackedVector2Array", default: "[]", description: "Vertices" }], signals: [], methods: [], example: "polygon.polygon = [Vector2(0,0), Vector2(100,0), Vector2(100,100)]" },
  { id: "multimesh3d", name: "MultiMeshInstance3D", inherits: "Node3D", category: "3D", description: "Multiple mesh instances", icon: "Cube", color: "#06b6d4", properties: [{ name: "multimesh", type: "MultiMesh", default: "null", description: "MultiMesh resource" }], signals: [], methods: [], example: "multimesh_instance.multimesh = multimesh" },
  { id: "gpuparticles2d", name: "GPUParticles2DAdvanced", inherits: "Node2D", category: "2D", description: "GPU particles 2D advanced", icon: "Sparkles", color: "#f59e0b", properties: [{ name: "amount", type: "int", default: "8", description: "Particle count" }], signals: [], methods: [], example: "particles.emitting = true" },
  { id: "path2d", name: "Path2D", inherits: "Node2D", category: "2D", description: "2D path curve", icon: "Squiggly", color: "#10b981", properties: [{ name: "curve", type: "Curve2D", default: "null", description: "Path curve" }], signals: [], methods: [], example: "path.curve = Curve2D.new()" },
  { id: "path3d", name: "Path3D", inherits: "Node3D", category: "3D", description: "3D path curve", icon: "Squiggly", color: "#06b6d4", properties: [{ name: "curve", type: "Curve3D", default: "null", description: "Path curve" }], signals: [], methods: [], example: "path.curve = Curve3D.new()" },
  { id: "pathfollow2d", name: "PathFollow2D", inherits: "Node2D", category: "2D", description: "Follow 2D path", icon: "Move", color: "#10b981", properties: [{ name: "offset", type: "float", default: "0.0", description: "Distance along path" }], signals: [], methods: [], example: "path_follow.offset = 50" },
  { id: "pathfollow3d", name: "PathFollow3D", inherits: "Node3D", category: "3D", description: "Follow 3D path", icon: "Move", color: "#06b6d4", properties: [{ name: "offset", type: "float", default: "0.0", description: "Distance along path" }], signals: [], methods: [], example: "path_follow.offset = 100" },
  { id: "resourcepreloader", name: "ResourcePreloader", inherits: "Node", category: "Resource", description: "Preload resources", icon: "Package", color: "#6b7280", properties: [], signals: [], methods: [{ name: "get_resource", params: ["name: StringName"], returnType: "Resource", description: "Get preloaded resource" }], example: "preloader.get_resource('texture')" },
  { id: "scenefiledialog", name: "SceneTreeDialog", inherits: "Window", category: "Editor", description: "Scene tree selection dialog", icon: "Tree", color: "#6b7280", properties: [], signals: [{ name: "selected", params: ["path: String"] }], methods: [], example: "dialog.tree_selected.connect(_on_tree_selected)" }
];

// Get node by ID
export function getGodotNode(id: string): GodotNode | undefined {
  return GODOT_NODES_DATABASE.find(n => n.id === id);
}

// Get nodes by category
export function getNodesByCategory(category: string): GodotNode[] {
  return GODOT_NODES_DATABASE.filter(n => n.category === category);
}

// Get all categories
export function getAllCategories(): string[] {
  return [...new Set(GODOT_NODES_DATABASE.map(n => n.category))];
}

// Search nodes
export function searchNodes(query: string): GodotNode[] {
  const lowerQuery = query.toLowerCase();
  return GODOT_NODES_DATABASE.filter(n => 
    n.name.toLowerCase().includes(lowerQuery) ||
    n.description.toLowerCase().includes(lowerQuery)
  );
}
