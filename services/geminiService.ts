import { GoogleGenAI, Type } from "@google/genai";
import { CartItem, CartAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCartWithGemini = async (items: CartItem[]): Promise<CartAnalysis> => {
  if (items.length === 0) {
    return {
      healthScore: 0,
      healthSummary: "Your cart is empty. Add items to get started!",
      recipes: []
    };
  }

  const itemList = items.map(i => `${i.quantity}x ${i.name}`).join(", ");

  const prompt = `
    Analyze the following shopping cart items: ${itemList}.
    1. Give a health score from 0 to 100 based on nutritional balance.
    2. Provide a brief, friendly summary of the cart's healthiness (max 2 sentences).
    3. Suggest up to 3 simple recipes that can be made using mostly these ingredients. 
       For each recipe, list 1-2 key ingredients that might be missing from the cart (if any).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            healthScore: { type: Type.INTEGER, description: "A score from 0-100 representing nutritional value." },
            healthSummary: { type: Type.STRING, description: "A 1-2 sentence friendly summary of the cart's nutritional value." },
            recipes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the recipe" },
                  description: { type: Type.STRING, description: "Short description of the dish" },
                  missingIngredients: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "List of 1-2 key ingredients not in the cart needed for this recipe"
                  }
                }
              }
            }
          },
          required: ["healthScore", "healthSummary", "recipes"]
        }
      }
    });

    if (response.text) {
      const result = JSON.parse(response.text) as CartAnalysis;
      return result;
    }
    
    throw new Error("Empty response from Gemini");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock response if API fails or key is missing
    return {
      healthScore: 50,
      healthSummary: "We couldn't connect to the Chef AI right now, but your cart looks tasty!",
      recipes: [
        { name: "Mystery Dish", description: "Try combining your ingredients!", missingIngredients: [] }
      ]
    };
  }
};
