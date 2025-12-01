/**
 * Enemy Template Handler
 * Manages enemy template parsing, variable extraction, and script generation
 */

export interface EnemyVariable {
  name: string;
  type: string;
  value: string;
}

export interface EnemyFunction {
  name: string;
  signature: string;
}

export interface EnemyTemplate {
  type: "zombie" | "ranged" | "spawner";
  code: string;
  variables: EnemyVariable[];
  functions: EnemyFunction[];
}

const ZOMBIE_TEMPLATE = `# Zombie Script - Melee Combat System
extends CharacterBody3D

const ZOMBIE_DAMAGE = 15
const MAX_HEALTH = 100
const ROTATION_SPEED = 5.0
const MOVE_SPEED = 1.0

const PRIORITY_DISTANCE = 5.0

@export var sync_players_in_range: Array[int] = []

var players_in_range: Array = []
var player_distances: Dictionary = {}
var group_scan_timer: float = 0.0
var group_scan_interval: float = 0.3
var target_switch_timer: float = 0.0
var target_switch_check_interval: float = 0.2

@export var sync_health: int = MAX_HEALTH
@export var sync_position: Vector3 = Vector3.ZERO
@export var sync_rotation_y: float = 0.0
@export var sync_velocity: Vector3 = Vector3.ZERO
@export var sync_is_attacking: bool = false
@export var sync_current_animation: String = "zombieidle"
@export var sync_target_id: int = 0
@export var sync_is_dead: bool = false 

@onready var health_label: Label3D = $HealthLabel3D
@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var player_detector: Area3D = $PlayerDetector
@onready var damage_hitbox: Area3D = $Zombie/Armature/Skeleton3D/Hitbox/Attack

@export_category("Combat Settings")
@export var detection_radius: float = 20.0
@export var attack_range: float = 0.7
@export var attack_cooldown: float = 1.0

var current_health: int = MAX_HEALTH
var target_player: CharacterBody3D = null
var player_in_range: bool = false
var is_attacking: bool = false
var can_attack: bool = true
var can_deal_damage: bool = false
var is_dead: bool = false

func _ready():
        add_to_group("zombie")
        set_multiplayer_authority(1)
        _setup_collision()
        _setup_detector()
        _setup_damage_hitbox()
        _setup_health_label()
        _setup_animations()
        print("Zombie ready on layer 6")
        
func _setup_collision():
        collision_layer = 0
        set_collision_layer_value(4, true)
        collision_mask = 0
        set_collision_mask_value(1, true)
        set_collision_mask_value(2, true)
        set_collision_mask_value(3, true)
        print("Zombie collision: Layer 6, Mask 1,2,3")

func _setup_detector():
        if not player_detector:
                player_detector = Area3D.new()
                player_detector.name = "PlayerDetector"
                add_child(player_detector)
                
                var collision_shape = CollisionShape3D.new()
                var sphere = SphereShape3D.new()
                sphere.radius = detection_radius
                collision_shape.shape = sphere
                player_detector.add_child(collision_shape)
                print("Created PlayerDetector for zombie")
        else:
                var collision_shape = player_detector.get_child(0)
                if collision_shape is CollisionShape3D:
                        var sphere_shape = collision_shape.shape as SphereShape3D
                        if sphere_shape:
                                sphere_shape.radius = detection_radius
        
        player_detector.collision_layer = 0
        player_detector.collision_mask = 0
        player_detector.set_collision_mask_value(5, true)
        player_detector.area_entered.connect(_on_detection_area_entered)
        player_detector.area_exited.connect(_on_detection_area_exited)
        print("Zombie PlayerDetector configured: Mask 5")

func _setup_damage_hitbox():
        if not damage_hitbox:
                damage_hitbox = Area3D.new()
                damage_hitbox.name = "DamageHitbox"
                add_child(damage_hitbox)
                
                var collision_shape = CollisionShape3D.new()
                var sphere = SphereShape3D.new()
                sphere.radius = 1.2
                collision_shape.shape = sphere
                collision_shape.position = Vector3(0, 1, -0.8)
                damage_hitbox.add_child(collision_shape)
                        
        damage_hitbox.collision_layer = 0
        damage_hitbox.set_collision_layer_value(7, true)
        damage_hitbox.collision_mask = 0
        damage_hitbox.set_collision_mask_value(3, true)
        damage_hitbox.monitoring = false
        
        damage_hitbox.body_entered.connect(_on_damage_hitbox_body_entered)

func _setup_health_label():
        if not health_label:
                health_label = Label3D.new()
                health_label.name = "HealthLabel3D"
                add_child(health_label)
                health_label.position = Vector3(0, 2.5, 0)
                health_label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
                health_label.font_size = 32
                print("Created HealthLabel3D for zombie")
        _update_health_ui()

func _setup_animations():
        if animation_player:
                if animation_player.has_animation("zombieidle"):
                        animation_player.play("zombieidle")
                print("Zombie animations ready")

func _physics_process(delta):
        if sync_is_dead:
                if not is_multiplayer_authority() and not is_dead:
                        _die()
                        return
                elif is_multiplayer_authority() and not is_dead:
                        _die()
                return
        
        if is_dead:
                return
                
        if not is_multiplayer_authority():
                global_position = sync_position
                rotation.y = sync_rotation_y
                velocity = sync_velocity
                current_health = sync_health
                is_attacking = sync_is_attacking
                _apply_synced_animation()
                _update_health_ui()
                return
        
        if not is_on_floor():
                velocity.y -= 20.0 * delta
        else:
                velocity.y = 0
        
        group_scan_timer += delta
        if group_scan_timer >= group_scan_interval:
                _scan_for_players_by_group()
                _update_player_distances()
                group_scan_timer = 0.0
        
        target_switch_timer += delta
        if target_switch_timer >= target_switch_check_interval:
                _check_for_priority_target_switch()
                target_switch_timer = 0.0
        
        _validate_current_target()
        
        if players_in_range.size() > 0 and (target_player == null or not is_instance_valid(target_player) or not _is_target_valid(target_player)):
                _acquire_best_target()
        
        if target_player and is_instance_valid(target_player) and _is_target_valid(target_player):
                _rotate_to_face_player(delta)
                
                var distance_to_player = global_position.distance_to(target_player.global_position)
                
                if distance_to_player <= attack_range:
                        velocity = Vector3.ZERO
                        if can_attack and not is_attacking:
                                _start_attack()
                else:
                        if not is_attacking:
                                _move_towards_player()
                                _play_animation("zombiewalk")
        else:
                velocity = Vector3.ZERO
                if not is_attacking:
                        _play_animation("zombieidle")
        
        move_and_slide()
        
        sync_position = global_position
        sync_rotation_y = rotation.y
        sync_velocity = velocity
        sync_health = current_health
        sync_is_attacking = is_attacking
        sync_is_dead = (current_health <= 0)
        
        sync_players_in_range.clear()
        for player in players_in_range:
                if is_instance_valid(player):
                        sync_players_in_range.append(int(player.name))
        
        if animation_player and animation_player.current_animation != "":
                sync_current_animation = animation_player.current_animation
        
        if target_player and is_instance_valid(target_player):
                sync_target_id = int(target_player.name)
        else:
                sync_target_id = 0

func _apply_synced_animation():
        if not animation_player:
                return
        
        if sync_current_animation != "" and animation_player.current_animation != sync_current_animation:
                if animation_player.has_animation(sync_current_animation):
                        animation_player.play(sync_current_animation)
                        if sync_current_animation == "zombiewalk":
                                animation_player.speed_scale = 2.0
                        else:
                                animation_player.speed_scale = 1.0
                        print("CLIENT: Zombie playing synced animation: ", sync_current_animation)
                else:
                        push_warning("Zombie animation not found: ", sync_current_animation)

func _rotate_to_face_player(delta: float):
        if not target_player:
                return
        
        var direction_to_player = target_player.global_position - global_position
        direction_to_player.y = 0
        direction_to_player = direction_to_player.normalized()
        
        if direction_to_player.length() > 0.01:
                var target_rotation = atan2(direction_to_player.x, direction_to_player.z)
                rotation.y = lerp_angle(rotation.y, target_rotation, ROTATION_SPEED * delta)

func _move_towards_player():
        if not target_player:
                return
        
        var direction = (target_player.global_position - global_position).normalized()
        direction.y = 0
        velocity.x = direction.x * MOVE_SPEED
        velocity.z = direction.z * MOVE_SPEED

func _start_attack():
        if is_attacking or not can_attack or is_dead:
                return
        
        is_attacking = true
        sync_is_attacking = true
        can_attack = false
        can_deal_damage = false
        
        var attack_animations = ["Attack1", "Attack2", "Attack3"]
        var chosen_attack = attack_animations[randi() % attack_animations.size()]
        _play_animation(chosen_attack)
        
        print("Zombie attacking with: ", chosen_attack)
        
        await get_tree().create_timer(0.4).timeout
        
        if is_dead:
                return
        
        if damage_hitbox and is_attacking:
                damage_hitbox.monitoring = true
                can_deal_damage = true
                print("Zombie damage hitbox enabled")
        
        await get_tree().create_timer(1.5).timeout
        
        if is_dead:
                return
        
        if damage_hitbox:
                damage_hitbox.monitoring = false
                can_deal_damage = false
                print("Zombie damage hitbox disabled")
        
        await get_tree().create_timer(0.3).timeout
        
        if is_dead:
                return
        
        is_attacking = false
        
        await get_tree().create_timer(attack_cooldown).timeout
        
        if is_dead:
                return
                
        can_attack = true

func _play_animation(anim_name: String):
        if animation_player and animation_player.has_animation(anim_name):
                if animation_player.current_animation != anim_name:
                        animation_player.play(anim_name)
                        if anim_name == "zombiewalk":
                                animation_player.speed_scale = 2.0
                        else:
                                animation_player.speed_scale = 1.0
                        sync_current_animation = anim_name

func _on_damage_hitbox_body_entered(body: Node):
        if is_dead or not can_deal_damage or not is_attacking:
                return
        
        print("Zombie damage hitbox hit body: ", body.name, " in groups: ", body.get_groups())
        
        if body and body.is_in_group("player") and body.has_method("take_damage"):
                body.take_damage(ZOMBIE_DAMAGE, 0, "melee")
                can_deal_damage = false
                print("✓ Zombie dealt ", ZOMBIE_DAMAGE, " damage to player ", body.name, "!")

func _on_detection_area_entered(area: Area3D):
        if is_dead:
                return
                
        if area.name == "DetectionArea":
                var player = area.get_parent()
                if player and player.is_in_group("player") and _is_target_valid(player):
                        var distance = global_position.distance_to(player.global_position)
                        
                        if not players_in_range.has(player):
                                players_in_range.append(player)
                                print("✅ ZOMBIE AREA DETECTION: Player ", player.name, " entered range (distance: ", distance, ")")
                        
                        if target_player == null or distance < PRIORITY_DISTANCE:
                                target_player = player
                                player_in_range = true
                                print("🎯 ZOMBIE IMMEDIATE TARGET: ", player.name)

func _on_detection_area_exited(area: Area3D):
        if area.name == "DetectionArea":
                var player = area.get_parent()
                if player and player.is_in_group("player") and players_in_range.has(player):
                        players_in_range.erase(player)
                        print("❌ ZOMBIE AREA DETECTION: Player ", player.name, " left range")
                        
                        if player == target_player:
                                target_player = null
                                player_in_range = false
                                _acquire_best_target()

func take_damage(damage: int):
        if sync_is_dead or is_dead:
                return
        
        if not is_multiplayer_authority():
                rpc_id(1, "_apply_damage_on_host", damage)
                return
        
        _apply_damage_on_host(damage)

@rpc("any_peer", "call_local", "reliable")
func _apply_damage_on_host(damage: int):
        if sync_is_dead or is_dead:
                return
        
        if not is_multiplayer_authority():
                return
        
        current_health -= damage
        current_health = max(0, current_health)
        sync_health = current_health
        _update_health_ui()
        
        print("Zombie took ", damage, " damage. Health: ", current_health)
        
        if current_health <= 0:
                sync_is_dead = true
                print("Zombie died! (syncing to clients...)")

func _update_health_ui():
        if health_label:
                health_label.text = str(current_health)
                var health_percent = float(current_health) / float(MAX_HEALTH)
                if health_percent > 0.6:
                        health_label.modulate = Color(0, 1, 0)
                elif health_percent > 0.3:
                        health_label.modulate = Color(1, 1, 0)
                else:
                        health_label.modulate = Color(1, 0, 0)

func _die():
        if is_dead:
                return
        
        is_dead = true
        print("Zombie _die() called! (Authority: ", is_multiplayer_authority(), ")")
        
        if damage_hitbox:
                damage_hitbox.monitoring = false
        if player_detector:
                player_detector.monitoring = false
        
        collision_layer = 0
        collision_mask = 0
        
        if animation_player and animation_player.has_animation("zombiedeath"):
                animation_player.play("zombiedeath")
                await get_tree().create_timer(1.0).timeout
        
        queue_free()

func _scan_for_players_by_group():
        var all_players = get_tree().get_nodes_in_group("player")
        var players_found_this_scan: Array = []
        
        for player in all_players:
                if is_instance_valid(player) and player is CharacterBody3D:
                        var distance = global_position.distance_to(player.global_position)
                        
                        if distance <= detection_radius and _is_target_valid(player):
                                players_found_this_scan.append(player)
                                
                                if not players_in_range.has(player):
                                        players_in_range.append(player)
                                        print("✅ ZOMBIE GROUP DETECTION: Player ", player.name, " entered range (distance: ", distance, ")")
        
        for player in players_in_range.duplicate():
                if not players_found_this_scan.has(player):
                        var distance = global_position.distance_to(player.global_position) if is_instance_valid(player) else INF
                        
                        if distance > detection_radius or not _is_target_valid(player):
                                players_in_range.erase(player)
                                print("❌ ZOMBIE GROUP DETECTION: Player ", player.name if is_instance_valid(player) else "invalid", " left range")
                                
                                if player == target_player:
                                        target_player = null
                                        player_in_range = false
                                        print("🎯 Zombie target lost, will acquire new target")

func _update_player_distances():
        player_distances.clear()
        
        for player in players_in_range:
                if is_instance_valid(player):
                        var distance = global_position.distance_to(player.global_position)
                        player_distances[player] = distance

func _check_for_priority_target_switch():
        if players_in_range.size() <= 1:
                return
        
        var closest_player: CharacterBody3D = null
        var closest_distance: float = INF
        var priority_player: CharacterBody3D = null
        
        for player in players_in_range:
                if is_instance_valid(player) and _is_target_valid(player):
                        var distance = player_distances.get(player, global_position.distance_to(player.global_position))
                        
                        if distance < PRIORITY_DISTANCE:
                                if priority_player == null or distance < global_position.distance_to(priority_player.global_position):
                                        priority_player = player
                        
                        if distance < closest_distance:
                                closest_distance = distance
                                closest_player = player
        
        if priority_player:
                if target_player != priority_player:
                        target_player = priority_player
                        player_in_range = true
                        print("🎯 ZOMBIE PRIORITY TARGET: ", priority_player.name, " (within 5m)")
                        if is_attacking:
                                is_attacking = false
                                can_attack = true
        elif closest_player:
                if target_player != closest_player:
                        target_player = closest_player
                        player_in_range = true
                        print("🎯 ZOMBIE TARGET ACQUIRED: ", closest_player.name, " at distance: ", closest_distance)

func _acquire_best_target():
        var closest_player: CharacterBody3D = null
        var closest_distance: float = INF
        var priority_player: CharacterBody3D = null
        
        for player in players_in_range:
                if is_instance_valid(player) and _is_target_valid(player):
                        var distance = player_distances.get(player, global_position.distance_to(player.global_position))
                        
                        if distance < PRIORITY_DISTANCE:
                                if priority_player == null or distance < global_position.distance_to(priority_player.global_position):
                                        priority_player = player
                        
                        if distance < closest_distance:
                                closest_distance = distance
                                closest_player = player
        
        if priority_player:
                target_player = priority_player
                player_in_range = true
                print("🎯 ZOMBIE PRIORITY TARGET: ", priority_player.name, " (within 5m)")
        elif closest_player:
                target_player = closest_player
                player_in_range = true
                print("🎯 ZOMBIE TARGET ACQUIRED: ", closest_player.name, " at distance: ", closest_distance)
        else:
                target_player = null
                player_in_range = false
                print("⚠️ Zombie: No valid targets available")

func _is_target_valid(player: CharacterBody3D) -> bool:
        if not player or not is_instance_valid(player):
                return false
        
        if player.has_method("get") and player.get("sync_is_dead"):
                if player.sync_is_dead:
                        return false
        
        var distance = global_position.distance_to(player.global_position)
        if distance > detection_radius:
                return false
        
        if player.has_method("get") and player.get("is_spectator"):
                if player.is_spectator:
                        return false
        
        return true

func _validate_current_target():
        if target_player and is_instance_valid(target_player):
                if not _is_target_valid(target_player):
                        print("⚠️ Zombie current target invalid: ", target_player.name)
                        target_player = null
                        player_in_range = false
        else:
                target_player = null
                player_in_range = false
`;

