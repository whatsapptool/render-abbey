import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export type TypingOnFrameProps = {
  text: string;
  triggerFrame: number;
  duration?: number; // durasi total animasi dalam frame, default 30
  style?: React.CSSProperties;
  className?: string;
};

export const TypingOnFrame: React.FC<TypingOnFrameProps> = ({
  text,
  triggerFrame,
  duration = 30,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - triggerFrame);
  const totalChars = text.length;
  const charsToShow = Math.floor(
    interpolate(localFrame, [0, duration], [0, totalChars], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  return (
    <span style={style} className={className}>
      {text.slice(0, charsToShow)}
      <span style={{ opacity: charsToShow < totalChars ? 1 : 0 }}>|</span>
    </span>
  );
};

// Utility: Hitung triggerFrame otomatis berdasarkan index dan delay
export function getAutoTriggerFrame({
  index,
  baseFrame = 0,
  delayPerCard = 5,
}: {
  index: number;
  baseFrame?: number;
  delayPerCard?: number;
}): number {
  return baseFrame + index * delayPerCard;
} 