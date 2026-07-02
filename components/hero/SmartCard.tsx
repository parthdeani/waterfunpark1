"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CardTimelineEntry } from "@/lib/cardTimeline";

interface SmartCardProps {
  card: CardTimelineEntry;
  progress: number;
  mouseX: number;
  mouseY: number;
}

const specsMap: Record<string, { label: string; icon: string }[]> = {
  welcome: [
    { label: "15 Acres of Premium Water Experiences", icon: "Compass" },
    { label: "World-class slide technology", icon: "Cpu" },
    { label: "Located in Ahmedabad, Gujarat", icon: "MapPin" }
  ],
  rides: [
    { label: "Parallel multi-lane racer layout", icon: "Sliders" },
    { label: "Precision telemetry timing systems", icon: "Activity" },
    { label: "G-force acceleration vectors", icon: "Sparkles" }
  ],
  purity: [
    { label: "Continuous UV filtration cycle", icon: "RotateCw" },
    { label: "Temperature controlled to 26°C", icon: "Thermometer" },
    { label: "Non-chlorine hypoallergenic purification", icon: "Shield" }
  ],
  safety: [
    { label: "Red Cross certified rescue divers", icon: "Users" },
    { label: "Zero-incident design philosophy", icon: "CheckCircle2" },
    { label: "Dedicated medical response facility", icon: "Heart" }
  ],
  visitors: [
    { label: "5-Star guest feedback score", icon: "Star" },
    { label: "Family-friendly layout", icon: "Smile" },
    { label: "Custom VIP cabana bookings", icon: "Key" }
  ]
};

// Premium ticket categories for full-screen CTA overlay (Reordered: Child, Adult, Senior)
const ticketCategories = [
  {
    name: "Child Pass",
    price: "₹499",
    subtext: "Height below 4.5 feet",
    icon: "Baby",
    features: ["Access to kids adventure zone", "Lazy river floaters", "Interactive splash pads"],
    popular: false
  },
  {
    name: "Adult Pass",
    price: "₹799",
    subtext: "Age 12 and above",
    icon: "User",
    features: ["Access to all high-thrill slides", "Locker access", "Precision timing wristband"],
    popular: true
  },
  {
    name: "Senior Pass",
    price: "₹399",
    subtext: "Age 60 and above",
    icon: "Heart",
    features: ["Premium lounge access", "Deceleration wave pools", "Priority fast-track entry"],
    popular: false
  }
];

