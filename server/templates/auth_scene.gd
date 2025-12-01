# Authentication Scene
# Complete login/registration UI with Supabase integration
extends Control

@onready var email_input: LineEdit = $VBoxContainer/EmailInput
@onready var password_input: LineEdit = $VBoxContainer/PasswordInput
@onready var login_button: Button = $VBoxContainer/VBoxContainer/LoginButton
@onready var register_button: Button = $VBoxContainer/VBoxContainer/RegisterButton
@onready var message_label: Label = $VBoxContainer/MessageLabel
@onready var auth_tabs: TabContainer = $VBoxContainer/TabContainer

var is_login_only: bool = false

func _ready():
	is_login_only = GameManager.get_came_from_login()
	login_button.pressed.connect(_on_LoginButton_pressed)
	register_button.pressed.connect(_on_RegisterButton_pressed)
	
	if not SupabaseClient.supabase_response.is_connected(_on_supabase_response):
		SupabaseClient.supabase_response.connect(_on_supabase_response)
	
	if is_login_only:
		auth_tabs.current_tab = 0
		register_button.visible = false
	
	print("AuthScene: Ready")

func _on_LoginButton_pressed():
	var email = email_input.text.strip_edges()
	var password = password_input.text
	
	if email.is_empty() or password.is_empty():
		show_message("Please fill all fields", Color.RED)
		return
	
	show_message("Logging in...", Color.YELLOW)
	var result = SupabaseClient.sign_in_with_email(email, password)

func _on_RegisterButton_pressed():
	var email = email_input.text.strip_edges()
	var password = password_input.text
	
	if email.is_empty() or password.is_empty():
		show_message("Please fill all fields", Color.RED)
		return
	
	if password.length() < 6:
		show_message("Password must be at least 6 characters", Color.RED)
		return
	
	show_message("Creating account...", Color.YELLOW)
	var result = SupabaseClient.sign_up_no_confirm(email, password)

func show_message(text: String, color: Color = Color.WHITE):
	message_label.text = text
	message_label.modulate = color

func is_valid_email(email: String) -> bool:
	var email_regex = RegEx.new()
	email_regex.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
	return email_regex.search(email) != null

func _on_supabase_response(purpose: String, result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray):
	var response_body = body.get_string_from_utf8()
	print("AuthScene: Supabase response - Code: ", response_code)
