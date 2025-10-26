"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const MacbookScroll = ({
  src,
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // Scale animations - delayed to start after MacBook is centered
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    [1.2, 1.2, isMobile ? 1 : 1.5, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    [0.6, 0.6, isMobile ? 1 : 1.5, isMobile ? 1 : 1.5]
  );

  // Rotation - starts after centering
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 0.5],
    [-28, -28, -10, 0]
  );

  // Text animations
  const textTransform = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[300vh] flex flex-col items-center justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.35] sm:scale-50 relative"
    >
      <motion.div
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="div max-w-5xl mb-20 text-center pt-40"
      >
        {badge && <div className="mb-4">{badge}</div>}
        {title && (
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            {title}
          </h1>
        )}
      </motion.div>

      {/* Sticky Container */}
      <div className="sticky top-1/2 -translate-y-1/2 z-10">
        <Lid
          src={src}
          scaleX={scaleX}
          scaleY={scaleY}
          rotate={rotate}
        />
        <Base />
      </div>

      {/* Spacer for scroll */}
      <div className="h-[100vh]" />
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  src,
}: {
  scaleX: any;
  scaleY: any;
  rotate: any;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px] z-10">
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
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
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
      </motion.div>
    </div>
  );
};

export const Base = () => {
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

export const AceternityLogo = () => {
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
