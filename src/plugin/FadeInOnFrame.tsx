import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type FadeInOnFrameProps = {
  triggerFrame: number;
  duration?: number; // durasi animasi dalam frame, default 20
  fromY?: number;    // posisi Y awal, default 40
  toY?: number;      // posisi Y akhir, default 0
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const FadeInOnFrame: React.FC<FadeInOnFrameProps> = ({
  triggerFrame,
  duration = 20,
  fromY = 50,
  toY = 0,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - triggerFrame);

  const opacity = interpolate(localFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(localFrame, [0, duration], [fromY, toY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.3s, transform 0.3s",
        ...style,
      }}
    >
      {children}
    </div>
  );
};