const SPAWNER_TEMPLATE = `# Enemy Spawner - Attach to a Node3D to spawn enemies
extends Node3D

@export var zombie_scene: PackedScene
@export var spawn_interval: float = 5.0
@export var max_zombies: int = 5
@export var spawn_radius_min: float = 8.0
@export var spawn_radius_max: float = 20.0

var active_zombies: Array = []
var spawn_timer: Timer
var player: CharacterBody3D
var player_original_forward: Vector3

func _ready():
        print("Zombie Spawner initialized")
        setup_spawn_timer()
        find_player()
        
        if player:
                player_original_forward = player.global_transform.basis.z.normalized()
                player_original_forward.y = 0
                print("Player original forward direction stored: ", player_original_forward)
        
        if not zombie_scene:
                zombie_scene = load("res://Scenes/zombie.tscn")
                if not zombie_scene:
                        print("ERROR: Could not load zombie scene! Check the path.")
                        return
        
        print("Zombie scene loaded successfully")
        
        await get_tree().create_timer(2.0).timeout
        print("Testing manual spawn...")
        debug_spawn()

func setup_spawn_timer():
        spawn_timer = Timer.new()
        add_child(spawn_timer)
        
        spawn_timer.wait_time = spawn_interval
        spawn_timer.timeout.connect(_on_spawn_timer_timeout)
        
        spawn_timer.start()
        
        print("Spawn timer setup complete - interval: ", spawn_interval, " seconds")
        print("Timer started: ", spawn_timer.is_stopped() == false)

func find_player():
        var players = get_tree().get_nodes_in_group("player")
        if players.size() > 0:
                player = players[0]
                print("Player found by group: ", player.name)
                return
        
        var potential_paths = [
                "../Player",
                "Player", 
                "../Penny2/Penny",
                "Penny2/Penny",
                "CharacterBody3D"
        ]
        
        for path in potential_paths:
                var node = get_node_or_null(path)
                if node and node is CharacterBody3D:
                        player = node
                        print("Player found at path: ", path)
                        return
        
        print("WARNING: Player not found! Make sure player is in 'player' group or adjust paths.")

func _on_spawn_timer_timeout():
        print("Spawn timer triggered - Active zombies: ", active_zombies.size(), "/", max_zombies)
        
        if active_zombies.size() < max_zombies and player:
                spawn_zombie()
                spawn_timer.start()
        elif not player:
                print("Cannot spawn - no player found")
                spawn_timer.start()
        else:
                print("Max zombies reached, waiting...")
                spawn_timer.start()

func spawn_zombie():
        if not zombie_scene:
                print("ERROR: No zombie scene assigned!")
                return
        
        if not player:
                print("ERROR: No player found for spawning!")
                return
        
        print("Spawning zombie...")
        
        var zombie = zombie_scene.instantiate()
        if not zombie:
                print("ERROR: Failed to instantiate zombie!")
                return
        
        get_parent().add_child(zombie)
        
        var forward_direction = player_original_forward
        
        var spawn_pos = player.global_position
        var distance = randf_range(spawn_radius_min, spawn_radius_max)
        
        var max_angle_variation = deg_to_rad(15.0)
        var angle_variation = randf_range(-max_angle_variation, max_angle_variation)
        
        var rotated_forward = Vector3(
                forward_direction.x * cos(angle_variation) - forward_direction.z * sin(angle_variation),
                0,
                forward_direction.x * sin(angle_variation) + forward_direction.z * cos(angle_variation)
        )
        
        spawn_pos += rotated_forward * distance
        
        spawn_pos.y = player.global_position.y
        
        zombie.global_position = spawn_pos
        
        print("Zombie spawn position: ", spawn_pos)
        print("Player position: ", player.global_position)
        print("Using original forward direction: ", forward_direction)
        print("Angle variation (degrees): ", rad_to_deg(angle_variation))
        print("Distance from player: ", player.global_position.distance_to(spawn_pos))
        
        if zombie.has_signal("zombie_died"):
                zombie.zombie_died.connect(_on_zombie_died.bind(zombie))
        
        active_zombies.append(zombie)
        
        print("Zombie spawned successfully! Total active: ", active_zombies.size())

func _on_zombie_died(zombie):
        print("Zombie died, removing from active list")
        if zombie in active_zombies:
                active_zombies.erase(zombie)
        print("Active zombies remaining: ", active_zombies.size())

func debug_spawn():
        spawn_zombie()

func _input(event):
        if event is InputEventKey and event.pressed:
                if event.keycode == KEY_Z:
                        print("Manual spawn triggered by Z key")
                        debug_spawn()
`;

