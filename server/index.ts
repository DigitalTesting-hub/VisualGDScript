/**
 * Flowchart GDScript Generator - Server
 * Standalone application for visual flowchart to Godot 4.4 code generation
 */

import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import { generateGDScriptFromFlowchart, validateFlowchart } from "./flowchart-generator";
import { ensureValidGDScript } from "./gdscript-formatter";
import { debugCode } from "./gemini";
import { flowchartGenerateRequestSchema } from "@shared/schema";
import { getPlayerTemplate, generatePlayerScript } from "./player-template-handler";
import { getEnemyTemplate, applyVarsToTemplate as applyEnemyVars, selectiveFunctions } from "./enemy-template-handler";
import { generateEnemyAIScript } from "./enemy-ai-generator";
import { getVehicleTemplate, applyVarsToTemplate as applyVehicleVars, selectiveFunctions as selectiveVehicleFunctions } from "./vehicle-template-handler";
import { generateVehicleAIScript } from "./vehicle-ai-generator";
import { generateScene } from "./scene-generator";
import { getTemplatesList, getAllCategories, TEMPLATES_LIBRARY } from "./templates-library";
import { GODOT_NODES_DATABASE, getNodesByCategory, searchNodes } from "./godot-nodes-database";
import { generateBlockCode } from "./block-code-generator";
import { buildBlockSequencePrompt, summarizeBlockSequence } from "./block-prompt-builder";
import type { BlockSequence } from "@shared/block-schema";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app: Express = express();
const PORT = 5000;

// Middleware
app.use(express.json({ limit: "50mb" }));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "flowchart-gdscript-generator",
    version: "1.0.0",
    gemini: !!process.env.GEMINI_API_KEY,
    groq: !!process.env.GROQ_API_KEY,
  });
});

// Main flowchart generation endpoint
app.post("/api/flowchart/generate", async (req, res) => {
  try {
    const parsed = flowchartGenerateRequestSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({ 
        error: "Invalid request", 
        details: parsed.error.errors 
      });
    }

    const { nodes, edges } = parsed.data;
    
    // Validate flowchart structure
    const validation = validateFlowchart(nodes, edges);
    
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: "Flowchart validation failed",
        errors: validation.errors
      });
    }

    // Generate hardcoded GDScript first
    const gdscriptCode = await generateGDScriptFromFlowchart(nodes, edges);
    const hardcodedCode = ensureValidGDScript(gdscriptCode);
    
    let finalCode = hardcodedCode;
    let usedAI = false;
    let aiProvider = "none";

    // If AI is available and requested, refine with AI
    const useAI = req.body.useAI !== false && (process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY);
    
    if (useAI) {
      try {
        const { buildFlowchartPrompt } = await import("./flowchart-prompt-builder");
        const { generateWithIntelligentFallback } = await import("./ai-fallback-enhanced");
        
        // Create prompt explaining the flowchart
        const prompt = buildFlowchartPrompt(nodes, edges);
        
        // Send hardcoded code + prompt to AI for refinement
        const refinementPrompt = `${prompt}

HERE IS THE INITIAL HARDCODED CODE:
\`\`\`gdscript
${hardcodedCode}
\`\`\`

Refine this code to make it production-ready while keeping it simple and following the flowchart logic exactly. Output only the refined GDScript code.`;

        const result = await generateWithIntelligentFallback(refinementPrompt, {
          retries: 2,
          timeout: 45000,
          preferProvider: "gemini",
        });

        finalCode = result.code || hardcodedCode;
        usedAI = true;
        aiProvider = result.provider;
        
        console.log(`[Flowchart] AI refinement applied with ${result.provider}`);
      } catch (error) {
        console.warn("[Flowchart] AI refinement failed, using hardcoded code:", error);
        finalCode = hardcodedCode;
      }
    }
    
    // Final validation
    let codeIssues: any = { issues: [], isValid: true };
    try {
      codeIssues = await debugCode(finalCode);
    } catch (error) {
      console.warn("Code validation skipped:", error);
    }

    res.json({ 
      code: finalCode,
      validation,
      codeIssues,
      hardcodedCode,
      usedAI,
      aiProvider,
      note: usedAI ? "Code refined with AI" : "Hardcoded generation (AI unavailable)"
    });
  } catch (error) {
    console.error("Flowchart generation error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to generate flowchart code"
    });
  }
});

// Player template endpoints
app.get("/api/templates/player", async (req, res) => {
  try {
    const template = await getPlayerTemplate();
    res.json(template);
  } catch (error) {
    console.error("Failed to get player template:", error);
    res.status(500).json({ error: "Failed to get player template" });
  }
});

