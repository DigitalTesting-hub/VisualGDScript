# Top-Down Minimap
# Dynamic minimap with player tracking and layer management
extends Control

@onready var moving_camera: Camera3D = $SubViewportContainer/SubViewport/Camera3D

var target_player: CharacterBody3D = null
var map_node: Node3D = null
var map_bounds_min: Vector3
var map_bounds_max: Vector3

const MAP_LAYER = 1
const MY_PLAYER_VISUAL_LAYER = 11
const OTHER_PLAYERS_LAYER = 12

func _ready():
	_find_map_node()
	if map_node:
		_calculate_map_bounds()
	else:
		map_bounds_min = Vector3(-50, 0, -50)
		map_bounds_max = Vector3(50, 0, 50)

func _find_map_node():
	var map_nodes = get_tree().get_nodes_in_group("map")
	if map_nodes.size() > 0:
		map_node = map_nodes[0]

func setup_minimap(player: CharacterBody3D):
	target_player = player
	if moving_camera:
		moving_camera.cull_mask = (1 << (MAP_LAYER-1))
		moving_camera.rotation_degrees = Vector3(-90, 0, 0)

func _process(delta):
	if not target_player or not is_instance_valid(target_player):
		queue_free()
		return
	
	if moving_camera:
		var camera_position = Vector3(
			target_player.global_position.x,
			50,
			target_player.global_position.z
		)
		moving_camera.global_position = camera_position

func _calculate_map_bounds():
	if not map_node:
		return
	
	var aabb = _get_total_aabb(map_node)
	if aabb != AABB():
		map_bounds_min = aabb.position
		map_bounds_max = aabb.end

func _get_total_aabb(node: Node3D) -> AABB:
	var total_aabb = AABB()
	var first_aabb = true
	
	if node is MeshInstance3D and node.mesh:
		total_aabb = node.mesh.get_aabb()
		first_aabb = false
	
	for child in node.get_children():
		if child is Node3D:
			var child_aabb = _get_total_aabb(child)
			if child_aabb != AABB():
				if first_aabb:
					total_aabb = child_aabb
					first_aabb = false
				else:
					total_aabb = total_aabb.merge(child_aabb)
	
	return total_aabb
