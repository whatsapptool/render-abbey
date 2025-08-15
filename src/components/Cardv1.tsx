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
import { getImageSource } from "../utils/imageProxy";

// Load fonts
const { fontFamily: robotoFont } = loadRoboto();
const { fontFamily: robotoMonoFont } = loadRobotoMono();
const { fontFamily: interFont } = loadInter();
const { fontFamily: RubikFont } = loadRubik();
const { fontFamily: PoppinsFont } = loadPoppins();


export const PlayerCard: React.FC<{
  person: rawData & { club_logo?: string };
  style?: React.CSSProperties;
} > = ({ person, style }) => {
  console.log("Player data:", person);
  console.log("Heroes:", person.heros);
  const HeightConfig = useVideoConfig().height * 0.94;
  return (
    <div
      className="flex justify-center items-center p-0"
      style={{
        ...style,
        height: "100%",
        fontFamily: `${robotoFont}, Arial, sans-serif`,
      }}
    >
      {/* Card dengan desain modern dan profesional */}
      <div
        className="w-[600px] rounded-xl shadow-5xl backdrop-blur-md bg-white/50 bg-clip-padding border border-white/30 rounded-xl"
        style={{
          height: HeightConfig,
          background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          border: "1.5px solid rgba(255,255,255,0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="relative h-140 rounded-t-xl overflow-hidden backdrop-blur-sm bg-gradient-to-a from-white/100 to-transparent p-0">
          {/* Club Logo */}
          <div className="absolute top-6 right-6 w-100 h-100 opacity-80">
            <img
              src={getImageSource(getLogoCode(person.team))}
              alt="Club Logo"
              className="w-full h-full object-contain"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                opacity: 1,
                transition: 'opacity 0.3s ease-in-out'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = staticFile('default-club.png');
              }}
            />
          </div>

          {/* Player Image */}
          <div className="absolute top-2 left-5 w-150 h-150 flex items-center justify-center overflow-hidden" style={{ position: 'relative' }}>
            <img
              src={getImageSource(person.image)}
              alt={person.name}
              className="w-full h-full object-contain"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                opacity: 1,
                transition: 'opacity 0.3s ease-in-out',
                zIndex: 1
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = staticFile('default.svg');
              }}
            />
          </div>
        </div>

        {/* Player info dengan spacing yang lebih baik */}
        <div className="pt-8 px-6 pb-4">
          <div className="flex flex-col items-center text-center">
            {/* Player name dan info */}
            <div className="flex-grow">
                <div className="flex justify-center mt-4">
                <span className="bg-gray-900 text-white px-6 py-3 font-bold rounded-full flex items-center gap-3 text-4xl" style={{ willChange: "transform, opacity", fontFamily: RubikFont }}>
                  {person.name}
                  {getCountryCode(person.nation_code) ? (
                  <CircleFlag
                    countryCode={getCountryCode(person.nation_code)}
                    height="50"
                    width="50"
                  />
                   ) : (
                  "🌍"
                  )}
                </span>
                </div>
            </div>
          </div>
        </div>

       

        {/* Assists and goals counter dengan desain clean */}
        <div className="bg-gray-900 border-t text-4xl border-b border-gray-700 gap-8 rounded-md p-5 px-5 mx-5">
          <div className="flex items-center justify-center">
            <p className="text-gray-200 font-bold text-center" style={{ fontFamily: robotoMonoFont }}>
              {person.full_name}
            </p>
          </div>
        </div>

        {/* Player details dengan grid layout yang lebih elegan */}
        <div className="grid grid-cols-2 gap-8 p-5">

          
          {/* year */}
          <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
            <Calendar className="h-9 w-9 text-gray-200" />
            <div>
                <p className="text-1xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: PoppinsFont}}>Join</p>
                {person.date_of_join && (
                <p className="text-[26px] font-extrabold text-gray-200" style={{ fontFamily: interFont}}> {person.date_of_join}</p>
                )}
            </div>
          </div>

          {/* Birth Date */}
          <div className="flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
            <Birthday className="h-9 w-9 text-gray-200" />
            <div>
              <p className="text-1xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: PoppinsFont}}>Birthday</p>
              <p className="text-[26px] font-extrabold text-gray-200" style={{ fontFamily: interFont}}>{person.date_of_birth || "N/A"}</p>
            </div>
          </div>

          {/* Team - Full width */}
          <div className="col-span-2 flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
            <div>
              <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont}}>Team</p>
                <p className="text-3xl text-gray-50 font-bold">{person.team || "N/A"}</p>
            </div>
          </div>


          {/* Roles - Full width */}
          <div className="col-span-2 flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
           
            <div className="flex-grow">
              <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont}}>Roles</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {person.roles.map((role, index) => (
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
          
          <div className="col-span-2 flex items-center text-left gap-4 p-3 bg-gray-900 rounded-md">
            <div className="flex-grow">
              <p className="text-2xl text-gray-200 uppercase font-extrabold tracking-widest" style={{ fontFamily: RubikFont}}>Signature Heroes</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {person.heros.map((hero, index) => (
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

        </div>
        
      </div>
    </div>
  );
};
