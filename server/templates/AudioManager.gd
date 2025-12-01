# Audio Manager
# Global audio management with BGM and SFX mixing (Autoload Singleton)
extends Node

var bgm_player: AudioStreamPlayer
var sfx_player: AudioStreamPlayer
var bgm_volume: float = -10.0
var bgm_enabled: bool = true

func _ready() -> void:
	bgm_player = AudioStreamPlayer.new()
	sfx_player = AudioStreamPlayer.new()
	add_child(bgm_player)
	add_child(sfx_player)
	bgm_player.bus = "Master"
	sfx_player.bus = "SFX"

func play_bgm(stream: AudioStream) -> void:
	if bgm_enabled:
		bgm_player.stream = stream
		bgm_player.play()

func play_sfx(stream: AudioStream) -> void:
	sfx_player.stream = stream
	sfx_player.play()

func stop_bgm() -> void:
	bgm_player.stop()
