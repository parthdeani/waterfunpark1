"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Sparkles, MessageCircle } from "lucide-react";

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

export default function CTASection() {
  return (
    <section id="contact" className="relative py-32 md:py-44 overflow-hidden bg-[#030611]">
      {/* Premium ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-water-light/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-sun/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid background texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Huge background text with stroke outline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="font-[family-name:var(--font-display)] text-[12rem] md:text-[22rem] font-black text-white/[0.015] whitespace-nowrap tracking-tighter">
          DIVE IN
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Subtitle tag */}
        <motion.div
          className="inline-flex items-center gap-1.5 bg-sun/10 border border-sun/20 px-3.5 py-1 rounded-full mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={11} className="text-sun" />
          <span className="font-[family-name:var(--font-sans)] text-[9px] uppercase tracking-[0.25em] text-sun font-bold">
            Ready for Splash?
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          className="font-[family-name:var(--font-display)] text-5xl md:text-8xl font-black text-paper tracking-tighter leading-[0.9] mb-8 flex flex-wrap justify-center gap-x-3 md:gap-x-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span variants={wordVariants} className="inline-block">Make</motion.span>
          <motion.span variants={wordVariants} className="inline-block">Every</motion.span>
          <span className="w-full h-0" />
          <motion.span variants={wordVariants} className="inline-block">Day</motion.span>
          <motion.span 
            variants={wordVariants} 
            className="font-[family-name:var(--font-serif)] italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sun to-sun-light inline-block"
          >
            Epic
          </motion.span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="font-[family-name:var(--font-serif)] text-sm md:text-base text-paper/60 mb-12 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Bring your family, bring your friends, and bring your sense of adventure.
          Chhab Chhaba Chhab Water Fun Park is waiting to give you the best day of your summer.
        </motion.p>

        {/* Premium Interactive Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a
            href="#tickets"
            className="px-9 py-4 bg-gradient-to-r from-sun to-sun-light text-ink text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_4px_30px_rgba(232,168,56,0.35)] transition-all duration-300 font-[family-name:var(--font-sans)] hover:-translate-y-0.5"
          >
            Book Tickets Now
          </a>
          <a
            href="tel:+919904980234"
            className="px-9 py-4 border border-paper/10 bg-paper/5 backdrop-blur-md text-paper text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-paper hover:text-ink transition-all duration-300 font-[family-name:var(--font-sans)] hover:-translate-y-0.5"
          >
            Call Support
          </a>
        </motion.div>

        {/* Contact Cards Grid - 3 Premium Glass Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Card 1: Phone */}
          <a 
            href="tel:+919904980234"
            className="p-6 rounded-2xl border border-paper/5 bg-ink-light/20 backdrop-blur-sm hover:border-sun/30 hover:bg-ink-light/40 transition-all duration-300 group flex flex-col items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-sun/10 border border-sun/20 flex items-center justify-center text-sun group-hover:scale-110 transition-transform duration-300">
              <Phone size={16} />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-paper/40 mb-1 font-bold">Call Helpline</span>
              <span className="font-[family-name:var(--font-sans)] text-sm font-semibold text-paper/85">+91 99049 80234</span>
            </div>
          </a>

          {/* Card 2: Email */}
          <a 
            href="mailto:info@chhabchhabachhab.com"
            className="p-6 rounded-2xl border border-paper/5 bg-ink-light/20 backdrop-blur-sm hover:border-water-light/30 hover:bg-ink-light/40 transition-all duration-300 group flex flex-col items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-water/15 border border-water-light/20 flex items-center justify-center text-water-light group-hover:scale-110 transition-transform duration-300">
              <Mail size={16} />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-paper/40 mb-1 font-bold">Email Inquiry</span>
              <span className="font-[family-name:var(--font-sans)] text-sm font-semibold text-paper/85 break-all font-sans">info@chhabchhabachhab.com</span>
            </div>
          </a>

          {/* Card 3: Location */}
          <div 
            className="p-6 rounded-2xl border border-paper/5 bg-ink-light/20 backdrop-blur-sm hover:border-sun/30 hover:bg-ink-light/40 transition-all duration-300 group flex flex-col items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-sun/10 border border-sun/20 flex items-center justify-center text-sun group-hover:scale-110 transition-transform duration-300">
              <MapPin size={16} />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-paper/40 mb-1 font-bold">Find Us At</span>
              <span className="font-[family-name:var(--font-sans)] text-sm font-semibold text-paper/85">Surat - Hazira Road, Gujarat</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
