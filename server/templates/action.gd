# Player Animation
# Animation state machine with idle, walk, run, jump, crouch states
extends Node3D

@onready var animation_player: AnimationPlayer = $"../AnimationPlayer"

var idle_speed: float = 1.0
var walk_speed: float = 1.0
var run_speed: float = 1.0
var jump_speed: float = 1.0

var current_state: String = "idle"

func _ready() -> void:
	if animation_player:
		animation_player.play("Idle")

func _process(delta: float) -> void:
	update_animation()

func update_animation() -> void:
	var velocity = Vector3.ZERO
	
	if Input.is_action_pressed("ui_up"):
		velocity.z -= 1
	if Input.is_action_pressed("ui_down"):
		velocity.z += 1
	if Input.is_action_pressed("ui_left"):
		velocity.x -= 1
	if Input.is_action_pressed("ui_right"):
		velocity.x += 1
	
	if velocity.length() > 0:
		if Input.is_action_pressed("ui_focus_next"):
			play_animation("Crouch")
		else:
			play_animation("Walk")
	else:
		play_animation("Idle")

func play_animation(anim_name: String) -> void:
	if current_state != anim_name and animation_player:
		animation_player.play(anim_name)
		current_state = anim_name
