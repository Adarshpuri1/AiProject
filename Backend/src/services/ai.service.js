import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY 
});



export const main=async(prompt) =>{
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash", 
      contents: [
        {
            role: "user",
            parts:[{text: prompt}],
        },
      ],
    });

   return result.text();
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

