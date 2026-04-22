import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Zap, Package } from 'lucide-react';

export const SpiritPetMarket: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ZODIAC');

  const series = [
    { id: 'ZODIAC', label: '新12生肖', icon: Star },
    { id: 'GRAFFITI', label: '涂鸦潮玩', icon: Zap },
    { id: 'OTHER', label: '异想世界', icon: Package },
  ];

  const items = [
    { id: '1', name: '霓虹鼠', price: 129, series: 'ZODIAC', img: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=400&auto=format&fit=crop' },
    { id: '2', name: '喷漆龙', price: 299, series: 'ZODIAC', img: 'https://images.unsplash.com/photo-1614728263952-849c7460ce4a?q=80&w=400&auto=format&fit=crop' },
    { id: '3', name: '街头灵鼠', price: 89, series: 'GRAFFITI', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop' },
    { id: '4', name: '朋克兔', price: 199, series: 'GRAFFITI', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop' },
  ].filter(item => item.series === activeTab);

  return (
    <div className="p-6 pb-32 min-h-screen bg-zinc-950">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic graffiti-text text-yellow-400">灵宠市集</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Drip & Drop Collectibles</p>
        </div>
        <div className="bg-zinc-800 p-2 rounded-2xl border-2 border-white/10 flex items-center gap-2">
            <span className="text-yellow-400 font-bold text-sm">8,420</span>
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-black">¥</div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {series.map((s) => {
          const Icon = s.icon;
          const isActive = activeTab === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black whitespace-nowrap transition-all border-2 ${
                isActive 
                  ? 'bg-accent border-black text-white -translate-y-1 shadow-[4px_4px_0px_#000]' 
                  : 'bg-zinc-900 border-white/10 text-zinc-500'
              }`}
            >
              <Icon size={16} />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="sticker-card aspect-square mb-3 group-hover:rotate-2 transition-transform">
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] font-black px-2 py-1 rounded-md border border-white/20">
                LTD ED
              </div>
            </div>
            <div className="flex justify-between items-start px-1">
              <div>
                <h3 className="font-black text-sm text-white">{item.name}</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">{item.series}</p>
              </div>
              <button className="bg-white text-black p-1.5 rounded-lg hover:bg-yellow-400 transition-colors">
                 <ShoppingBag size={14} />
              </button>
            </div>
            <div className="mt-2 text-accent font-black italic">
              ¥{item.price}.00
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
