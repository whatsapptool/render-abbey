import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring,
  delayRender,
  continueRender,
  Audio,
  staticFile,
} from "remotion";
import React, { useMemo, useEffect, useState } from "react";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";
import { TopPlayer, validateTopPlayers } from "./types/schema";
import { DoubleCard } from "./components/DoubleCardv1";
import { CONFIG } from "./config";

// import rawTopPlayers from "../public/data/alter_ego.json";
// import rawTopPlayers from "../public/data/bigetron_esports.json";
// import rawTopPlayers from "../public/data/dewa_united_esports.json";
// import rawTopPlayers from "../public/data/geek_fam_id.json";
// import rawTopPlayers from "../public/data/onic.json";
// import rawTopPlayers from "../public/data/evos.json";
// import rawTopPlayers from "../public/data/rrq_hoshi.json";

// import rawTopPlayers from "../public/data/mlbb_exp_laner.json";
// import rawTopPlayers from "../public/data/mlbb_gold_laner.json";
// import rawTopPlayers from "../public/data/mlbb_mid_laner.json";
// import rawTopPlayers from "../public/data/mlbb_jungle.json";
import rawTopPlayers from "../public/data/mlbb_roam.json";

import Intro from "./components/Intro";
import Ending from "./components/Ending";


const { fontFamily: rubikFont } = loadRubik();

/**
 * Fungsi untuk menghitung posisi statis kartu berdasarkan indeks dan lebar layar
 * @param index - Indeks kartu dalam array
 * @param screenWidth - Lebar layar video
 * @returns Posisi horizontal kartu dalam piksel
 */
const getStaticCardPosition = (index: number, screenWidth: number) => {
  const startPosition = screenWidth / 2 - 1300;
  return startPosition + index * 650;
};

// HAPUS: IntroTitle dan EndingSequence

type PlayerListProps = {
  cardsToShow: number;
  durasiPerCardDetik: number;
  introDelay: number;
  endingDuration: number;
};

/**
 * Komponen utama PlayerList yang menangani animasi daftar pemain
 * @param cardsToShow - Jumlah kartu yang akan ditampilkan
 * @param durasiPerCardDetik - Durasi tampilan per kartu dalam detik
 * @param introDelay - Delay sebelum intro dimulai
 * @param endingDuration - Durasi ending sequence
 */
