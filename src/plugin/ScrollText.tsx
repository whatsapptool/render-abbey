import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { interpolate } from "remotion";

interface ScrollTextProps {
  text: string;
  triggerFrame: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const ScrollText: React.FC<ScrollTextProps> = ({
  text,
  triggerFrame,
  duration = 300,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate if we should start scrolling
  const startFrame = triggerFrame + 60; // Start scrolling after 60 frames
  const scrollDuration = duration;
  const endFrame = startFrame + scrollDuration;
  const returnFrame = endFrame + 60; // Wait 60 frames before returning
  const finalFrame = returnFrame + scrollDuration; // Return animation duration

  // Only animate if text is long enough and we're past the trigger frame
  if (text.length <= 15 || text.length > 30 || frame < startFrame) {
    return (
      <div
        style={{
          wordBreak: 'break-all',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          minWidth: '100%',
          width: 'max-content',
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  // Calculate scroll position with return to beginning
  let scrollProgress = 0;
  
  // Adjust maxScroll to ensure full text visibility
  const maxScroll = Math.max(0, (text.length - 15) * 3); // Dynamically calculate scroll based on text length

  if (frame >= startFrame && frame <= endFrame) {
    // Scroll from left to right (0 to -maxScroll)
    scrollProgress = interpolate(
      frame,
      [startFrame, endFrame],
      [0, -maxScroll],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  } else if (frame > endFrame && frame <= finalFrame) {
    // Return from right to left (-maxScroll to 0)
    scrollProgress = interpolate(
      frame,
      [returnFrame, finalFrame],
      [-maxScroll, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  } else if (frame > finalFrame) {
    // Stay at beginning
    scrollProgress = 0;
  }

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <div
        style={{
          transform: `translateX(${scrollProgress}%)`,
          whiteSpace: "nowrap",
          display: "inline-block",
          width: "max-content",
          transition: "transform 0.1s ease-out",
        }}
      >
        {text}
      </div>
    </div>
  );
};