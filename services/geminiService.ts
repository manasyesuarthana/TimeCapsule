
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { YearData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and to prevent app crash
  // In a real environment, the API_KEY should always be present.
  console.warn("API_KEY is not set. Using mocked responses.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const yearDataSchema = {
  type: Type.OBJECT,
  properties: {
    year: { type: Type.INTEGER, description: "The year requested." },
    tagline: { type: Type.STRING, description: "A catchy tagline summarizing the year's pop culture." },
    topSongs: {
      type: Type.ARRAY,
      description: "A list of the top 5 most iconic songs of the year.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          artist: { type: Type.STRING },
        },
        required: ["title", "artist"],
      },
    },
    topMovies: {
      type: Type.ARRAY,
      description: "A list of the top 4 most influential movies of the year.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          synopsis: { type: Type.STRING, description: "A one-sentence summary of the movie." },
        },
        required: ["title", "synopsis"],
      },
    },
    fashionTrends: {
      type: Type.ARRAY,
      description: "A list of 3 major fashion trends from the year.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the fashion trend." },
          description: { type: Type.STRING, description: "A brief description of the trend." },
        },
        required: ["name", "description"],
      },
    },
    worldEvents: {
      type: Type.ARRAY,
      description: "A list of 4 significant world events that occurred this year.",
      items: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING },
          date: { type: Type.STRING, description: "The month, day, and year of the event." },
        },
        required: ["description", "date"],
      },
    },
    imagePrompt: {
        type: Type.STRING,
        description: "A creative and detailed prompt for an image generation model to create a vintage poster for the year. E.g. 'A retro advertisement poster for the Sony PlayStation 2 from the year 2000, with dynamic, futuristic graphics.'"
    }
  },
  required: ["year", "tagline", "topSongs", "topMovies", "fashionTrends", "worldEvents", "imagePrompt"],
};

export const fetchYearData = async (year: number, interests: string[]): Promise<YearData> => {
  if (!API_KEY) {
    // Fallback if no API key
    return new Promise(resolve => setTimeout(() => resolve({
        year: year,
        tagline: `A Year of Simulated Nostalgia for ${year}`,
        topSongs: [{ title: `Mock Song for ${year}`, artist: "The Fallbacks" }],
        topMovies: [{ title: `Mock Movie for ${year}`, synopsis: "A mock movie synopsis." }],
        fashionTrends: [{ name: "Mock Trend", description: "A simulated fashion trend." }],
        worldEvents: [{ description: "A simulated world event occurred.", date: `Jan 1, ${year}` }],
        imagePrompt: `A retro advertisement poster for a popular gadget from ${year}.`
    }), 1500));
  }

  try {
    const prompt = `Generate a JSON object of pop culture highlights for the year ${year}. Focus on the following interests: ${interests.join(', ')}. Include a prompt for an image generation model to create a vintage poster that captures the essence of that year, like a 'Sony PS2 poster' style. The response must strictly follow the provided JSON schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: yearDataSchema,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText) as YearData;
    return data;
  } catch (error) {
    console.error(`Error fetching data for year ${year}:`, error);
    // In case of an API error, return a structured error object or fallback data.
    // This prevents the entire app from crashing.
    throw new Error(`Failed to fetch Gemini data for ${year}`);
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
    if (!API_KEY) {
        // Simple fallback to use picsum with the prompt as a seed
        return `https://picsum.photos/seed/${prompt.slice(0, 20)}/400/600`;
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        // If no image part is found, throw an error.
        throw new Error('No image was generated by the model.');

    } catch (error) {
        console.error('Error generating image:', error);
        // Fallback to a placeholder image in case of an error
        return `https://picsum.photos/seed/error/400/600`;
    }
};
