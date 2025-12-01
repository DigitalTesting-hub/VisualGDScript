/**
 * Templates Library
 * Downloadable game system scripts
 */

export const TEMPLATES_LIBRARY = {
  player_movement: {
    name: "Player Movement",
    category: "Player Systems",
    description: "Full player controller with movement, crouch, prone, jumping, health, and weapon systems",
    file: "champ.gd",
    size: "~15KB",
  },
  player_animation: {
    name: "Player Animation",
    category: "Animation",
    description: "Animation state machine with idle, walk, run, jump, crouch, prone, and combat states",
    file: "action.gd",
    size: "~6KB",
  },
  audio_manager: {
    name: "Audio Manager",
    category: "Audio",
    description: "Global audio management with BGM player, SFX mixing, and volume control (Autoload singleton)",
    file: "AudioManager.gd",
    size: "~2KB",
  },
  lobby_system: {
    name: "Multiplayer Lobby",
    category: "Multiplayer",
    description: "Lobby with player spawning, chat, kill feed, game start, and victory detection",
    file: "lobby.gd",
    size: "~20KB",
  },
  minimap: {
    name: "Minimap Creator",
    category: "UI",
    description: "Dynamic minimap with player tracking, layer management, and fullmap view toggle (N key)",
    file: "minimap.gd",
    size: "~8KB",
  },
  network: {
    name: "Network System",
    category: "Networking",
    description: "Multiplayer networking with peer-to-peer connections, player registration, and disconnect handling",
    file: "network.gd",
    size: "~3KB",
  },
  pvp_combat: {
    name: "PvP Combat System",
    category: "Combat",
    description: "Complete PvP combat with weapons (gun/melee), aiming, firing, health, and collision management",
    file: "pvp.gd",
    size: "~18KB",
  },
  safe_zone: {
    name: "Battle Royale Zone",
    category: "Game Mode",
    description: "Shrinking safe zone system with damage progression, zone announcements, and player exclusion",
    file: "SafeZone.gd",
    size: "~18KB",
  },
  spring_arm_camera: {
    name: "Mouse Camera",
    category: "Camera",
    description: "Spring arm camera controller with smooth mouse look and rotation sensitivity (0.005)",
    file: "spring_arm_offset.gd",
    size: "~1KB",
  },
  auth_scene: {
    name: "Authentication Scene",
    category: "Authentication",
    description: "Complete login/registration UI with Supabase integration and email validation",
    file: "auth_scene.gd",
    size: "~5KB",
  },
  game_manager: {
    name: "Game Manager",
    category: "Game Management",
    description: "Central game state management with local storage and player data persistence",
    file: "GameManager.gd",
    size: "~4KB",
  },
  lobby_scene: {
    name: "Lobby Scene",
    category: "Multiplayer",
    description: "Player lobby with character spawning, player info display, and game mode selection",
    file: "LobbyScene.gd",
    size: "~3KB",
  },
  mpchat: {
    name: "Multiplayer Chat",
    category: "Multiplayer",
    description: "Real-time chat system for multiplayer games using RPC synchronization",
    file: "mpchat.gd",
    size: "~1KB",
  },
  topmap: {
    name: "Top-Down Minimap",
    category: "UI",
    description: "Dynamic minimap with player tracking, layer management, and camera positioning",
    file: "topmap.gd",
    size: "~4KB",
  },
  main_menu: {
    name: "Main Menu Scene",
    category: "UI",
    description: "Interactive main menu with about button, play/exit options, character rotation, double-tap detection, and animations",
    file: "main_menu.gd",
    size: "~5KB",
  },
  loading_screen: {
    name: "Loading Screen",
    category: "UI",
    description: "Animated loading bar with progress percentage display and automatic scene transition",
    file: "start.gd",
    size: "~2KB",
  },
  victory_scene: {
    name: "Victory Scene",
    category: "Game Mode",
    description: "Victory screen with looping animations, replay option, and main menu return",
    file: "victory_scene.gd",
    size: "~3KB",
  },
  death_scene: {
    name: "Death/Game Over Scene",
    category: "Game Mode",
    description: "Game over screen with sub-viewport sync, restart option, and menu navigation",
    file: "death.gd",
    size: "~1KB",
  },
};

export function getTemplatesList() {
  return Object.entries(TEMPLATES_LIBRARY).map(([key, template]) => ({
    id: key,
    ...template,
  }));
}

export function getTemplatesByCategory(category: string) {
  return Object.entries(TEMPLATES_LIBRARY)
    .filter(([_, template]) => template.category === category)
    .map(([key, template]) => ({
      id: key,
      ...template,
    }));
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  Object.values(TEMPLATES_LIBRARY).forEach((t) => categories.add(t.category));
  return Array.from(categories).sort();
}
