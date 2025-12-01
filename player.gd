extends CharacterBody3D

const NORMAL_SPEED = 2.0
const SPRINT_SPEED = 4.0
const CROUCH_SPEED = 1.0
const PRONE_SPEED = 0.67
const JUMP_VELOCITY = 4
const LERP_VELOCITY: float = 0.15
const LOOK_LERP_VELOCITY: float = 0.2
const MOUSE_SENSIBILITY: float = 0.005

@export_category("Objects")
@export var _body: Node3D = null
@export var _spring_arm_offset: Node3D = null
@export var animation_player: AnimationPlayer = null
@export var armature_node: Node3D = null

@export_category("Animation Settings")
@export var idle_speed: float = 1.0
@export var walk_speed: float = 1.0
@export var run_speed: float = 1.0
@export var jump_speed: float = 1.0
@export var crouch_speed: float = 0.8
@export var prone_speed: float = 0.6
@export var melee_speed: float = 1.5
@export var firing_speed: float = 1.0
@export var aim_speed: float = 1.0
@export var victory_dance_speed: float = 1

@export_category("Collision Shapes")
@export var normal_collision: CollisionShape3D = null
@export var crouch_collision: CollisionShape3D = null
@export var prone_collision: CollisionShape3D = null

# Animation state
var is_melee_attacking: bool = false
var is_dancing: bool = false
var is_in_car: bool = false

# State variables
var mouse_locked = true
var _current_speed: float
var gravity = ProjectSettings.get_setting("physics/3d/default_gravity")

# Stance and movement state
var current_stance: String = "normal"
var is_running_mode: bool = false

# Collision stance tracking
var last_sync_stance: String = "normal"

# Audio nodes
@onready var walk_sound: AudioStreamPlayer3D = $WalkSound
@onready var run_sound: AudioStreamPlayer3D = $RunSound
@onready var jump_sound: AudioStreamPlayer3D = $JumpSound

# Audio settings
var footstep_timer: float = 0.0
var walk_footstep_interval: float = 0.5
var run_footstep_interval: float = 0.3

func _enter_tree():
	set_multiplayer_authority(str(name).to_int())
	if has_node("SpringArmOffset/SpringArm3D/Camera3D"):
		$SpringArmOffset/SpringArm3D/Camera3D.current = is_multiplayer_authority()

func _ready():
	add_to_group("player")
	_setup_audio_nodes()
	_validate_collision_shapes()
	_setup_collision()
					
	if is_multiplayer_authority():
		Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
		_setup_input_actions()
		last_position = global_position
	else:
		_setup_3d_audio_for_others()
	
	_apply_collision_shape(current_stance)

func _validate_collision_shapes():
	if not normal_collision:
		push_error("ERROR: Normal collision shape not assigned!")
	if not crouch_collision:
		push_error("ERROR: Crouch collision shape not assigned!")
	if not prone_collision:
		push_error("ERROR: Prone collision shape not assigned!")
	
	if normal_collision and crouch_collision and prone_collision:
		print("✓ All collision shapes validated for player: ", name)

func _setup_collision():
	collision_layer = 0
	set_collision_layer_value(3, true)
	collision_mask = 0
	set_collision_mask_value(1, true)
	set_collision_mask_value(2, true)
	set_collision_mask_value(3, true)
	set_collision_mask_value(4, true)
	print("Player collision: Layer 3, Mask 1,2,3,4")

func _setup_input_actions():
	_add_key_input("move_forward", KEY_W)
	_add_key_input("move_backward", KEY_S)
	_add_key_input("move_left", KEY_A)
	_add_key_input("move_right", KEY_D)
	_add_key_input("jump", KEY_SPACE)
	_add_key_input("toggle_mouse", KEY_M)
	_add_key_input("toggle_run", KEY_SHIFT)
	_add_key_input("crouch", KEY_C)
	_add_key_input("prone", KEY_X)
	
func _add_key_input(action: String, keycode: int):
	if not InputMap.has_action(action):
		InputMap.add_action(action)
	
	InputMap.action_erase_events(action)
	var event = InputEventKey.new()
	event.keycode = keycode
	InputMap.action_add_event(action, event)

