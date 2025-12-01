/**
 * Schema validation for flowchart code generation requests
 * Ensures data consistency from frontend to backend to AI
 */

import { z } from "zod";

/**
 * Validate flowchart generation request
 */
export const flowchartGenerationRequestSchema = z.object({
  nodes: z.array(z.object({
    id: z.string(),
    type: z.string(),
    label: z.string(),
    data: z.record(z.any()).optional(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }).optional(),
  })),
  edges: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    sourceHandle: z.string().optional(),
    targetHandle: z.string().optional(),
  })).optional(),
});

export type FlowchartGenerationRequest = z.infer<typeof flowchartGenerationRequestSchema>;

/**
 * Node data schemas - enforce proper structure for each node type
 */
export const startNodeDataSchema = z.object({
  label: z.string(),
  startNodeType: z.string().default("Node"),
});

export const eventNodeDataSchema = z.object({
  label: z.string(),
  eventType: z.string().optional(),
  actionName: z.string().optional(),
  keyPress: z.string().optional(),
  buttonIndex: z.number().optional(),
  touchIndex: z.number().optional(),
});

export const movementNodeDataSchema = z.object({
  label: z.string(),
  movementNodeType: z.enum(["Node2D", "Node3D", "CharacterBody2D", "CharacterBody3D", "RigidBody2D", "RigidBody3D", "Area2D", "Area3D", "PathFollow2D", "PathFollow3D"]),
  directionX: z.coerce.number().default(0),
  directionY: z.coerce.number().default(0),
  directionZ: z.coerce.number().default(0),
  speed: z.coerce.number().default(1),
});

export const rotationNodeDataSchema = z.object({
  label: z.string(),
  rotationNodeType: z.enum(["Node2D", "Node3D", "CharacterBody2D", "CharacterBody3D", "RigidBody2D", "RigidBody3D", "Area2D", "Area3D", "Sprite2D", "Sprite3D"]),
  rotationX: z.coerce.number().default(0),
  rotationY: z.coerce.number().default(0),
  rotationZ: z.coerce.number().default(0),
});

export const scaleNodeDataSchema = z.object({
  label: z.string(),
  scaleNodeType: z.enum(["Node2D", "Node3D", "CharacterBody2D", "CharacterBody3D", "RigidBody2D", "RigidBody3D", "Area2D", "Area3D", "Sprite2D", "Sprite3D"]),
  scaleMode: z.enum(["linked", "individual"]).default("linked"),
  scaleUniform: z.coerce.number().default(1),
  scaleX: z.coerce.number().default(1),
  scaleY: z.coerce.number().default(1),
  scaleZ: z.coerce.number().default(1),
});

export const animationNodeDataSchema = z.object({
  label: z.string(),
  animationNodeType: z.enum(["AnimationPlayer", "AnimatedSprite2D", "Sprite2D", "AnimationTree", "Tween"]),
  animationName: z.string(),
  animationAction: z.enum(["play", "stop", "seek"]).optional(),
  animationSpeed: z.coerce.number().default(1),
  animationDirection: z.boolean().optional(),
});

export const audioNodeDataSchema = z.object({
  label: z.string(),
  audioNodeType: z.enum(["AudioStreamPlayer", "AudioStreamPlayer2D", "AudioStreamPlayer3D", "AudioStreamPlayback"]),
  audioFile: z.string(),
  audioVolume: z.coerce.number().default(1),
  audioLoop: z.boolean().default(false),
});

export const physicsNodeDataSchema = z.object({
  label: z.string(),
  physicsBodyType: z.enum(["RigidBody2D", "CharacterBody2D", "RigidBody3D", "CharacterBody3D", "StaticBody2D", "StaticBody3D", "Area2D", "Area3D"]),
  physicsGameMode: z.enum(["2d", "3d"]).default("2d"),
  physicsType: z.enum(["velocity", "force", "impulse"]).default("velocity"),
  physicsX: z.coerce.number().default(0),
  physicsY: z.coerce.number().default(0),
  physicsZ: z.coerce.number().default(0),
});

export const spawnNodeDataSchema = z.object({
  label: z.string(),
  spawnNodeType: z.enum(["Node2D", "Node3D", "Area2D", "Area3D", "CharacterBody2D", "CharacterBody3D", "RigidBody2D", "RigidBody3D"]),
  spawnGameMode: z.enum(["2d", "3d"]).default("2d"),
  spawnScene: z.string(),
  spawnX: z.coerce.number().default(0),
  spawnY: z.coerce.number().default(0),
  spawnZ: z.coerce.number().default(0),
});

