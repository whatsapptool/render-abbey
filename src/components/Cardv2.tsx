import React from "react";
import { rawData } from "../types/schema";
import { heros } from "../utils/getHeros";
import { useVideoConfig, staticFile, useCurrentFrame, interpolate } from "remotion";
import { getImageSource } from "../utils/imageProxy";

// Warna ungu utama
const PURPLE = "green";

const PlayerCardBlock: React.FC<{ person: rawData; height: number; frameOffset?: number; isDividerOnly?: boolean }> = ({ person, height, frameOffset = 0, isDividerOnly = false }) => {
  const frame = useCurrentFrame() - frameOffset;

  // Animasi untuk card masuk (slide + fade)
  const cardOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const cardTranslateY = interpolate(frame, [0, 20], [60, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const cardShadow = interpolate(frame, [0, 20], [0, 24], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Animasi untuk image
  const imgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const imgScale = interpolate(frame, [0, 20], [0.8, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  // Animasi untuk nama
  const nameOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const nameTranslate = interpolate(frame, [0, 15], [-30, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Efek typing hanya untuk nama
  const typingStart = 30;
  const typingSpeed = 30; // 1 karakter setiap 2 frame
  let displayedName = "";
  if (person.name) {
    if (frame >= typingStart) {
      const charsToShow = Math.min(person.name.length, Math.floor((frame - typingStart) / typingSpeed) + 1);
      displayedName = person.name.slice(0, charsToShow);
    } else {
      displayedName = "";
    }
  }

  return (
    <div
      className="flex flex-col"
      style={{
        width: 630,
        height,
        background: 'rgba(255, 255, 255, 0)',
        opacity: cardOpacity,
        transform: `translateY(${cardTranslateY}px)`,
        boxShadow: `0 ${cardShadow}px ${cardShadow * 2}px rgba(80,0,80,0.18)`,
        transition: 'opacity 0.3s, transform 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Header */}
      {!isDividerOnly && (
        <div
          style={{
            background: 'rgba(35, 35, 34, 0.75)', // glassmorphism base color
            color: '#fff',
            textAlign: 'center',
            padding: '16px 32px', // lebih lebar
            fontWeight: 700,
            fontSize: 40,
            opacity: nameOpacity,
            transform: `translateY(${nameTranslate}px)`,
            transition: 'opacity 0.3s, transform 0.3s',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)', // untuk Safari
            border: '1px solid rgba(255,255,255,0.15)',
            margin: '0px',
            boxShadow: '0 4px 24px rgba(35,35,34,0.12)',
            display: 'inline-block',
          }}
        >
          {displayedName}
        </div>
      )}
      {/* Divider jika isDividerOnly true */}
      {isDividerOnly && (
        <div style={{ width: '100%', height: 4, background: '#eee' }} />
      )}
      {/* Gambar */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <img
          src={person.image?.startsWith('http') ? person.image : staticFile(person.image || "")}
          alt={person.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgOpacity,
            transform: `scale(${imgScale})`,
            transition: 'opacity 0.3s, transform 0.3s',
            display: 'block',
          }}
          onError={e => { (e.target as HTMLImageElement).src = staticFile('default.svg'); }}
        />
      </div>
      {/* Footer */}
      {/* <div style={{ background: PURPLE, color: '#fff', textAlign: 'center', padding: '12px 0', fontWeight: 500, fontSize: 18 }}>
        {person.roles && person.roles.length > 0 ? person.roles[0] : "-"}
      </div>
      <div style={{ background: PURPLE, color: '#fff', textAlign: 'center', padding: '12px 0', fontWeight: 400, fontSize: 16, borderTop: '1px solid #fff' }}>
        {person.team || person.full_name || "-"}
      </div> */}
    </div>
  );
};

export const Carding: React.FC<{
  person: rawData;
  style?: React.CSSProperties;
  index?: number; // Tambahkan index
}> = ({ person, style, index = 0 }) => {
  const HeightConfig = useVideoConfig().height * 0.943 / 2;
  const { fps } = useVideoConfig();
  const getFrameOffset = (index: number, baseOffset: number) => {
    // Card pertama muncul di detik ke-5, berikutnya jeda 6 detik
    return -8 * fps + index * 6 * fps + baseOffset;
  };
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ ...style, height: "100%", background: "transparent" }}
    >
      <PlayerCardBlock
        person={{
          ...person,
          // Gambar 1: pakai heros (banner hero)
          image: heros(person.name || "") // atau person.heros?.[0] jika datanya array hero
        }}
        height={HeightConfig}
        frameOffset={getFrameOffset(index, 0)}
        isDividerOnly={false}
      />
      <PlayerCardBlock
        person={{
          ...person,
          // Gambar 2: pakai image dari JSON
          image: person.image
        }}
        height={HeightConfig}
        frameOffset={getFrameOffset(index, 30)}
        isDividerOnly={true} // hanya divider, tanpa nama
      />
    </div>
  );
};

export default Carding;
