import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Award, History, Camera, Zap } from 'lucide-react';
import { EmotionEntry } from '../../types';

interface SpiritPetHomeProps {
  emotions: EmotionEntry[];
}

export const SpiritPetHome: React.FC<SpiritPetHomeProps> = ({ emotions }) => {
  return (
    <div className="pb-32 min-h-screen bg-zinc-950 overflow-x-hidden">
      {/* Profile Header */}
      <div className="h-64 bg-accent relative overflow-hidden border-b-8 border-black">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/spray-paint.png')] bg-repeat" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute bottom-6 left-6 flex items-end gap-4 z-10">
          <div className="w-24 h-24 rounded-3xl border-4 border-black bg-white overflow-hidden shadow-[8px_8px_0px_#000] relative group">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="text-white" />
            </button>
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-black italic text-white graffiti-text">超燃潮玩达人</h1>
            <div className="flex gap-2 mt-1">
              <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-md border border-black italic">LV.42</span>
              <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-md border border-white/20">契约等级: 资深</span>
            </div>
          </div>
        </div>
        
        <button className="absolute top-8 right-6 p-2 bg-black/50 rounded-xl text-white backdrop-blur-sm border border-white/10">
            <Settings size={20} />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '契约灵宠', val: '12', icon: Award },
            { label: '图鉴进度', val: '46%', icon: History },
            { label: '互动点数', val: '8.4k', icon: User },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900 border-2 border-white/10 p-3 rounded-2xl flex flex-col items-center gap-1 shadow-[2px_2px_0px_rgba(255,255,255,0.05)]"
              >
                <Icon size={16} className="text-zinc-500" />
                <span className="text-lg font-black text-white leading-none">{stat.val}</span>
                <span className="text-[8px] font-bold text-zinc-500 uppercase">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>

        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-black italic text-white">情感共鸣</h2>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">Recent Spirit</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {emotions.length === 0 ? (
               <div className="text-zinc-600 text-[10px] font-bold py-2">还未捕捉到灵魂波段...</div>
            ) : (
              emotions.slice(0, 3).map((e, idx) => (
                <div key={e.id} className="bg-zinc-900 border border-white/5 rounded-xl px-4 py-2 flex items-center gap-2 whitespace-nowrap">
                   <Zap size={12} className="text-yellow-400" />
                   <span className="text-xs font-black text-white italic">{e.emotion}</span>
                   <span className="text-[8px] text-zinc-600 font-bold">{new Date(e.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Collection Grid */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-black italic text-white">灵宠展示柜</h2>
            <button className="text-[10px] font-black text-yellow-400 border-b border-yellow-400 uppercase">View All</button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
             {[1,2,3,4,5].map((i) => (
               <div key={i} className="aspect-square bg-zinc-900 border-2 border-black rounded-xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                  <img 
                    src={`https://picsum.photos/seed/${i+100}/200`} 
                    alt="toy" 
                    className="w-full h-full object-cover filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    referrerPolicy="no-referrer"
                  />
                  {i > 3 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
                       <span className="text-white font-black text-[20px] opacity-20">?</span>
                    </div>
                  )}
               </div>
             ))}
             <div className="aspect-square border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center text-zinc-600 hover:text-white transition-colors cursor-pointer">
                <span className="text-2xl font-light">+</span>
             </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl font-black italic text-white mb-4">契约往事</h2>
          <div className="space-y-3">
            {[
              { type: '契约', name: '喷漆龙', time: '2小时前', color: 'bg-green-500' },
              { type: '占卜', name: '大吉星', time: '昨日 22:40', color: 'bg-yellow-400' },
              { type: '解锁', name: '异想世界图鉴', time: '前日', color: 'bg-purple-500' },
            ].map((act, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-zinc-900/50 rounded-2xl border-l-4 border-accent">
                <div className={`w-2 h-2 rounded-full ${act.color}`} />
                <div className="flex-1">
                   <p className="text-xs font-bold text-white">{act.type}：<span className="text-yellow-400">{act.name}</span></p>
                   <p className="text-[9px] text-zinc-600 font-bold uppercase">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
