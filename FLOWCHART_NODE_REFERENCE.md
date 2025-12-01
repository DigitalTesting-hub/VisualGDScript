# Flowchart Node Complete Reference - Ready for UI Implementation

## 23 Core Node Types - Full Setup

All nodes follow the same pattern:
```
Node Type → Inputs (with defaults) → Outputs → GDScript Generator
```

---

## FLOW CONTROL NODES

### 1. START
```
ID: "start"
Inputs: None
Outputs: "exec" (execution flow)
GDScript: func _ready():
Example: Entry point - runs once at game start
```

### 2. EVENT
```
ID: "event"
Inputs: 
  - event_type: enum [ready|process|physics_process|input|unhandled_input]
Outputs: "exec" (execution flow)
GDScript: func _{{event_type}}({{event_param}}):
Example: func _process(delta): Runs every frame
```

### 3. IF CONDITION
```
ID: "if"
Inputs:
  - condition: string (default: "true")
Outputs: 
  - "true_exec" (true branch)
  - "false_exec" (false branch)
GDScript: if {{condition}}: ... else: ...
Example: if health > 0: Continue else: GameOver
```

### 4. FOR LOOP
```
ID: "loop_for"
Inputs:
  - count: number (default: 10)
Outputs:
  - "loop_exec" (loop body)
  - "complete" (after loop)
GDScript: for i in range({{count}}): ...
Example: for i in range(10): SpawnEnemy()
```

### 5. WHILE LOOP
```
ID: "loop_while"
Inputs:
  - condition: string (default: "true")
Outputs:
  - "loop_exec" (loop body)
  - "complete" (after loop)
GDScript: while {{condition}}: ...
Example: while count > 0: attack()
```

---

## VARIABLE NODES

### 6. GET VARIABLE
```
ID: "var_get"
Inputs:
  - var_name: string (default: "health")
Outputs:
  - "value" (the variable value)
  - "exec" (execution flow)
GDScript: var {{output}} = {{var_name}}
Example: var current_hp = health
```

### 7. SET VARIABLE
```
ID: "var_set"
Inputs:
  - var_name: string (default: "health")
  - value: string (default: "100")
Outputs: "exec" (execution flow)
GDScript: {{var_name}} = {{value}}
Example: health = 100
```

---

## MOVEMENT NODES

### 8. APPLY VELOCITY
```
ID: "move_velocity"
Inputs:
  - velocity_x: number (default: 0)
  - velocity_y: number (default: 0)
  - velocity_z: number (default: 0)
Outputs: "exec" (execution flow)
GDScript: velocity = Vector3({{x}}, {{y}}, {{z}})
Example: velocity = Vector3(10, 0, 5) - sets direction and speed
```

### 9. MOVE AND SLIDE
```
ID: "move_and_slide"
Inputs: None
Outputs:
  - "collision_occurred" (if hit something)
  - "no_collision" (if clear)
  - "exec" (execution flow)
GDScript: var {{collision_var}} = move_and_slide()
Example: CharacterBody3D.move_and_slide() - applies velocity with physics
```

### 10. IS ON FLOOR
```
ID: "is_on_floor"
Inputs: None
Outputs:
  - "true" (on floor/grounded)
  - "false" (in air/falling)
GDScript: if is_on_floor(): ... else: ...
Example: Branch - jump only when grounded
```

---

## PHYSICS NODES

### 11. APPLY GRAVITY
```
ID: "apply_gravity"
Inputs:
  - gravity: number (default: 9.8)
Outputs: "exec" (execution flow)
GDScript: if not is_on_floor(): velocity.y -= {{gravity}} * delta
Example: Applies downward force each frame
```

### 12. APPLY FORCE
```
ID: "apply_force"
Inputs:
  - force_x: number (default: 0)
  - force_y: number (default: 0)
  - force_z: number (default: 0)
Outputs: "exec" (execution flow)
GDScript: apply_force(Vector3({{x}}, {{y}}, {{z}}))
Example: Impulse for jump, knockback, explosions
```

---

## COLLISION NODES

### 13. ON COLLISION
```
ID: "collision_detect"
Inputs:
  - collision_type: enum [body_entered|body_exited|area_entered|area_exited]
Outputs:
  - "collider" (the object that collided)
  - "exec" (execution flow)
GDScript: func _on_{{type}}(body): {{body_var}} = body ...
Example: func _on_body_entered(body): enemy = body
```

---

## ANIMATION NODES

### 14. PLAY ANIMATION
```
ID: "play_animation"
Inputs:
  - anim_name: string (default: "idle")
  - speed: number (default: 1.0, optional)
Outputs: "exec" (execution flow)
GDScript: animation_player.play("{{name}}", -1, {{speed}})
Example: animation_player.play('run', -1, 1.5)
```

### 15. STOP ANIMATION
```
ID: "stop_animation"
Inputs: None
Outputs: "exec" (execution flow)
GDScript: animation_player.stop()
Example: Pause current animation
```

---

## AUDIO NODES

### 16. PLAY SOUND
```
ID: "play_audio"
Inputs:
  - audio_path: string (default: "res://sounds/effect.ogg")
Outputs: "exec" (execution flow)
GDScript: audio_player.stream = preload("{{path}}") \n audio_player.play()
Example: audio_player.stream = preload('res://hit.ogg') then play()
```

