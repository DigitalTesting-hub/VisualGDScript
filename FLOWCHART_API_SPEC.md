# Flowchart API Specification

## Overview
Generate GDScript code from visual flowcharts using hardcoded node generators with optional AI enhancement.

---

## API Endpoint

### POST `/api/flowchart/generate`
Generate GDScript from flowchart nodes and connections.

#### Request Body
```json
{
  "nodes": [
    {
      "id": "node_1",
      "type": "start",
      "position": { "x": 0, "y": 0 },
      "data": { "label": "Start" }
    },
    {
      "id": "node_2",
      "type": "event",
      "position": { "x": 0, "y": 100 },
      "data": {
        "label": "On Process",
        "event_type": "process"
      }
    },
    {
      "id": "node_3",
      "type": "print",
      "position": { "x": 0, "y": 200 },
      "data": {
        "label": "Print Message",
        "message": "Player position updated"
      }
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "node_1",
      "sourceHandle": "exec",
      "target": "node_2",
      "targetHandle": null
    },
    {
      "id": "edge_2",
      "source": "node_2",
      "sourceHandle": "exec",
      "target": "node_3",
      "targetHandle": null
    }
  ],
  "enhancementPrompt": "Optional: Optimize this code"
}
```

#### Response
```json
{
  "code": "extends Node3D\n\n# Auto-generated from flowchart\n\nfunc _ready():\n\t_process(0.0)\n\nfunc _process(delta):\n\tprint('Player position updated')",
  "validation": {
    "isValid": true,
    "errors": []
  },
  "codeIssues": {
    "issues": [],
    "isValid": true
  },
  "note": "Flowchart uses hardcoded generation. AI enhancement available for Comment and Print nodes."
}
```

---

## Node Type Reference

### Quick Lookup Table

| Node ID | Name | Input Fields | Output Type | Godot Function |
|---------|------|--------------|-------------|-----------------|
| `start` | Start | None | Execution | `func _ready()` |
| `event` | Event | `event_type` | Execution | `func _process/input()` |
| `if` | If Condition | `condition` | Boolean (True/False) | `if/else` |
| `loop_for` | For Loop | `count` | Execution | `for i in range()` |
| `loop_while` | While Loop | `condition` | Execution | `while condition` |
| `var_get` | Get Variable | `var_name` | Value | `var result = x` |
| `var_set` | Set Variable | `var_name`, `value` | Execution | `x = value` |
| `move_velocity` | Apply Velocity | `velocity_x/y/z` | Execution | `velocity = Vector3()` |
| `move_and_slide` | Move & Slide | None | Collision Boolean | `move_and_slide()` |
| `is_on_floor` | Is On Floor | None | Boolean | `if is_on_floor()` |
| `apply_gravity` | Apply Gravity | `gravity` | Execution | `velocity.y -= gravity` |
| `apply_force` | Apply Force | `force_x/y/z` | Execution | `apply_force(Vector3())` |
| `collision_detect` | On Collision | `collision_type` | Collider + Execution | `func _on_body_entered()` |
| `play_animation` | Play Animation | `anim_name`, `speed` | Execution | `animation_player.play()` |
| `stop_animation` | Stop Animation | None | Execution | `animation_player.stop()` |
| `play_audio` | Play Sound | `audio_path` | Execution | `audio_player.play()` |
| `input_action` | Input Action | `action_name`, `action_type` | Boolean (Yes/No) | `if Input.is_action_()` |
| `math_op` | Math Operation | `value_a`, `operation`, `value_b` | Number | `result = a op b` |
| `logic_and` | AND Logic | `a`, `b` | Boolean | `result = a and b` |
| `logic_or` | OR Logic | `a`, `b` | Boolean | `result = a or b` |
| `timer_start` | Start Timer | `duration` | Execution (after timeout) | `await create_timer()` |
| `print` | Print (Debug) | `message` | Execution | `print()` |
| `comment` | Comment | `text` | None | `#` |

---

## Example 1: Simple Movement

**Flowchart:**
- Start → Event (process) → Apply Velocity → Move and Slide → Print