func _setup_audio_nodes():
	if not has_node("WalkSound"):
		walk_sound = AudioStreamPlayer3D.new()
		walk_sound.name = "WalkSound"
		walk_sound.bus = "SFX"
		walk_sound.max_distance = 8.0
		walk_sound.unit_size = 3.0
		add_child(walk_sound)
		
		var walk_stream = load("res://assets/audio/sfx/walk.wav")
		if walk_stream:
			walk_sound.stream = walk_stream
			
	if not has_node("RunSound"):
		run_sound = AudioStreamPlayer3D.new()
		run_sound.name = "RunSound"
		run_sound.bus = "SFX"
		run_sound.max_distance = 10.0
		run_sound.unit_size = 3.0
		add_child(run_sound)
		
		var run_stream = load("res://assets/audio/sfx/run.wav")
		if run_stream:
			run_sound.stream = run_stream
	
	if not has_node("JumpSound"):
		jump_sound = AudioStreamPlayer3D.new()
		jump_sound.name = "JumpSound"
		jump_sound.bus = "SFX"
		jump_sound.max_distance = 10.0
		jump_sound.unit_size = 2.0
		add_child(jump_sound)
		
		var jump_stream = load("res://assets/audio/sfx/jump.wav")
		if jump_stream:
			jump_sound.stream = jump_stream

func _setup_3d_audio_for_others():
	if walk_sound:
		walk_sound.max_distance = 8.0
	if run_sound:
		run_sound.max_distance = 10.0
	if jump_sound:
		jump_sound.max_distance = 5.0

# ============ INPUT HANDLING ============

func _unhandled_input(event) -> void:
	if not is_multiplayer_authority():
		return
	
	# Mouse look handling
	if event is InputEventMouseMotion and mouse_locked:
		rotate_y(-event.relative.x * MOUSE_SENSIBILITY)
		if _spring_arm_offset and _spring_arm_offset.has_node("SpringArm3D"):
			var spring_arm = _spring_arm_offset.get_node("SpringArm3D")
			spring_arm.rotate_x(-event.relative.y * MOUSE_SENSIBILITY)
			spring_arm.rotation.x = clamp(spring_arm.rotation.x, -PI/4, PI/24)
	
	# Key input handling
	if event is InputEventKey and event.keycode == KEY_M and event.pressed:
		mouse_locked = !mouse_locked
		if mouse_locked:
			Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
		else:
			Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
	
	if event.is_action_pressed("toggle_run"):
		_toggle_run()
	
	if event.is_action_pressed("crouch"):
		_toggle_crouch()
	
	if event.is_action_pressed("prone"):
		_toggle_prone()

# ============ ANIMATION FUNCTIONS ============

func apply_rotation(_velocity: Vector3) -> void:
	if _velocity.length() < 0.1:
		return
	var new_rotation_y = lerp_angle(rotation.y, atan2(-_velocity.x, -_velocity.z), LERP_VELOCITY)
	rotation.y = new_rotation_y

func apply_look_rotation(target_position: Vector3) -> void:
	var direction = (target_position - global_position).normalized()
	var target_rotation_y = atan2(-direction.x, -direction.z)
	rotation.y = lerp_angle(rotation.y, target_rotation_y, LOOK_LERP_VELOCITY)

func play_melee_animation():
	if not animation_player:
		return
	if animation_player.has_animation("Attack2"):
		is_melee_attacking = true
		animation_player.play("Attack2")
		animation_player.speed_scale = melee_speed
		await animation_player.animation_finished
		is_melee_attacking = false

func play_victory_dance():
	if animation_player.has_animation("Dance"):
		is_dancing = true
		animation_player.play("Dance")
		animation_player.speed_scale = victory_dance_speed
		await animation_player.animation_finished
		is_dancing = false

func animate(_velocity: Vector3, stance: String, is_firing: bool = false, is_aiming: bool = false, look_target: Vector3 = Vector3.ZERO) -> void:
	if not animation_player:
		return
	
	# Skip all animations if in car
	if is_in_car:
		return
	
	# Don't change animations during melee attack
	if is_melee_attacking:
		return
	
	# Don't change animations during dance
	if is_dancing:
		return
	
	var should_look_at_target = (is_firing or is_aiming) and look_target != Vector3.ZERO
	
	if should_look_at_target:
		apply_look_rotation(look_target)
	elif _velocity.length() > 0.1:
		apply_rotation(_velocity)
	
	var anim_to_play = ""
	var anim_speed = 1.0
	var is_moving = _velocity.length() > 0.1
	var is_running = is_running()
	var is_on_ground = is_on_floor()
	
	match stance:
		"normal":
			if not is_on_ground:
				anim_to_play = "RifleJump"
				anim_speed = jump_speed
			elif is_aiming:
				anim_to_play = "RifleAim"
				anim_speed = aim_speed
			elif is_firing:
				if is_running and is_moving:
					anim_to_play = "RunFire"
					anim_speed = run_speed
				elif is_moving:
					anim_to_play = "WalkFire"
					anim_speed = walk_speed
				else:
					anim_to_play = "Firing"
					anim_speed = firing_speed
			elif is_moving:
				if is_running:
					anim_to_play = "GunRun"
					anim_speed = run_speed
				else:
					anim_to_play = "GunWalk"
					anim_speed = walk_speed
			else:
				anim_to_play = "RifleIdle"
				anim_speed = idle_speed
		
		"crouch":
			if is_aiming:
				anim_to_play = "IdleCrAim"
				anim_speed = aim_speed
			elif is_firing:
				if is_moving:
					anim_to_play = "CrWFire"
					anim_speed = crouch_speed
				else:
					anim_to_play = "CrFire"
					anim_speed = firing_speed
			elif is_moving:
				anim_to_play = "CrWalk"
				anim_speed = crouch_speed
			else:
				anim_to_play = "CrIdle"
				anim_speed = idle_speed
		
		"prone":
			if is_firing:
				anim_to_play = "ProneFire"
				anim_speed = firing_speed
			elif is_moving:
				anim_to_play = "ProneForward"
				anim_speed = prone_speed
			else:
				anim_to_play = "ProneIdle"
				anim_speed = idle_speed
	
	if animation_player.has_animation(anim_to_play):
		if animation_player.current_animation != anim_to_play:
			animation_player.play(anim_to_play)
			animation_player.speed_scale = anim_speed
		else:
			animation_player.speed_scale = anim_speed

