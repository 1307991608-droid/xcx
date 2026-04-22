import React from 'react';
import { Home, Globe, LayoutGrid, ShoppingBag } from 'lucide-react';
import { WindowType } from '../types';
import { motion } from 'motion/react';

interface NavigationProps {
  currentWindow: WindowType;
  setWindow: (window: WindowType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentWindow, setWindow }) => {
  const tabs = [
    { id: 'WORLD', icon: Globe, label: '灵宠世界' },
    { id: 'FUNCTIONS', icon: LayoutGrid, label: '功能' },
    { id: 'MARKET', icon: ShoppingBag, label: '灵宠市集' },
    { id: 'HOME', icon: Home, label: '主页' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t-4 border-yellow-400 p-4 pb-8 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentWindow === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-btn-${tab.id}`}
              onClick={() => setWindow(tab.id as WindowType)}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-yellow-400 text-black scale-110 -translate-y-2 rotate-3 shadow-[4px_4px_0px_#FF0055]' 
                  : 'text-zinc-500 hover:text-white'
              }`}>
                <Icon size={24} />
              </div>
              <span className={`text-[10px] font-bold tracking-tighter uppercase ${
                isActive ? 'text-yellow-400' : 'text-zinc-500'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-1 h-1 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
