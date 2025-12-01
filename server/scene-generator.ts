/**
 * Scene Generator Service
 * Converts scene descriptions or images to TSCN format with AI
 */

import { generateSceneWithAI, generateSceneFromImageWithAI } from './scene-ai-generator';

export async function generateSceneFromCode(sceneCode: string): Promise<string> {
  try {
    console.log('🤖 Generating scene with AI...');
    // Use AI to intelligently parse and generate scene
    const tscnCode = await generateSceneWithAI(sceneCode);
    return tscnCode;
  } catch (error) {
    console.error('Scene generation from code failed:', error);
    throw new Error('Failed to generate scene from code');
  }
}

export async function generateSceneFromImage(imageBuffer: Buffer): Promise<string> {
  try {
    console.log('🤖 Generating scene from image with AI...');
    // Use AI to analyze image and generate scene
    const tscnCode = await generateSceneFromImageWithAI(imageBuffer);
    return tscnCode;
  } catch (error) {
    console.error('Scene generation from image failed:', error);
    throw new Error('Failed to generate scene from image');
  }
}

export async function generateScene(
  sceneCode?: string,
  imageBuffer?: Buffer
): Promise<string> {
  if (sceneCode && sceneCode.trim()) {
    return generateSceneFromCode(sceneCode);
  } else if (imageBuffer) {
    return generateSceneFromImage(imageBuffer);
  } else {
    throw new Error('No scene data provided');
  }
}
