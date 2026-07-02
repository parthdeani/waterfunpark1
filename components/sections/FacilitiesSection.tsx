"use client";

import { motion } from "framer-motion";
import { Car, Lock, Shirt, Wifi, Cross, Camera, ShoppingBag, Accessibility } from "lucide-react";

const facilities = [
  { name: "Free Parking", desc: "500+ spaces with covered options", icon: Car },
  { name: "Secure Lockers", desc: "Digital lockers with wristbands", icon: Lock },
  { name: "Changing Rooms", desc: "Clean rooms with showers", icon: Shirt },
  { name: "Free Wi-Fi", desc: "High-speed across entire park", icon: Wifi },
  { name: "Medical Center", desc: "Fully equipped first-aid", icon: Cross },
  { name: "Photo Studio", desc: "Professional ride photos", icon: Camera },
  { name: "Gift Shop", desc: "Exclusive merch & swimwear", icon: ShoppingBag },
  { name: "Accessible", desc: "Wheelchair ramps & inclusive", icon: Accessibility },
];

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="py-32 md:py-40 bg-ink">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.3em] text-sun mb-3"
          >
            Amenities
          </motion.p>
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-paper tracking-tight flex flex-wrap justify-center gap-x-2.5 md:gap-x-3.5"
          >
            <motion.span variants={wordVariants} className="inline-block">Everything</motion.span>
            <motion.span variants={wordVariants} className="inline-block">You</motion.span>
            <motion.span variants={wordVariants} className="inline-block">Need</motion.span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/5 rounded-2xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {facilities.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.name}
                variants={fadeUp}
                custom={i}
                className="bg-ink p-8 text-center hover:bg-ink-light transition-colors duration-400"
              >
                <Icon size={24} className="text-water-light mx-auto mb-4" />
                <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-paper mb-1">{f.name}</h3>
                <p className="font-[family-name:var(--font-serif)] text-xs text-paper/40">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
