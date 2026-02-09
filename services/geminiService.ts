
import { GoogleGenAI, Type } from "@google/genai";
import { FlashcardData } from "../types";

export async function generateStudyMaterial(keyword: string, language: 'en' | 'ja'): Promise<FlashcardData> {
  // Use the API key directly from process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-3-pro-preview for better quality reasoning and accuracy in generating quiz questions
  const model = 'gemini-3-pro-preview';
  
  const prompt = `Generate a comprehensive Japanese language study set for the keyword: "${keyword}".
  The UI language preference for explanations and questions is "${language === 'en' ? 'English' : 'Japanese'}".
  
  Requirement:
  1. Detailed flashcard info including term, reading (furigana), meaning, a deep explanation, and a sample sentence.
  2. Exactly 10 multiple-choice quiz questions (4 options each) based on the keyword's usage, nuances, and context.
  
  Output MUST be in JSON format matching the schema provided.`;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          term: { type: Type.STRING },
          reading: { type: Type.STRING },
          meaning: { type: Type.STRING },
          explanation: { type: Type.STRING },
          exampleSentence: { type: Type.STRING },
          exampleMeaning: { type: Type.STRING },
          quizzes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswerIndex: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correctAnswerIndex", "explanation"]
            }
          }
        },
        required: ["term", "reading", "meaning", "explanation", "exampleSentence", "exampleMeaning", "quizzes"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("The AI returned an empty response.");
  }

  try {
    const data = JSON.parse(text);
    return data as FlashcardData;
  } catch (e) {
    console.error("Failed to parse AI response:", text);
    throw new Error("The study material could not be generated correctly. Please try again.");
  }
}
