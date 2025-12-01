/**
 * Scene AI Generator
 * Uses Gemini/Groq to intelligently parse and generate TSCN scenes
 */

import { GoogleGenAI } from "@google/genai";
import { parseSceneCode, generateTSCN, type SceneNode } from "./scene-tscn-builder";

// Initialize Gemini
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
const gemini = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

// Groq integration
const groqApiKey = process.env.GROQ_API_KEY;

const SCENE_JSON_PROMPT = `Convert the following scene description into a valid JSON structure for Godot TSCN file generation.

Requirements:
- Root node must be Node2D, Node3D, Control, or CanvasLayer
- Each node must have: name (string), type (string), properties (object, optional)
- Properties should use proper Godot types: Vector2(x,y), Vector3(x,y,z), Color names, resource paths
- Common node types: Sprite2D, Node2D, CollisionShape2D, AnimationPlayer, Camera2D, CharacterBody2D, Area2D, RigidBody2D, Control, Label, TextureRect
- Return ONLY valid JSON in this format:
{
  "name": "SceneName",
  "type": "Node2D",
  "properties": { "position": "Vector2(0, 0)" },
  "children": [
    { "name": "Child1", "type": "Sprite2D", "properties": {...}, "children": [...] }
  ]
}

Scene description:
`;

export async function generateSceneWithAI(sceneCode: string): Promise<string> {
  try {
    // First try Gemini
    if (gemini) {
      try {
        console.log("📡 Using Gemini for scene generation...");
        const response = await gemini.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: SCENE_JSON_PROMPT + sceneCode }],
            },
          ],
        });

        const text = response.text || "";
        console.log("✅ Gemini response received");

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const sceneStructure = JSON.parse(jsonMatch[0]) as SceneNode;
            const tscnCode = generateTSCN(sceneStructure);
            console.log("✅ Scene structure parsed and TSCN generated");
            return tscnCode;
          } catch (parseError) {
            console.warn("⚠️ Failed to parse JSON:", (parseError as Error).message);
          }
        } else {
          console.warn("⚠️ No JSON found in Gemini response");
        }
      } catch (geminiError) {
        console.warn("⚠️ Gemini failed:", (geminiError as Error).message);
      }
    }

    // Fallback to Groq
    if (groqApiKey) {
      try {
        console.log("📡 Using Groq for scene generation...");
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [
              {
                role: "user",
                content: SCENE_JSON_PROMPT + sceneCode,
              },
            ],
            max_tokens: 1000,
          }),
        });

        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          const text = data.choices[0].message.content;
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const sceneStructure = JSON.parse(jsonMatch[0]) as SceneNode;
            const tscnCode = generateTSCN(sceneStructure);
            console.log("✅ Groq scene generated");
            return tscnCode;
          }
        }
      } catch (groqError) {
        console.warn("⚠️ Groq failed:", (groqError as Error).message);
      }
    }

    // Fallback: Use simple parser
    console.log("⚙️ Using fallback parser (no AI available)");
    const sceneStructure = parseSceneCode(sceneCode);
    return generateTSCN(sceneStructure);
  } catch (error) {
    console.error("Scene AI generation failed:", error);
    throw error;
  }
}

export async function generateSceneFromImageWithAI(imageBuffer: Buffer): Promise<string> {
  try {
    if (gemini) {
      try {
        console.log("📡 Using Gemini for image scene generation...");
        const base64Image = imageBuffer.toString("base64");

        const response = await gemini.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: "image/png",
                    data: base64Image,
                  },
                },
                {
                  text: `Analyze this game scene diagram and generate a Godot TSCN scene structure JSON.

${SCENE_JSON_PROMPT}`,
                },
              ],
            },
          ],
        });

        const text = response.text || "";
        console.log("✅ Gemini image analysis response received");

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const sceneStructure = JSON.parse(jsonMatch[0]) as SceneNode;
            const tscnCode = generateTSCN(sceneStructure);
            console.log("✅ Image scene structure parsed and TSCN generated");
            return tscnCode;
          } catch (parseError) {
            console.warn("⚠️ Failed to parse image JSON:", (parseError as Error).message);
          }
        } else {
          console.warn("⚠️ No JSON found in Gemini image response");
        }
      } catch (geminiError) {
        console.warn("⚠️ Gemini image analysis failed:", (geminiError as Error).message);
      }
    }

    // Fallback: Generate a thoughtful default scene
    console.log("⚙️ Image processing not available, generating intelligent default scene");
    const defaultScene: SceneNode = {
      name: "GameScene",
      type: "Node2D",
      properties: {
        script: "res://scene.gd",
      },
      children: [
        {
          name: "Player",
          type: "CharacterBody2D",
          properties: {
            position: "Vector2(512, 300)",
          },
          children: [
            {
              name: "Sprite2D",
              type: "Sprite2D",
              properties: {
                texture: "res://assets/player.png",
              },
            },
            {
              name: "CollisionShape2D",
              type: "CollisionShape2D",
            },
          ],
        },
        {
          name: "AnimationPlayer",
          type: "AnimationPlayer",
        },
        {
          name: "Camera2D",
          type: "Camera2D",
          properties: {
            "zoom": "Vector2(1, 1)",
          },
        },
      ],
    };

    return generateTSCN(defaultScene);
  } catch (error) {
    console.error("Scene image AI generation failed:", error);
    throw error;
  }
}
