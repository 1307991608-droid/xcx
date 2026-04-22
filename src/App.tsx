import React, { useState } from 'react';
import { SpiritPetWorld } from './components/pet-world/SpiritPetWorld';
import { SpiritPetFunctions } from './components/pet-functions/SpiritPetFunctions';
import { SpiritPetMarket } from './components/pet-market/SpiritPetMarket';
import { SpiritPetHome } from './components/pet-home/SpiritPetHome';
import { Navigation } from './components/Navigation';
import { WindowType, Message, EmotionEntry } from './types';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentWindow, setCurrentWindow] = useState<WindowType>('WORLD');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: '嘿！我的朋友，欢迎来到灵宠世界！我是你的新向导，一只爱涂鸦的黄鼠狼。来聊聊今天的灵感？', timestamp: new Date() }
  ]);
  const [emotions, setEmotions] = useState<EmotionEntry[]>([]);

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);
  const addEmotion = (entry: EmotionEntry) => setEmotions(prev => [entry, ...prev].slice(0, 50));

  const renderWindow = () => {
    switch (currentWindow) {
      case 'WORLD': return (
        <SpiritPetWorld 
          messages={messages} 
          onAddMessage={addMessage} 
          onAddEmotion={addEmotion} 
        />
      );
      case 'FUNCTIONS': return <SpiritPetFunctions emotions={emotions} />;
      case 'MARKET': return <SpiritPetMarket />;
      case 'HOME': return <SpiritPetHome emotions={emotions} />;
      default: return <SpiritPetWorld messages={messages} onAddMessage={addMessage} onAddEmotion={addEmotion} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-zinc-950 shadow-2xl relative flex flex-col font-sans">
      {/* App Status Bar Mock */}
      <div className="h-10 bg-black/50 flex justify-between items-center px-6 text-[10px] font-bold text-white/40 z-50">
        <span>12:00</span>
        <div className="flex gap-2">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      <main className="flex-1 relative overflow-hidden overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWindow}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full"
          >
            {renderWindow()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation currentWindow={currentWindow} setWindow={setCurrentWindow} />
      
      {/* Screen Textures */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fake-brick.png')] bg-repeat" />
      </div>
      <div className="fixed top-0 left-0 w-full h-1 bg-yellow-400 shadow-[0_0_10px_#FFD700] z-[101]" />
    </div>
  );
}