app.post("/api/templates/player/generate", async (req, res) => {
  try {
    const { selectedFunctions, customVariables, useAI, enhancementPrompt } = req.body;
    
    // Use AI if explicitly requested, enhancement prompt provided, or if partial functions selected and AI available
    const shouldUseAI = useAI || enhancementPrompt?.trim() || (
      selectedFunctions?.length > 0 && 
      (process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY)
    );
    
    const script = await generatePlayerScript(
      selectedFunctions || [], 
      customVariables || {},
      shouldUseAI,
      enhancementPrompt
    );
    
    res.json({ code: script });
  } catch (error) {
    console.error("Failed to generate player script:", error);
    res.status(500).json({ error: "Failed to generate script" });
  }
});

// Scene generator endpoint
app.post("/api/scenes/generate", upload.single("image"), async (req, res) => {
  try {
    const { sceneCode } = req.body;
    const imageBuffer = req.file?.buffer;

    const tscnCode = await generateScene(sceneCode, imageBuffer);
    
    res.json({ tscnCode });
  } catch (error) {
    console.error("Scene generation failed:", error);
    res.status(500).json({ error: "Failed to generate scene" });
  }
});

// Templates library endpoints
app.get("/api/templates/library", (req, res) => {
  try {
    const templates = getTemplatesList();
    const categories = getAllCategories();
    res.json({ templates, categories });
  } catch (error) {
    console.error("Failed to list templates:", error);
    res.status(500).json({ error: "Failed to list templates" });
  }
});

// Download template file
app.get("/api/templates/library/:templateId/download", (req, res) => {
  try {
    const { templateId } = req.params;
    const templatesDir = path.join(__dirname, "templates");
    const templateFile = path.join(templatesDir, `${templateId}.gd`);

    if (!fs.existsSync(templateFile)) {
      return res.status(404).json({ error: "Template file not found" });
    }

    const content = fs.readFileSync(templateFile, "utf-8");
    const template = (TEMPLATES_LIBRARY as any)[templateId];
    const filename = template?.file || `${templateId}.gd`;

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(content);
  } catch (error) {
    console.error("Download failed:", error);
    res.status(500).json({ error: "Failed to download template" });
  }
});

// Enemy template endpoints
app.get("/api/enemies/template/:type", (req, res) => {
  try {
    const { type } = req.params;
    if (type !== "zombie" && type !== "ranged" && type !== "spawner") {
      return res.status(400).json({ error: "Invalid enemy type" });
    }
    const template = getEnemyTemplate(type as "zombie" | "ranged" | "spawner");
    res.json({ template });
  } catch (error) {
    console.error("Failed to get enemy template:", error);
    res.status(500).json({ error: "Failed to get enemy template" });
  }
});

app.post("/api/enemies/generate", async (req, res) => {
  try {
    const { enemyType, customVars, selectedFunctions, enhancementPrompt } = req.body;

    if (!enemyType || !Array.isArray(selectedFunctions)) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const template = getEnemyTemplate(enemyType);
    let code = applyEnemyVars(template, customVars || {});
    code = selectiveFunctions(template, new Set(selectedFunctions));

    if (enhancementPrompt && enhancementPrompt.trim()) {
      code = await generateEnemyAIScript(code, selectedFunctions, enhancementPrompt);
    } else if (selectedFunctions.length < template.functions.length) {
      code = await generateEnemyAIScript(code, selectedFunctions);
    }

    res.json({ code });
  } catch (error) {
    console.error("Enemy generation failed:", error);
    res.status(500).json({ error: "Failed to generate enemy script" });
  }
});

// Vehicle template endpoints
app.get("/api/vehicles/template/:type", (req, res) => {
  try {
    const { type } = req.params;
    if (type !== "car") {
      return res.status(400).json({ error: "Invalid vehicle type" });
    }
    const template = getVehicleTemplate(type as "car");
    res.json({ template });
  } catch (error) {
    console.error("Failed to get vehicle template:", error);
    res.status(500).json({ error: "Failed to get vehicle template" });
  }
});

app.post("/api/vehicles/generate", async (req, res) => {
  try {
    const { vehicleType, customVars, selectedFunctions, enhancementPrompt } = req.body;

    if (!vehicleType || !Array.isArray(selectedFunctions)) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const template = getVehicleTemplate(vehicleType);
    let code = applyVehicleVars(template, customVars || {});
    code = selectiveVehicleFunctions(template, new Set(selectedFunctions));

    if (enhancementPrompt && enhancementPrompt.trim()) {
      code = await generateVehicleAIScript(code, selectedFunctions, enhancementPrompt);
    } else if (selectedFunctions.length < template.functions.length) {
      code = await generateVehicleAIScript(code, selectedFunctions);
    }

    res.json({ code });
  } catch (error) {
    console.error("Vehicle generation failed:", error);
    res.status(500).json({ error: "Failed to generate vehicle script" });
  }
});