export const PlayerList: React.FC<PlayerListProps> = ({ 
  cardsToShow = 10, 
  durasiPerCardDetik = 6, 
  introDelay = 120, 
  endingDuration = 300 
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, } = useVideoConfig();
  // Delay render dengan timeout 60 detik untuk memastikan data ter-load
  const [handle] = useState(() => delayRender("timeout-60000"));
  const [validatedData, setValidatedData] = useState<TopPlayer[]>([]);

  /**
   * Effect untuk memproses dan memvalidasi data pemain
   * Mengurutkan berdasarkan tanggal bergabung (terlama di atas)
   */
  useEffect(() => {
    const processData = async () => {
      try {
        const data = validateTopPlayers(rawTopPlayers)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .reverse(); // Reverse untuk mendapatkan yang terlama di atas
        setValidatedData(data);
        continueRender(handle);
      } catch (error) {
        console.error("Data validation error:", error);
        continueRender(handle);
      }
    };
    processData();
  }, [handle]);

  // Perhitungan durasi dan timing untuk animasi
  const durationPerCard = durasiPerCardDetik * fps; // Durasi per kartu dalam frame
  const totalDuration = cardsToShow * durationPerCard;
  const initialDelay = CONFIG.initialDelay;
  const cardEntryDuration = CONFIG.cardEntryDuration;
  const staggerDelay = CONFIG.staggerDelay;
  const mainCardsAnimationDuration = initialDelay + 4 * cardEntryDuration;
  const scrollDuration = totalDuration - mainCardsAnimationDuration;
  const opacityTransitionDuration = CONFIG.opacityTransitionDuration;

  // Hitung frame mulai ending sequence
  // Ending mulai setelah Player List selesai
  const endingStartFrame = introDelay + totalDuration;

  // Memoize data untuk performa, hanya ambil jumlah kartu yang diperlukan
  const memoizedData = useMemo(() => validatedData.slice(0, cardsToShow), [validatedData, cardsToShow]);

  /**
   * Perhitungan posisi scroll horizontal untuk efek sliding kartu
   * Menggunakan interpolate untuk animasi yang smooth
   */
  const scrollX = useMemo(
    () =>
      interpolate(frame - mainCardsAnimationDuration, [0, scrollDuration], [0, -650 * (cardsToShow - 1)], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      }),
    [frame, mainCardsAnimationDuration, scrollDuration, cardsToShow]
  );

  // Sesuaikan tinggi kartu berdasarkan resolusi video
  const cardHeight = height * 0.5; // Setengah dari tinggi video

  /**
   * Perhitungan rotasi watermark untuk efek berputar
   * Watermark akan berputar 360 derajat selama durasi video
   */
  const watermarkRotation = useMemo(() => {
    return interpolate(
      frame,
      [0, totalDuration],
      [0, 360],
      {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
      }
    );
  }, [frame, totalDuration]);

  return (
    <AbsoluteFill>
      {/* Sequence Intro - Menampilkan komponen Intro */}
      <Sequence from={0} durationInFrames={introDelay}>
        <div className="grass">
          <Intro person={memoizedData[0]} />
        </div>
      </Sequence>

      {/* Sequence Player List Animation - Animasi daftar pemain */}
      <Sequence from={introDelay} durationInFrames={totalDuration}>
        <div
          className="grass"
          style={{
            // height: '100%',
            // backgroundColor: "#434343",
            // backgroundImage: "linear-gradient(#434343, #282828)",
          }}
        >
          <div className="w-full flex items-center justify-center">
            {/* SVG Watermark - Logo berputar di background */}
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
                // Percepat putaran watermark: kalikan sudut rotasi dengan 2
                transform: `translateX(-50%) rotate(${watermarkRotation * 10}deg)`,
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
                  fill="gray"
                />
              </svg>
            </div>

            {/* Watermark Text - Teks watermark dengan efek getar */}
            <div
              style={{
                position: "absolute",
                width: "30%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                fontSize: "5rem",
                fontWeight: 900,
                color: "rgba(0, 0, 0, 0.7)",
                pointerEvents: "none",
                zIndex: 0,
                fontFamily: rubikFont,
                textShadow: "4px 4px 8px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap",
                userSelect: "none",
                left: 0,
                top: -20,
                paddingLeft: "1rem",
                // Efek getar (shake) menggunakan sin dan cos
                transform: `translate(
                  ${Math.sin(frame * 0.8) * 2 + (Math.random() - 0.5) * 1.5}px,
                  ${Math.cos(frame * 1.1) * 2 + (Math.random() - 0.5) * 1.5}px
                ) rotate(${Math.sin(frame * 0.3) * 1.5}deg)`,
                // Efek noise pada opacity untuk variasi
                opacity: 0.18 + Math.abs(Math.sin(frame * 0.7 + Math.random() * 10)) * 0.07,
              }}
            >
              yt@sinauvideo
            </div>

            {/* Watermark Overlay - Muncul setiap 30 detik selama 3 detik */}
            {(() => {
              const watermarkInterval = 30 * fps;
              const watermarkDuration = 3 * fps;
              const watermarkStart = introDelay + 16 * fps; // mulai di detik ke-16 setelah intro
              const watermarkFrame = frame - watermarkStart >= 0 ? (frame - watermarkStart) % watermarkInterval : -1;
              const showWatermark = (frame >= watermarkStart) && (watermarkFrame >= 0) && (watermarkFrame < watermarkDuration);
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
                        [-60, 0, 0, -60], // Animasi slide dari atas ke posisi normal, lalu keluar ke atas lagi
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                      )
                    }px)`,
                    zIndex: 10,
                    background: "rgba(0,0,0,0.85)",
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
                    transition: "opacity 0.2s, transform 0.2s"
                  }}
                >
                  yt@sinauvideo
                </div>
              );
            })()}

            {/* Container Kartu dengan Efek Scroll - Container utama untuk semua kartu */}
            <div
              className="flex gap-4"
              style={{
                transform: `translateX(${scrollX}px)`,
                position: "relative",
                zIndex: 1,
              }}
            >
              {memoizedData.map((person, index) => {
                // Tentukan apakah kartu termasuk dalam 4 kartu utama
                const isMainCard = index < 4;
                // Hitung delay animasi berdasarkan jenis kartu
                const delay = isMainCard
                  ? initialDelay + index * cardEntryDuration
                  : mainCardsAnimationDuration + (index - 4) * staggerDelay;

                // Posisi awal kartu
                const initialPosition = getStaticCardPosition(index, width);

                /**
                 * Efek slide up untuk kartu utama
                 * Kartu akan slide dari bawah ke posisi normal
                 */
                const slideUpOffset = isMainCard
                  ? interpolate(
                      frame - delay - introDelay,
                      [15, 30],
                      [200, 0],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }
                    )
                  : 0;

                /**
                 * Efek bounce menggunakan spring animation
                 * Memberikan efek pantulan saat kartu muncul
                 */
                const bounceEffect = spring({
                  frame: frame - delay - introDelay,
                  from: 1,
                  to: 0,
                  fps,
                  config: {
                    damping: 10,
                    stiffness: 90,
                    mass: 0.5,
                  },
                });

                return (
                  <div
                    key={person.date_of_birth}
                    className="absolute pt-10"
                    style={{
                      left: initialPosition,
                      // Animasi opacity untuk fade in
                      opacity: interpolate(
                        frame - delay - introDelay,
                        [0, opacityTransitionDuration],
                        [0, 1],
                        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                      ),
                      // Kombinasi slide up dan bounce effect
                      transform: `translateY(${
                        slideUpOffset + bounceEffect * 20
                      }px)`,
                    }}
                  >
                    <DoubleCard person={person} style={{ height: cardHeight }} index={index} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Audio Background - Musik dengan fade in/out */}
        <Audio
          volume={(f) =>
            interpolate(
              f,
              [0, 30, totalDuration - 10 * fps, totalDuration],
              [0.3, 0.5, 0.5, 0.1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          }
          src={staticFile("_audio/parzival_william_rosati.mp3")}
          // src={staticFile("_audio/pooka_kevin_macleod.mp3")}          
          startFrom={120}
        />
      </Sequence>

      {/* Sequence Ending - Muncul setelah Player List Animation selesai */}
      <Sequence from={endingStartFrame} durationInFrames={endingDuration}>
        <div className="grass">
          <Ending />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};