# Multiplayer Chat System
# Real-time chat for multiplayer games using RPC
extends Control

@onready var message: LineEdit = $VBoxContainer/HBoxContainer/Message
@onready var send: Button = $VBoxContainer/HBoxContainer/Send
@onready var chat: TextEdit = $VBoxContainer/Chat

func _ready():
	send.pressed.connect(_on_send_pressed)

func _input(event):
	if not visible:
		return
	
	if event is InputEventKey and event.keycode == KEY_ENTER and event.pressed:
		_on_send_pressed()
		get_viewport().set_input_as_handled()

func _on_send_pressed() -> void:
	var trimmed_message = message.text.strip_edges()
	if trimmed_message == "":
		return
	
	var nick = "Player"
	if Network.players.has(multiplayer.get_unique_id()):
		nick = Network.players[multiplayer.get_unique_id()]["nick"]
	
	rpc("msg_rpc", nick, trimmed_message)
	message.text = ""
	message.grab_focus()

@rpc("any_peer", "call_local")
func msg_rpc(nick, msg):
	chat.text += str(nick, " : ", msg, "\n")
	chat.scroll_vertical = chat.get_line_count()
