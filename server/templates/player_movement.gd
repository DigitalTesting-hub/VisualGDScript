# Player Movement
# Full player controller with movement, crouch, prone, jumping, health system
extends CharacterBody3D

@export var NORMAL_SPEED: float = 2.0
@export var SPRINT_SPEED: float = 4.0
@export var CROUCH_SPEED: float = 1.0
@export var JUMP_VELOCITY: float = 4.0
@export var MAX_HEALTH: int = 300

@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var collision_shape: CollisionShape3D = $CollisionShape3D

var velocity: Vector3 = Vector3.ZERO
var health: int = MAX_HEALTH
var is_crouching: bool = false
var is_prone: bool = false

func _ready() -> void:
	health = MAX_HEALTH
	velocity = Vector3.ZERO

func _physics_process(delta: float) -> void:
	handle_movement(delta)
	handle_gravity(delta)
	velocity = move_and_slide(velocity)

func handle_movement(delta: float) -> void:
	var input_dir = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	var speed = NORMAL_SPEED
	
	if Input.is_action_pressed("ui_accept"):
		speed = JUMP_VELOCITY
		velocity.y = speed
	
	if Input.is_action_pressed("ui_focus_next"):
		is_crouching = true
		speed = CROUCH_SPEED
	else:
		is_crouching = false
	
	var direction = (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
	if direction:
		velocity.x = direction.x * speed
		velocity.z = direction.z * speed
	else:
		velocity.x = move_toward(velocity.x, 0, speed * delta)
		velocity.z = move_toward(velocity.z, 0, speed * delta)

func handle_gravity(delta: float) -> void:
	if not is_on_floor():
		velocity.y -= 9.8 * delta
	else:
		velocity.y = 0

func take_damage(amount: int) -> void:
	health -= amount
	if health <= 0:
		die()

func die() -> void:
	queue_free()
