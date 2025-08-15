import React, { useEffect, useState } from "react";
import { useCurrentFrame, interpolate, delayRender, continueRender, staticFile, Img } from "remotion";

interface AnimatedProfileImageProps {
  src: string;
  alt: string;
  triggerFrame: number;
  duration?: number;
  size?: number;
  className?: string;
}

export const AnimatedProfileImage: React.FC<AnimatedProfileImageProps> = ({
  src,
  alt,
  triggerFrame,
  duration = 90,
  size = 200,
  className = "",
}) => {
  console.log("AnimatedProfileImage src:", src);
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - triggerFrame);

  // Hanya delay render jika berada di frame pertama dari gambar
  const shouldDelay = frame === triggerFrame;
  const [handle] = useState(() => shouldDelay ? delayRender() : null);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    if ((hasLoaded || hasErrored) && handle) {
      continueRender(handle);
    }
  }, [hasLoaded, hasErrored, handle]);

  const gradientPosition = interpolate(localFrame, [0, duration], [-100, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });


  const opacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(localFrame, [0, 30], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Image container */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          zIndex: 1,
        }}
      >
        {/* Image */}
        <Img
          src={`https://ce880219c.cloudimg.io/v7/${src}`}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
          style={{
            zIndex: 1,
            border: "1em solid #dc2626",
          }}
          onLoad={() => {
            setHasLoaded(true);
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = staticFile("default.svg");
            setHasErrored(true);
          }}
        />

        {/* Animasi sapuan gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(255,255,255,0.3) ${gradientPosition}%, 
              rgba(255,255,255,0.5) ${gradientPosition + 5}%, 
              transparent 100%)`,
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};
