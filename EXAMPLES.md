# Example Flowcharts & Generated Code

Complete examples showing flowchart → generated GDScript.

## Example 1: Simple Player Movement (2D Platformer)

### Flowchart
```
┌─────────┐
│ START   │
└────┬────┘
     │
     ├──► [EVENT: A Key] ──► [MOVEMENT: Left (-1,0)] ──► [ANIMATION: Run Left]
     │
     ├──► [EVENT: D Key] ──► [MOVEMENT: Right (1,0)] ──► [ANIMATION: Run Right]
     │
     └──► [EVENT: Space] ──► [MOVEMENT: Up (0,-1)] ──► [ANIMATION: Jump]
```

### Node Configuration

**EVENT Node 1:**
- Input Type: key_press
- Key: A

**EVENT Node 2:**
- Input Type: key_press
- Key: D

**EVENT Node 3:**
- Input Type: key_press
- Key: Space

**MOVEMENT Nodes:**
- Direction X: -1 / 1 / 0
- Direction Y: -1 / 0 / 1 (for jump)
- Speed: 200

**ANIMATION Node:**
- Animation Name: Run, Jump, Idle

### Generated Code
```gdscript
extends CharacterBody2D

@export var move_speed: float = 200.0
@onready var animation_player: AnimationPlayer = $AnimationPlayer

var velocity: Vector2 = Vector2.ZERO
var move_direction: Vector2 = Vector2.ZERO

func _ready() -> void:
    velocity = Vector2.ZERO
    move_direction = Vector2.ZERO

func _input(event: InputEvent) -> void:
    if event is InputEventKey and event.pressed:
        if event.keycode == KEY_A:
            move_direction = Vector2(-1, 0)
        elif event.keycode == KEY_D:
            move_direction = Vector2(1, 0)
        elif event.keycode == KEY_SPACE:
            move_direction = Vector2(0, -1)

func _physics_process(delta: float) -> void:
    velocity = move_direction * move_speed
    velocity = move_and_slide(velocity)
    
    if move_direction.x < 0:
        animation_player.play("Run Left")
    elif move_direction.x > 0:
        animation_player.play("Run Right")
    elif move_direction.y < 0:
        animation_player.play("Jump")
    else:
        animation_player.play("Idle")
```

---

## Example 2: Enemy AI with Timer

### Flowchart
```
┌─────────┐
│ START   │
└────┬────┘
     │
     ├──► [VARIABLE: is_attacking = false]
     │
     ├──► [EVENT: Player Detected]
     │
     ├──► [MOVEMENT: Towards Player]
     │
     ├──► [CONDITION: Distance < 2]
     │
     ├──► [ANIMATION: Attack]
     │
     ├──► [TIMER: 1.5s]
     │
     ├──► [VARIABLE: is_attacking = true]
     │
     └──► [TIMER: Reset]
```

### Generated Code
```gdscript
extends CharacterBody3D

@export var attack_range: float = 2.0
@export var chase_speed: float = 5.0
@export var attack_cooldown: float = 1.5

var is_attacking: bool = false
var velocity: Vector3 = Vector3.ZERO
var target: Node3D = null

@onready var animation_player: AnimationPlayer = $AnimationPlayer

func _ready() -> void:
    is_attacking = false
    target = null

func _process(delta: float) -> void:
    if target == null:
        animation_player.play("Idle")
        return
    
    var distance = global_position.distance_to(target.global_position)
    
    if distance < attack_range and not is_attacking:
        animation_player.play("Attack")
        is_attacking = true
        await get_tree().create_timer(attack_cooldown).timeout
        is_attacking = false
    elif distance > attack_range and not is_attacking:
        var direction = (target.global_position - global_position).normalized()
        velocity = direction * chase_speed
        animation_player.play("Walk")

func _physics_process(delta: float) -> void:
    if not is_attacking:
        velocity = move_and_slide(velocity)
```

---

## Example 3: Collectible Item with Spawn

### Flowchart
```
┌─────────┐
│ START   │
└────┬────┘
     │
     ├──► [ANIMATION: Spin]
     │
     ├──► [EVENT: Player Collision]
     │
     ├──► [PROPERTY: Play collect sound]
     │
     ├──► [VARIABLE: Add to inventory]
     │
     ├──► [ANIMATION: Fade out]
     │
     ├──► [TWEEN: Scale to 0]
     │
     └──► [DESTROY]
```