export default function SmartCard({ card, progress, mouseX, mouseY }: SmartCardProps) {
  const isVisible = progress >= card.enterAt && progress <= card.exitAt;
  const isCTA = card.id === "cta";

  // Position based on timeline coords (% of viewport)
  const pos = card.position(progress);
  const isLeft = pos.x < 40;
  const isRight = pos.x > 60;
  
  // Custom alignment typography/flex classes
  let alignmentClasses = "items-center text-center";
  let xOffset = 0;
  let yOffset = 20;

  if (isLeft) {
    alignmentClasses = "items-start text-left";
    xOffset = -30;
    yOffset = 0;
  } else if (isRight) {
    alignmentClasses = "items-start text-left";
    xOffset = 30;
    yOffset = 0;
  }

  // Mouse parallax / 3D tilt coordinates
  const tiltX = (mouseY - 0.5) * -8; // Subtle tilt up/down
  const tiltY = (mouseX - 0.5) * 8;  // Subtle tilt left/right
  const parallaxX = (mouseX - 0.5) * 15;
  const parallaxY = (mouseY - 0.5) * 10;

  const IconComponent = (LucideIcons as any)[card.icon] || LucideIcons.Waves;
  const specs = specsMap[card.id] || [];

  // Staggered transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.02
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    }
  };

  // Fluid entrance variants using visionOS style (blur + scale + float y + rotateX)
  const itemVariants: any = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: 15, 
      rotateX: -8,
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.97, 
      y: -10, 
      rotateX: 6,
      filter: "blur(6px)",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={`absolute z-30 pointer-events-auto flex flex-col gap-4.5 ${
            isCTA 
              ? "w-[92vw] max-w-5xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-center" 
              : `w-[85%] max-w-[320px] md:w-[23vw] md:max-w-[360px] ${alignmentClasses}`
          }`}
          style={{
            left: isCTA ? "50%" : `${pos.x}%`,
            top: isCTA ? "50%" : `${pos.y}%`,
            transform: isCTA ? "translate(-50%, -50%)" : `translate(-50%, -50%)`,
            x: parallaxX,
            y: parallaxY,
            rotateX: tiltX,
            rotateY: tiltY,
            perspective: 1200,
            transformStyle: "preserve-3d",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* ──────────────── CTA (FULL TICKET SELECTOR SYSTEM) ──────────────── */}
          {isCTA ? (
            <div className="bg-ink/25 backdrop-blur-[24px] border border-white/10 rounded-[40px] p-6 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.35)] w-full flex flex-col gap-8 relative overflow-hidden">
              {/* Aquatic Glow Background Ripple */}
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-water-light/10 blur-[120px] pointer-events-none" />

              {/* Title & Description Header */}
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
                <span className="font-[family-name:var(--font-sans)] text-[9px] md:text-[10px] uppercase tracking-[0.45em] text-sun font-bold">
                  BOOKING CONCIERGE
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Start Your <span className="font-[family-name:var(--font-serif)] italic text-water-light">Adventure</span>
                </h2>
                <p className="font-[family-name:var(--font-serif)] text-xs md:text-sm text-white/90 max-w-lg mt-1 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  Choose your pass option below. Secure online tickets enjoy priority express lanes and guaranteed entry.
                </p>
              </motion.div>

              {/* Ticket Cards Grid (3 Columns) */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full relative z-10">
                {ticketCategories.map((ticket, index) => {
                  const TicketIcon = (LucideIcons as any)[ticket.icon] || LucideIcons.User;
                  return (
                    <div
                      key={index}
                      className={`relative bg-ink/20 backdrop-blur-[12px] border ${
                        ticket.popular ? "border-sun/40 shadow-[0_15px_30px_rgba(232,168,56,0.15)]" : "border-white/10"
                      } rounded-[32px] p-6 flex flex-col gap-5 text-left group hover:bg-ink/35 hover:border-white/20 transition-all duration-300`}
                    >
                      {/* Popular Badge */}
                      {ticket.popular && (
                        <span className="absolute top-4 right-4 bg-sun text-ink text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                          Best Value
                        </span>
                      )}

                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                          ticket.popular ? "bg-sun/10 border-sun/30 text-sun" : "bg-white/5 border-white/10 text-white"
                        }`}>
                          <TicketIcon size={12} />
                        </div>
                        <div>
                          <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                            {ticket.name}
                          </h3>
                          <p className="text-[9px] text-white/50 tracking-wider">
                            {ticket.subtext}
                          </p>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-0.5 border-t border-white/5 pt-4">
                        <span className="font-[family-name:var(--font-display)] text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                          {ticket.price}
                        </span>
                        <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold">
                          / Day Pass
                        </span>
                      </div>

                      {/* Features */}
                      <ul className="flex flex-col gap-2.5 flex-1">
                        {ticket.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-[10px] text-white/90 font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                            <LucideIcons.Check size={10} className="text-water-light mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Purchase Button */}
                      <button className={`w-full py-2.5 rounded-xl font-[family-name:var(--font-sans)] text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                        ticket.popular 
                          ? "bg-sun hover:bg-sun-light text-ink shadow-md shadow-sun/10" 
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                      }`}>
                        Purchase Pass
                      </button>
                    </div>
                  );
                })}
              </motion.div>

              {/* Secure Checkout Trust Footer */}
              <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 border-t border-white/5 pt-6 text-[10px] text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-1.5">
                  <LucideIcons.Lock size={10} className="text-water-light" />
                  <span>256-Bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LucideIcons.CreditCard size={10} className="text-water-light" />
                  <span>Instant E-Tickets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LucideIcons.RefreshCw size={10} className="text-water-light" />
                  <span>Free Date Modifies</span>
                </div>
              </motion.div>
            </div>
          ) : (
            // ──────────────── STANDARD DYNAMIC STAGE PANELS ────────────────
            <>
              {/* 1. Category Pill + Header Block */}
              <motion.div
                variants={itemVariants}
                className="bg-ink/25 backdrop-blur-[20px] border border-white/10 rounded-[36px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group float-gentle w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Liquid reflection overlay effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none transition-transform duration-700"
                  style={{
                    transform: `translateX(${(mouseX - 0.5) * 50}px) translateY(${(mouseY - 0.5) * 50}px) scale(1.2)`,
                  }}
                />
                <div className="flex items-center gap-2.5 mb-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-water-light/20 flex items-center justify-center border border-water-light/35">
                    <IconComponent size={11} className="text-water-light animate-pulse" />
                  </div>
                  <span className="font-[family-name:var(--font-sans)] text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-sun font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    IMMERSIVE FOCUS
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-xl md:text-3xl font-medium tracking-tight text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  {card.title}
                </h2>
              </motion.div>

              {/* 2. Giant Statistic Block */}
              {card.stat && (
                <motion.div
                  variants={itemVariants}
                  className="bg-ink/25 backdrop-blur-[16px] border border-white/10 rounded-[28px] px-6 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-baseline gap-2.5 relative overflow-hidden justify-start w-full"
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none -translate-x-full"
                    style={{
                      transform: `translateX(${(mouseX - 0.5) * 40}px)`,
                    }}
                  />
                  <span className="font-[family-name:var(--font-display)] text-4xl md:text-5.5xl font-black tracking-tighter text-white select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                    {card.stat}
                  </span>
                  <span className="font-[family-name:var(--font-sans)] text-[9px] md:text-[10px] text-white/90 uppercase tracking-[0.2em] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {card.statLabel}
                  </span>
                </motion.div>
              )}

              {/* 3. Description Capsule */}
              <motion.div
                variants={itemVariants}
                className="bg-ink/20 backdrop-blur-[20px] border border-white/10 rounded-[32px] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.25)] relative overflow-hidden w-full"
              >
                <p className="font-[family-name:var(--font-serif)] text-xs md:text-sm text-white leading-relaxed font-normal italic drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                  {card.description}
                </p>
              </motion.div>

              {/* 4. Elegant Specs Chips */}
              {specs.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-1.5 w-full justify-start"
                >
                  {specs.map((spec, i) => {
                    const SpecIcon = (LucideIcons as any)[spec.icon] || LucideIcons.Check;
                    return (
                      <div
                        key={i}
                        className="bg-ink/25 backdrop-blur-[10px] border border-white/15 rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-md"
                      >
                        <SpecIcon size={10.5} className="text-water-light" />
                        <span className="font-[family-name:var(--font-sans)] text-[9px] md:text-[10px] text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          {spec.label}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* 5. CTA Button / Discover More Link */}
              <motion.div variants={itemVariants} className="w-full mt-0.5">
                <a 
                  href="#experience" 
                  className="inline-flex items-center gap-1.5 group text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:text-sun transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  <span>Discover More</span>
                  <LucideIcons.ArrowRight size={11} className="transform group-hover:translate-x-1.5 transition-transform text-sun" />
                </a>
              </motion.div>
            </>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
