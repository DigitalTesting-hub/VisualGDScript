/**
 * Vehicle Template Handler
 * Manages vehicle (car) template parsing, variable extraction, and script generation
 */

export interface VehicleVariable {
  name: string;
  type: string;
  value: string;
}

export interface VehicleFunction {
  name: string;
  signature: string;
}

export interface VehicleTemplate {
  name: "car";
  code: string;
  variables: VehicleVariable[];
  functions: VehicleFunction[];
  description: string;
}

const CAR_TEMPLATE = `extends CharacterBody3D

# Movement settings
@export var speed: float = 18.0
@export var max_rotation_speed: float = 2.0
@export var custom_gravity: float = 20.0
@export var alignment_speed: float = 8.0

# Smooth acceleration settings
@export var acceleration: float = 5.0
@export var deceleration: float = 8.0
@export var handbrake_deceleration: float = 15.0

# Turning settings
@export var turn_angle: float = 30.0
@export var turn_speed: float = 5.0

# Audio settings
@export var min_pitch: float = 0.8
@export var max_pitch: float = 1.5

# References
@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var camera: Camera3D = $Camera3D
@onready var car_visual: Node3D = $car
@onready var car1_sound: AudioStreamPlayer3D = $Car1
@onready var car2_sound: AudioStreamPlayer3D = $Car2

# Camera settings
var mouse_sensitivity: float = 0.002
var camera_rotation: Vector2 = Vector2.ZERO
var initial_visual_rotation: float = 0.0
var mouse_locked: bool = false

# Movement state
var current_speed: float = 0.0
var target_speed: float = 0.0
var is_handbrake: bool = false
var last_floor_normal: Vector3 = Vector3.UP
var current_yaw: float = 0.0
var last_position: Vector3 = Vector3.ZERO
var actual_speed: float = 0.0

# Turning state
var current_turn_angle: float = 0.0
var target_turn_angle: float = 0.0
var is_turning: bool = false
var is_actually_moving: bool = false

# Audio state
var is_car1_playing: bool = false
var was_moving: bool = false
var audio_streams_loaded: bool = false
var fallback_car1_stream: AudioStream
var fallback_car2_stream: AudioStream

# ============ DRIVER VARIABLES ============
@export var enter_area: Area3D = null
@export var seat_marker: Marker3D = null
@export var is_driver_occupied: bool = false
@export var driver_id: int = -1
var current_driver: Node3D = null
var driver_original_transform: Transform3D
var seat_local_position: Vector3 = Vector3.ZERO
var seat_local_rotation: Vector3 = Vector3.ZERO
var is_processing_entry: bool = false
var is_processing_exit: bool = false

# ============ PASSENGER VARIABLES ============
@export var passenger_enter_area: Area3D = null
@export var passenger_seat_marker: Marker3D = null
@export var is_passenger_occupied: bool = false
@export var passenger_id: int = -1
var current_passenger: Node3D = null
var passenger_original_transform: Transform3D
var passenger_local_position: Vector3 = Vector3.ZERO
var passenger_local_rotation: Vector3 = Vector3.ZERO
var is_processing_passenger_entry: bool = false

func _ready():
        _setup_input_actions()
        _setup_engine_audio()
        _setup_enter_area()
        _setup_passenger_enter_area()
        
        # Multiplayer setup
        if not is_solo_mode():
                multiplayer.peer_disconnected.connect(_on_peer_disconnected)
        
        initial_visual_rotation = car_visual.rotation_degrees.y
        
        if seat_marker:
                seat_local_position = to_local(seat_marker.global_position)
                seat_local_rotation = seat_marker.rotation
                print("Seat local offset calculated: ", seat_local_position)
                
        if passenger_seat_marker:
                passenger_local_position = to_local(passenger_seat_marker.global_position)
                passenger_local_rotation = passenger_seat_marker.rotation
                print("Passenger seat local offset calculated: ", passenger_local_position)
                
        # Physics setup
        floor_snap_length = 0.3
        floor_stop_on_slope = true
        floor_max_angle = deg_to_rad(46)
        wall_min_slide_angle = deg_to_rad(15)
        floor_constant_speed = true
        floor_block_on_wall = false
        max_slides = 6
        
        current_yaw = rotation.y
        last_position = global_position
        
        if camera:
                camera.current = false
        
        # Start disabled
        set_process_input(false)
        set_physics_process(false)
        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        print("Car initialized - disabled | Multiplayer: ", not is_solo_mode())

func is_solo_mode() -> bool:
        # Check if we're in solo mode by looking for players
        var players = get_tree().get_nodes_in_group("player")
        if players.size() > 0:
                return players[0].is_solo_mode if players[0].has_method("is_solo_mode") else true
        return true

func _on_peer_disconnected(peer_id: int):
        # Handle driver disconnection
        if driver_id == peer_id:
                print("Driver disconnected! Resetting driver state.")
                is_driver_occupied = false
                current_driver = null
                driver_id = -1
                
                # Reset car controls
                set_process_input(false)
                set_physics_process(false)
                _stop_all_audio()
                
                # Show enter area
                if enter_area:
                        enter_area.visible = true
                        enter_area.monitoring = true
                        enter_area.monitorable = true
        
        # Handle passenger disconnection
        if passenger_id == peer_id:
                print("Passenger disconnected! Resetting passenger state.")
                is_passenger_occupied = false
                current_passenger = null
                passenger_id = -1
                
                # Show passenger enter area
                if passenger_enter_area:
                        passenger_enter_area.visible = true
                        passenger_enter_area.monitoring = true
                        passenger_enter_area.monitorable = true

func _setup_engine_audio():
        if car1_sound and car2_sound:
                car1_sound.finished.connect(_on_car1_finished)
                car2_sound.finished.connect(_on_car2_finished)
                
                # Configure audio for better spatial sound
                car1_sound.max_distance = 50.0
                car1_sound.unit_size = 8.0
                car2_sound.max_distance = 50.0
                car2_sound.unit_size = 8.0
                
                print("Car audio ready")

func _on_car1_finished():
        is_car1_playing = false
        if abs(current_speed) > 0.1:
                car2_sound.play()

func _on_car2_finished():
        if abs(current_speed) > 0.1 and not is_car1_playing:
                car2_sound.play()

func _setup_input_actions():
        var actions = {
                "move_forward": KEY_W,
                "move_left": KEY_A,
                "move_backward": KEY_S,
                "move_right": KEY_D,
                "door_open": KEY_F,
                "handbrake": KEY_SPACE,
                "toggle_mouse": KEY_M,
                "exit_vehicle": KEY_P,
                "map": KEY_N
        }
        for action_name in actions.keys():
                if not InputMap.has_action(action_name):
                        InputMap.add_action(action_name)
                        var event = InputEventKey.new()
                        event.keycode = actions[action_name]
                        InputMap.action_add_event(action_name, event)

func _input(event: InputEvent):
        if event is InputEventMouseMotion and mouse_locked:
                camera_rotation.x -= event.relative.y * mouse_sensitivity
                camera_rotation.y -= event.relative.x * mouse_sensitivity
                camera_rotation.x = clamp(camera_rotation.x, -PI/2, PI/2)
                                                        
        if event is InputEventKey and event.keycode == KEY_M and event.pressed:
                mouse_locked = !mouse_locked
                if mouse_locked:
                        Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
                else:
                        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        
        if event.is_action_pressed("exit_vehicle") and not is_processing_exit:
                if is_driver_occupied:
                        start_exit_sequence()
                elif is_passenger_occupied and current_passenger and current_passenger.is_multiplayer_authority():
                        # Passenger exit
                        current_passenger._exit_as_passenger()

func _physics_process(delta: float):
        if is_processing_entry or is_processing_exit:
                return
        
        if not is_on_floor():
                velocity.y -= custom_gravity * delta
        else:
                if velocity.y < 0:
                        velocity.y = 0
        
        var current_position = global_position
        actual_speed = (current_position - last_position).length() / delta
        last_position = current_position
        
        is_actually_moving = actual_speed > 1.0
        is_handbrake = Input.is_action_pressed("handbrake")

        if is_handbrake:
                target_speed = 0.0
                current_speed = move_toward(current_speed, 0.0, handbrake_deceleration * delta)
        else:
                var forward_pressed = Input.is_action_pressed("move_backward")
                var backward_pressed = Input.is_action_pressed("move_forward")
                if forward_pressed:
                        target_speed = speed
                elif backward_pressed:
                        target_speed = -speed
                else:
                        target_speed = 0.0
                if abs(target_speed) > 0.01:
                        current_speed = move_toward(current_speed, target_speed, acceleration * delta)
                else:
                        current_speed = move_toward(current_speed, 0.0, deceleration * delta)

        if is_actually_moving and abs(current_speed) > 1.0:
                var turn_input = 0.0
                if Input.is_action_pressed("move_left"):
                        turn_input += 1.0
                if Input.is_action_pressed("move_right"):
                        turn_input -= 1.0
                if Input.is_action_pressed("move_backward"):
                        turn_input = -turn_input
                if abs(turn_input) > 0.01:
                        var speed_factor = abs(current_speed) / speed
                        var effective_rotation_speed = max_rotation_speed * speed_factor
                        current_yaw += turn_input * effective_rotation_speed * delta

        _update_turn_animation()

        if Input.is_action_just_pressed("door_open"):
                play_car_animation_synced("DoorOpen", 1.0, 1.0)

        _apply_movement()
        move_and_slide()
        _align_with_floor(delta)
        _update_camera()
        _update_engine_audio()
        _update_driver_position()
        _update_passenger_position()

func _update_driver_position():
        if is_driver_occupied and current_driver and seat_marker:
                var car_basis = global_transform.basis
                var visual_rotation_basis = Basis(Vector3.UP, deg_to_rad(car_visual.rotation_degrees.y))
                var combined_basis = visual_rotation_basis * car_basis
                var seat_world_position = global_transform.origin + combined_basis * seat_local_position
                var seat_local_basis = Basis.from_euler(seat_local_rotation)
                var final_basis = combined_basis * seat_local_basis
                var seat_world_rotation = final_basis.get_euler()
                
                current_driver.global_position = seat_world_position
                current_driver.global_rotation = seat_world_rotation
                
                if current_driver._body:
                        current_driver._body.rotation = Vector3.ZERO

func _update_passenger_position():
        if is_passenger_occupied and current_passenger and passenger_seat_marker:
                var car_basis = global_transform.basis
                var visual_rotation_basis = Basis(Vector3.UP, deg_to_rad(car_visual.rotation_degrees.y))
                var combined_basis = visual_rotation_basis * car_basis
                var seat_world_position = global_transform.origin + combined_basis * passenger_local_position
                var seat_local_basis = Basis.from_euler(passenger_local_rotation)
                var final_basis = combined_basis * seat_local_basis
                var seat_world_rotation = final_basis.get_euler()
                
                current_passenger.global_position = seat_world_position
                current_passenger.global_rotation = seat_world_rotation
                
                if current_passenger._body:
                        current_passenger._body.rotation = Vector3.ZERO

func _update_engine_audio():
        if not car1_sound or not car2_sound:
                return
        
        var is_moving = abs(current_speed) > 0.1
        var speed_ratio = clamp(abs(current_speed) / speed, 0.0, 1.0)
        var target_pitch = lerp(min_pitch, max_pitch, speed_ratio)
        
        # Apply pitch to both sounds
        car1_sound.pitch_scale = 1
        car2_sound.pitch_scale = 1
        
        if is_moving:
                if not was_moving:
                        # Just started moving - play engine sound
                        is_car1_playing = true
                        if car1_sound.stream:
                                car1_sound.play()
                elif not car1_sound.playing and not car2_sound.playing:
                        # Ensure one of the sounds is always playing when moving
                        is_car1_playing = true
                        if car1_sound.stream:
                                car1_sound.play()
        else:
                if was_moving:
                        # Just stopped moving
                        _stop_all_audio()
        
        was_moving = is_moving

func _stop_all_audio():
        if car1_sound and car1_sound.playing:
                car1_sound.stop()
        if car2_sound and car2_sound.playing:
                car2_sound.stop()
        is_car1_playing = false
        was_moving = false

func _update_turn_animation():
        var left_pressed = Input.is_action_pressed("move_left")
        var right_pressed = Input.is_action_pressed("move_right")
        var forward_pressed = Input.is_action_pressed("move_backward")
        var backward_pressed = Input.is_action_pressed("move_forward")
        var should_turn = (forward_pressed or backward_pressed) and (left_pressed or right_pressed) and is_actually_moving

        if forward_pressed:
                target_turn_angle = 0.0
                is_turning = false
        elif should_turn:
                if right_pressed:
                        target_turn_angle = -turn_angle
                        is_turning = true
                elif left_pressed:
                        target_turn_angle = turn_angle
                        is_turning = true
        else:
                target_turn_angle = 0.0
                is_turning = false

        current_turn_angle = lerp(current_turn_angle, target_turn_angle, turn_speed * get_physics_process_delta_time())
        car_visual.rotation_degrees.y = initial_visual_rotation + current_turn_angle

        if animation_player:
                if should_turn:
                        if right_pressed:
                                play_car_animation_synced("Right", 4.0, 1.0)
                        elif left_pressed:
                                play_car_animation_synced("Left", 4.0, 1.0)
                elif abs(current_speed) > 0.1:
                        if not is_turning:
                                play_car_animation_synced("Drive", 4.0, -sign(current_speed))
                elif not (forward_pressed or backward_pressed) and animation_player.current_animation != "DoorOpen":
                        play_car_animation_synced("Idle", 1.0, 1.0)

func _apply_movement():
        var direction = Vector3(sin(current_yaw), 0, cos(current_yaw)).normalized()
        var horizontal_velocity = direction * current_speed
        velocity.x = horizontal_velocity.x
        velocity.z = horizontal_velocity.z

func _align_with_floor(delta: float):
        if not is_on_floor():
                last_floor_normal = last_floor_normal.lerp(Vector3.UP, 5.0 * delta)
        else:
                var space_state = get_world_3d().direct_space_state
                var query = PhysicsRayQueryParameters3D.create(
                        global_position + Vector3(0, 0.5, 0),
                        global_position + Vector3.DOWN * 2.0
                )
                query.exclude = [self]
                var result = space_state.intersect_ray(query)
                if result:
                        last_floor_normal = last_floor_normal.lerp(result.normal, 15.0 * delta)

        var target_basis = Basis()
        target_basis.y = last_floor_normal
        var forward_flat = Vector3(sin(current_yaw), 0, cos(current_yaw))
        var forward_on_slope = forward_flat - last_floor_normal * forward_flat.dot(last_floor_normal)
        forward_on_slope = forward_on_slope.normalized()
        target_basis.z = forward_on_slope
        target_basis.x = target_basis.y.cross(target_basis.z).normalized()
        target_basis.z = target_basis.x.cross(target_basis.y).normalized()
        target_basis = target_basis.orthonormalized()
        transform.basis = transform.basis.slerp(target_basis, alignment_speed * delta)

func _update_camera():
        if camera:
                camera.transform.basis = Basis()
                camera.rotation.x = camera_rotation.x
                camera.rotation.y = camera_rotation.y

func _setup_enter_area():
        if enter_area:
                enter_area.body_entered.connect(_on_enter_area_body_entered)
                enter_area.body_exited.connect(_on_enter_area_body_exited)
                print("Enter area setup complete")
                        
func _on_enter_area_body_entered(body: Node3D):
        if is_driver_occupied or is_processing_entry or is_processing_exit:
                return
        if body.is_in_group("player"):
                body.nearby_car = self
                print("Car: Player ", body.name, " entered DRIVER area")

func _on_enter_area_body_exited(body: Node3D):
        if body.is_in_group("player"):
                if body.nearby_car == self:
                        body.nearby_car = null
                print("Car: Player ", body.name, " left DRIVER area")

# ============ DRIVER ENTRY SEQUENCE ============

func start_entry_sequence(player: Node3D):
        if is_driver_occupied or is_processing_entry or is_processing_exit:
                print("Car is already occupied or processing!")
                return
        
        is_processing_entry = true
        print("=== DRIVER ENTRY SEQUENCE STARTED ===")
        
        _entry_step1_save_transform(player)
        await get_tree().create_timer(0.1).timeout
        
        _entry_step2_teleport_to_seat(player)
        await get_tree().create_timer(0.1).timeout
        
        _entry_step3_play_animation(player)
        await get_tree().create_timer(0.2).timeout
        
        _entry_step4_hide_enter_area()
        
        _entry_step5_enable_car(player)
        
        is_processing_entry = false
        print("=== DRIVER ENTRY SEQUENCE COMPLETE ===")

func _entry_step1_save_transform(player: Node3D):
        driver_original_transform = player.global_transform
        print("Entry Step 1: Saved player original transform")
        if not is_solo_mode():
                sync_entry_step1.rpc(player.get_multiplayer_authority(), driver_original_transform)

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step1(player_id: int, original_transform: Transform3D):
        driver_original_transform = original_transform

func _entry_step2_teleport_to_seat(player: Node3D):
        if not seat_marker:
                print("ERROR: No seat marker!")
                return
        var seat_world_position = global_transform.origin + global_transform.basis * seat_local_position
        var seat_world_rotation = global_rotation + seat_local_rotation
        player.global_position = seat_world_position
        player.global_rotation = seat_world_rotation
        print("Entry Step 2: Player teleported to seat")
        if not is_solo_mode():
                sync_entry_step2.rpc(player.get_multiplayer_authority(), seat_world_position, seat_world_rotation)

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step2(player_id: int, world_pos: Vector3, world_rot: Vector3):
        var players = get_tree().get_nodes_in_group("player")
        for player in players:
                if player.get_multiplayer_authority() == player_id:
                        player.global_position = world_pos
                        player.global_rotation = world_rot
                        break

func _entry_step3_play_animation(player: Node3D):
        if player._body:
                player._body.is_in_car = true
        if player._body and player._body.animation_player:
                if player._body.animation_player.has_animation("CarTP"):
                        player._body.animation_player.play("CarTP")
        print("Entry Step 3: Playing CarTP animation")
        if not is_solo_mode():
                sync_entry_step3.rpc(player.get_multiplayer_authority())

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step3(player_id: int):
        var players = get_tree().get_nodes_in_group("player")
        for player in players:
                if player.get_multiplayer_authority() == player_id:
                        if player._body:
                                player._body.is_in_car = true
                        if player._body and player._body.animation_player:
                                if player._body.animation_player.has_animation("CarTP"):
                                        player._body.animation_player.play("CarTP")
                        break

func _entry_step4_hide_enter_area():
        if enter_area:
                enter_area.visible = false
                enter_area.monitoring = false
                enter_area.monitorable = false
        is_driver_occupied = true
        print("Entry Step 4: Enter area hidden")
        if not is_solo_mode():
                sync_entry_step4.rpc()

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step4():
        if enter_area:
                enter_area.visible = false
                enter_area.monitoring = false
                enter_area.monitorable = false
        is_driver_occupied = true

func _entry_step5_enable_car(player: Node3D):
        current_driver = player
        is_driver_occupied = true
        driver_id = player.get_multiplayer_authority()
        
        if not is_solo_mode():
                set_multiplayer_authority(driver_id)
        
        set_process_input(true)
        set_physics_process(true)
        mouse_locked = true
        Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
        if camera:
                camera.current = true
        print("Entry Step 5: Car enabled - Authority: ", driver_id)
        if not is_solo_mode():
                sync_entry_step5.rpc(driver_id)

@rpc("any_peer", "call_local", "reliable")
func sync_entry_step5(new_driver_id: int):
        var players = get_tree().get_nodes_in_group("player")
        for player in players:
                if player.get_multiplayer_authority() == new_driver_id:
                        current_driver = player
                        driver_id = new_driver_id
                        is_driver_occupied = true
                        break

# ============ PASSENGER ENTRY SEQUENCE ============

func _setup_passenger_enter_area():
        if passenger_enter_area:
                passenger_enter_area.body_entered.connect(_on_passenger_area_body_entered)
                passenger_enter_area.body_exited.connect(_on_passenger_area_body_exited)
                print("Passenger enter area setup complete")

func _on_passenger_area_body_entered(body: Node3D):
        if is_passenger_occupied or is_processing_passenger_entry:
                return
        if body.is_in_group("player"):
                body.nearby_car_passenger = self
                print("Car: Player ", body.name, " entered PASSENGER area")

func _on_passenger_area_body_exited(body: Node3D):
        if body.is_in_group("player"):
                if body.nearby_car_passenger == self:
                        body.nearby_car_passenger = null
                print("Car: Player ", body.name, " left PASSENGER area")

func start_passenger_entry_sequence(player: Node3D):
        if is_passenger_occupied or is_processing_passenger_entry:
                print("Passenger seat already occupied!")
                return
        
        is_processing_passenger_entry = true
        print("=== PASSENGER ENTRY SEQUENCE STARTED ===")
        
        passenger_original_transform = player.global_transform
        
        if passenger_seat_marker:
                var seat_world_position = global_transform.origin + global_transform.basis * passenger_local_position
                var seat_world_rotation = global_rotation + passenger_local_rotation
                player.global_position = seat_world_position
                player.global_rotation = seat_world_rotation
        
        if player._body:
                player._body.is_in_car = true
        
        current_passenger = player
        is_passenger_occupied = true
        passenger_id = player.get_multiplayer_authority()
        
        if passenger_enter_area:
                passenger_enter_area.visible = false
                passenger_enter_area.monitoring = false
                passenger_enter_area.monitorable = false
        
        is_processing_passenger_entry = false
        print("=== PASSENGER ENTRY SEQUENCE COMPLETE ===")

# ============ EXIT SEQUENCES ============

func start_exit_sequence():
        if not is_processing_exit and is_driver_occupied and current_driver:
                is_processing_exit = true
                print("=== DRIVER EXIT SEQUENCE STARTED ===")
                
                _exit_step1_disable_car()
                await get_tree().create_timer(0.1).timeout
                
                _exit_step2_teleport_and_restore()
                await get_tree().create_timer(0.2).timeout
                
                _exit_step3_show_enter_area()
                
                current_driver = null
                is_driver_occupied = false
                is_processing_exit = false
                print("=== DRIVER EXIT SEQUENCE COMPLETE ===")

func _exit_step1_disable_car():
        set_process_input(false)
        set_physics_process(false)
        mouse_locked = false
        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        if camera:
                camera.current = false
        print("Exit Step 1: Car disabled")
        if not is_solo_mode():
                sync_exit_step1.rpc()

@rpc("any_peer", "call_local", "reliable")
func sync_exit_step1():
        set_process_input(false)
        set_physics_process(false)
        mouse_locked = false
        Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
        if camera:
                camera.current = false

func _exit_step2_teleport_and_restore():
        if current_driver and driver_original_transform:
                current_driver.global_transform = driver_original_transform
                if current_driver._body:
                        current_driver._body.is_in_car = false
                if current_driver._body:
                        current_driver._body.rotation = Vector3.ZERO
                
                print("Exit Step 2: Camera switched, player teleported and rotation restored")
                if not is_solo_mode():
                        sync_exit_step2.rpc(driver_original_transform)

@rpc("any_peer", "call_local", "reliable")
func sync_exit_step2(original_transform: Transform3D):
        var players = get_tree().get_nodes_in_group("player")
        for player in players:
                if player.get_multiplayer_authority() == player.get_multiplayer_authority():
                        player.global_transform = original_transform
                        if player._body:
                                player._body.is_in_car = false
                        if player._body:
                                player._body.rotation = Vector3.ZERO
                        break

func _exit_step3_show_enter_area():
        if enter_area:
                enter_area.visible = true
                enter_area.monitoring = true
                enter_area.monitorable = true
        is_driver_occupied = false
        print("Exit Step 3: Enter area shown")
        if not is_solo_mode():
                sync_exit_step3.rpc()

@rpc("any_peer", "call_local", "reliable")
func sync_exit_step3():
        if enter_area:
                enter_area.visible = true
                enter_area.monitoring = true
                enter_area.monitorable = true
        is_driver_occupied = false

# ============ PASSENGER EXIT ============

func _exit_as_passenger():
        if is_passenger_occupied and current_passenger:
                is_passenger_occupied = false
                if passenger_original_transform:
                        current_passenger.global_transform = passenger_original_transform
                if current_passenger._body:
                        current_passenger._body.is_in_car = false
                current_passenger = null
                
                if passenger_enter_area:
                        passenger_enter_area.visible = true
                        passenger_enter_area.monitoring = true
                        passenger_enter_area.monitorable = true
                print("Passenger exit complete")

# ============ ANIMATION FUNCTIONS ============

func play_car_animation_synced(anim_name: String, speed: float = 1.0, direction: float = 1.0):
        _play_animation_local(anim_name, speed, direction)
        if not is_solo_mode():
                sync_car_animation.rpc(anim_name, speed, direction)

func _play_animation_local(anim_name: String, speed: float, direction: float):
        if animation_player and animation_player.has_animation(anim_name):
                animation_player.play(anim_name, -1, speed * direction)

@rpc("any_peer", "call_remote", "reliable")
func sync_car_animation(anim_name: String, speed: float, direction: float):
        _play_animation_local(anim_name, speed, direction)

func stop_car_animation_synced():
        if animation_player:
                animation_player.stop()
        if not is_solo_mode():
                sync_stop_car_animation.rpc()

@rpc("any_peer", "call_remote", "reliable")
func sync_stop_car_animation():
        if animation_player:
                animation_player.stop()

# ============ FALLBACK AUDIO SYSTEM ============

func _play_fallback_engine_sound():
        # Fallback method to play engine sound using direct audio playback
        if not car1_sound or not car2_sound:
                return
        
        # Ensure we have streams
        if not car1_sound.stream and fallback_car1_stream:
                car1_sound.stream = fallback_car1_stream
        if not car2_sound.stream and fallback_car2_stream:
                car2_sound.stream = fallback_car2_stream
        
        # If still no streams, try to create a simple fallback
        if not car1_sound.stream:
                _create_simple_fallback_sound(car1_sound)
        if not car2_sound.stream:
                _create_simple_fallback_sound(car2_sound)

func _create_simple_fallback_sound(audio_player: AudioStreamPlayer3D):
        # Create a simple engine-like sound programmatically as last resort
        var noise = AudioStreamGenerator.new()
        noise.mix_rate = 44100
        audio_player.stream = noise
        print("Created fallback audio stream for car")

# ============ UTILITY FUNCTIONS ============

func _process(_delta):
        # Update passenger position in process for smoother movement
        if is_passenger_occupied and current_passenger and passenger_seat_marker:
                _update_passenger_position()
`;

