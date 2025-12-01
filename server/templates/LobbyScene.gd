# Lobby Scene
# Player lobby with character spawning and game mode selection
extends Control

@onready var player_name_label: Label = $PlayerInfo/PlayerName
@onready var character_info_label: Label = $PlayerInfo/ChInfo
@onready var logout_button: Button = $MenuButtons/Logout
@onready var spawn_point: Node3D = $Node3D/Spawn

var character_scenes = {
	"RedTop": "res://scenes/RedTop.tscn",
	"BlackOutfit": "res://scenes/BlackOutfit.tscn",
	"RedTShirt": "res://scenes/RedTShirt.tscn",
	"ScarfShades": "res://scenes/BlueTShirt.tscn"
}

var spawned_character: Node3D = null

func _ready():
	display_player_info()
	spawn_player_character()
	logout_button.pressed.connect(_on_logout_pressed)

func display_player_info():
	if GameManager.is_logged_in and GameManager.current_player_data:
		var player_data = GameManager.current_player_data
		player_name_label.text = "Welcome, " + player_data.get("username", "Player") + "!"
		character_info_label.text = "Character: " + player_data.get("character", "None")
		print("Lobby: Displaying player")
	else:
		player_name_label.text = "Not logged in"
		await get_tree().create_timer(2.0).timeout
		get_tree().change_scene_to_file("res://scenes/CharacterSelection.tscn")

func spawn_player_character():
	if not GameManager.is_logged_in:
		return
	
	var character_name = GameManager.current_player_data.get("character", "RedTop")
	if not character_scenes.has(character_name):
		character_name = "RedTop"
	
	var scene_path = character_scenes[character_name]
	if FileAccess.file_exists(scene_path):
		var character_scene = load(scene_path)
		if character_scene:
			spawned_character = character_scene.instantiate()
			spawn_point.add_child(spawned_character)
			print("Lobby: Character spawned")

func _on_logout_pressed():
	if spawned_character:
		spawned_character.queue_free()
	GameManager.logout()
	get_tree().change_scene_to_file("res://scenes/CharacterSelection.tscn")
