import React from "react";
import { rawData } from "../types/schema";
import { CircleFlag } from "react-circle-flags";
import {
  FaFutbol as Football,
  FaBirthdayCake as Birthday,
  FaCalendar as Calendar,
} from "react-icons/fa";

import { BsPSquareFill as Position
} from "react-icons/bs";
import { MdStadium as Stadium
 } from "react-icons/md";

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
  const displayedName = person.name || "";
  const fullName = person.full_name || "";

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
        className="w-[620px] rounded-lx shadow-2xl glass overflow-hidden"
        style={{
          height: HeightConfig,
          boxShadow: "0 0.5em 2em 0 rgba(31, 38, 135, 0.18)",
          backdropFilter: "blur(5em)",
          WebkitBackdropFilter: "blur(5em)",
        }}
      >
        {/* Header */}
        <div
          className="relative h-140 rounded-t-xl overflow-hidden"
          style={{ borderBottom: '1em solid rgba(36, 60, 90, 0.33)' }}
        >
          {/* Image */}
          <div className="absolute top-0 left-0 h-150 flex items-center justify-center overflow-hidden bg-transparent" style={{ position: 'relative' }}>
            <img
              src={getImageSource(person.image || "")}
              alt={person.name}
              className="w-full h-full object-cover bg-transparent"
              style={{
                background: 'transparent',
                zIndex: 1,
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = staticFile('default.svg');
              }}
            />
          </div>

          {/* Sequence Number */}
          <div className="absolute top-4 left-4 bg-gray-800 text-white text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center">
            {index !== undefined ? index + 1 : ""}
          </div>
        </div>

        {/* Player info */}
        <div className="pt-8 px-6 pb-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex-grow">
             <FadeInOnFrame triggerFrame={(triggerFrame ?? 0) + 0} duration={fadeInDuration}>
                <div className="flex justify-center mt-4">
                  <span className="bg-gray-900 text-white px-6 py-3 font-bold rounded-full flex items-center gap-3 text-4xl" style={{ fontFamily: RubikFont }}>
                    {displayedName}
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
                  text={fullName}
                  triggerFrame={triggerFrame + 39}
                  duration={30}
                  style={{ fontFamily: robotoMonoFont }}
                />
              </p>
            </div>
          </div>
        </FadeInOnFrame>

        <div className="grid grid-cols-2 gap-8 p-5">
          {/* year */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4}  duration={fadeInDuration}>
            <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
              <Calendar className="h-9 w-9 text-gray-200" />
              <div>
                <p className="text-1xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: PoppinsFont}}>Join</p>
                <p className="text-[26px] font-extrabold text-gray-200" style={{ fontFamily: interFont}}>{person.date || "N/A"}</p>
              </div>
            </div>
          </FadeInOnFrame>

          {/* Birth Date */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4} duration={fadeInDuration}>
            <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
              <Birthday className="h-9 w-9 text-gray-200" />
              <div>
                <p className="text-1xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: PoppinsFont}}>Birthday</p>
                <p className="text-[26px] font-extrabold text-gray-200" style={{ fontFamily: interFont}}>{person.date_of_birth || "N/A"}</p>
              </div>
            </div>
          </FadeInOnFrame>

          {/* Team */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4} 
            duration={fadeInDuration}
            style={{ gridColumn: "1 / -1", width: "100%" }}
          >
            <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md w-full">
              <div>
                <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont }}>Team</p>
                <p className="text-3xl text-gray-50 font-bold">{person.team || "N/A"}</p>
              </div>
            </div>
          </FadeInOnFrame>

          {/* Roles */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4} 
            duration={fadeInDuration}
            style={{ gridColumn: "1 / -1", width: "100%" }}
          >
            <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md w-full">
              <div className="flex-grow">
                <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont}}>
                  Roles
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {person.roles?.map((role: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-gray-200 text-gray-900 px-4 py-2 rounded-full text-2xl font-bold"
                      style={{ fontFamily: RubikFont }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeInOnFrame>
          
          {/* Heroes */}
          <FadeInOnFrame triggerFrame={triggerFrame + 4} 
            duration={fadeInDuration}
            style={{ gridColumn: "1 / -1", width: "100%" }}
          >
            <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md w-full">
              <div className="flex-grow">
                <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont}}>
                  Signature Heroes
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {person.heros?.map((hero: string, index: number) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-10 border-[#243c5a]">
                        <img
                          src={getImageSource(herosIcon(hero))}
                          alt={hero}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInOnFrame>
        </div>
      </div>
    </div>
  );
};

export default Carding;

