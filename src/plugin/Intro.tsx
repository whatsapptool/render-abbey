import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { loadFont as loadRubik } from '@remotion/google-fonts/Rubik';
import { getLogoCode } from '../utils/getLogoClub';
import { staticFile } from 'remotion';
import type { rawData } from '../types/schema';
import { CONFIG } from '../config';

// Optional: bisa menerima props jika ingin dinamis
const { fontFamily: rubikFont } = loadRubik();

const getImageSource = (url: string | undefined) => {
  if (!url) return staticFile('default.svg'); // Add a default image
  // Check if the URL is remote (starts with http:// or https://)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it's a local file, use staticFile
  return staticFile(url);
};

const Intro: React.FC<{ person: rawData; colorText?: string }> = ({ person, colorText = '#fff' }) => {
  // Utility function to quickly apply consistent text styles (e.g., color)
  const getTextStyle = (extraStyles: React.CSSProperties = {}) => ({
    color: colorText,
    ...extraStyles,
  });

  const typingText = "Don't Forget Like & Share";
  const typingSpeed = 2; // Semakin kecil, semakin cepat (1 = 1 char per frame)
  const frame = useCurrentFrame(); // Sudah ada, gunakan ulang
  const typedLength = Math.min(Math.floor(frame / typingSpeed), typingText.length);
  const displayedTypingText = typingText.slice(0, typedLength);

  const logoSlideDown = useMemo(
    () => interpolate(frame, [0, 15], [0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    [frame]
  );
  const titleSlideUp = useMemo(
    () => interpolate(frame, [0, 25], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    [frame]
  );
  const subtitleSlideUp = useMemo(
    () => interpolate(frame, [15, 40], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    [frame]
  );
  const presenetBySlideUp = useMemo(
    () => interpolate(frame, [15, 40], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    [frame]
  );

  // Animasi untuk logo klub
  const logoScale = useMemo(
    () => interpolate(frame, [0, 20], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    [frame]
  );
  const logoOpacity = useMemo(
    () => interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    [frame]
  );
  // Animasi gradient: transisi hitam ke hijau dengan sapuan ombak
  const gradientStep = useMemo(
    () => interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    [frame]
  );
  // Fungsi untuk menghasilkan warna gradient dinamis dengan sapuan ombak
  const animatedGradient = useMemo(() => {
    // Dari hitam transparan ke hijau transparan
    const startColor = [0, 0, 0, 0.18]; // rgba(0,0,0,0.18)
    const endColor = [255, 255, 255, 0.38]; // rgba(255, 255, 255, 0.38)
    // Posisi sapuan (0% ke 100%)
    const sweep = Math.round(gradientStep * 100); // 0-100%
    // Stop kedua dan ketiga berdekatan untuk efek tajam
    const sweep2 = Math.min(sweep + 10, 100); // 10% setelah sweep
    // Warna tengah: hijau
    const midColor = endColor;
    return `linear-gradient(90deg, rgba(${startColor[0]},${startColor[1]},${startColor[2]},${startColor[3]}) 0%, rgba(${startColor[0]},${startColor[1]},${startColor[2]},${startColor[3]}) ${sweep}%, rgba(${midColor[0]},${midColor[1]},${midColor[2]},${midColor[3]}) ${sweep2}%, rgba(${endColor[0]},${endColor[1]},${endColor[2]},${endColor[3]}) 100%)`;
  }, [gradientStep]);

  // Add null check for person prop
  if (!person) {
    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: rubikFont,
          overflow: 'hidden',
        }}
      >
        <h1 style={{ fontSize: '7rem', fontWeight: 900 }}>Loading...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: rubikFont,
        overflow: 'hidden',
      }}
    >
      {/* Logo Klub */}
      <div
        className="flex justify-center items-center pb-30"
        style={{ transform: `translateY(${logoSlideDown}%)` }}
      >
        <div
          className="w-[500px] h-[500px] flex items-center justify-center overflow-hidden rounded-full shadow-2xl border-10 border-white"
          style={{
            background: animatedGradient,
            transition: 'background 0.5s',
          }}
        >
          <img
            src={getImageSource(getLogoCode(person.team ?? "") || "default.svg")}
            alt="Club Logo"
            className="w-4/5 h-4/5 object-contain rounded-full bg-white shadow-lg"
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              transition: 'transform 0.5s, opacity 0.5s',
              boxShadow: '0 8px 32px 0 rgba(34,197,94,0.25)',
            }}
          />
        </div>
      </div>
      {/* Judul */}
      <h1 style={getTextStyle({ fontSize: '7rem', fontWeight: 900, transform: `translateY(${titleSlideUp}%)` })}>
        {person.team}
      </h1>
      <h2 style={getTextStyle({ fontSize: '5rem', fontWeight: 700, transform: `translateY(${subtitleSlideUp}%)` })}>{CONFIG.cardTitle}</h2>
      <h2 style={getTextStyle({ fontSize: '4rem', fontWeight: 700, transform: `translateY(${subtitleSlideUp}%)`, maxWidth: '60%', textAlign: 'center', margin: '0 auto', lineHeight: '1.4' })}>
        {displayedTypingText}
      </h2>
      <h3 style={getTextStyle({ fontSize: '3rem', fontWeight: 600, transform: `translateY(${presenetBySlideUp}%)` })}>Present by: @SINAUVIDEO</h3>
    </div>
  );
};

export default Intro; 