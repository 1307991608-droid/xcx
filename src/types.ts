export type EmotionType = 'HAPPY' | 'SAD' | 'EXCITED' | 'ANGRY' | 'PEACEFUL' | 'NEUTRAL';

export interface EmotionEntry {
  id: string;
  emotion: EmotionType;
  timestamp: Date;
  triggerText: string;
}

export type WindowType = 'WORLD' | 'FUNCTIONS' | 'MARKET' | 'HOME';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
  detectedEmotion?: EmotionType;
}

export interface MarketItem {
  id: string;
  name: string;
  price: number;
  series: 'ZODIAC' | 'GRAFFITI' | 'OTHER';
  image: string;
  description: string;
}