const RANGED_TEMPLATE = `extends CharacterBody3D

const ENEMY_DAMAGE = 10
const MAX_HEALTH = 100
const ROTATION_SPEED = 5.0
const PRIORITY_DISTANCE = 5.0

@onready var raycast: RayCast3D = $ShootPosition/RayCast3D
@onready var player_detector: Area3D = $PlayerDetector
@onready var health_label: Label3D = $HealthLabel3D
@onready var animation_player: AnimationPlayer = $AnimationPlayer
@onready var line_of_sight: Area3D = $ShootPosition/LineOfSightArea

@onready var walk_sound: AudioStreamPlayer3D = $WalkSound
@onready var fire_sound: AudioStreamPlayer3D = $FireSound
@onready var hit_sound: AudioStreamPlayer3D = $HitSound

@export var sync_health: int = MAX_HEALTH
@export var sync_position: Vector3 = Vector3.ZERO
@export var sync_rotation_y: float = 0.0
@export var sync_is_shooting: bool = false
@export var sync_target_id: int = 0
@export var sync_is_dead: bool = false 
@export var sync_current_animation: String = "RifleIdle"
@export var sync_players_in_range: Array[int] = []

@export var footstep_counter: int = 0
@export var fire_counter: int = 0
@export var hit_counter: int = 0
@export var footstep_type: String = "walk"

@export_category("Combat Settings")
@export var fire_rate: float = 1.5
@export var detection_radius: float = 20.0

var last_hit_counter: int = 0
var last_fire_counter: int = 0
var last_footstep_counter: int = 0
var last_sync_position: Vector3 = Vector3.ZERO
var velocity_stopped_frames: int = 0
var required_stopped_frames: int = 2

var footstep_timer: float = 0.0
var walk_footstep_interval: float = 0.6
var current_health: int = MAX_HEALTH
var can_shoot: bool = true
var player_in_range: bool = false
var target_player: CharacterBody3D = null
var is_shooting: bool = false
var players_in_range: Array = []
var player_distances: Dictionary = {}
var group_scan_timer: float = 0.0
var group_scan_interval: float = 0.3
var target_switch_timer: float = 0.0
var target_switch_check_interval: float = 0.2
var is_dead: bool = false

func _ready():
        set_multiplayer_authority(1)
        current_health = sync_health
        _setup_collision()
        _setup_raycast()
        _setup_detector()
        _setup_line_of_sight()
        _setup_health_label()
        _setup_audio_nodes()
        
        print("Ranged Enemy ready - Authority: ", get_multiplayer_authority(), " | Peer: ", multiplayer.get_unique_id())

func _setup_collision():
        collision_layer = 0
        set_collision_layer_value(4, true)
        collision_mask = 0
        set_collision_mask_value(1, true)
        set_collision_mask_value(2, true)
        set_collision_mask_value(3, true)
        
func _setup_raycast():
        if not raycast:
                return
                
        raycast.enabled = true
        raycast.target_position = Vector3(0, 0, -50)
        raycast.collision_mask = 0
        raycast.set_collision_mask_value(4, true)
        raycast.set_collision_mask_value(1, true)
        raycast.set_collision_mask_value(2, true)
        
func _setup_line_of_sight():
        if not line_of_sight:
                return
        
        line_of_sight.collision_layer = 0
        line_of_sight.collision_mask = 0
        line_of_sight.set_collision_mask_value(4, true)

func _setup_detector():
        if not player_detector:
                return
                
        var collision_shape = player_detector.get_child(0)
        if collision_shape is CollisionShape3D:
                var sphere_shape = collision_shape.shape as SphereShape3D
                if sphere_shape:
                        sphere_shape.radius = detection_radius
        
        player_detector.collision_layer = 0
        player_detector.collision_mask = 0
        player_detector.set_collision_mask_value(4, true)
        
        if is_multiplayer_authority():
                player_detector.area_entered.connect(_on_detection_area_entered)
                player_detector.area_exited.connect(_on_detection_area_exited)

func _setup_health_label():
        if not health_label:
                health_label = Label3D.new()
                health_label.name = "HealthLabel3D"
                add_child(health_label)
                health_label.position = Vector3(0, 2, 0)
                health_label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
        _update_health_ui()

func _setup_audio_nodes():
        if walk_sound:
                walk_sound.bus = "SFX"
                walk_sound.max_distance = 8.0
                walk_sound.unit_size = 3.0
                walk_sound.attenuation_filter_cutoff_hz = 5000
                walk_sound.attenuation_filter_db = 24.0
                
        if fire_sound:
                fire_sound.bus = "SFX"
                fire_sound.max_distance = 20.0
                fire_sound.unit_size = 4.0
                fire_sound.attenuation_filter_cutoff_hz = 5000
                fire_sound.attenuation_filter_db = 24.0
                
        if hit_sound:
                hit_sound.bus = "SFX"
                hit_sound.max_distance = 12.0
                hit_sound.unit_size = 3.0
                hit_sound.attenuation_filter_cutoff_hz = 5000
                hit_sound.attenuation_filter_db = 24.0

func _physics_process(delta):
        if sync_is_dead:
                if not is_multiplayer_authority() and not is_dead:
                        _die()
                        return
                elif is_multiplayer_authority() and not is_dead:
                        _die()
                return
        
        if is_dead:
                return
        
        if not is_multiplayer_authority():
                global_position = sync_position
                rotation.y = sync_rotation_y
                current_health = sync_health
                is_shooting = sync_is_shooting
                _apply_synced_animation()
                _update_health_ui()
                return
        
        if not is_on_floor():
                velocity.y -= 20.0 * delta
        else:
                velocity.y = 0
        move_and_slide()
        
        group_scan_timer += delta
        if group_scan_timer >= group_scan_interval:
                _scan_for_players_by_group()
                _update_player_distances()
                group_scan_timer = 0.0
        
        target_switch_timer += delta
        if target_switch_timer >= target_switch_check_interval:
                _check_for_priority_target_switch()
                target_switch_timer = 0.0
        
        _validate_current_target()
        
        if players_in_range.size() > 0 and (target_player == null or not is_instance_valid(target_player) or not _is_target_valid(target_player)):
                _acquire_best_target()
        
        if target_player and is_instance_valid(target_player) and _is_target_valid(target_player):
                _rotate_to_face_player(delta)
                
                var can_see_player = _check_can_see_player()
                
                if can_see_player:
                        if not is_shooting:
                                _start_shooting_animation()
                        
                        if can_shoot:
                                _fire_at_player()
                else:
                        if is_shooting:
                                _stop_shooting_animation()
        else:
                _stop_shooting_animation()
        
        _update_footstep_audio(delta)
        
        sync_position = global_position
        sync_rotation_y = rotation.y
        sync_health = current_health
        sync_is_shooting = is_shooting
        sync_is_dead = (current_health <= 0)
        
        sync_players_in_range.clear()
        for player in players_in_range:
                if is_instance_valid(player):
                        sync_players_in_range.append(int(player.name))
        
        if animation_player and animation_player.current_animation != "":
                sync_current_animation = animation_player.current_animation
        
        if target_player and is_instance_valid(target_player):
                sync_target_id = int(target_player.name)
        else:
                sync_target_id = 0

func _process(_delta):
        if sync_is_dead:
                if not is_multiplayer_authority() and not is_dead:
                        _die()
                return
                
        if not is_multiplayer_authority():
                _check_remote_audio()
                _check_remote_audio_stop()
                _update_health_ui()

func _update_player_distances():
        player_distances.clear()
        
        for player in players_in_range:
                if is_instance_valid(player):
                        var distance = global_position.distance_to(player.global_position)
                        player_distances[player] = distance

func _check_for_priority_target_switch():
        if players_in_range.size() <= 1:
                return
        
        var current_target_visible = false
        if target_player and is_instance_valid(target_player) and _is_target_valid(target_player):
                current_target_visible = _check_can_see_player()
        
        var closest_player: CharacterBody3D = null
        var closest_distance: float = INF
        var closest_firable_player: CharacterBody3D = null
        var closest_firable_distance: float = INF
        
        for player in players_in_range:
                if is_instance_valid(player) and _is_target_valid(player):
                        var distance = player_distances.get(player, global_position.distance_to(player.global_position))
                        
                        if distance < closest_distance:
                                closest_distance = distance
                                closest_player = player
                        
                        var temp_target = target_player
                        target_player = player
                        var has_los = _check_can_see_player()
                        target_player = temp_target
                        
                        if has_los and distance < closest_firable_distance:
                                closest_firable_distance = distance
                                closest_firable_player = player
        
        if not current_target_visible and closest_firable_player:
                if target_player != closest_firable_player:
                        print("🎯 IMMEDIATE SWITCH: Current target not visible, switching to firable player ", closest_firable_player.name)
                        target_player = closest_firable_player
                        player_in_range = true
                        if is_shooting:
                                _stop_shooting_animation()
                        return
        
        if closest_player and closest_distance < PRIORITY_DISTANCE:
                if target_player != closest_player:
                        print("⚠️ PRIORITY SWITCH: Player ", closest_player.name, " is within ", closest_distance, "m - switching target!")
                        target_player = closest_player
                        player_in_range = true
                        if is_shooting:
                                _stop_shooting_animation()
                        return
        
        if target_player == null or not is_instance_valid(target_player) or not _is_target_valid(target_player):
                if closest_player:
                        print("🎯 Target lost, switching to: ", closest_player.name)
                        target_player = closest_player
                        player_in_range = true

func _scan_for_players_by_group():
        var all_players = get_tree().get_nodes_in_group("player")
        var players_found_this_scan: Array = []
        
        for player in all_players:
                if is_instance_valid(player) and player is CharacterBody3D:
                        var distance = global_position.distance_to(player.global_position)
                        
                        if distance <= detection_radius and _is_target_valid(player):
                                players_found_this_scan.append(player)
                                
                                if not players_in_range.has(player):
                                        players_in_range.append(player)
                                        print("✅ GROUP DETECTION: Player ", player.name, " entered range (distance: ", distance, ")")
                                        
                                        rpc("_sync_player_detected", int(player.name), distance)
        
        for player in players_in_range.duplicate():
                if not players_found_this_scan.has(player):
                        var distance = global_position.distance_to(player.global_position) if is_instance_valid(player) else INF
                        
                        if distance > detection_radius or not _is_target_valid(player):
                                players_in_range.erase(player)
                                print("❌ GROUP DETECTION: Player ", player.name if is_instance_valid(player) else "invalid", " left range")
                                
                                if player == target_player:
                                        target_player = null
                                        player_in_range = false
                                        print("🎯 Current target lost, will acquire new target")

@rpc("authority", "call_local", "reliable")
func _sync_player_detected(player_id: int, distance: float):
        if not is_multiplayer_authority():
                print("CLIENT: Received detection sync - Player ", player_id, " at distance ", distance)

func _on_detection_area_entered(area: Area3D):
        if not is_multiplayer_authority():
                return
        
        var player = area.get_parent()
        
        if player and player.is_in_group("player") and _is_target_valid(player):
                if not players_in_range.has(player):
                        players_in_range.append(player)
                        var distance = global_position.distance_to(player.global_position)
                        print("✅ AREA DETECTION: Player ", player.name, " entered range (distance: ", distance, ")")
                        
                        if target_player == null or distance < PRIORITY_DISTANCE:
                                target_player = player
                                player_in_range = true
                                print("🎯 IMMEDIATE TARGET: ", player.name)

func _on_detection_area_exited(area: Area3D):
        if not is_multiplayer_authority():
                return
        
        var player = area.get_parent()
        
        if player and player.is_in_group("player") and players_in_range.has(player):
                players_in_range.erase(player)
                print("❌ AREA DETECTION: Player ", player.name, " left range")
                
                if player == target_player:
                        target_player = null
                        player_in_range = false
                        _acquire_best_target()

func _validate_current_target():
        if target_player and is_instance_valid(target_player):
                if not _is_target_valid(target_player):
                        print("⚠️ Current target invalid: ", target_player.name)
                        target_player = null
        else:
                target_player = null

func _is_target_valid(player: CharacterBody3D) -> bool:
        if not player or not is_instance_valid(player):
                return false
        
        if player.has_method("get") and player.get("sync_is_dead"):
                if player.sync_is_dead:
                        return false
        
        var distance = global_position.distance_to(player.global_position)
        if distance > detection_radius:
                return false
        
        if player.has_method("get") and player.get("is_spectator"):
                if player.is_spectator:
                        return false
        
        return true

func _acquire_best_target():
        var closest_player: CharacterBody3D = null
        var closest_distance: float = INF
        var priority_player: CharacterBody3D = null
        
        for player in players_in_range:
                if is_instance_valid(player) and _is_target_valid(player):
                        var distance = player_distances.get(player, global_position.distance_to(player.global_position))
                        
                        if distance < PRIORITY_DISTANCE:
                                if priority_player == null or distance < global_position.distance_to(priority_player.global_position):
                                        priority_player = player
                        
                        if distance < closest_distance:
                                closest_distance = distance
                                closest_player = player
        
        if priority_player:
                target_player = priority_player
                player_in_range = true
                print("🎯 PRIORITY TARGET: ", priority_player.name, " (within 5m)")
        elif closest_player:
                target_player = closest_player
                player_in_range = true
                print("🎯 TARGET ACQUIRED: ", closest_player.name, " at distance: ", closest_distance)
        else:
                target_player = null
                player_in_range = false
                print("⚠️ No valid targets available")

func _check_remote_audio():
        if footstep_counter != last_footstep_counter:
                _play_footstep_sound_client(footstep_type)
                last_footstep_counter = footstep_counter
        
        if fire_counter != last_fire_counter:
                _play_fire_sound_client()
                last_fire_counter = fire_counter
        
        if hit_counter != last_hit_counter:
                _play_hit_sound_client()
                last_hit_counter = hit_counter

func _check_remote_audio_stop():
        if is_multiplayer_authority():
                return
        
        var is_stopped_now = sync_position.distance_to(last_sync_position) < 0.1
        
        if is_stopped_now:
                velocity_stopped_frames += 1
        else:
                velocity_stopped_frames = 0
                last_sync_position = sync_position
        
        if velocity_stopped_frames >= required_stopped_frames:
                _stop_footstep_sounds()
                velocity_stopped_frames = required_stopped_frames

func _stop_footstep_sounds():
        if walk_sound and walk_sound.playing:
                walk_sound.stop()

func _apply_synced_animation():
        if not animation_player:
                return
        
        if sync_current_animation != "" and animation_player.current_animation != sync_current_animation:
                if animation_player.has_animation(sync_current_animation):
                        animation_player.play(sync_current_animation)
                else:
                        push_warning("Animation not found: ", sync_current_animation)

func _rotate_to_face_player(delta: float):
        if not target_player or not is_instance_valid(target_player):
                return
        
        var direction_to_player = target_player.global_position - global_position
        direction_to_player.y = 0
        direction_to_player = direction_to_player.normalized()
        
        if direction_to_player.length() > 0.01:
                var target_rotation = atan2(direction_to_player.x, direction_to_player.z)
                rotation.y = lerp_angle(rotation.y, target_rotation, ROTATION_SPEED * delta)

func _check_can_see_player() -> bool:
        if not target_player or not is_instance_valid(target_player):
                return false
        
        var space_state = get_world_3d().direct_space_state
        var origin = global_position + Vector3(0, 1.5, 0)
        var target_pos = target_player.global_position + Vector3(0, 1.0, 0)
        
        var query = PhysicsRayQueryParameters3D.create(origin, target_pos)
        query.collision_mask = 1 | 2 | 4
        query.exclude = [self]
        
        var result = space_state.intersect_ray(query)
        
        if result:
                var collider = result.collider
                if collider == target_player or (collider and collider.is_in_group("player")):
                        return true
                else:
                        return false
        
        return false

func take_damage(damage: int):
        if sync_is_dead:
                return
        
        if is_multiplayer_authority():
                _apply_damage_on_host(damage)
        else:
                rpc_id(1, "_apply_damage_on_host", damage)

@rpc("any_peer", "call_local", "reliable")
func _apply_damage_on_host(damage: int):
        if sync_is_dead or is_dead:
                return
        
        if not is_multiplayer_authority():
                return
        
        current_health -= damage
        current_health = max(0, current_health)
        sync_health = current_health
        _update_health_ui()
        
        print("Ranged Enemy took ", damage, " damage. Health: ", current_health)
        
        if current_health <= 0:
                sync_is_dead = true
                print("Ranged Enemy died! (syncing to clients...)")

func _update_health_ui():
        if health_label:
                health_label.text = str(current_health)
                var health_percent = float(current_health) / float(MAX_HEALTH)
                if health_percent > 0.6:
                        health_label.modulate = Color(0, 1, 0)
                elif health_percent > 0.3:
                        health_label.modulate = Color(1, 1, 0)
                else:
                        health_label.modulate = Color(1, 0, 0)

func _update_footstep_audio(delta: float):
        if not is_multiplayer_authority():
                return
        
        footstep_timer += delta
        if footstep_timer >= walk_footstep_interval:
                footstep_type = "walk"
                footstep_counter += 1
                _play_footstep_sound_host(footstep_type)
                footstep_timer = 0.0
        else:
                _stop_footstep_sounds()
                footstep_timer = 0.0

func _play_footstep_sound_host(type: String):
        if walk_sound:
                walk_sound.play()

func _play_footstep_sound_client(type: String):
        if walk_sound:
                walk_sound.play()

func _play_fire_sound_host():
        if fire_sound:
                fire_sound.play()

func _play_fire_sound_client():
        if fire_sound:
                fire_sound.play()

func _play_hit_sound_client():
        if hit_sound:
                hit_sound.play()

func _start_shooting_animation():
        is_shooting = true
        sync_is_shooting = true
        if animation_player and animation_player.has_animation("RifleShoot"):
                animation_player.play("RifleShoot")
                sync_current_animation = "RifleShoot"

func _stop_shooting_animation():
        is_shooting = false
        sync_is_shooting = false
        if animation_player and animation_player.has_animation("RifleIdle"):
                animation_player.play("RifleIdle")
                sync_current_animation = "RifleIdle"

func _fire_at_player():
        if not target_player or not is_instance_valid(target_player):
                return

        can_shoot = false
        fire_counter += 1
        _play_fire_sound_host()

        print("🔫 HOST: Firing at player: ", target_player.name)

        if _check_can_see_player():
                if target_player.has_method("take_damage"):
                        target_player.take_damage(ENEMY_DAMAGE)
                        print("💥 HOST: Dealt ", ENEMY_DAMAGE, " damage to player: ", target_player.name)

        await get_tree().create_timer(fire_rate).timeout
        can_shoot = true

func _die():
        if is_dead:
                return

        is_dead = true
        print("Ranged Enemy _die() called! (Authority: ", is_multiplayer_authority(), ")")

        if player_detector:
                player_detector.monitoring = false

        collision_layer = 0
        collision_mask = 0

        if animation_player and animation_player.has_animation("Death"):
                animation_player.play("Death")
                sync_current_animation = "Death"
                await get_tree().create_timer(1.0).timeout

        queue_free()
`;

export function getEnemyTemplate(type: "zombie" | "ranged" | "spawner"): EnemyTemplate {
  let code = "";
  if (type === "zombie") {
    code = ZOMBIE_TEMPLATE;
  } else if (type === "ranged") {
    code = RANGED_TEMPLATE;
  } else {
    code = SPAWNER_TEMPLATE;
  }
  
  const variables = parseVariables(code);
  const functions = parseFunctions(code);

  return {
    type,
    code,
    variables,
    functions,
  };
}

function parseVariables(code: string): EnemyVariable[] {
  const variables: EnemyVariable[] = [];
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

function parseFunctions(code: string): EnemyFunction[] {
  const functions: EnemyFunction[] = [];
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
  template: EnemyTemplate,
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
  template: EnemyTemplate,
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