export const cameraNodeDataSchema = z.object({
  label: z.string(),
  cameraType: z.enum(["Camera2D", "Camera3D"]).default("Camera2D"),
  cameraGameMode: z.enum(["2d", "3d"]).default("2d"),
  cameraAction: z.enum(["enable", "disable", "set_target"]).default("enable"),
  cameraCurrent: z.boolean().optional(),
});

export const collisionNodeDataSchema = z.object({
  label: z.string(),
  collisionType: z.enum(["Area2D", "Area3D", "CharacterBody2D", "CharacterBody3D", "RigidBody2D", "RigidBody3D", "StaticBody2D", "StaticBody3D"]),
  collisionDetect: z.enum(["body_entered", "body_exited", "area_entered", "area_exited"]).default("body_entered"),
});

export const timerNodeDataSchema = z.object({
  label: z.string(),
  timerDuration: z.coerce.number().default(1),
  timerAutostart: z.boolean().default(false),
});

export const destroyNodeDataSchema = z.object({
  label: z.string(),
  destroyDelay: z.coerce.number().default(0),
});

export const printNodeDataSchema = z.object({
  label: z.string(),
  printText: z.string(),
});

export const commentNodeDataSchema = z.object({
  label: z.string(),
  commentText: z.string(),
});

export const tweenNodeDataSchema = z.object({
  label: z.string(),
  tweenGameMode: z.enum(["2d", "3d"]).default("2d"),
  tweenDuration: z.coerce.number().default(1),
  tweenEasing: z.string().default("Linear"),
  tweenProperty: z.string().default("position"),
});

export const groupNodeDataSchema = z.object({
  label: z.string(),
  groupName: z.string(),
  groupAction: z.enum(["add", "remove"]).default("add"),
});

export const propertyNodeDataSchema = z.object({
  label: z.string(),
  propertyGameMode: z.enum(["2d", "3d"]).default("2d"),
  propertyNodePath: z.string().default("."),
  propertyName: z.string(),
  propertyValue: z.string(),
});

export const sceneNodeDataSchema = z.object({
  label: z.string(),
  scenePath: z.string(),
  sceneAction: z.enum(["change", "load"]).default("change"),
});

export const codeNodeDataSchema = z.object({
  label: z.string(),
  customCode: z.string(),
});

/**
 * Validate node data based on node type
 */
export function validateNodeData(nodeType: string, data: any): { valid: boolean; errors?: string[] } {
  try {
    switch (nodeType) {
      case "event":
        eventNodeDataSchema.parse(data);
        break;
      case "movement":
        movementNodeDataSchema.parse(data);
        break;
      case "rotation":
        rotationNodeDataSchema.parse(data);
        break;
      case "scale":
        scaleNodeDataSchema.parse(data);
        break;
      case "animation":
        animationNodeDataSchema.parse(data);
        break;
      case "audio":
        audioNodeDataSchema.parse(data);
        break;
      case "physics":
        physicsNodeDataSchema.parse(data);
        break;
      case "spawn":
        spawnNodeDataSchema.parse(data);
        break;
      case "camera":
        cameraNodeDataSchema.parse(data);
        break;
      case "collision":
        collisionNodeDataSchema.parse(data);
        break;
      case "timer":
        timerNodeDataSchema.parse(data);
        break;
      case "destroy":
        destroyNodeDataSchema.parse(data);
        break;
      case "tween":
        tweenNodeDataSchema.parse(data);
        break;
      case "group":
        groupNodeDataSchema.parse(data);
        break;
      case "property":
        propertyNodeDataSchema.parse(data);
        break;
      case "scene":
        sceneNodeDataSchema.parse(data);
        break;
      case "code":
        codeNodeDataSchema.parse(data);
        break;
      case "print":
        printNodeDataSchema.parse(data);
        break;
      case "comment":
        commentNodeDataSchema.parse(data);
        break;
    }
    return { valid: true };
  } catch (error) {
    const errors = error instanceof z.ZodError 
      ? error.errors.map(e => `${e.path.join(".")}: ${e.message}`)
      : [String(error)];
    return { valid: false, errors };
  }
}

/**
 * AI generation response schema
 */
export const aiGenerationResponseSchema = z.object({
  code: z.string(),
  model: z.string().optional(),
  provider: z.enum(["gemini", "groq"]).optional(),
  timestamp: z.number().optional(),
  fallbackUsed: z.boolean().optional(),
});

export type AIGenerationResponse = z.infer<typeof aiGenerationResponseSchema>;