func play_death_animation(stance: String):
	if not animation_player:
		return
	var death_anim = ""
	match stance:
		"crouch":
			death_anim = "CrDeath"
		"prone":
			death_anim = "ProneDeath"
		_:
			death_anim = "Death"
	if animation_player.has_animation(death_anim):
		animation_player.play(death_anim)
		animation_player.speed_scale = 1.0

# ============ COLLISION SHAPE MANAGEMENT ============

func _apply_collision_shape(stance: String):
	if not normal_collision or not crouch_collision or not prone_collision:
		push_error("Collision shapes not properly assigned!")
		return
	
	match stance:
		"normal":
			normal_collision.disabled = false
			crouch_collision.disabled = true
			prone_collision.disabled = true
		"crouch":
			normal_collision.disabled = true
			crouch_collision.disabled = false
			prone_collision.disabled = true
		"prone":
			normal_collision.disabled = true
			crouch_collision.disabled = true
			prone_collision.disabled = false
		_:
			normal_collision.disabled = false
			crouch_collision.disabled = true
			prone_collision.disabled = true

# ============ PHYSICS AND MOVEMENT ============

func _physics_process(delta):
	if not is_multiplayer_authority():
		return
	
	_apply_collision_shape(current_stance)
	
	if not is_on_floor():
		velocity.y -= gravity * delta

	if is_on_floor() and current_stance == "normal":
		if Input.is_action_just_pressed("jump"):
			velocity.y = JUMP_VELOCITY
			_play_jump_sound()

	_move()
	move_and_slide()
	
	if _body:
		_body.animate(velocity, current_stance, false, false, Vector3.ZERO)
	
	_update_footstep_audio(delta)

func _update_footstep_audio(delta):
	if current_stance == "crouch" or current_stance == "prone":
		_stop_footstep_sounds()
		footstep_timer = 0.0
		return
	
	var is_moving = velocity.length() > 0.1 and is_on_floor()
	
	if is_moving:
		footstep_timer += delta
		var current_interval = run_footstep_interval if is_running_mode else walk_footstep_interval
		
		if footstep_timer >= current_interval:
			_play_footstep_sound("run" if is_running_mode else "walk")
			footstep_timer = 0.0
	else:
		_stop_footstep_sounds()
		footstep_timer = 0.0

func _play_footstep_sound(step_type: String):
	_stop_footstep_sounds()
	match step_type:
		"walk":
			if walk_sound and walk_sound.stream:
				walk_sound.play()
		"run":
			if run_sound and run_sound.stream:
				run_sound.play()
				
func _play_jump_sound():
	if jump_sound and jump_sound.stream:
		if not jump_sound.playing:
			jump_sound.play()

func _stop_footstep_sounds():
	if walk_sound and walk_sound.playing:
		walk_sound.stop()
	if run_sound and run_sound.playing:
		run_sound.stop()

func freeze():
	velocity.x = 0
	velocity.z = 0
	_current_speed = 0
	if _body:
		_body.animate(Vector3.ZERO, current_stance, false, false, Vector3.ZERO)
	_stop_footstep_sounds()

func _move() -> void:
	var _input_direction: Vector2 = Vector2.ZERO
	if is_multiplayer_authority():
		_input_direction = Input.get_vector(
			"move_left", "move_right",
			"move_forward", "move_backward"
		)

	if current_stance == "prone":
		_input_direction = Vector2.ZERO
