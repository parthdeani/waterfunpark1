"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  progress: number;
}

export default function ScrollIndicator({ progress }: ScrollIndicatorProps) {
  const isVisible = progress < 0.15;

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <span className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.3em] text-paper/50">
        Scroll to explore
      </span>
      <div className="relative w-5 h-8 border border-paper/20 rounded-full flex items-start justify-center p-1">
        <motion.div
          className="w-1 h-1.5 bg-water-light rounded-full"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={16} className="text-paper/30" />
      </motion.div>
    </motion.div>
  );
}
