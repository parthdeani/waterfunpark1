"use client";

import { useRef, useEffect, useState } from "react";

export default function WaterCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    life: number; maxLife: number; size: number;
    opacity: number;
  }>>([]);
  const ripplesRef = useRef<Array<{
    x: number; y: number; radius: number; maxRadius: number;
    opacity: number;
  }>>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("button, a, [role='button'], .pointer-events-auto");
      setIsHovering(!!isInteractive);
    };

    const onClick = (e: MouseEvent) => {
      // Create splash particles
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
        const speed = 1.5 + Math.random() * 3;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          size: 1.5 + Math.random() * 2,
          opacity: 0.7,
        });
      }

      // Create ripple
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 40,
        opacity: 0.5,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp cursor position
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.15;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.15;

      const cx = currentRef.current.x;
      const cy = currentRef.current.y;

      // Draw main cursor dot
      const cursorSize = isHovering ? 20 : 8;
      const targetAlpha = isHovering ? 0.15 : 0.5;

      ctx.beginPath();
      ctx.arc(cx, cy, cursorSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(74, 159, 212, ${targetAlpha})`;
      ctx.fill();

      // Inner dot
      if (!isHovering) {
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 240, 232, 0.9)";
        ctx.fill();
      }

      // Hover ring
      if (isHovering) {
        ctx.beginPath();
        ctx.arc(cx, cy, cursorSize, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(74, 159, 212, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Update & draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.life++;
        p.opacity = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.opacity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 159, 212, ${p.opacity * 0.6})`;
        ctx.fill();

        return true;
      });

      // Update & draw ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += 2;
        r.opacity -= 0.02;

        if (r.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74, 159, 212, ${r.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(animationId);
    };
  }, [isHovering]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100000] pointer-events-none hidden md:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
