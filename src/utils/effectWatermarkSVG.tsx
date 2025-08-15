import React from "react";
import { useCurrentFrame } from "remotion";

export const EffectWatermarkSVG: React.FC = () => {
  const frame = useCurrentFrame();
  // 360 derajat per 8 detik (misal 60fps, 480 frame)
  const rotate = (frame / 480) * 360;

  return (
    <div
      style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
        zIndex: 0,
        top: -90,
        left: "50%",
        transform: `translateX(-50%) rotate(${rotate}deg)`,
        transition: "transform 0.1s linear",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 480 480"
        width="100%"
        height="100%"
      >
        <path
          d="m240 240 160-80v-.7A79.8 79.8 0 0 0 320.7 80h-.7l-80 160ZM240 240 160 80h-.7A79.8 79.8 0 0 0 80 159.3v.7l160 80ZM240 240l80 160h.7a79.8 79.8 0 0 0 79.3-79.3v-.7l-160-80ZM240 240 80 320v.7a79.8 79.8 0 0 0 79.3 79.3h.7l80-160ZM240 240l169.7 56.6.5-.5a79.8 79.8 0 0 0 0-112.2l-.5-.5L240 240ZM240 240l56.6-169.7-.5-.5a79.8 79.8 0 0 0-112.2 0l-.5.5L240 240ZM240 240l-56.6 169.7.5.5a79.8 79.8 0 0 0 112.2 0l.5-.5L240 240ZM240 240 70.3 183.4l-.5.5a79.8 79.8 0 0 0 0 112.2l.5.5L240 240Z"
          fill="red"
        />
      </svg>
    </div>
  );
};