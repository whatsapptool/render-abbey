import React from "react";
import { rawData } from "../types/schema";
import { CircleFlag } from "react-circle-flags";
import {
  FaFutbol as Football,
  FaBirthdayCake as Birthday,
  FaCalendar as Calendar,
} from "react-icons/fa";


import { getLogoCode } from "../utils/getLogoClub";
import { getCountryCode } from "../utils/getCountryCode";
import { herosIcon } from "../utils/getHeros";
import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { useVideoConfig, staticFile } from "remotion";
import { FadeInOnFrame } from "./FadeInOnFrame";
import { TypingOnFrame } from "./TypingOnFrame";
import { getTriggerFrame } from "../utils/triggerFrame";
import { getImageSource } from "../utils/imageProxy";

// Load fonts
const { fontFamily: robotoFont } = loadRoboto();
const { fontFamily: robotoMonoFont } = loadRobotoMono();
const { fontFamily: interFont } = loadInter();
const { fontFamily: RubikFont } = loadRubik();
const { fontFamily: PoppinsFont } = loadPoppins();

interface CardingProps {
  person: rawData & { club_logo?: string };
  style?: React.CSSProperties;
  index?: number;
  triggerFrame: number; // <-- wajib
}

export const Carding: React.FC<CardingProps> = ({ person, style, index, triggerFrame }) => {
  const HeightConfig = useVideoConfig().height * 0.94;
  const nationName = person.nation || "";
  const Name = person.name || "";

  const fadeInDuration = 20;

  return (
    <div
      className="flex justify-center items-center p-0 card-container"
      style={{
        ...style,
        height: "100%",
        fontFamily: `${robotoFont}, Arial, sans-serif`,
        boxShadow: `0 24px 48px rgba(80,0,80,0.18)`,
      }}
    >
      <div
        className="w-[620px] rounded-lx shadow-2xl overflow-hidden"
        style={{
          height: HeightConfig,
          boxShadow: "0 0.5em 2em 0 rgba(31, 38, 135, 0.18)",
          backdropFilter: "blur(5em)",
          WebkitBackdropFilter: "blur(5em)",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        {/* Header */}
        <div
          className="relative h-140 rounded-t-xl overflow-hidden"
          style={{ borderBottom: '1em solid rgba(131, 110, 110, 0)' }}
        >
          {/* Image */}
          <div className="absolute top-0 left-0 h-150 flex items-center justify-center overflow-hidden" style={{ position: 'relative', padding: '1.5em' }}>
            <img
              src={getImageSource(person.image || "")}
              alt={person.name}
              className="w-full h-full object-contain bg-white rounded-lg"
              style={{
                background: 'rgba(59, 59, 59, 0)',
                zIndex: 1,
                padding: '0.5em',
                borderRadius: '1em',
                maxHeight: '500px',
                maxWidth: '99%',
                objectFit: 'contain',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = staticFile('default.svg');
              }}
            />
          </div>

          {/* Sequence Number */}
          {/* <div className="absolute top-4 left-4 bg-gray-800 text-white text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center">
            {index !== undefined ? index + 1 : ""}
          </div> */}
        </div>

        {/* Player info */}
        <div className="pt-8 px-6 pb-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex-grow">
             <FadeInOnFrame triggerFrame={(triggerFrame ?? 0) + 0} duration={fadeInDuration}>
                <div className="flex justify-center mt-4">
                  <span className="bg-gray-900 text-white px-6 py-3 font-bold rounded-full flex items-center gap-3 text-4xl" style={{ fontFamily: RubikFont }}>
                    {nationName}
                    {(() => {
                      const code = getCountryCode(person.nation_code ?? "");
                      if (code) {
                        return (
                          <CircleFlag
                            countryCode={code}
                            height="50"
                            width="50"
                          />
                        );
                      } else {
                        return "🌍";
                      }
                    })()}
                  </span>
                </div>
              </FadeInOnFrame>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <FadeInOnFrame triggerFrame={triggerFrame + 2} 
          duration={fadeInDuration}
        >
          <div className="bg-gray-900 border-t text-4xl border-b border-gray-700 gap-8 rounded-md p-5 px-5 mx-5">
            <div className="flex items-center justify-center">
              <p className="text-gray-200 font-bold text-center" style={{ 
                fontFamily: robotoMonoFont,
                minWidth: '300px',
                whiteSpace: 'nowrap',
              }}>
                <TypingOnFrame
                  text={Name}
                  triggerFrame={triggerFrame + 39}
                  duration={30}
                  style={{ fontFamily: robotoMonoFont }}
                />
              </p>
            </div>
          </div>
        </FadeInOnFrame>

        <div className="grid grid-cols-2 gap-8 p-5">
          
          {/* Date */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4} 
            duration={fadeInDuration}
            style={{ gridColumn: "1 / -1", width: "100%" }}
          >
            <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md w-full">
              <div>
                <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont }}>Date</p>
                <p className="text-4xl text-gray-50 font-bold">
                  {person.date
                    ? (() => {
                        // If date is in YYYY-MM-DD, convert to M/D/YYYY
                        if (/^\d{4}-\d{2}-\d{2}$/.test(person.date)) {
                          const [year, month, day] = person.date.split("-");
                          return `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
                        }
                        // If date is in M/D/YYYY or M/D/YY, return as is
                        return person.date;
                      })()
                    : "N/A"}
                </p>
              </div>
            </div>
          </FadeInOnFrame>

          {/* Tier */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4} 
            duration={fadeInDuration}
            style={{ gridColumn: "1 / -1", width: "100%" }}
          >
            <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md w-full">
              <div>
                <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont }}>Tier</p>
                <p className="text-4xl text-gray-50 font-bold">{person.tier || "N/A"}</p>
              </div>
            </div>
          </FadeInOnFrame>

          {/* Serie */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4} 
            duration={fadeInDuration}
            style={{ gridColumn: "1 / -1", width: "100%" }}
          >
            <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md w-full">
              <div className="flex-grow">
                <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont}}>
                  Serie
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <p className="text-4xl text-gray-50 font-bold">{person.league || "N/A"}</p>
                </div>
              </div>
            </div>
          </FadeInOnFrame>
          
          {/* Heroes */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4} 
            duration={fadeInDuration}
            style={{ gridColumn: "1 / -1", width: "100%" }}
          >
            {person.logo_league && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <img
                  src={`https://ce880219c.cloudimg.io/v7/${person.logo_league?.replace(/^https?:\/\//, "")}`}
                  alt="League"
                  style={{ width: "10em", height: "10em", objectFit: "contain" }}
                />
              </div>
            )}
          </FadeInOnFrame>
        </div>
      </div>
    </div>
  );
};

export default Carding;