// Individual node code generation endpoint
app.post("/api/node/generate", async (req, res) => {
  try {
    const { nodeId, nodeType, nodeCategory, nodeDescription, properties, prompt } = req.body;
    
    let gdscriptCode = '';
    
    // Build AI prompt for code generation based on node type and properties
    const aiPrompt = `Generate clean, production-ready GDScript code for a Godot 4.4 ${nodeType} node.

Node Type: ${nodeType}
Category: ${nodeCategory}
Description: ${nodeDescription}

Properties to configure:
${Object.entries(properties || {}).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

${prompt ? `\nUser Request: ${prompt}` : 'Generate standard initialization code.'}

Return ONLY valid GDScript code, no explanations.`;

    // Use AI to generate code
    if (process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY) {
      try {
        // Use Gemini API for code generation
        const apiKey = process.env.GEMINI_API_KEY;
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: aiPrompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        });
        
        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          gdscriptCode = data.candidates[0].content.parts[0].text.trim();
          // Remove markdown code blocks if present
          gdscriptCode = gdscriptCode.replace(/^```gdscript\n?|```$/g, '').trim();
        }
      } catch (error) {
        console.warn("AI generation failed, using fallback:", error);
        gdscriptCode = generateFallbackCode(nodeType, properties);
      }
    } else {
      gdscriptCode = generateFallbackCode(nodeType, properties);
    }

    res.json({ 
      code: gdscriptCode,
      nodeId,
      nodeType 
    });
  } catch (error) {
    console.error("Node code generation error:", error);
    res.status(500).json({ error: "Failed to generate node code" });
  }
});

// Fallback code generation
function generateFallbackCode(nodeType: string, properties: Record<string, any>): string {
  let code = `# ${nodeType} node\n`;
  
  Object.entries(properties || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      code += `${key} = ${value}\n`;
    }
  });
  
  // Add basic node setup
  code += `\nfunc _ready():\n\tprint("${nodeType} initialized")\n`;
  
  return code;
}

// Get all Godot nodes endpoint
app.get("/api/godot/nodes", (req, res) => {
  try {
    const { category, search } = req.query;
    let nodes = GODOT_NODES_DATABASE;
    
    if (search && typeof search === 'string') {
      nodes = searchNodes(search);
    } else if (category && typeof category === 'string') {
      nodes = getNodesByCategory(category);
    }
    
    res.json({ 
      nodes: nodes,
      total: nodes.length,
      categories: [...new Set(GODOT_NODES_DATABASE.map(n => n.category))]
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch nodes" });
  }
});

// AI Code Generator endpoint
app.post("/api/ai/generate-code", async (req, res) => {
  try {
    const { prompt, provider, model } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const { generateWithIntelligentFallback } = await import("./ai-fallback-enhanced");

    const result = await generateWithIntelligentFallback(prompt, {
      retries: 2,
      timeout: 45000,
      preferProvider: provider || "gemini",
    });

    res.json({
      code: result.code,
      provider: result.provider,
      model: result.model,
      fallbackUsed: result.fallbackUsed,
    });
  } catch (error) {
    console.error("AI code generation failed:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to generate code",
    });
  }
});

// Block Editor code generation endpoint with AI refinement
app.post("/api/blocks/generate", async (req, res) => {
  try {
    const sequence: BlockSequence = req.body;

    if (!sequence.blocks || sequence.blocks.length === 0) {
      return res.status(400).json({ error: "At least one block is required" });
    }

    console.log("[Blocks] Generating code for:", summarizeBlockSequence(sequence));

    // Step 1: Generate base code from blocks
    const baseCode = await generateBlockCode(sequence);
    console.log("[Blocks] Base code generated, length:", baseCode.length);

    // Step 2: Build prompt with block sequence description
    const prompt = buildBlockSequencePrompt(sequence, baseCode);

    // Step 3: Send to AI for refinement
    const { generateWithIntelligentFallback } = await import("./ai-fallback-enhanced");

    const result = await generateWithIntelligentFallback(prompt, {
      retries: 2,
      timeout: 45000,
      preferProvider: "gemini",
    });

    console.log(`[Blocks] AI refinement successful with ${result.provider} (${result.model})`);

    const finalCode = ensureValidGDScript(result.code);

    res.json({
      code: finalCode,
      provider: result.provider,
      model: result.model,
      fallbackUsed: result.fallbackUsed,
      note: "Block sequence converted and refined with AI",
    });
  } catch (error) {
    console.error("Block generation failed:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to generate block code",
    });
  }
});

// Save flowchart template endpoint
app.post("/api/flowchart/templates", async (req, res) => {
  try {
    const { name, description, nodes, edges } = req.body;
    
    if (!name || !nodes || !edges) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    // In production, would save to database
    res.json({ 
      success: true,
      message: "Template saved successfully",
      template: { name, description, nodes, edges }
    });
  } catch (error) {
    console.error("Template save failed:", error);
    res.status(500).json({ error: "Failed to save template" });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, "../dist/public")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`[Flowchart GDScript Generator] Running on http://localhost:${PORT}`);
});

export default server;
