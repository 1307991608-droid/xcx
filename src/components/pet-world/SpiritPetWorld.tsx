import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Mic, Heart } from 'lucide-react';
import { chatWithSpiritPet } from '../../services/geminiService';
import { Message, EmotionEntry, EmotionType } from '../../types';

import { WeaselSVG } from './WeaselSVG';

interface SpiritPetWorldProps {
  messages: Message[];
  onAddMessage: (msg: Message) => void;
  onAddEmotion: (entry: EmotionEntry) => void;
}

export const SpiritPetWorld: React.FC<SpiritPetWorldProps> = ({ messages, onAddMessage, onAddEmotion }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [seed] = useState(() => Math.floor(Math.random() * 100));
  const scrollRef = useRef<HTMLDivElement>(null);

  const emotionColors: Record<EmotionType, string> = {
    HAPPY: 'from-yellow-400 to-orange-500',
    SAD: 'from-blue-500 to-indigo-700',
    EXCITED: 'from-pink-500 to-rose-600',
    ANGRY: 'from-red-600 to-orange-700',
    PEACEFUL: 'from-emerald-400 to-teal-600',
    NEUTRAL: 'from-yellow-400/20 to-transparent'
  };

  const lastEmotion = messages.findLast(m => m.detectedEmotion)?.detectedEmotion || 'NEUTRAL';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    onAddMessage(userMsg);
    const triggerText = input;
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.text }]
      }));
      const { text, emotion } = await chatWithSpiritPet(history, triggerText);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text,
        timestamp: new Date(),
        detectedEmotion: emotion
      };
      onAddMessage(aiMsg);

      if (emotion !== 'NEUTRAL') {
        onAddEmotion({
          id: Date.now().toString(),
          emotion,
          timestamp: new Date(),
          triggerText
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-zinc-950">
      {/* Animated Weasel Section */}
      <div className={`h-[40vh] relative flex items-center justify-center bg-gradient-to-b ${emotionColors[lastEmotion]} transition-colors duration-1000`}>
        <div className="absolute top-10 left-10 opacity-20 transform -rotate-12">
            <h2 className="text-6xl font-black text-white italic opacity-30">GRAFFITI</h2>
        </div>
        
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
            <Heart size={14} className={lastEmotion !== 'NEUTRAL' ? 'text-accent fill-accent animate-pulse' : 'text-zinc-500'} />
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                {lastEmotion === 'NEUTRAL' ? '等候中' : `共鸣: ${lastEmotion}`}
            </span>
        </div>
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [2, -2, 2],
            scale: isTyping ? [1, 1.05, 1] : 1
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.5, repeat: Infinity, ease: "linear" }
          }}
          className="relative z-10 p-4"
        >
          {/* Animated Weasel SVG */}
          <div className="w-56 h-56 relative group">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative z-10 w-full h-full">
               <WeaselSVG mood={lastEmotion} isTyping={isTyping} seed={seed} />
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full font-bold text-xs border-2 border-black shadow-[4px_4px_0px_#000]">
            黄鼬大圣·小黄
          </div>
        </motion.div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-4 mb-24 min-h-0 bg-zinc-900/50 rounded-t-[3rem] border-t-4 border-accent relative z-20">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-hide"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="chat-bubble-ai opacity-50 flex gap-1">
              <span className="w-1 h-1 bg-black rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2 items-center bg-black/50 p-2 rounded-2xl border-2 border-white/20">
          <button className="p-2 text-yellow-400 hover:scale-110 transition-transform">
            <Mic size={24} />
          </button>
          <input
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="写下你想说的..."
            className="flex-1 bg-transparent border-none outline-none text-white font-bold"
          />
          <button 
            id="send-btn"
            onClick={handleSend}
            className="bg-accent p-2 rounded-xl text-white shadow-[2px_2px_0px_#fff] active:translate-y-1 active:shadow-none transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
