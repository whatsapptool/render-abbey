import React from "react";
import { interpolate } from "remotion";

export const EffectWatermarkOverlay: React.FC<{
  frame: number;
  fps: number;
  introDelay: number;
  rubikFont: string;
}> = ({ frame, fps, introDelay, rubikFont }) => {
  const watermarkInterval = 28 * fps;
  const watermarkDuration = 3 * fps;
  const watermarkStart = introDelay + 16 * fps; // mulai di detik ke-16 setelah intro
  const watermarkFrame =
    frame - watermarkStart >= 0 ? (frame - watermarkStart) % watermarkInterval : -1;
  const showWatermark =
    frame >= watermarkStart &&
    watermarkFrame >= 0 &&
    watermarkFrame < watermarkDuration;

  if (!showWatermark) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: "50%",
        transform: `translate(-50%, ${
          interpolate(
            watermarkFrame,
            [0, 10, watermarkDuration - 10, watermarkDuration],
            [-60, 0, 0, -60],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }px)`,
        zIndex: 10,
        background: "rgba(0, 0, 0, 0.6)",
        color: "#fff",
        fontWeight: 900,
        fontSize: "3rem",
        padding: "0.7em 2em",
        borderRadius: "2em",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
        fontFamily: rubikFont,
        opacity: interpolate(
          watermarkFrame,
          [0, 10, watermarkDuration - 10, watermarkDuration],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        ),
        pointerEvents: "none",
        transition: "opacity 0.2s, transform 0.2s",
      }}
    >
      yt@sinauvideo
    </div>
  );
};