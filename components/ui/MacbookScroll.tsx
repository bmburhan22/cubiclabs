"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const MacbookScroll = ({
  src = "/images/website.png",
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const scaleX = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 1.5]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[300vh] flex flex-col items-center justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.35] sm:scale-50 relative py-20"
    >
      <motion.div
        style={{
          opacity: opacity,
        }}
        className="w-full max-w-5xl mx-auto text-center mb-[50vh] z-0"
      >
        {badge && <div className="mb-4">{badge}</div>}
        {title && (
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            {title}
          </h1>
        )}
      </motion.div>

      {/* MacBook - centers when scrolled into view, then animates */}
      <div className="sticky top-1/2 -translate-y-1/2 z-10 w-full flex items-center justify-center">
        <div className="relative">
          <Lid src={src} scaleX={scaleX} scaleY={scaleY} scale={scale} rotateX={rotateX} showGradient={showGradient} />
          <Base />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[150vh]" />
    </div>
  );
};

const Lid = ({
  scaleX,
  scaleY,
  scale,
  rotateX,
  src,
  showGradient,
}: {
  scaleX: any;
  scaleY: any;
  scale: any;
  rotateX: any;
  src?: string;
  showGradient?: boolean;
}) => {
  return (
    <div className="relative [perspective:800px] z-10">
      {/* Closed lid background */}
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
        >
          <span className="text-white">
            <AceternityLogo />
          </span>
        </div>
      </div>
      
      {/* Screen that opens */}
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          scale: scale,
          rotateX: rotateX,
          transformStyle: "preserve-3d",
          transformOrigin: "top center",
        }}
        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2 z-20"
      >
        <div className="absolute inset-0 bg-[#272729] rounded-lg" />
        <img
          src={src}
          alt="macbook screen"
          className="object-cover object-left-top absolute rounded-md inset-0 h-full w-full z-10"
        />
        {showGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-20" />
        )}
      </motion.div>
    </div>
  );
};

const Base = () => {
  return (
    <div className="h-[22rem] w-[32rem] relative -z-10">
      <div className="relative h-full w-full">
        {/* Top Section */}
        <div className="h-2 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-2 bg-gradient-to-t from-transparent via-neutral-900 to-transparent" />
        </div>
        {/* Keyboard Base */}
        <div className="flex flex-col items-center justify-start w-full bg-[#272729] rounded-md h-full p-4 pt-6">
          {/* Keyboard Keys - Top Row (Function Keys) */}
          <div className="flex gap-1 mb-2">
            {[...Array(13)].map((_, i) => (
              <div
                key={`f-${i}`}
                className="w-6 h-4 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner"
              />
            ))}
          </div>

          {/* Keyboard Keys - Number Row */}
          <div className="flex gap-1 mb-1.5">
            {[...Array(13)].map((_, i) => (
              <div
                key={`n-${i}`}
                className="w-7 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner"
              />
            ))}
          </div>

          {/* Keyboard Keys - QWERTY Row */}
          <div className="flex gap-1 mb-1.5">
            <div className="w-10 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            {[...Array(11)].map((_, i) => (
              <div
                key={`q-${i}`}
                className="w-7 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner"
              />
            ))}
            <div className="w-10 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
          </div>

          {/* Keyboard Keys - ASDF Row */}
          <div className="flex gap-1 mb-1.5">
            <div className="w-12 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            {[...Array(10)].map((_, i) => (
              <div
                key={`a-${i}`}
                className="w-7 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner"
              />
            ))}
            <div className="w-12 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
          </div>

          {/* Keyboard Keys - ZXCV Row */}
          <div className="flex gap-1 mb-1.5">
            <div className="w-14 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            {[...Array(9)].map((_, i) => (
              <div
                key={`z-${i}`}
                className="w-7 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner"
              />
            ))}
            <div className="w-14 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
          </div>

          {/* Keyboard Keys - Space Bar Row */}
          <div className="flex gap-1">
            <div className="w-8 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            <div className="w-8 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            <div className="w-8 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            <div className="flex-1 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            <div className="w-8 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            <div className="w-8 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
            <div className="w-8 h-6 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded shadow-inner" />
          </div>
        </div>
        {/* Trackpad */}
        <div className="absolute inset-x-0 mx-auto w-[15%] h-12 bottom-8 bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-800 rounded-xl border border-neutral-700" />
      </div>
    </div>
  );
};

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
