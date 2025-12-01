# Flowchart GDScript Generator - Setup Guide

This is a standalone Godot 4.4 GDScript generator using visual flowcharts.

## Quick Setup in New Replit Project

1. **Create a new Replit project** (Node/React template)
2. **Download this folder** from your current project
3. **In the new Replit project:**
   - Delete default files
   - Copy all files from this folder into the new project root
   - Open `.replit` file and update the run command:

```
run = "NODE_ENV=development tsx server/index.ts"
```

4. **Install dependencies:**
```bash
npm install
```

5. **Set environment variables** (if needed):
   - `GEMINI_API_KEY` - For AI code refinement (optional)
   - `GROQ_API_KEY` - Alternative AI provider (optional)

6. **Run:**
```bash
npm run dev
```

App will start on `http://localhost:5000`

## Features

- ✅ Visual flowchart editor (ReactFlow)
- ✅ 10+ node types: Event, Movement, Scale, Rotation, Animation, Audio, Timer, Destroy, Print, Comment
- ✅ Real-time Godot 4.4 GDScript generation
- ✅ AI-powered code refinement (hardcoded → AI refine → final script)
- ✅ Automatic fallback if AI unavailable
- ✅ Valid, executable, properly indented code

## Node Types

| Node | Purpose | Selections |
|------|---------|-----------|
| **Event** | Detect input (key press, button, action) | Input type, key/action name |
| **Movement** | Set movement direction | Direction X/Y/Z, speed |
| **Scale** | Transform scaling | Scale mode (linked/individual), values |
| **Rotation** | Transform rotation | Rotation amounts (radians) |
| **Animation** | Play AnimationPlayer | Animation name, speed |
| **Audio** | Play audio file | Audio file, volume, loop |
| **Timer** | Setup timer | Duration, autostart |
| **Destroy** | Delete node | Delay (optional) |
| **Print** | Debug output | Message text |
| **Comment** | Code comment | Comment text |

## Architecture

- **Frontend:** React 18 + TypeScript + Tailwind CSS + ReactFlow
- **Backend:** Express.js + TypeScript
- **Code Generation:** Hardcoded (reliable) + AI refinement (optional, polishes code)
- **AI Providers:** Gemini (default) or Groq (fallback)

## Generated Code Pattern

```gdscript
extends CharacterBody3D

@export var move_speed: float = 2
var move_direction: Vector3 = Vector3.ZERO
var velocity: Vector3 = Vector3.ZERO
@onready var animation_player: AnimationPlayer = $AnimationPlayer

func _physics_process(delta: float) -> void:
	velocity = move_direction * move_speed
	velocity = move_and_slide(velocity)
	
	if velocity.length() > 0.1:
		animation_player.play("Walk")
	else:
		animation_player.play("Idle")

func _input(event: InputEvent) -> void:
	if event is InputEventKey and event.pressed:
		if event.keycode == KEY_W:
			move_direction = Vector3.FORWARD
```

## Troubleshooting

**Build errors?**
- Ensure all files copied correctly
- Check `package.json` has all dependencies
- Run `npm install` if needed

**AI refinement not working?**
- Add `GEMINI_API_KEY` secret to Replit
- Or add `GROQ_API_KEY` for fallback
- App works without AI (uses hardcoded generation)

**Port already in use?**
- Change `PORT` in `server/index.ts`
- Or check if another app is using port 5000

## Next Steps

1. Create flowchart with nodes
2. Connect nodes (drag connections)
3. Configure each node (UI on right)
4. Click "Generate Code"
5. Copy generated GDScript to your Godot project
6. Optionally enhance with AI refinement

Happy coding! 🎮