### Generated Code
```gdscript
extends Area3D

@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var audio_player: AudioStreamPlayer3D = $AudioStreamPlayer3D

var is_collected: bool = false

signal item_collected

func _ready() -> void:
    animation_player.play("Spin")
    area_entered.connect(_on_area_entered)

func _on_area_entered(area: Area3D) -> void:
    if area.is_in_group("player") and not is_collected:
        is_collected = true
        audio_player.play()
        
        item_collected.emit()
        
        var tween = create_tween()
        tween.tween_property(self, "scale", Vector3.ZERO, 0.5)
        await tween.finished
        
        queue_free()
```

---

## Example 4: Combat System with Combo

### Flowchart
```
┌─────────┐
│ START   │
└────┬────┘
     │
     ├──► [VARIABLE: combo_count = 0]
     │
     ├──► [VARIABLE: last_attack_time = 0]
     │
     ├──► [EVENT: Space Press (Attack)]
     │
     ├──► [CONDITION: combo_count < 3]
     │
     ├──► [ANIMATION: Attack 1/2/3]
     │
     ├──► [PHYSICS: Apply damage]
     │
     ├──► [TIMER: Reset combo after 2s]
     │
     └──► [VARIABLE: combo_count++]
```

### Generated Code
```gdscript
extends CharacterBody3D

@export var attack_damage: float = 10.0
@export var combo_timeout: float = 2.0

@onready var animation_player: AnimationPlayer = $AnimationPlayer

var combo_count: int = 0
var last_attack_time: float = 0.0
var can_attack: bool = true

func _ready() -> void:
    combo_count = 0
    last_attack_time = 0.0

func _input(event: InputEvent) -> void:
    if event is InputEventKey and event.pressed:
        if event.keycode == KEY_SPACE and can_attack:
            perform_attack()

func perform_attack() -> void:
    can_attack = false
    combo_count = min(combo_count + 1, 3)
    
    match combo_count:
        1:
            animation_player.play("Attack1")
        2:
            animation_player.play("Attack2")
        3:
            animation_player.play("Attack3")
    
    await get_tree().create_timer(animation_player.current_animation_length).timeout
    can_attack = true
    
    await get_tree().create_timer(combo_timeout).timeout
    combo_count = 0

func _physics_process(delta: float) -> void:
    pass
```

---

## Example 5: UI Button with State

### Flowchart
```
┌─────────┐
│ START   │
└────┬────┘
     │
     ├──► [PROPERTY: Button initial state]
     │
     ├──► [EVENT: Mouse Enter]
     │
     ├──► [ANIMATION: Scale up]
     │
     ├──► [EVENT: Mouse Click]
     │
     ├──► [SCENE: Load next scene]
     │
     └──► [EVENT: Mouse Exit]
```

### Generated Code
```gdscript
extends Button

var original_scale: Vector2 = Vector2.ONE
var is_hovered: bool = false

func _ready() -> void:
    original_scale = scale
    mouse_entered.connect(_on_mouse_entered)
    mouse_exited.connect(_on_mouse_exited)
    pressed.connect(_on_pressed)

func _on_mouse_entered() -> void:
    is_hovered = true
    var tween = create_tween()
    tween.tween_property(self, "scale", original_scale * 1.1, 0.2)

func _on_mouse_exited() -> void:
    is_hovered = false
    var tween = create_tween()
    tween.tween_property(self, "scale", original_scale, 0.2)

func _on_pressed() -> void:
    get_tree().change_scene_to_file("res://scenes/menu.tscn")
```

---

## Example 6: Procedural Spawner

### Flowchart
```
┌─────────┐
│ START   │
└────┬────┘
     │
     ├──► [TIMER: 2.0s]
     │
     ├──► [LOOP: Repeat 5 times]
     │
     ├──► [VARIABLE: Random position]
     │
     ├──► [SPAWN: Enemy prefab]
     │
     ├──► [PHYSICS: Random velocity]
     │
     └──► [TIMER: Next spawn]
```

