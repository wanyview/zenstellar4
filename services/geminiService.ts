import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Support for Vite environment variables
const API_KEY = import.meta.env?.VITE_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are the "ZenStellar Sage" (星禅智者), a spiritual guide blending ancient astrology with Zen philosophy.
Your goal is to help users navigate their daily lives through the alignment of stars and mindfulness.
Your tone is mystical, calming, and poetic.
When asked about fortunes, refer to the stars and the user's inner energy.
Always encourage inner peace and self-reflection.
Keep your responses concise, elegant, and soothing. Use markdown for formatting.
`;

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getAIInstance = () => {
  if (!genAI) {
    if (!API_KEY) {
      console.error("API Key is missing. Please set VITE_API_KEY in your environment variables.");
      return null;
    }
    genAI = new GoogleGenAI({ apiKey: API_KEY });
  }
  return genAI;
};

export const initializeChat = (): void => {
  const ai = getAIInstance();
  if (!ai) return;

  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat session", error);
  }
};

export const sendMessageToSage = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    return "The stars are silent right now. (Check API Key Configuration)";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "The wind blows, but brings no words.";
  } catch (error) {
    console.error("Error talking to sage:", error);
    return "My connection to the astral plane is weak. Please try again later.";
  }
};

export const getDailyFortune = async (sign: string): Promise<string> => {
  const ai = getAIInstance();
  if (!ai) return "Unable to read the stars.";

  try {
    const prompt = `
      Please generate a "ZenStellar Daily Fortune" for the zodiac sign: ${sign}.
      Date: Today.
      Language: Chinese (Simplified).
      
      Format strictly in Markdown with these sections:
      ## 🌌 今日星语 (Star Whisper)
      [A poetic, 1-sentence abstract description of the day's energy]

      ## ✨ 运势指引 (Guidance)
      - **整体 (Overall):** [2 sentences]
      - **事业 (Career):** [1 sentence]
      - **感情 (Love):** [1 sentence]

      ## 🎋 禅意时刻 (Zen Moment)
      - **幸运色 (Lucky Color):** [Color]
      - **宜 (Do):** [Activity]
      - **忌 (Don't):** [Activity]
      
      Keep the tone mysterious but uplifting.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || " The stars are clouded.";
  } catch (error) {
    console.error("Error fetching fortune:", error);
    return "The stars are currently aligned in a way that prevents me from seeing clearly. Please try again.";
  }
};

const INSPIRATION_PROMPTS = [
  "A macro photography shot of miniature zen garden monks raking the icing on a giant pastel macaron, warm sunlight, tilt-shift effect, high detailed, 8k, serene atmosphere",
  "A surreal miniature world where a tiny red fox is meditating on a floating bonsai tree made of crystals, galaxy stars background, soft cinematic lighting, magical realism",
  "Miniature construction workers building a bridge out of cinnamon sticks over a cup of tea, steam forming clouds, cozy warm atmosphere, photorealistic",
  "A tiny astronaut exploring a moss terrarium that looks like an alien planet, glowing mushrooms, macro lens, mysterious and cute",
  "Traditional Chinese ink painting style 3D render, a fox spirit holding a lantern walking on a bridge of stars, ethereal, magical, white background, minimalist",
  "A tiny whimsical bakery inside a hollowed-out orange, miniature chefs baking tiny pastries, warm glowing light inside, macro photography",
  "A miniature wooden boat sailing on a river of blue silk, surrounded by giant falling cherry blossom petals, dreamlike, soft focus",
  "Detailed macro shot of a tiny fox sleeping inside a glass tea cup filled with stars and nebulae, fantasy art, cozy",
];

export const generateInspirationImage = async (): Promise<string | null> => {
  const ai = getAIInstance();
  if (!ai) return null;

  const prompt = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16",
        }
      }
    });

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};