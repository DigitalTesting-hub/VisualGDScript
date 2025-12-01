# QUICK START: Visual Flowchart to GDScript

## Step-by-Step Visual Guide

### STEP 1: Open the App
```
Browser: http://localhost:5000
         │
         ▼
    ┌────────────────────────────────────┐
    │   FLOWCHART GDSCRIPT GENERATOR     │
    │                                    │
    │  [+] Nodes   Generate  Clear       │
    │                                    │
    │  ┌─────────────────────────────┐   │
    │  │ CANVAS                      │   │
    │  │                             │   │
    │  │      ┌─────────┐            │   │
    │  │      │  START  │            │   │
    │  │      └─────────┘            │   │
    │  │                             │   │
    │  └─────────────────────────────┘   │
    │                    │                │
    │              [CODE OUTPUT]          │
    │                                    │
    └────────────────────────────────────┘
```

### STEP 2: Add Nodes from Palette
```
Click [+] to open node palette:

┌─────────────────────────────────────┐
│  ADD NODE                           │
├─────────────────────────────────────┤
│ ★ EVENT (▶)          - Input        │
│ ★ MOVEMENT (→)       - Transform    │
│ ★ ROTATION (↻)       - Rotate       │
│ ★ ANIMATION (▶▶)     - Play anim    │
│ ★ AUDIO (🔊)         - Play sound   │
│ ★ CONDITION (◇)      - If/else      │
│ ★ LOOP (↻)           - While/for    │
│ ★ VARIABLE (x)       - Define var   │
│ ★ PHYSICS (⚡)       - Physics      │
│ ★ SPAWN (✚)          - Create node  │
│ ★ DESTROY (✕)        - Delete node  │
│ ★ TIMER (⏱)          - Timer setup  │
│ ★ TWEEN (~)          - Animate prop │
│ ★ CAMERA (📷)        - Set camera   │
│ ★ PRINT (🖨)         - Debug output │
│ ★ CODE (</>)         - Raw GDScript │
│ ★ COMMENT (#)        - Add comment  │
└─────────────────────────────────────┘

Select and drag onto canvas ▼
```

### STEP 3: Configure Each Node
```
After adding node, right panel shows config:

NODE: Movement
├─ Direction X ─────► [-1 ◄─► 1] = 0
├─ Direction Y ─────► [-1 ◄─► 1] = 1
├─ Direction Z ─────► [-1 ◄─► 1] = 0
├─ Speed ───────────► [0 ◄─► 10] = 5
└─ Node Type
   ├─ Node2D
   ├─ Node3D ✓
   ├─ CharacterBody2D
   └─ CharacterBody3D

Preview: "Move Up (5)"
```

### STEP 4: Connect Nodes
```
Drag connection from node handle:

    ┌─────────┐
    │ START   │
    └────┬────┘ ◄─── Click + drag from ●
         │           (bottom handle)
         │
    ┌────▼────┐
    │ EVENT   │
    └────┬────┘
         │
         └──► Line appears as you drag
```

### STEP 5: Generate Code
```
Click "Generate Code" button

┌─────────────────────────────────────┐
│ extends CharacterBody3D             │
│                                     │
│ @export var speed: float = 5        │
│ var velocity: Vector3 = Vector3.ZER │
│ @onready var animation_player: ... │
│                                     │
│ func _ready() -> void:              │
│     velocity = Vector3.ZERO         │
│                                     │
│ func _input(event: InputEvent) ->.. │
│     if event is InputEventKey:      │
│         if event.keycode == KEY_W:  │
│             ...                     │
│                                     │
│ func _physics_process(delta):       │
│     velocity = move_and_slide(vel.) │
│     ...                             │
└─────────────────────────────────────┘

[Copy] [Download] [Refine] [Save as Template]
```

### STEP 6: Use in Godot
```
1. In Godot, create new .gd script
2. Delete template code
3. Paste generated code
4. Attach to appropriate Node in scene
5. Configure exported vars in Inspector
6. Run and enjoy!
```

---

## EXAMPLE WORKFLOWS

### Example 1: Simple Movement (2D)
```
INPUT:
[START] → [W Key Event] → [Move Left (-1,0)] → [Play Walk Anim]

OUTPUT:
extends CharacterBody2D

func _input(event: InputEvent) -> void:
    if event.keycode == KEY_W:
        velocity = Vector2(-200, 0)

func _physics_process(delta: float) -> void:
    velocity = move_and_slide(velocity)
    animation_player.play("Walk")
```

### Example 2: Conditional Movement
```
INPUT:
[START] → [A Key] → [Move Right] → [Is Moving?] → [Play Run] / [Play Idle]

OUTPUT:
func _input(event: InputEvent) -> void:
    if event.keycode == KEY_A:
        velocity = Vector2(200, 0)

func _physics_process(delta: float) -> void:
    velocity = move_and_slide(velocity)
    
    if velocity.length() > 0.1:
        animation_player.play("Run")
    else:
        animation_player.play("Idle")
```

