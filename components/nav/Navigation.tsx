"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Menu, X } from "lucide-react";

interface NavigationProps {
  progress: number;
}

export default function Navigation({ progress }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Experience", href: "#experience" },
    { label: "Attractions", href: "#attractions" },
    { label: "Tickets", href: "#tickets" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[9999] px-6 md:px-10 flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-ink/80 backdrop-blur-xl border-b border-paper/5"
            : "py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 rounded-lg bg-water/20 flex items-center justify-center border border-water/10">
            <Waves size={16} className="text-water-light" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-sm md:text-base font-bold text-paper tracking-tight">
            Chhab Chhaba <span className="text-sun">Chhab</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-paper/60 hover:text-paper transition-colors duration-300 font-[family-name:var(--font-sans)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#tickets"
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink bg-sun px-5 py-2 rounded-sm hover:bg-paper transition-colors duration-300 font-[family-name:var(--font-sans)]"
          >
            Book Now
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden pointer-events-auto text-paper"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[9998] bg-ink/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-[family-name:var(--font-display)] text-3xl font-bold text-paper pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.08 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
