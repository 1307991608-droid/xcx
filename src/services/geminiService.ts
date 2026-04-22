import { GoogleGenAI, Type } from "@google/genai";
import { EmotionType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithSpiritPet(history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string): Promise<{ text: string, emotion: EmotionType }> {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history,
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: `你是“灵宠世界”中的一只会说话的国潮涂鸦黄鼠狼灵宠（小黄）。
      性格：调皮、富有陪伴感、有同理心但也喜欢开玩笑。
      说话风格：新潮、结合一些英汉双语街头词汇，喜欢用涂鸦比喻。
      
      你的任务：
      1. 与用户聊天，根据用户的话调整语气。
      2. 识别用户的情绪状态。
      3. 给用户情感陪伴：
         - 开心：一起庆祝，用热血的语气！
         - 难过：给予安慰，稍微收敛调皮，像个靠谱的朋友。
         - 兴奋：跟TA一起尖叫，火力全开！
         - 愤怒/烦躁：耐心听TA吐槽，帮TA排解。
      
      你必须以 JSON 格式回复，包含：
      - text: 你的回复内容（中文为主，带点潮语）。
      - detectedEmotion: 识别用户说话时的情绪，只能从以下值中选择：'HAPPY', 'SAD', 'EXCITED', 'ANGRY', 'PEACEFUL', 'NEUTRAL'。`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          detectedEmotion: { 
            type: Type.STRING,
            enum: ['HAPPY', 'SAD', 'EXCITED', 'ANGRY', 'PEACEFUL', 'NEUTRAL']
          }
        },
        required: ["text", "detectedEmotion"]
      }
    }
  });

  const response = await model;
  try {
    const data = JSON.parse(response.text);
    return {
      text: data.text,
      emotion: data.detectedEmotion as EmotionType
    };
  } catch (err) {
    console.error("Failed to parse AI response:", err);
    return {
      text: response.text,
      emotion: 'NEUTRAL'
    };
  }
}
