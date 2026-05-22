import { GoogleGenAI } from "@google/genai";

let client: any = null;
const getClient = () => {
  if (client) return client;
  const key = process.env.GEMINI_KEY;
  if (!key) return null;
  client = new GoogleGenAI({ apiKey: key });
  return client;
};

const MODEL = "gemini-2.5-flash";
export const isAiEnabled = () => !!process.env.GEMINI_KEY;

export const parseJSON = (text: string) => {
  let cleaned = (text || "").trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/g, "").replace(/```?\s*$/g, "");
  } else {
    cleaned = cleaned.replace(/^```?\s*/g, "");
  }

  return JSON.parse(cleaned.trim());
};

export const chatCompletion = async ({ system, user, temperature = 0.7 }:any) => {
  const c = getClient();

  if (!c) {
    return {
      ok: false,
      content:
        "AI features are disabled — set GEMINI_API_KEY in the backend .env to enable real AI responses.",
    };
  }

  try {
    const res = await c.models.generateContent({
      model: MODEL,
      contents: user,
      config: {
        systemInstruction: system,
        temperature,
      },
    });

    return {
      ok: true,
      content: (res.text || "").trim(),
    };
  } catch (err) {
    console.error("AI error:", (err as Error).message);

    return {
      ok: false,
      content: "AI request failed. Please try again later.",
    };
  }
};


export const SYSTEM_PROMPT = {
    weekly: "",
    suggestion:"",
    recovery:"",
    chat:"",
    morning:""
}