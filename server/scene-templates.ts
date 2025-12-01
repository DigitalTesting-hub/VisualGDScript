/**
 * Scene Templates
 * Pre-built templates for common game systems
 */

export const SCENE_TEMPLATES = {
  player_movement: {
    name: "Player Movement",
    description: "Full player controller with movement, crouch, prone, jumping",
    category: "Player",
    nodeType: "CharacterBody3D",
    exportVars: [
      { name: "NORMAL_SPEED", type: "float", value: "2.0" },
      { name: "SPRINT_SPEED", type: "float", value: "4.0" },
      { name: "CROUCH_SPEED", type: "float", value: "1.0" },
      { name: "JUMP_VELOCITY", type: "float", value: "4" },
      { name: "MAX_HEALTH", type: "int", value: "300" },
    ],
  },
  player_animation: {
    name: "Player Animation",
    description: "Animation controller with idle, walk, run, jump, crouch, prone states",
    category: "Player",
    nodeType: "Node3D",
    exportVars: [
      { name: "idle_speed", type: "float", value: "1.0" },
      { name: "walk_speed", type: "float", value: "1.0" },
      { name: "run_speed", type: "float", value: "1.0" },
      { name: "jump_speed", type: "float", value: "1.0" },
    ],
  },
  pvp_combat: {
    name: "Player vs Player Combat",
    description: "PvP combat system with weapons, melee, health, damage",
    category: "Combat",
    nodeType: "CharacterBody3D",
    exportVars: [
      { name: "PLAYER_DAMAGE", type: "int", value: "20" },
      { name: "MAX_HEALTH", type: "int", value: "300" },
      { name: "fire_rate", type: "float", value: "0.2" },
      { name: "melee_damage", type: "int", value: "25" },
    ],
  },
  safe_zone: {
    name: "Battle Royale Zone System",
    description: "Shrinking safe zone with damage progression",
    category: "Game",
    nodeType: "Node3D",
    exportVars: [
      { name: "wait_time", type: "float", value: "30.0" },
      { name: "shrink_time", type: "float", value: "10.0" },
      { name: "damage_interval", type: "float", value: "1.0" },
    ],
  },
  lobby: {
    name: "Multiplayer Spawn",
    description: "Lobby system with player spawning and game start",
    category: "Multiplayer",
    nodeType: "Node3D",
    exportVars: [
      { name: "max_players", type: "int", value: "10" },
      { name: "spawn_radius", type: "float", value: "5.0" },
    ],
  },
  spring_arm_camera: {
    name: "Mouse Camera",
    description: "Spring arm camera with mouse look and rotation",
    category: "Camera",
    nodeType: "Node3D",
    exportVars: [
      { name: "MOUSE_SENSIBILITY", type: "float", value: "0.005" },
    ],
  },
  minimap: {
    name: "Minimap Creator",
    description: "Dynamic minimap system with camera and player tracking",
    category: "UI",
    nodeType: "Control",
    exportVars: [
      { name: "MAP_LAYER", type: "int", value: "1" },
      { name: "MY_PLAYER_VISUAL_LAYER", type: "int", value: "11" },
    ],
  },
  audio_manager: {
    name: "Audio Manager",
    description: "Global audio management with BGM and SFX",
    category: "Audio",
    nodeType: "Node",
    exportVars: [
      { name: "bgm_volume", type: "float", value: "-10.0" },
      { name: "bgm_enabled", type: "bool", value: "true" },
    ],
  },
  network: {
    name: "Network System",
    description: "Multiplayer networking with peer management",
    category: "Multiplayer",
    nodeType: "Node",
    exportVars: [
      { name: "SERVER_PORT", type: "int", value: "8080" },
      { name: "MAX_PLAYERS", type: "int", value: "10" },
    ],
  },
};

export function getTemplateList() {
  return Object.entries(SCENE_TEMPLATES).map(([key, template]) => ({
    id: key,
    ...template,
  }));
}

export function getTemplatesByCategory(category: string) {
  return Object.entries(SCENE_TEMPLATES)
    .filter(([_, template]) => template.category === category)
    .map(([key, template]) => ({
      id: key,
      ...template,
    }));
}

export function generateTemplateScene(templateId: string) {
  const template = SCENE_TEMPLATES[templateId as keyof typeof SCENE_TEMPLATES];
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  const lines: string[] = [];
  lines.push(`# ${template.name}`);
  lines.push(`# ${template.description}`);
  lines.push("");
  lines.push(`extends ${template.nodeType}`);
  lines.push("");

  // Export variables
  if (template.exportVars.length > 0) {
    for (const varDef of template.exportVars) {
      lines.push(`@export var ${varDef.name}: ${varDef.type} = ${varDef.value}`);
    }
    lines.push("");
  }

  lines.push("func _ready() -> void:");
  lines.push(`\tprint("${template.name} initialized")`);
  lines.push("");

  lines.push("func _process(delta: float) -> void:");
  lines.push("\tpass");

  return lines.join("\n");
}

export const TEMPLATE_CATEGORIES = [
  "Player",
  "Combat",
  "Game",
  "Multiplayer",
  "Camera",
  "UI",
  "Audio",
];
