# Game Manager
# Central game state management with local storage and player data persistence
extends Node

var current_player_data: Dictionary = {}
var is_logged_in: bool = false
var temp_character_data: Dictionary = {}
var came_from_login: bool = false

const SAVE_FILE_PATH = "user://player_data.json"
const CREDENTIALS_FILE_PATH = "user://login_credentials.json"

func _ready():
	ensure_user_directory()
	print("GameManager: Ready")

func ensure_user_directory():
	var dir = DirAccess.open("user://")
	if not dir:
		DirAccess.make_dir_absolute("user://")

func save_player_data(player_data: Dictionary):
	current_player_data = player_data
	is_logged_in = true
	player_data["last_saved"] = Time.get_unix_time_from_system()
	
	if write_to_file(SAVE_FILE_PATH, player_data):
		print("✅ Player data saved successfully")

func save_login_credentials(email: String, password: String):
	var credentials = {
		"email": email,
		"password": password,
		"saved_at": Time.get_unix_time_from_system()
	}
	
	if write_to_file(CREDENTIALS_FILE_PATH, credentials):
		print("✅ Login credentials saved")

func get_saved_credentials() -> Dictionary:
	return read_from_file(CREDENTIALS_FILE_PATH) or {}

func write_to_file(file_path: String, data: Dictionary) -> bool:
	var file = FileAccess.open(file_path, FileAccess.WRITE)
	if file:
		file.store_string(JSON.stringify(data, "\t"))
		file.close()
		return FileAccess.file_exists(file_path)
	return false

func read_from_file(file_path: String) -> Variant:
	if not FileAccess.file_exists(file_path):
		return null
	
	var file = FileAccess.open(file_path, FileAccess.READ)
	if file:
		var json_string = file.get_as_text()
		file.close()
		
		if json_string.is_empty():
			return null
		
		var json = JSON.new()
		if json.parse(json_string) == OK:
			return json.get_data()
	
	return null

func logout():
	current_player_data = {}
	is_logged_in = false
	SupabaseClient.current_user = {}
	temp_character_data = {}
	came_from_login = false
	print("User logged out")

func set_temp_character_data(username: String, character: String):
	temp_character_data = {"username": username, "character": character}

func get_temp_character_data() -> Dictionary:
	return temp_character_data
