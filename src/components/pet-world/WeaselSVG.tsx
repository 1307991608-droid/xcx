import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface WeaselSVGProps {
  mood: string;
  isTyping: boolean;
  seed: number;
}

export const WeaselSVG: React.FC<WeaselSVGProps> = ({ mood, isTyping, seed }) => {
  // Variations based on seed
  const variant = useMemo(() => {
    return {
      earType: seed % 2 === 0 ? 'pointed' : 'round',
      accessory: seed % 3 === 0 ? 'hat' : seed % 3 === 1 ? 'glasses' : 'none',
      pattern: seed % 2 === 0 ? 'cloud' : 'bolt',
    };
  }, [seed]);
  
  const getColors = () => {
    switch (mood) {
      case 'HAPPY': return { primary: '#FFD700', accent: '#FF0055', secondary: '#FF8C00' };
      case 'SAD': return { primary: '#4169E1', accent: '#000080', secondary: '#6495ED' };
      case 'EXCITED': return { primary: '#FF00FF', accent: '#800080', secondary: '#DA70D6' };
      case 'ANGRY': return { primary: '#FF4500', accent: '#8B0000', secondary: '#B22222' };
      default: return { primary: '#FACC15', accent: '#FF0055', secondary: '#EAB308' };
    }
  };

  const colors = getColors();

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
      initial="rest"
      animate={isTyping ? "typing" : "rest"}
    >
      {/* Background Glow / Halo */}
      <motion.circle 
        cx="100" cy="110" r="70" 
        fill={colors.primary} 
        opacity="0.1"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Body */}
      <motion.path
        d="M60 160 Q100 40 140 160 Z"
        fill={colors.primary}
        stroke="#000"
        strokeWidth="4"
        animate={{ d: isTyping ? "M60 160 Q100 30 140 160 Z" : "M60 160 Q100 40 140 160 Z" }}
      />

      {/* Typical Guochao Patterns on Body */}
      <g opacity="0.4">
        {variant.pattern === 'cloud' ? (
          <>
            <path d="M90 80 Q100 70 110 80" fill="none" stroke="#000" strokeWidth="2" />
            <path d="M85 100 Q100 90 115 100" fill="none" stroke="#000" strokeWidth="2" />
          </>
        ) : (
          <>
            <path d="M85 100 L95 90 L105 100 L115 90" fill="none" stroke="#000" strokeWidth="2" />
          </>
        )}
      </g>

      {/* Head Area */}
      <motion.g
        animate={{ y: isTyping ? -5 : 0 }}
        transition={{ duration: 0.2, repeat: isTyping ? Infinity : 0, repeatType: 'reverse' }}
      >
        {/* Ears */}
        {variant.earType === 'pointed' ? (
          <>
            <path d="M75 65 Q65 30 85 55" fill={colors.accent} stroke="#000" strokeWidth="3" />
            <path d="M125 65 Q135 30 115 55" fill={colors.accent} stroke="#000" strokeWidth="3" />
          </>
        ) : (
          <>
            <circle cx="75" cy="65" r="12" fill={colors.accent} stroke="#000" strokeWidth="3" />
            <circle cx="125" cy="65" r="12" fill={colors.accent} stroke="#000" strokeWidth="3" />
          </>
        )}

        {/* Face Shape */}
        <circle cx="100" cy="85" r="35" fill={colors.primary} stroke="#000" strokeWidth="4" />
        
        {/* Eyes */}
        <motion.g>
           {/* Left Eye */}
           <circle cx="85" cy="80" r="6" fill="#000" />
           <motion.circle 
             cx="86" cy="79" r="2" fill="#fff" 
             animate={{ scale: [1, 1.2, 1] }} 
             transition={{ duration: 2, repeat: Infinity }}
           />
           
           {/* Right Eye */}
           <circle cx="115" cy="80" r="6" fill="#000" />
           <motion.circle 
             cx="116" cy="79" r="2" fill="#fff" 
             animate={{ scale: [1, 1.2, 1] }} 
             transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
           />
        </motion.g>

        {/* Accessory */}
        {variant.accessory === 'glasses' && (
          <g>
            <circle cx="85" cy="80" r="10" fill="none" stroke="#fff" strokeWidth="2" />
            <circle cx="115" cy="80" r="10" fill="none" stroke="#fff" strokeWidth="2" />
            <line x1="95" y1="80" x2="105" y2="80" stroke="#fff" strokeWidth="2" />
          </g>
        )}

        {/* Cheeks */}
        <circle cx="75" cy="95" r="5" fill={colors.accent} opacity="0.6" />
        <circle cx="125" cy="95" r="5" fill={colors.accent} opacity="0.6" />

        {/* Nose & Mouth */}
        <path d="M95 95 L105 95 L100 100 Z" fill="#000" />
        <motion.path 
          d={isTyping ? "M93 105 Q100 115 107 105" : "M95 105 Q100 108 105 105"} 
          fill="none" stroke="#000" strokeWidth="2"
        />

        {/* Whiskers */}
        <path d="M60 85 L40 80" stroke="#000" strokeWidth="1" />
        <path d="M60 90 L40 95" stroke="#000" strokeWidth="1" />
        <path d="M140 85 L160 80" stroke="#000" strokeWidth="1" />
        <path d="M140 90 L160 95" stroke="#000" strokeWidth="1" />
      </motion.g>

      {/* Decorative Traditional Coin */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '30px', originY: '30px' }}
      >
        <circle cx="30" cy="30" r="15" fill="#FFD700" stroke="#000" strokeWidth="2" />
        <rect x="25" y="25" width="10" height="10" fill="none" stroke="#000" strokeWidth="2" />
      </motion.g>

      {/* Spray Paint Drips */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: isTyping ? 1 : 0.3 }}>
        <circle cx="170" cy="40" r="4" fill={colors.accent} />
        <rect x="169" y="40" width="2" height="15" fill={colors.accent} />
        <circle cx="170" cy="60" r="2" fill={colors.accent} />
      </motion.g>
    </motion.svg>
  );
};
