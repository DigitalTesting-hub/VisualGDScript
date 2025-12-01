# Flowchart Node System - Complete Setup Guide

## Architecture: Hardcoded + Optional AI Enhancement

All flowchart node generation is **100% hardcoded** for deterministic, reliable output. Optional AI enhancement available for refinements.

---

## Node Type Schema (23 Core Nodes + 4 Extensible)

### **1. FLOW CONTROL NODES** (5 nodes)

#### `start` - Entry Point
- **Category**: Flow Control
- **Inputs**: None
- **Outputs**: Execute (execution)
- **GDScript**: `func _ready(): ...`
- **One-Liner**: Entry point when scene starts
- **Example**: Game initialization

#### `event` - Event Trigger
- **Category**: Flow Control
- **Inputs**: 
  - `event_type` (enum: ready, process, physics_process, input, unhandled_input)
- **Outputs**: Execute (execution)
- **GDScript**: `func _{{event_type}}(...): ...`
- **One-Liner**: Triggered on specific lifecycle event
- **Example**: `_process(delta)` called every frame

#### `if` - Conditional Branch
- **Category**: Flow Control
- **Inputs**: 
  - `condition` (string): Boolean expression
- **Outputs**: 
  - True (execution)
  - False (execution)
- **GDScript**: `if {{condition}}: ... else: ...`
- **One-Liner**: Branch execution based on condition
- **Example**: `if health > 0: alive else: dead`

#### `loop_for` - Fixed Iteration
- **Category**: Flow Control
- **Inputs**: 
  - `count` (number): How many times to loop
- **Outputs**: 
  - Loop Body (execution)
  - Complete (execution)
- **GDScript**: `for i in range({{count}}): ...`
- **One-Liner**: Repeat N times
- **Example**: `for i in range(10): spawn_enemy()`

#### `loop_while` - Conditional Loop
- **Category**: Flow Control
- **Inputs**: 
  - `condition` (string): Boolean expression
- **Outputs**: 
  - Loop Body (execution)
  - Complete (execution)
- **GDScript**: `while {{condition}}: ...`
- **One-Liner**: Repeat while condition true
- **Example**: `while health > 0: attack()`

---

### **2. VARIABLE NODES** (2 nodes)

#### `var_get` - Read Variable
- **Inputs**: 
  - `var_name` (string): Variable name to read
- **Outputs**: 
  - Value (string/number)
  - Execute (execution)
- **GDScript**: `var result = {{var_name}}`
- **One-Liner**: Get variable value
- **Example**: `var current_health = health`

#### `var_set` - Write Variable
- **Inputs**: 
  - `var_name` (string): Variable name
  - `value` (string): New value
- **Outputs**: Execute (execution)
- **GDScript**: `{{var_name}} = {{value}}`
- **One-Liner**: Set variable value
- **Example**: `health = 100`

---

### **3. MOVEMENT NODES** (3 nodes)

#### `move_velocity` - Apply Velocity
- **Inputs**: 
  - `velocity_x` (number)
  - `velocity_y` (number)
  - `velocity_z` (number)
- **Outputs**: Execute (execution)
- **GDScript**: `velocity = Vector3({{x}}, {{y}}, {{z}})`
- **One-Liner**: Set movement velocity
- **Example**: `velocity = Vector3(10, 0, 5)`

#### `move_and_slide` - Move with Collision
- **Inputs**: None
- **Outputs**: 
  - Collision (boolean)
  - No Collision (boolean)
  - Execute (execution)
- **GDScript**: `var collision_occurred = move_and_slide()`
- **One-Liner**: Move and handle collisions
- **Example**: CharacterBody3D movement

#### `is_on_floor` - Floor Detection
- **Inputs**: None
- **Outputs**: 
  - On Floor (boolean)
  - In Air (boolean)
- **GDScript**: `if is_on_floor(): ... else: ...`
- **One-Liner**: Check if grounded
- **Example**: Jumping only when on ground

---

### **4. PHYSICS NODES** (2 nodes)

#### `apply_gravity` - Gravity Force
- **Inputs**: 
  - `gravity` (number): Gravity magnitude
- **Outputs**: Execute (execution)
- **GDScript**: `velocity.y -= {{gravity}} * delta`
- **One-Liner**: Apply downward gravity
- **Example**: `velocity.y -= 9.8 * delta`

#### `apply_force` - Apply Force
- **Inputs**: 
  - `force_x` (number)
  - `force_y` (number)
  - `force_z` (number)
- **Outputs**: Execute (execution)
- **GDScript**: `apply_force(Vector3({{x}}, {{y}}, {{z}}))`
- **One-Liner**: Apply impulse to RigidBody3D
- **Example**: `apply_force(Vector3(100, 0, 0))`

---

### **5. COLLISION NODES** (1 node)

#### `collision_detect` - Collision Event
- **Inputs**: 
  - `collision_type` (enum: body_entered, body_exited, area_entered, area_exited)
- **Outputs**: 
  - Collider (string): Collided object
  - Execute (execution)
- **GDScript**: `func _on_{{type}}(body): ...`
- **One-Liner**: Handle collision event
- **Example**: `func _on_body_entered(body): hit_object = body`

---

### **6. ANIMATION NODES** (2 nodes)

#### `play_animation` - Play Animation
- **Inputs**: 
  - `anim_name` (string): Animation name
  - `speed` (number): Playback speed (optional)
