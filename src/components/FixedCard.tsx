import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  type PanInfo,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";

interface FixedCardProps {
  subCards: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  type?: "string";
}

export const FixedCard: React.FC<FixedCardProps> = ({
  subCards,
  autoPlay = false,
  interval = 5000,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = subCards.length;

  const cardRef = useRef<HTMLDivElement | null>(null);

  // ✅ FIXED: No more NodeJS.Timeout
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Motion values
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const rotateY = useTransform(dragX, [-200, 200], [8, -8]);
  const rotateX = useTransform(dragY, [-200, 200], [-6, 6]);
  const scale = useTransform(
    useTransform(dragY, [-200, 200], [1, 1.02]),
    (val) => Math.min(val, 1.02)
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    autoPlayRef.current = setInterval(handleNext, interval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [autoPlay, interval, handleNext, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " ") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const posX = (e.clientX - rect.left - rect.width / 2) * 0.5;
    const posY = (e.clientY - rect.top - rect.height / 2) * 0.5;

    dragX.set(posX);
    dragY.set(posY);
  };

  const handleMouseLeave = () => {
    dragX.set(0);
    dragY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60;
    const velocityThreshold = 300;

    if (Math.abs(info.velocity.x) > velocityThreshold) {
      if (info.velocity.x > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    } else if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  // ✅ Properly typed variants
  const cardVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 400 : -400,
      scale: 0.85,
      rotateY: dir > 0 ? -15 : 15,
      filter: "blur(8px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -400 : 400,
      scale: 0.85,
      rotateY: dir > 0 ? 15 : -15,
      filter: "blur(8px)",
    }),
  };

  // ✅ FIXED: ease typing
  const backgroundVariants: Variants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: {
      backgroundPosition: "100% 50%",
      transition: {
        duration: 10,
        ease: "linear" as const,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div className="relative w-full max-w-10xl mx-auto p-4 sm:p-6">
      <motion.div
        className="relative h-[500px] sm:h-[600px] rounded-3xl  perspective-1000"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        style={{
          background:
            "linear-gradient(-45deg, #0d1512, #1a2a22, #0d1512, #1a3a2a)",
          backgroundSize: "400% 400%",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-px rounded-3xl bg-[#0d1512] ">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              ref={cardRef}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onMouseMove={handleMouseMove}
              style={{ rotateX, rotateY, scale }}
              className="absolute w-full h-full p-6 sm:p-8 overflow-y-auto rounded-3xl cursor-grab active:cursor-grabbing will-change-transform"
            >
              {subCards[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
