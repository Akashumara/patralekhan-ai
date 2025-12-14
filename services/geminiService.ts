import { GoogleGenAI } from "@google/genai";

// Note: In a real environment, this comes from process.env.API_KEY
// For this demo structure, we assume the environment is set up correctly as per prompt.
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const generateLetter = async (prompt: string, language: 'English' | 'Hindi' | 'Hinglish') => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const model = 'gemini-2.5-flash';
  
  const systemInstruction = `You are "PatraLekhan AI", an expert assistant for Indian users. 
  Your task is to write formal applications/letters based on the user's request.
  
  Rules:
  1. Language: Write in ${language}. If Hinglish, use Roman script for Hindi words but keep formal English structure where appropriate.
  2. Structure: Standard formal letter format (To, Subject, Salutation, Body, Closing).
  3. Placeholders: Use square brackets like [Your Name], [Date], [Address] for parts the user needs to fill.
  4. Tone: Polite, bureaucratic, respectful (use 'Respected Sir', 'Kindly', etc.).
  5. Output: Return ONLY the body of the letter. Do not add conversational filler like "Here is your letter".
  
  User Request: ${prompt}`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate letter. Please try again.");
  }
};