- **Outputs**: Execute (execution)
- **GDScript**: `animation_player.play("{{name}}", -1, {{speed}})`
- **One-Liner**: Play animation clip
- **Example**: `animation_player.play('run', -1, 1.5)`

#### `stop_animation` - Stop Animation
- **Inputs**: None
- **Outputs**: Execute (execution)
- **GDScript**: `animation_player.stop()`
- **One-Liner**: Stop current animation
- **Example**: Pause animation

---

### **7. AUDIO NODES** (1 node)

#### `play_audio` - Play Sound
- **Inputs**: 
  - `audio_path` (string): Path to audio file
- **Outputs**: Execute (execution)
- **GDScript**: `audio_player.stream = preload("{{path}}")\naudio_player.play()`
- **One-Liner**: Play sound effect
- **Example**: `audio_player.stream = preload('res://hit.ogg')`

---

### **8. INPUT NODES** (1 node)

#### `input_action` - Check Input
- **Inputs**: 
  - `action_name` (string): Input action name
  - `action_type` (enum: pressed, just_pressed, just_released)
- **Outputs**: 
  - Yes (boolean)
  - No (boolean)
- **GDScript**: `if Input.is_action_{{type}}("{{action}}"): ... else: ...`
- **One-Liner**: Check if input pressed
- **Example**: `if Input.is_action_pressed('ui_right'): move_right()`

---

### **9. MATH NODES** (1 node)

#### `math_op` - Math Operation
- **Inputs**: 
  - `value_a` (number)
  - `operation` (enum: +, -, *, /)
  - `value_b` (number)
- **Outputs**: Result (number)
- **GDScript**: `result = {{a}} {{op}} {{b}}`
- **One-Liner**: Basic arithmetic
- **Example**: `result = 10 + 5`

---

### **10. LOGIC NODES** (2 nodes)

#### `logic_and` - AND Gate
- **Inputs**: 
  - `a` (boolean)
  - `b` (boolean)
- **Outputs**: Result (boolean)
- **GDScript**: `result = {{a}} and {{b}}`
- **One-Liner**: Logical AND
- **Example**: `if has_weapon and ammo > 0: fire()`

#### `logic_or` - OR Gate
- **Inputs**: 
  - `a` (boolean)
  - `b` (boolean)
- **Outputs**: Result (boolean)
- **GDScript**: `result = {{a}} or {{b}}`
- **One-Liner**: Logical OR
- **Example**: `if is_dead or is_frozen: skip_turn()`

---

### **11. TIMING NODES** (1 node)

#### `timer_start` - Delay Execution
- **Inputs**: 
  - `duration` (number): Seconds to wait
- **Outputs**: Execute (execution after timeout)
- **GDScript**: `await get_tree().create_timer({{duration}}).timeout`
- **One-Liner**: Wait N seconds
- **Example**: `await get_tree().create_timer(2.0).timeout`

---

### **12. DEBUG NODES** (2 nodes)

#### `print` - Debug Print
- **Inputs**: 
  - `message` (string): Debug message
- **Outputs**: Execute (execution)
- **GDScript**: `print("{{message}}")`
- **One-Liner**: Print to console
- **Example**: `print('Player health: ', health)`

#### `comment` - Code Comment
- **Inputs**: 
  - `text` (string): Comment text
- **Outputs**: None
- **GDScript**: `# {{text}}`
- **One-Liner**: Documentation comment
- **Example**: `# Check if enemy is in range`

---

## Backend Integration

### **API Endpoint**
```
POST /api/flowchart/generate
Content-Type: application/json

{
  "flowchart": {
    "nodes": [{...}],
    "edges": [{...}]
  },
  "enhancementPrompt": "Optional AI improvement request"
}

Response:
{
  "code": "Generated GDScript",
  "errors": [],
  "validations": []
}
```

### **Node Data Structure**
```typescript
interface FlowchartNode {
  id: string;              // Unique ID
  type: string;            // Node type (e.g., "if", "move_velocity")
  position: { x, y };      // Canvas position
  data: {
    label: string;         // Display label
    [inputId]: value;      // Input values (e.g., "condition": "health > 0")
  }
}

interface FlowchartEdge {
  id: string;
  source: string;          // From node ID
  sourceHandle: string;    // Output port (e.g., "true_exec", "false_exec")
  target: string;          // To node ID
  targetHandle: string;    // Input port (optional for execution flow)
}
```

---

## Generation Rules (100% Hardcoded)

1. **Start Node**: Always generates `func _ready():`
2. **Sequential Flow**: Connect nodes in order → execute sequentially
3. **Conditionals**: `if` node splits to true/false branches
4. **Loops**: Generate `for` or `while` with body from connected nodes
5. **Variables**: No type inference (explicit in inputs)
6. **Placeholders**: Replace `{{variable}}` with node input values

---

## Next Steps

1. **UI Integration**: Add flowchart editor to React UI
2. **Node Renderer**: Display each node type with inputs
3. **Edge Connection**: Allow dragging connections between nodes
4. **Code Preview**: Show generated GDScript in real-time
5. **AI Enhancement**: Optional refinement on generated code
6. **Export**: Download as `.gd` file or copy to clipboard

---

**Status**: ✅ Schema defined, generators ready for UI integration
