import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";

const { fontFamily: RubikFont } = loadRubik();


interface AnimatedNumberCounterAdvancedProps {
  number: number;
  triggerFrame: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedNumberCounterAdvanced: React.FC<AnimatedNumberCounterAdvancedProps> = ({
  number,
  triggerFrame,
  duration = 90,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - triggerFrame);

  // Spring animation for the counter
  const springValue = spring({
    frame: localFrame,
    fps: 30,
    config: {
      damping: 15,
      mass: 1,
      stiffness: 100,
    },
  });

  // Animated number that counts up from 0 to target
  const animatedNumber = interpolate(
    springValue,
    [0, 1],
    [0, number],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      className={`relative rounded-full text-white font-bold flex items-center justify-center ${className}`}
      style={{
        width: "3.5em",
        height: "3.5em",
        fontSize: "1.2em",
        zIndex: 10,
        position: "relative",
        ...style,
      }}
    >
      {/* Number display container */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{
          zIndex: 1,
        }}
      >
        <span style={{ 
          fontFamily: RubikFont, // Use the correct variable
          fontWeight: "bold",
          position: "relative",
          zIndex: 2,
          fontSize: "4em",
          color: "black",
        }}>
          {Math.round(animatedNumber)}
        </span>
      </div>
    </div>
  );
};