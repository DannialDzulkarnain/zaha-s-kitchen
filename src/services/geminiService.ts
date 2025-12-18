import { GoogleGenAI, Type } from "@google/genai";
import { Order, InventoryItem } from "@/types";

function getClient() {
  const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!key) return null;
  try {
    return new GoogleGenAI({ apiKey: key });
  } catch (error) {
    console.error("Failed to init Gemini client", error);
    return null;
  }
}

export async function getBusinessInsights(orders: Order[], inventory: InventoryItem[]) {
  const client = getClient();
  if (!client) {
    console.warn("Skipping AI insights: missing GEMINI_API_KEY");
    return null;
  }

  const prompt = `
    As an expert cafe consultant, analyze the following cafe data and provide actionable business insights.
    
    Sales Data (Last few orders): ${JSON.stringify(orders.slice(-20))}
    Inventory Status: ${JSON.stringify(inventory)}
    
    Return a JSON response with:
    - salesTrend: A brief summary of sales performance.
    - stockWarnings: Items that need immediate attention.
    - recommendations: 3 specific suggestions to increase revenue or efficiency.
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            salesTrend: { type: Type.STRING },
            stockWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["salesTrend", "stockWarnings", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Insight Error:", error);
    return null;
  }
}
