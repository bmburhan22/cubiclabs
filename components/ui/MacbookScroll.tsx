'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface MacbookScrollProps {
  src?: string;
  showGradient?: boolean;
  title?: React.ReactNode;
  badge?: React.ReactNode;
}

export const MacbookScroll: React.FC<MacbookScrollProps> = ({
  src,
  showGradient = true,
  title,
  badge,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // Zoom animation - starts at 1 and scales up massively to create zoom-in effect
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, isMobile ? 3 : 6, isMobile ? 5 : 10]
  );

  // Subtle Y translation to bring the MacBook forward
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, -100]);

  // Rotate from angled to flat as we zoom in
  const rotate = useTransform(scrollYProgress, [0, 0.2, 0.4], [-25, -10, 0]);

  // Text animations
  const textTransform = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[300vh] flex flex-col items-center py-0 md:py-40 justify-start flex-shrink-0 transform md:scale-100 scale-[0.35] sm:scale-50"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-20 text-center text-3xl font-bold text-white md:text-7xl"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        src={src}
        scale={scale}
        rotate={rotate}
        translateY={translateY}
      />
      {/* Base area */}
      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
        {/* above keyboard bar */}
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-[80%]">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
        {showGradient && (
          <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-black via-black to-transparent"></div>
        )}
        {badge && <div className="absolute bottom-10 left-10">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = ({
  scale,
  rotate,
  translateY,
  src,
}: {
  scale: any;
  rotate: any;
  translateY: any;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <motion.div
        style={{
          rotateX: rotate,
          translateY: translateY,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{
            boxShadow: '0px 2px 0px 2px var(--neutral-900) inset',
          }}
          className="absolute inset-0 rounded-lg bg-[#010101] overflow-hidden"
        >
          {src ? (
            <motion.div
              style={{
                scale: scale,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div
                className="absolute inset-0 w-full h-full rounded-lg bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${src})`,
                }}
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/40 text-xs">No screenshot</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: '0px 0px 1px 1px #00000020 inset',
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
      {/* First Row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>

        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-gray-500 from-20% via-black via-50% to-gray-500 to-95%"></div>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-20% from-gray-200 via-50% via-gray-500 to-95% to-gray-300"></div>
        </KBtn>
      </Row>

      {/* Second row */}
      <Row>
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>

        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">_</span>
          <span className="block">-</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block">=</span>
        </KBtn>
        <KBtn className="w-10 items-end justify-end pb-[2px] pr-[4px]">
          delete
        </KBtn>
      </Row>

      {/* Third row */}
      <Row>
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]">
          tab
        </KBtn>
        <KBtn>
          <span>Q</span>
        </KBtn>

        <KBtn>
          <span>W</span>
        </KBtn>
        <KBtn>
          <span>E</span>
        </KBtn>
        <KBtn>
          <span>R</span>
        </KBtn>
        <KBtn>
          <span>T</span>
        </KBtn>
        <KBtn>
          <span>Y</span>
        </KBtn>
        <KBtn>
          <span>U</span>
        </KBtn>
        <KBtn>
          <span>I</span>
        </KBtn>
        <KBtn>
          <span>O</span>
        </KBtn>
        <KBtn>
          <span>P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]">
          caps lock
        </KBtn>
        <KBtn>
          <span>A</span>
        </KBtn>

        <KBtn>
          <span>S</span>
        </KBtn>
        <KBtn>
          <span>D</span>
        </KBtn>
        <KBtn>
          <span>F</span>
        </KBtn>
        <KBtn>
          <span>G</span>
        </KBtn>
        <KBtn>
          <span>H</span>
        </KBtn>
        <KBtn>
          <span>J</span>
        </KBtn>
        <KBtn>
          <span>K</span>
        </KBtn>
        <KBtn>
          <span>L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pb-[2px] pr-[4px]">
          return
        </KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]">
          shift
        </KBtn>
        <KBtn>
          <span>Z</span>
        </KBtn>
        <KBtn>
          <span>X</span>
        </KBtn>
        <KBtn>
          <span>C</span>
        </KBtn>
        <KBtn>
          <span>V</span>
        </KBtn>
        <KBtn>
          <span>B</span>
        </KBtn>
        <KBtn>
          <span>N</span>
        </KBtn>
        <KBtn>
          <span>M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>{' '}
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pb-[2px] pr-[4px]">
          shift
        </KBtn>
      </Row>

      {/* sixth Row */}
      <Row>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUp className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeft className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDown className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRight className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </Row>
    </div>
  );
};
export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={`rounded-[4px] p-[0.5px] ${
        backlit && 'bg-white/[0.2] shadow-xl shadow-white'
      } ${className}`}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A0A0B] ${childrenClassName}`}
        style={{
          boxShadow:
            '0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset',
        }}
      >
        <div className="flex w-full flex-col items-center justify-center text-[5px] text-neutral-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-[2px] flex w-full flex-shrink-0 gap-[2px]">
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          'radial-gradient(circle, #08080A 0.5px, transparent 0.5px)',
        backgroundSize: '3px 3px',
      }}
    ></div>
  );
};

export const OptionKey = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};

export const IconWorld = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
};

export const IconCommand = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 9v6m0 0a3 3 0 100 6 3 3 0 000-6zm0 0h8m0 0a3 3 0 100 6 3 3 0 000-6zm0 0V9m0 0a3 3 0 100-6 3 3 0 000 6z"
      />
    </svg>
  );
};

export const IconCaretUp = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
};

export const IconCaretDown = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
};

export const IconCaretLeft = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
};

export const IconCaretRight = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
};

export const IconChevronUp = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
};
