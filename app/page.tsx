"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger so that syncing works
gsap.registerPlugin(ScrollTrigger);

// Dynamic imports — SSR disabled for browser-only APIs (GSAP, R3F, Canvas)
const HeroExperience = dynamic(() => import("@/components/hero/HeroExperience"), { ssr: false });
const WaterCursor = dynamic(() => import("@/components/cursor/WaterCursor"), { ssr: false });
const AttractionsSection = dynamic(() => import("@/components/sections/AttractionsSection"), { ssr: false });
const TicketsSection = dynamic(() => import("@/components/sections/TicketsSection"), { ssr: false });
const FacilitiesSection = dynamic(() => import("@/components/sections/FacilitiesSection"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Initially stop/freeze the scrollbar during preloading
    lenis.stop();

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Integrate Lenis raf loop with GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable lag smoothing for instant ScrollTrigger calculations
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  // When loading finishes, start Lenis scroll and refresh ScrollTrigger calculations
  useEffect(() => {
    if (isLoaded && lenisRef.current) {
      lenisRef.current.start();
      
      // Let GSAP recalculate all heights and offsets once content fades in
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoaded]);

  return (
    <main className="relative">
      {/* Custom Water Cursor */}
      <WaterCursor />

      {/* ── HERO: Cinematic Scroll-Driven Video Experience ── */}
      <HeroExperience onLoaded={() => setIsLoaded(true)} />

      {/* ── CONTENT SECTIONS ── */}
      {/* normal rendering so ScrollTrigger can calculate positions on startup */}
      <div id="experience">
        <AttractionsSection />
      </div>
      <TicketsSection />
      <FacilitiesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