**Request:**
```json
{
  "nodes": [
    {"id": "1", "type": "start", "data": {"label": "Start"}},
    {"id": "2", "type": "event", "data": {"label": "Process", "event_type": "process"}},
    {"id": "3", "type": "move_velocity", "data": {"label": "Move", "velocity_x": "10", "velocity_y": "0", "velocity_z": "0"}},
    {"id": "4", "type": "move_and_slide", "data": {"label": "Slide"}},
    {"id": "5", "type": "print", "data": {"label": "Print", "message": "Moved"}}
  ],
  "edges": [
    {"source": "1", "target": "2", "sourceHandle": "exec"},
    {"source": "2", "target": "3", "sourceHandle": "exec"},
    {"source": "3", "target": "4", "sourceHandle": "exec"},
    {"source": "4", "target": "5", "sourceHandle": "exec"}
  ]
}
```

**Generated GDScript:**
```gdscript
extends Node3D

func _ready():
    _process(0.0)

func _process(delta):
    velocity = Vector3(10, 0, 0)
    var collision_occurred = move_and_slide()
    print("Moved")
```

---

## Example 2: Conditional With Branches

**Flowchart:**
- Start → Event → If (health > 0) → [True: Attack] → [False: Die]

**Request:**
```json
{
  "nodes": [
    {"id": "1", "type": "start", "data": {"label": "Start"}},
    {"id": "2", "type": "event", "data": {"event_type": "process"}},
    {"id": "3", "type": "if", "data": {"condition": "health > 0"}},
    {"id": "4", "type": "play_animation", "data": {"anim_name": "attack"}},
    {"id": "5", "type": "play_animation", "data": {"anim_name": "death"}}
  ],
  "edges": [
    {"source": "1", "target": "2"},
    {"source": "2", "target": "3"},
    {"source": "3", "target": "4", "sourceHandle": "true_exec"},
    {"source": "3", "target": "5", "sourceHandle": "false_exec"}
  ]
}
```

**Generated GDScript:**
```gdscript
extends Node3D

func _ready():
    _process(0.0)

func _process(delta):
    if health > 0:
        animation_player.play("attack", -1, 1.0)
    else:
        animation_player.play("death", -1, 1.0)
```

---

## Node Input/Output Types

### Output Types
- **execution**: Flow continues to next node
- **boolean**: True/False branches (used by If, Input nodes)
- **value**: String/number output (used by Variables, Math)
- **collider**: Collision object reference

### Input Types
- **string**: Text input (variable names, messages, paths)
- **number**: Numeric input (velocity, gravity, duration)
- **boolean**: True/false toggle
- **enum**: Select from predefined options (event types, operations)
- **vector3**: XYZ coordinates (velocity, force)

---

## Edge Connection Rules

### Valid Connections
- **Execution ports** (exec) → Any node's input
- **Boolean ports** (true/false) → Boolean input nodes (if conditions)
- **Value ports** (number/string) → Variable/math inputs

### Handle Names
- **Bottom/Top**: Vertical flow connections (sequential)
- **Right/Left**: Horizontal branches (conditionals, loops)
- **true_exec/false_exec**: If node branches
- **loop_exec**: Loop body
- **complete**: Loop completion

---

## Generation Features

✅ **Hardcoded Generation**: Fast, deterministic, reliable
✅ **23 Core Node Types**: Cover all common game logic
✅ **Godot 4.4 API**: Official syntax and functions
✅ **Type Safety**: Proper Vector3, function signatures
✅ **Complex Flows**: Conditionals, loops, nested patterns
✅ **Optional AI**: Enhance Comment/Print nodes with AI
✅ **Error Validation**: Detect disconnected nodes, missing start
✅ **Export Options**: Download or copy to clipboard

---

## Error Codes

| Code | Message | Fix |
|------|---------|-----|
| 400 | No nodes in flowchart | Add at least one node |
| 400 | No start node found | Add a Start node |
| 400 | Invalid request | Check node/edge schema |
| 500 | Generation error | Check node type validity |

---

## Performance

- **Generation Time**: < 100ms for typical flowchart
- **Max Nodes**: 100+ nodes supported
- **Max Edges**: 1000+ connections supported
- **Code Size**: Generated code typically < 10KB

---

## Next: UI Integration

Ready for frontend implementation with:
- Node canvas renderer
- Drag-drop connections
- Real-time code preview
- One-click export/copy
