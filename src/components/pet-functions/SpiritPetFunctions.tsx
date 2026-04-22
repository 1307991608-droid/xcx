import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, Heart, Link as LinkIcon, Compass, Activity } from 'lucide-react';
import { EmotionEntry } from '../../types';

interface SpiritPetFunctionsProps {
  emotions: EmotionEntry[];
}

export const SpiritPetFunctions: React.FC<SpiritPetFunctionsProps> = ({ emotions }) => {
  const functions = [
    { title: '灵宠占卜', icon: Sparkles, color: 'bg-indigo-500', desc: '洞察今日气运' },
    { title: '心灵记录', icon: Heart, color: 'bg-rose-500', desc: '对话灵魂深处' },
    { title: '萌宠名录', icon: BookOpen, color: 'bg-emerald-500', desc: '全图鉴收集指南' },
    { title: '萌宠链接', icon: LinkIcon, color: 'bg-sky-500', desc: '寻找附近的契约人' },
    { title: '故事路线', icon: Compass, color: 'bg-amber-500', desc: '解锁灵宠传奇' },
  ];

  return (
    <div className="p-6 pb-32 min-h-screen bg-zinc-950">
      <header className="mb-8">
        <h1 className="text-4xl font-black italic graffiti-text text-yellow-400">灵宠功能</h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Special Abilities & Logs</p>
      </header>

      {/* Emotion Tracker Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-accent" size={20} />
          <h2 className="text-xl font-black italic text-white">情感共鸣追踪</h2>
        </div>
        
        <div className="sticker-card p-4 bg-zinc-900 shadow-[4px_4px_0px_#FF0055]">
          {emotions.length === 0 ? (
            <p className="text-zinc-600 text-xs font-bold uppercase text-center py-4">
              暂无共鸣记录，去和灵宠聊聊吧？
            </p>
          ) : (
            <div className="space-y-3">
              {emotions.slice(0, 5).map((entry, idx) => (
                <motion.div 
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 border-b border-white/5 pb-2 last:border-0"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    entry.emotion === 'HAPPY' ? 'bg-yellow-400' :
                    entry.emotion === 'SAD' ? 'bg-blue-500' :
                    entry.emotion === 'EXCITED' ? 'bg-pink-500' :
                    entry.emotion === 'ANGRY' ? 'bg-red-500' :
                    'bg-emerald-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">
                      {new Date(entry.timestamp).toLocaleTimeString()} · {entry.emotion}
                    </p>
                    <p className="text-sm font-bold text-white truncate max-w-[200px]">"{entry.triggerText}"</p>
                  </div>
                  <div className="text-[10px] font-black text-accent italic">MATCHED</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        {functions.map((fn, idx) => {
          const Icon = fn.icon;
          return (
            <motion.div
              key={fn.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
              className="sticker-card p-4 group cursor-pointer"
            >
              <div className={`${fn.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-1">{fn.title}</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase leading-tight">{fn.desc}</p>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-8 bg-gradient-to-r from-accent to-purple-600 rounded-3xl p-6 relative overflow-hidden border-4 border-black"
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-white italic">今日占卜已刷新</h2>
          <p className="text-white/80 text-xs font-bold mt-1">点击查看你的专属灵宠建议 →</p>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded-full font-black text-xs border-2 border-white uppercase tracking-tighter">
            立刻开启
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-30 transform rotate-12">
           <Sparkles size={120} />
        </div>
      </motion.div>
    </div>
  );
};