export function getVehicleTemplate(type: "car"): VehicleTemplate {
  const code = CAR_TEMPLATE;
  const variables = parseVariables(code);
  const functions = parseFunctions(code);

  return {
    name: type,
    code,
    variables,
    functions,
    description: "Full-featured car with multiplayer/solo support, driver+passenger seats, animations, physics, and audio"
  };
}

function parseVariables(code: string): VehicleVariable[] {
  const variables: VehicleVariable[] = [];
  const exportRegex = /@export var (\w+): (\w+(?:<[^>]+>)?) = ([^\n]+)/g;

  let match;
  while ((match = exportRegex.exec(code)) !== null) {
    variables.push({
      name: match[1],
      type: match[2],
      value: match[3].trim(),
    });
  }

  return variables;
}

function parseFunctions(code: string): VehicleFunction[] {
  const functions: VehicleFunction[] = [];
  const funcRegex = /func (_?\w+)\([^)]*\)[^:]*:/g;

  let match;
  const seen = new Set<string>();
  while ((match = funcRegex.exec(code)) !== null) {
    const funcName = match[1];
    if (!seen.has(funcName)) {
      functions.push({
        name: funcName,
        signature: match[0].slice(0, -1),
      });
      seen.add(funcName);
    }
  }

  return functions;
}

export function applyVarsToTemplate(
  template: VehicleTemplate,
  customVars: Record<string, string>
): string {
  let code = template.code;

  for (const variable of template.variables) {
    if (customVars[variable.name] !== undefined) {
      const oldValue = `@export var ${variable.name}: ${variable.type} = ${variable.value}`;
      const newValue = `@export var ${variable.name}: ${variable.type} = ${customVars[variable.name]}`;
      code = code.replace(oldValue, newValue);
    }
  }

  return code;
}

export function selectiveFunctions(
  template: VehicleTemplate,
  selectedFunctions: Set<string>
): string {
  let code = template.code;
  const allFunctions = template.functions;

  for (const func of allFunctions) {
    if (!selectedFunctions.has(func.name)) {
      const funcRegex = new RegExp(
        `func ${func.name}\\([^)]*\\)[^:]*:.*?(?=func|$)`,
        "s"
      );
      code = code.replace(funcRegex, "");
    }
  }

  return code;
}