---

## INPUT NODES

### 17. INPUT ACTION
```
ID: "input_action"
Inputs:
  - action_name: string (default: "ui_accept")
  - action_type: enum [pressed|just_pressed|just_released]
Outputs:
  - "true" (input detected)
  - "false" (no input)
GDScript: if Input.is_action_{{type}}("{{name}}"): ... else: ...
Example: if Input.is_action_pressed('ui_right'): move_right()
```

---

## MATH NODES

### 18. MATH OPERATION
```
ID: "math_op"
Inputs:
  - value_a: number (default: 10)
  - operation: enum [+|-|*|/]
  - value_b: number (default: 5)
Outputs: "result" (number)
GDScript: {{result}} = {{a}} {{op}} {{b}}
Example: result = 10 + 5
```

---

## LOGIC NODES

### 19. AND LOGIC
```
ID: "logic_and"
Inputs:
  - a: boolean
  - b: boolean
Outputs: "result" (boolean)
GDScript: {{result}} = {{a}} and {{b}}
Example: if has_weapon and ammo > 0: fire()
```

### 20. OR LOGIC
```
ID: "logic_or"
Inputs:
  - a: boolean
  - b: boolean
Outputs: "result" (boolean)
GDScript: {{result}} = {{a}} or {{b}}
Example: if is_dead or is_frozen: skip_turn()
```

---

## TIMING NODES

### 21. START TIMER
```
ID: "timer_start"
Inputs:
  - duration: number (default: 1.0, in seconds)
Outputs: "exec" (execution after timeout)
GDScript: await get_tree().create_timer({{duration}}).timeout
Example: Wait 2 seconds, then continue
```

---

## DEBUG NODES

### 22. PRINT
```
ID: "print"
Inputs:
  - message: string (default: "Debug message")
Outputs: "exec" (execution flow)
GDScript: print("{{message}}")
Example: print('Player position: ', position)
```

### 23. COMMENT
```
ID: "comment"
Inputs:
  - text: string (default: "TODO: Add logic here")
Outputs: None
GDScript: # {{text}}
Example: # Check if enemy in range
```

---

## Data Structures for UI Implementation

### Node Schema (TypeScript)
```typescript
interface NodeSchema {
  id: string;                    // "if", "move_velocity", etc.
  name: string;                  // "If Condition", "Apply Velocity"
  category: NodeCategory;        // "flow_control", "movement", etc.
  description: string;           // "Conditional branching (if/else)"
  icon: string;                  // Icon name for UI
  color: string;                 // Hex color for node
  inputs: NodeInput[];           // List of input fields
  outputs: NodeOutput[];         // List of output ports
  gdscriptTemplate: string;      // Hardcoded template with {{placeholders}}
  example: string;               // Simple example
}

interface NodeInput {
  id: string;                    // "condition", "velocity_x", etc.
  label: string;                 // Display name
  type: "string"|"number"|"boolean"|"vector3"|"enum";
  required: boolean;
  default?: string|number|boolean;
  options?: string[];            // For enums
}

interface NodeOutput {
  id: string;                    // "exec", "true_exec", "collision"
  label: string;                 // Display name
  type: "execution"|"boolean"|"string"|"number"|"vector3";
}
```

### Flowchart Data (ReactFlow Format)
```typescript
interface FlowchartNode {
  id: string;                    // Unique node ID
  type: string;                  // Node type ID: "if", "print", etc.
  position: { x: number; y: number };
  data: {
    label: string;
    [inputId]: any;              // e.g., "condition": "health > 0"
  }
}

interface FlowchartEdge {
  id: string;
  source: string;                // From node ID
  sourceHandle: string|null;     // Output port: "exec", "true_exec", etc.
  target: string;                // To node ID
  targetHandle: string|null;     // Input port (for execution flow)
}
```

---

## Generation Rules (Backend Implementation)

1. **Replace Placeholders**: In GDScript template, replace all `{{placeholder}}` with input values
2. **Follow Execution Flow**: Each edge connects output to next input
3. **Handle Conditionals**: If node routes true/false branches separately
4. **Loop Processing**: For/While nodes wrap body in loop syntax
5. **Type Preservation**: Keep Vector3, boolean, string types as-is

---

## Ready for UI - Next Steps

✅ Node schemas exported from `flowchart-node-schema.ts`
✅ 23 nodes fully defined with inputs/outputs
✅ Hardcoded generators in `flowchart-node-generators.ts`
✅ API endpoint `/api/flowchart/generate` ready
✅ Complete documentation provided

**Next Phase (UI Integration):**
1. Import node schemas into React component
2. Create node renderer for each type
3. Display inputs as form fields
4. Connect outputs to next node inputs
5. Send flowchart to backend on "Generate"
6. Display generated GDScript

---

**Files Generated:**
- `server/flowchart-node-schema.ts` - All 23 node definitions
- `server/flowchart-node-generators.ts` - Hardcoded code generators
- `FLOWCHART_NODE_SETUP.md` - Setup guide
- `FLOWCHART_API_SPEC.md` - API examples
- `FLOWCHART_NODE_REFERENCE.md` - This file
