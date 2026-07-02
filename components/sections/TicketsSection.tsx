"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, School, Coffee, Utensils, ShieldCheck, Info, Sparkles, Star } from "lucide-react";

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

export default function TicketsSection() {
  const [activeTab, setActiveTab] = useState<"corporate" | "school">("corporate");

  // Corporate data
  const corporatePackages = [
    {
      type: "Standard Group",
      range: "50 to 250 Members",
      adultPrice: "500",
      childPrice: "300",
      featured: false,
      badge: "Popular Selection",
      desc: "Perfect for medium corporate teams, extended family gatherings, and community groups seeking a day of absolute fun.",
      features: [
        "Access to all standard water slides & pools",
        "Dedicated fast-track group check-in lane",
        "Complimentary basic first aid & safety cover",
        "Free park entry for 2 group coordinators",
        "Color-coded safety wristbands for group identity",
      ],
    },
    {
      type: "Vortex Corporate",
      range: "Above 250 Members",
      adultPrice: "400",
      childPrice: "200",
      featured: true,
      badge: "Best Value & Features",
      desc: "Specially crafted for large enterprise outings, corporate buyouts, and mega institutional celebrations.",
      features: [
        "Priority VIP express entry to all premium rides",
        "Exclusive welcome reception & registration desk",
        "Complimentary lockers and high-end water tubes",
        "Free park entry for 5 group coordinators",
        "Custom welcome announcements & digital banner spaces",
        "Reserved seating area in the premium restaurant yard",
      ],
    },
  ];

  // School data
  const schoolPackages = [
    {
      type: "Primary Expedition",
      range: "Nursery to 4th Std. Group",
      prices: {
        mid: { range: "50 to 250 kids", price: "350" },
        large: { range: "Above 250 kids", price: "300" },
      },
      featured: false,
      badge: "Kids Special",
      desc: "A carefully supervised, secure environment for primary school picnics with age-appropriate water slides.",
      features: [
        "Access to dedicated kids pools, soft splash pads & minor slides",
        "1 teacher entry completely FREE for every 10 students",
        "Specialized safety wristbands & dedicated lifeguard watchers",
        "Dedicated school coordinator at park for logistics assistance",
        "Fully equipped first aid & emergency rescue standby",
      ],
    },
    {
      type: "Senior Thrills",
      range: "5th to 12th Std. Group",
      prices: {
        mid: { range: "50 to 250 students", price: "450" },
        large: { range: "Above 250 students", price: "400" },
      },
      featured: true,
      badge: "Highly Recommended",
      desc: "High energy, thrilling water adventures designed for secondary and higher secondary school students.",
      features: [
        "Full access to all extreme high-thrill slides & wave pools",
        "1 teacher entry completely FREE for every 10 students",
        "Priority lockers & costume pre-booking coordination",
        "Free group photography at the main park entrance gate",
        "Strict safety briefings and targeted lifeguard monitoring",
      ],
    },
  ];

  // School meal items
  const mealAddons = [
    {
      title: "Breakfast Plan",
      price: "70",
      icon: Coffee,
      items: ["Idli Sambhar & Bataka Poha", "Veg Sandwich & Bread Butter", "Upma & Bread Pakoda", "Unlimited Tea/Coffee & Mineral Water"],
    },
    {
      title: "Lunch - Combo A",
      price: "180",
      icon: Utensils,
      items: ["Mix Veg Sabji & Paneer Tikka", "Tandoori Roti & Dal-Fry", "Jeera Rice, Salad & Papad", "Chaas / Butter Milk (1 Glass)"],
    },
    {
      title: "Lunch - Combo B/C",
      price: "150 - 160",
      icon: Utensils,
      items: ["Combo B (₹160): Chole, Puri, Dal-Fry, Jeera Rice, Salad & Papad", "Combo C (₹150): Pav Bhaji, Veg Pulav, Salad & Papad"],
    },
    {
      title: "Hi-Tea Plan",
      price: "70",
      icon: Coffee,
      items: ["Veg Sandwich & Burger", "Frankie & Bread Butter", "Bread Pakoda & Snacks", "Unlimited Tea/Coffee & Drinks"],
    },
  ];

  return (
    <section id="tickets" className="py-32 md:py-44 bg-[#030308] relative overflow-hidden">
      {/* Premium background gradient meshes */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-water/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-[600px] h-[600px] bg-sun/5 rounded-full blur-[180px] pointer-events-none" />
      
      {/* Decorative vertical grid lines to look professional */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-max flex gap-24 pointer-events-none opacity-[0.02]">
        <div className="w-[1px] h-full bg-paper" />
        <div className="w-[1px] h-full bg-paper" />
        <div className="w-[1px] h-full bg-paper" />
        <div className="w-[1px] h-full bg-paper" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 bg-water/10 border border-water/20 px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={12} className="text-water-light" />
            <span className="font-[family-name:var(--font-sans)] text-[9px] uppercase tracking-[0.25em] text-water-light font-bold">
              Exclusive Group Rates
            </span>
          </motion.div>
          
          <motion.h2 
            className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black text-paper tracking-tight leading-tight flex flex-wrap justify-center gap-x-3 md:gap-x-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span variants={wordVariants} className="inline-block">Choose</motion.span>
            <motion.span variants={wordVariants} className="inline-block">Your</motion.span>
            <motion.span variants={wordVariants} className="font-[family-name:var(--font-serif)] italic font-normal text-sun inline-block">Adventure</motion.span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-paper/50 font-[family-name:var(--font-serif)] text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Plan the ultimate escape for your team or students. Get access to custom packages, fast-track entries, and chef-curated menus.
          </motion.p>
 
          {/* Toggle Tabs - Premium hardware style */}
          <div className="flex justify-center mt-12">
            <div className="relative flex bg-ink-light/35 border border-paper/10 rounded-full p-1.5 backdrop-blur-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
              <button
                onClick={() => setActiveTab("corporate")}
                className={`relative z-10 flex items-center gap-2.5 px-7 py-3 rounded-full text-xs font-extrabold uppercase tracking-widest transition-all duration-500 ${
                  activeTab === "corporate" ? "text-ink font-black" : "text-paper/50 hover:text-paper"
                }`}
              >
                <Users size={14} className={activeTab === "corporate" ? "text-ink" : "text-water-light"} />
                Corporate Outings
              </button>
              <button
                onClick={() => setActiveTab("school")}
                className={`relative z-10 flex items-center gap-2.5 px-7 py-3 rounded-full text-xs font-extrabold uppercase tracking-widest transition-all duration-500 ${
                  activeTab === "school" ? "text-ink font-black" : "text-paper/50 hover:text-paper"
                }`}
              >
                <School size={14} className={activeTab === "school" ? "text-ink" : "text-sun"} />
                School Picnics
              </button>
              
              {/* Sliding Background */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-water-light to-sun shadow-md"
                layoutId="activeTabIndicator"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{
                  left: activeTab === "corporate" ? "6px" : "calc(50% + 3px)",
                  right: activeTab === "corporate" ? "calc(50% + 3px)" : "6px",
                  width: "calc(50% - 9px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Cards Container */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "corporate" ? (
              <motion.div
                key="corporate"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              >
                {corporatePackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.type}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative p-8 md:p-10 rounded-3xl border transition-all duration-500 hover:-translate-y-3 flex flex-col justify-between group overflow-hidden ${
                      pkg.featured
                        ? "bg-gradient-to-b from-[#131326] to-[#080811] border-water-light/20 shadow-[0_30px_70px_rgba(74,159,212,0.15)] hover:border-water-light/60"
                        : "bg-[#0b0b14]/75 border-paper/5 hover:border-paper/20 hover:shadow-[0_35px_60px_rgba(255,255,255,0.02)]"
                    }`}
                  >
                    {/* Inner glowing corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-tr-3xl" />
                    
                    <div>
                      {pkg.badge && (
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-sun to-sun-light text-ink text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-6 shadow-sm">
                          <Star size={10} fill="currentColor" />
                          {pkg.badge}
                        </div>
                      )}

                      <span className="text-[10px] uppercase tracking-[0.25em] text-water-light mb-1 font-extrabold block">
                        {pkg.type}
                      </span>
                      <span className="text-sm font-semibold text-paper/80 block mb-3 font-[family-name:var(--font-display)]">
                        {pkg.range}
                      </span>
                      
                      <p className="text-xs text-paper/50 leading-relaxed font-[family-name:var(--font-serif)] italic mb-6">
                        {pkg.desc}
                      </p>

                      {/* Dual pricing display - high contrast and readability */}
                      <div className="flex flex-col gap-3.5 mb-8 bg-paper/[0.03] p-5 rounded-2xl border border-paper/10 group-hover:border-paper/20 transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-wider text-paper/50 font-[family-name:var(--font-sans)] font-bold">Adult Ticket Rate</span>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-xs text-water-light font-bold">₹</span>
                            <span className="text-3xl font-black text-paper font-[family-name:var(--font-display)] tracking-tighter">{pkg.adultPrice}</span>
                            <span className="text-[9px] text-paper/40 ml-1">/ head</span>
                          </div>
                        </div>
                        <div className="h-[1px] bg-paper/10" />
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-wider text-paper/50 font-[family-name:var(--font-sans)] font-bold">Child Ticket Rate</span>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-xs text-water-light font-bold">₹</span>
                            <span className="text-3xl font-black text-paper font-[family-name:var(--font-display)] tracking-tighter">{pkg.childPrice}</span>
                            <span className="text-[9px] text-paper/40 ml-1">/ head</span>
                          </div>
                        </div>
                      </div>

                      {/* Features list with elegant icons */}
                      <ul className="space-y-4 mb-8">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-xs text-paper/60 font-[family-name:var(--font-serif)]">
                            <div className="w-4 h-4 rounded-full bg-water/10 border border-water/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check size={10} className="text-water-light" />
                            </div>
                            <span className="leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      className={`w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 font-[family-name:var(--font-sans)] border shadow-sm ${
                        pkg.featured
                          ? "bg-sun border-sun text-ink hover:bg-transparent hover:text-sun hover:shadow-[0_4px_30px_rgba(232,168,56,0.3)]"
                          : "bg-paper/5 border-paper/10 text-paper hover:bg-water hover:border-water hover:shadow-[0_4px_30px_rgba(74,159,212,0.2)]"
                      }`}
                    >
                      Configure Reservation
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="school"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-16"
              >
                {/* School Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {schoolPackages.map((pkg, idx) => (
                    <motion.div
                      key={pkg.type}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative p-8 md:p-10 rounded-3xl border transition-all duration-500 hover:-translate-y-3 flex flex-col justify-between group overflow-hidden ${
                        pkg.featured
                          ? "bg-gradient-to-b from-[#1c1410] to-[#080811] border-sun/20 shadow-[0_30px_70px_rgba(232,168,56,0.1)] hover:border-sun/60"
                          : "bg-[#0b0b14]/75 border-paper/5 hover:border-paper/20 hover:shadow-[0_35px_60px_rgba(255,255,255,0.02)]"
                      }`}
                    >
                      {/* Inner glowing corner */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-tr-3xl" />
                      
                      <div>
                        {pkg.badge && (
                          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-water-light to-water text-paper text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-6 shadow-sm">
                            <Sparkles size={10} fill="currentColor" className="text-paper" />
                            {pkg.badge}
                          </div>
                        )}

                        <span className="text-[10px] uppercase tracking-[0.25em] text-sun mb-1 font-extrabold block">
                          {pkg.type}
                        </span>
                        <span className="text-sm font-semibold text-paper/80 block mb-3 font-[family-name:var(--font-display)]">
                          {pkg.range}
                        </span>
                        
                        <p className="text-xs text-paper/50 leading-relaxed font-[family-name:var(--font-serif)] italic mb-6">
                          {pkg.desc}
                        </p>

                        {/* Tiered pricing display */}
                        <div className="flex flex-col gap-3.5 mb-8 bg-paper/[0.03] p-5 rounded-2xl border border-paper/10 group-hover:border-paper/20 transition-all duration-300">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-wider text-paper/50 font-[family-name:var(--font-sans)] font-bold">50 to 250 Students</span>
                            <div className="flex items-baseline gap-0.5">
                              <span className="text-xs text-water-light font-bold">₹</span>
                              <span className="text-3xl font-black text-paper font-[family-name:var(--font-display)] tracking-tighter">{pkg.prices.mid.price}</span>
                              <span className="text-[9px] text-paper/40 ml-1">/ head</span>
                            </div>
                          </div>
                          <div className="h-[1px] bg-paper/10" />
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-wider text-paper/50 font-[family-name:var(--font-sans)] font-bold">Above 250 Students</span>
                            <div className="flex items-baseline gap-0.5">
                              <span className="text-xs text-water-light font-bold">₹</span>
                              <span className="text-3xl font-black text-paper font-[family-name:var(--font-display)] tracking-tighter">{pkg.prices.large.price}</span>
                              <span className="text-[9px] text-paper/40 ml-1">/ head</span>
                            </div>
                          </div>
                        </div>

                        {/* Features list */}
                        <ul className="space-y-4 mb-8">
                          {pkg.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-xs text-paper/60 font-[family-name:var(--font-serif)]">
                              <div className="w-4 h-4 rounded-full bg-sun/10 border border-sun/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check size={10} className="text-sun" />
                              </div>
                              <span className="leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        className={`w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 font-[family-name:var(--font-sans)] border shadow-sm ${
                          pkg.featured
                            ? "bg-sun border-sun text-ink hover:bg-transparent hover:text-sun hover:shadow-[0_4px_30px_rgba(232,168,56,0.3)]"
                            : "bg-paper/5 border-paper/10 text-paper hover:bg-water hover:border-water hover:shadow-[0_4px_30px_rgba(74,159,212,0.2)]"
                        }`}
                      >
                        Request School Booking
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Meal Addons for School - Fully polished glass layout */}
                <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-b from-[#0b0b14]/50 to-[#07070e] border border-paper/10 p-6 md:p-10 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-xl">
                  {/* Subtle inner card light */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-paper/10 to-transparent" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-sun/10 p-2.5 rounded-xl border border-sun/20 text-sun shadow-sm">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-black text-paper tracking-tight">Optional School Food Add-ons</h3>
                        <p className="text-xs text-paper/40">Freshly prepared, hygiene-certified meals for student groups</p>
                      </div>
                    </div>
                    
                    <span className="self-start md:self-auto text-[9px] uppercase tracking-widest font-black text-sun border border-sun/20 px-3 py-1 rounded bg-sun/5">
                      FSSAI Approved Kitchen
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {mealAddons.map((meal, idx) => {
                      const MealIcon = meal.icon;
                      return (
                        <motion.div 
                          key={meal.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="p-5 rounded-2xl border border-paper/5 bg-[#030308]/60 hover:border-paper/15 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-[family-name:var(--font-display)] text-xs font-bold text-paper/90 tracking-wide">{meal.title}</span>
                              <div className="w-6 h-6 rounded-full bg-paper/5 flex items-center justify-center border border-paper/10">
                                <MealIcon size={11} className="text-water-light" />
                              </div>
                            </div>
                            <ul className="space-y-2 mt-3 pl-3">
                              {meal.items.map((it) => (
                                <li key={it} className="text-[10px] text-paper/40 font-[family-name:var(--font-serif)] list-disc leading-relaxed">{it}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mt-5 pt-3 border-t border-paper/5 flex justify-between items-center">
                            <span className="text-[9px] uppercase tracking-wider text-paper/30">Add-on Cost</span>
                            <span className="text-xs text-sun font-mono font-bold">₹{meal.price}/- <span className="text-[8px] text-paper/40 font-sans uppercase">head</span></span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lockers and costumes warning note */}
        <div className="flex items-center gap-2.5 justify-center mt-16 text-[10px] text-paper/50 bg-[#090912]/80 py-3.5 px-6 rounded-full border border-paper/10 max-w-sm mx-auto shadow-sm">
          <Info size={12} className="text-water-light" />
          <span className="font-medium tracking-wide">Costumes & Lockers are chargeable at the venue.</span>
        </div>
      </div>
    </section>
  );
}