### Example 3: Combat with Timer
```
INPUT:
[START] → [Space Press] → [Play Attack Anim] → [Create Timer (1s)] → [Reset]

OUTPUT:
var is_attacking: bool = false

func _input(event: InputEvent) -> void:
    if event.keycode == KEY_SPACE and not is_attacking:
        is_attacking = true
        animation_player.play("Attack")
        await get_tree().create_timer(1.0).timeout
        is_attacking = false
```

### Example 4: Spawn & Destroy
```
INPUT:
[START] → [Mouse Click] → [Spawn Projectile] → [Physics Force] → [Timer (5s)] → [Destroy]

OUTPUT:
var projectile_scene = preload("res://projectile.tscn")

func _input(event: InputEvent) -> void:
    if event is InputEventMouseButton:
        var proj = projectile_scene.instantiate()
        add_child(proj)
        proj.apply_central_force(Vector3.FORWARD * 100)
        await get_tree().create_timer(5.0).timeout
        proj.queue_free()
```

---

## NODE CONFIG CHEAT SHEET

### EVENT Node
```
├─ Input Type: key / action / mouse
├─ Key Press: A-Z, SPACE, ENTER, ESCAPE
├─ Action Name: ui_accept, ui_select
└─ Detection: press / release / hold
```

### MOVEMENT Node
```
├─ Direction X: -1 to 1 (left/right)
├─ Direction Y: -1 to 1 (up/down)
├─ Direction Z: -1 to 1 (forward/back)
├─ Speed: 0 to 1000
└─ Node Type: Node2D / Node3D / CharacterBody2D / CharacterBody3D
```

### ANIMATION Node
```
├─ Animation Name: (custom name)
├─ Play Speed: 0.5 to 2.0
├─ Node Type: AnimationPlayer
└─ Condition: always / when_moving / loop
```

### TIMER Node
```
├─ Duration: 0.1 to 60 seconds
├─ Autostart: yes / no
└─ On Timeout: continue / restart / stop
```

### SPAWN Node
```
├─ Scene Path: res://path/to/scene.tscn
├─ Position: X,Y,Z coordinates
└─ Parent: this node / scene root
```

### PHYSICS Node
```
├─ Force Amount: -1000 to 1000
├─ Direction: X,Y,Z vector
├─ Apply Type: force / velocity / impulse
└─ Node Type: CharacterBody / RigidBody
```

### CONDITION Node
```
├─ Type: if / if-else / switch
├─ Check: velocity / is_moving / custom
└─ True Branch: connect to action
```

---

## COMMON MISTAKES & FIXES

| Problem | Cause | Fix |
|---------|-------|-----|
| "Orphaned node" error | Node not connected | Connect all nodes in chain |
| Animation won't play | No AnimationPlayer node | Add ANIMATION node reference |
| Movement not working | Missing velocity setup | Add MOVEMENT node before physics |
| Input not detected | Wrong key code | Check EVENT node config |
| Code won't compile | Invalid node type | Use supported node types |
| Physics broken | Wrong body type | Use CharacterBody2D/3D |
| No output generated | Empty flowchart | Add at least START + one action |

---

## KEYBOARD SHORTCUTS

| Action | Shortcut |
|--------|----------|
| Delete node | DEL or Backspace |
| Undo | Ctrl+Z / Cmd+Z |
| Redo | Ctrl+Y / Cmd+Y |
| Pan canvas | Middle mouse + drag |
| Zoom | Mouse wheel |
| Select all | Ctrl+A / Cmd+A |
| Copy | Ctrl+C / Cmd+C |
| Paste | Ctrl+V / Cmd+V |

---

## TIPS & TRICKS

1. **Start with START node** - Always begin with the START node
2. **Use comments** - Add COMMENT nodes to document your flowchart
3. **Group related nodes** - Keep related logic together for readability
4. **Test incrementally** - Generate and test after each major addition
5. **Save templates** - Save complex flowcharts as reusable templates
6. **Use undo/redo** - Don't fear experimenting, you can always undo
7. **Check the code** - Review generated code before using in Godot
8. **Join nodes logically** - Connect in the order code should execute
9. **Use meaningful labels** - Label nodes clearly (e.g., "Move Forward", not "N2")
10. **Reference the docs** - Check APP_ARCHITECTURE.md for detailed info

---

## TROUBLESHOOTING

### App won't start
```bash
npm install
npm run dev
# Check terminal for errors
```

### Code generation fails
- Check all nodes have valid configuration
- Ensure all nodes are connected
- Try the "Generate" button again
- Check browser console for errors

### Generated code has errors
- Verify node types match Godot nodes in your scene
- Check export variables are configured
- Ensure animation names exist
- Verify file paths for audio/scenes

### AI enhancement not working
- Add GEMINI_API_KEY or GROQ_API_KEY
- App works fine without AI (uses hardcoded patterns)
- Check internet connection

---

## NEXT STEPS

1. ✅ Create simple flowchart (3-4 nodes)
2. ✅ Generate code
3. ✅ Copy to Godot project
4. ✅ Test and verify
5. ✅ Customize as needed
6. ✅ Build more complex flowcharts

**Ready to create amazing Godot games! 🎮**
