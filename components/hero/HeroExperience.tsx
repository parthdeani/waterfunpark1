"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";
import Navigation from "../nav/Navigation";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.8,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)", rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  },
};

const WaterParticles = dynamic(() => import("./WaterParticles"), { ssr: false });

export default function HeroExperience({ onLoaded }: { onLoaded?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [videoLoaded, setVideoLoaded] = useState(true);
  
  const rafPending = useRef(false);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseX(e.clientX / window.innerWidth);
    setMouseY(e.clientY / window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Page-wide scroll progress listener for top progress bar & scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!rafPending.current) {
        rafPending.current = true;
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setProgress(currentProgress);
          rafPending.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent automatic scroll restoration and force top scroll on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // Trigger loading completion immediately on mount to unlock page interaction
  useEffect(() => {
    if (onLoaded) {
      onLoaded();
    }
  }, [onLoaded]);

  // Handle video loading callback
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const ambientHue = 200 + progress * 30;
  const ambientOpacity = 0.05 + progress * 0.1;

  return (
    <>
      <Navigation progress={progress} />

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Hero Section — Standard 100vh height that scrolls up naturally */}
      <section className="relative h-screen w-screen overflow-hidden bg-ink">
        
        {/* ── Full-Screen Looping Video ── */}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dr3vva4uq/video/upload/f_auto,q_auto/v1782995012/hero-video"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoaded}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ width: "100%", height: "100%", opacity: 1 }}
        />

        {/* ── Light Blue Overlay Layer ── */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "rgba(2, 8, 18, 0.90)", // Deeper, darker deep midnight blue tint (90% opacity)
            zIndex: 5
          }}
        />

        {/* ── Ambient Lighting Overlay ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(ellipse at ${mouseX * 100}% ${mouseY * 100}%, hsla(${ambientHue}, 60%, 40%, ${ambientOpacity}), transparent 60%)`,
          }}
        />

        {/* ── Top & Bottom Vignette ── */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(10,10,18,0.45) 0%, 
              transparent 25%, 
              transparent 75%, 
              rgba(10,10,18,0.55) 100%
            )`,
          }}
        />

        {/* ── Water Particles (R3F) ── */}
        <WaterParticles progress={progress} mouseX={mouseX} mouseY={mouseY} />

        {/* ── Hero Title ── */}
        <motion.div
          className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none"
          animate={{
            opacity: progress < 0.15 ? 1 : 0,
            y: progress < 0.15 ? 0 : -35,
            scale: progress < 0.15 ? 1 : 0.96,
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center px-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <motion.p
              className="font-[family-name:var(--font-sans)] text-[10px] md:text-xs uppercase tracking-[0.4em] text-water-light font-bold mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Gujarat&apos;s Premier Water Park
            </motion.p>
             <motion.h1
              className="font-[family-name:var(--font-display)] text-5xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] font-black text-white leading-[0.9] tracking-tighter uppercase flex flex-wrap justify-center gap-x-4 md:gap-x-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="inline-block whitespace-nowrap">
                {"CHHAB".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">{char}</motion.span>
                ))}
              </span>
              <span className="inline-block whitespace-nowrap">
                {"CHHABA".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">{char}</motion.span>
                ))}
              </span>
              <span className="inline-block whitespace-nowrap text-water-light drop-shadow-[0_0_30px_rgba(74,159,212,0.35)]">
                {"CHHAB".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">{char}</motion.span>
                ))}
              </span>
              <span className="inline-block whitespace-nowrap text-water-light drop-shadow-[0_0_30px_rgba(74,159,212,0.35)]">
                {"WATERPARK".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">{char}</motion.span>
                ))}
              </span>
            </motion.h1>
            <motion.p
              className="font-[family-name:var(--font-serif)] text-sm md:text-lg text-paper/90 mt-6 max-w-md mx-auto italic font-medium"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              Experience the thrills. Scroll down to explore.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Scroll Indicator ── */}
        <ScrollIndicator progress={progress} />
      </section>
    </>
  );
}
