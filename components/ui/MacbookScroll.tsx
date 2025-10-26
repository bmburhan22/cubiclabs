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
  
  const scaleX = useTransform(scrollYProgress, [0, 0.25], [1.2, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 0.25], [0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, isMobile ? 1 : 1.5]);
  const rotateX = useTransform(scrollYProgress, [0, 0.25], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[120vh] flex flex-col items-center justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.35] sm:scale-50 relative py-20"
    >
      <motion.div
        style={{
          opacity: opacity,
        }}
        className="w-full max-w-5xl mx-auto text-center mb-[30vh] z-0"
      >
        {badge && <div className="mb-4">{badge}</div>}
        {title && (
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            {title}
          </h1>
        )}
      </motion.div>

      {/* Image Animation - centers when scrolled into view, then animates */}
      <div className="sticky top-1/2 -translate-y-1/2 z-10 w-full flex items-center justify-center">
        <div className="relative">
          <Lid src={src} scaleX={scaleX} scaleY={scaleY} scale={scale} rotateX={rotateX} showGradient={showGradient} />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[30vh]" />
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
      {/* Image that animates */}
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          scale: scale,
          rotateX: rotateX,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        className="relative"
      >
        <img
          src={src}
          alt="website preview"
          className="object-contain rounded-lg shadow-2xl"
          style={{ width: '800px', height: 'auto' }}
        />
        {showGradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-20" />
        )}
      </motion.div>
    </div>
  );
};

