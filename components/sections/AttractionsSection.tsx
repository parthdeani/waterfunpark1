"use client";

import { useRef, useEffect } from "react";
import { Waves, Zap, Wind, Sun, Droplets, Anchor, Rocket, Compass, Sparkles, Umbrella } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

gsap.registerPlugin(ScrollTrigger);

const attractions = [
  { name: "Tsunami Tower", desc: "60-foot free-fall drop into a massive wave pool.", icon: Waves, thrill: 95, tag: "EXTREME", image: "/rides/tsunami_tower.png" },
  { name: "Cyclone Spinner", desc: "Spin through a massive funnel at incredible speeds.", icon: Zap, thrill: 90, tag: "EXTREME", image: "/rides/cyclone_spinner.png" },
  { name: "Lazy River Rapids", desc: "Float along an 800-meter winding tropical river.", icon: Wind, thrill: 35, tag: "FAMILY", image: "/rides/lazy_river.png" },
  { name: "Splash Kingdom", desc: "Colorful playground with tipping buckets and fountains.", icon: Sun, thrill: 20, tag: "KIDS", image: "/rides/splash_kingdom.png" },
  { name: "Aqua Loop", desc: "Near-vertical loop with a trap-door launch.", icon: Droplets, thrill: 98, tag: "EXTREME", image: "/rides/aqua_loop.png" },
  { name: "Wave Pool Arena", desc: "Ocean-like waves in a 5000 sq ft graduated pool.", icon: Anchor, thrill: 50, tag: "FAMILY", image: "/rides/wave_pool.png" },
  { name: "Speed Racer", desc: "Race against friends on 4 parallel speed lanes.", icon: Rocket, thrill: 85, tag: "EXTREME", image: "/rides/speed_racer.png" },
  { name: "Sunset Lagoon", desc: "Heated infinity pool with underwater music.", icon: Umbrella, thrill: 15, tag: "RELAX", image: "/rides/sunset_lagoon.png" },
  { name: "Vortex Tunnel", desc: "200m enclosed dark tunnel with LED light effects.", icon: Compass, thrill: 80, tag: "ADVENTURE", image: "/rides/vortex_tunnel.png" },
  { name: "Monsoon Mountain", desc: "Multi-level fortress with slides and water cannons.", icon: Sparkles, thrill: 60, tag: "FAMILY", image: "/rides/monsoon_mountain.png" },
];

export default function AttractionsSection() {
  const stripRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const section = sectionRef.current;
    if (!strip || !section) return;

    const totalScrollWidth = strip.scrollWidth - window.innerWidth;

    const st = gsap.to(strip, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="attractions" className="relative bg-[#080811] overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-8 md:p-12 flex justify-between items-end pointer-events-none">
        <div>
          <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.3em] text-water-light mb-2">Our Rides</p>
          <motion.h2 
            className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-paper tracking-tight leading-none flex flex-wrap gap-x-2 md:gap-x-3 max-w-md pointer-events-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={wordVariants} className="inline-block">Thrills</motion.span>
            <motion.span variants={wordVariants} className="inline-block">That</motion.span>
            <span className="w-full h-0" />
            <motion.span variants={wordVariants} className="font-[family-name:var(--font-serif)] italic font-normal text-sun inline-block">Make</motion.span>
            <motion.span variants={wordVariants} className="font-[family-name:var(--font-serif)] italic font-normal text-sun inline-block">Waves</motion.span>
          </motion.h2>
        </div>
        <span className="font-[family-name:var(--font-display)] text-4xl font-light text-paper/10">/ 10</span>
      </div>

      {/* Horizontal Strip */}
      {/* Increased padding-top to pt-48 md:pt-56 to fix overlapping of text and cards */}
      <div ref={stripRef} className="flex gap-6 px-8 pt-48 md:pt-56 pb-16 w-max animate-fade-in relative z-10">
        {attractions.map((a) => {
          const RideIcon = a.icon;
          return (
            <div
              key={a.name}
              className="w-[300px] md:w-[360px] flex-shrink-0 rounded-2xl overflow-hidden border border-paper/5 bg-gradient-to-b from-[#131326]/40 to-[#080811]/90 backdrop-blur-md group hover:border-water-light/40 hover:shadow-[0_15px_45px_rgba(74,159,212,0.15)] transition-all duration-500 hover:-translate-y-2 relative"
            >
              {/* Ride Image */}
              <div className="h-56 relative overflow-hidden bg-ink-light flex items-center justify-center">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay vignette gradient to ensure details stand out */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-[0.2em] text-sun font-[family-name:var(--font-sans)] bg-ink/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-paper/5">
                  {a.tag}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 bg-gradient-to-b from-transparent to-ink/20">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-paper tracking-tight group-hover:text-water-light transition-colors duration-300">
                    {a.name}
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-paper/5 flex items-center justify-center border border-paper/10 text-water-light group-hover:bg-water-light/15 group-hover:border-water-light/35 transition-colors duration-300">
                    <RideIcon size={12} />
                  </div>
                </div>
                
                <p className="font-[family-name:var(--font-serif)] text-xs text-paper/60 leading-relaxed mb-5 min-h-[36px]">{a.desc}</p>
                
                <div className="flex items-center gap-3 bg-paper/5 px-3 py-2.5 rounded-xl border border-paper/5 group-hover:border-paper/10 transition-colors duration-300">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-paper/40 font-[family-name:var(--font-sans)] font-semibold">Thrill</span>
                  <div className="flex-1 h-[3px] bg-paper/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-water to-sun rounded-full transition-all duration-500" style={{ width: `${a.thrill}%` }} />
                  </div>
                  <span className="text-[10px] text-paper/50 font-mono font-bold">{a.thrill}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
