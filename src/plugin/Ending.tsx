import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, } from 'remotion';
import { loadFont as loadRubik } from '@remotion/google-fonts/Rubik';
import { EffectWatermarkSVG } from '../utils/effectWatermarkSVG';

const { fontFamily: rubikFont } = loadRubik();

const Ending: React.FC<{ endingDuration?: number; textColor?: string }> = ({ endingDuration = 300, textColor = 'white' }) => {
  const frame = useCurrentFrame();
  const duration = endingDuration;

  const text = 'See Ya Next...';
  const characters = text.split('').map((char, index) => {
    if (char === ' ' && index < text.length - 1) {
      return '  ';
    }
    return char;
  });

  const typingProgress = useMemo(() => {
    return interpolate(frame, [0, duration], [0, characters.length], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
  }, [frame, duration, characters.length]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* SVG Watermark - sama dengan Player List */}
      <EffectWatermarkSVG />

      <div
        style={{
          fontFamily: rubikFont,
          fontSize: '6rem',
          fontWeight: 900, // font weight remains unchanged
          color: textColor,
          textAlign: 'center',
          lineHeight: 1.5,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          letterSpacing: '0em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {characters.map((char, i) => (
          <span
            key={i}
            style={{
              opacity: i < typingProgress ? 1 : 0,
              display: 'inline-block',
              transform: `translateY(${i < typingProgress ? 0 : 20}px)`,
              transition: 'all 0.1s ease-out',
              whiteSpace: 'pre',
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ending;