### Generated Code
```gdscript
extends Node3D

@export var enemy_scene: String = "res://enemies/basic_enemy.tscn"
@export var spawn_interval: float = 2.0
@export var spawn_count: int = 5
@export var spawn_speed: float = 10.0

var spawn_timer: float = 0.0
var spawned_count: int = 0

func _ready() -> void:
    spawn_timer = spawn_interval

func _process(delta: float) -> void:
    spawn_timer -= delta
    
    if spawn_timer <= 0 and spawned_count < spawn_count:
        spawn_enemy()
        spawn_timer = spawn_interval
        spawned_count += 1

func spawn_enemy() -> void:
    var enemy_instance = load(enemy_scene).instantiate()
    add_child(enemy_instance)
    
    var random_pos = Vector3(
        randf_range(-10, 10),
        5,
        randf_range(-10, 10)
    )
    enemy_instance.global_position = random_pos
    
    var random_velocity = Vector3(
        randf_range(-1, 1),
        0,
        randf_range(-1, 1)
    ).normalized() * spawn_speed
    
    if enemy_instance.has_method("set_velocity"):
        enemy_instance.set_velocity(random_velocity)
```

---

## Example 7: Particle Effect with Tweens

### Flowchart
```
┌─────────┐
│ START   │
└────┬────┘
     │
     ├──► [EVENT: Death]
     │
     ├──► [TWEEN: Scale fade out]
     │
     ├──► [TWEEN: Rotate]
     │
     ├──► [AUDIO: Play death sound]
     │
     ├──► [ANIMATION: Dissolve]
     │
     └──► [DESTROY]
```

### Generated Code
```gdscript
extends MeshInstance3D

@onready var audio_player: AudioStreamPlayer3D = $AudioStreamPlayer3D

func die() -> void:
    var tween = create_tween()
    tween.set_parallel(true)
    
    # Fade out
    tween.tween_property(self, "transparency", 1.0, 1.0)
    
    # Rotate while fading
    tween.tween_property(self, "rotation.y", rotation.y + TAU, 1.0)
    
    # Scale down
    tween.tween_property(self, "scale", Vector3.ZERO, 1.0)
    
    # Play sound
    audio_player.play()
    
    await tween.finished
    queue_free()
```

---

## Example 8: State Machine (Simplified)

### Flowchart
```
┌──────────────────┐
│ START            │
└────┬─────────────┘
     │
     ├──► [VARIABLE: current_state = "idle"]
     │
     ├──► [CONDITION: Check input]
     │
     ├──► State = "move" ──► [ANIMATION: Walk] ──► [MOVEMENT]
     │
     ├──► State = "attack" ──► [ANIMATION: Attack] ──► [PHYSICS]
     │
     └──► State = "idle" ──► [ANIMATION: Idle]
```

### Generated Code
```gdscript
extends CharacterBody3D

@export var move_speed: float = 5.0
@export var attack_damage: float = 10.0

@onready var animation_player: AnimationPlayer = $AnimationPlayer

var current_state: String = "idle"
var velocity: Vector3 = Vector3.ZERO

func _ready() -> void:
    current_state = "idle"

func _input(event: InputEvent) -> void:
    if event is InputEventKey and event.pressed:
        if event.keycode == KEY_W:
            current_state = "move"
        elif event.keycode == KEY_SPACE:
            current_state = "attack"
        elif event.keycode == KEY_ESC:
            current_state = "idle"

func _physics_process(delta: float) -> void:
    match current_state:
        "move":
            animation_player.play("Walk")
            velocity = Vector3.FORWARD * move_speed
            velocity = move_and_slide(velocity)
        
        "attack":
            animation_player.play("Attack")
            # Apply damage logic here
        
        "idle":
            animation_player.play("Idle")
            velocity = Vector3.ZERO
```

---

## How to Use These Examples

1. **Copy the flowchart structure**
2. **Create nodes in the editor** following the node layout
3. **Configure each node** with the settings shown
4. **Connect nodes** in the order shown
5. **Generate code** and compare with example output
6. **Adapt as needed** for your specific game

## Tips for Creating Your Own

- Keep flowcharts linear when possible
- Use comments to document complex flows
- Test generation after each section
- Review generated code for accuracy
- Adjust exported variables in Godot inspector
- Reference Godot docs for node-specific properties

---

Need more examples? Check the APP_ARCHITECTURE.md for detailed information!
