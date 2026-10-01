import { useEffect, useRef } from "react";

type DottedGlobeProps = {
  className?: string;
  color?: string;
  points?: number;
};

/**
 * A lightweight canvas globe: dots distributed on a sphere (fibonacci lattice)
 * that rotate around the vertical axis. Falls back to a single static frame
 * when the user prefers reduced motion.
 */
export default function DottedGlobe({ className = "", color = "17, 16, 22", points = 820 }: DottedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const golden = Math.PI * (3 - Math.sqrt(5));

    const lattice = Array.from({ length: points }, (_, i) => {
      const y = 1 - (i / (points - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * golden;
      return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
    });

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let angle = 0;
    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) / 2 - 6;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (const p of lattice) {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        const depth = (z + 1) / 2; // 0 (back) -> 1 (front)
        const screenX = cx + x * r;
        const screenY = cy + p.y * r;
        const alpha = 0.06 + depth * 0.5;
        const size = 0.7 + depth * 1.3;
        ctx.fillStyle = `rgba(${color}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      angle += 0.0018;
      render();
      frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      render();
    } else {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [color, points]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
