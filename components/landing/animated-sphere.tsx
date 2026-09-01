"use client";

import { useEffect, useRef } from "react";

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const int = parseInt(full, 16);
  return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${alpha})`;
}

function getThemeColor(varName: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback;
}

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    const frontColor = getThemeColor("--primary-container", "#d99414");
    const backColor = getThemeColor("--accent", "#bf3e21");
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let visible = false;

    resize();

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      if (!visible || rect.width === 0 || rect.height === 0) {
        return;
      }

      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.42;

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const points: { x: number; y: number; z: number; char: string }[] = [];

      for (let phi = 0; phi < Math.PI * 2; phi += 0.12) {
        for (let theta = 0; theta < Math.PI; theta += 0.12) {
          const x = Math.sin(theta) * Math.cos(phi + time * 0.4);
          const y = Math.sin(theta) * Math.sin(phi + time * 0.4);
          const z = Math.cos(theta);

          const rotY = time * 0.25;
          const newX = x * Math.cos(rotY) - z * Math.sin(rotY);
          const newZ = x * Math.sin(rotY) + z * Math.cos(rotY);

          const rotX = time * 0.15;
          const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX);
          const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX);

          const depth = (finalZ + 1) / 2;
          const charIndex = Math.floor(depth * (chars.length - 1));

          points.push({
            x: centerX + newX * radius,
            y: centerY + newY * radius,
            z: finalZ,
            char: chars[charIndex],
          });
        }
      }

      points.sort((a, b) => a.z - b.z);

      points.forEach((point) => {
        const depth = (point.z + 1) / 2;
        const alpha = 0.15 + depth * 0.55;
        ctx.fillStyle = hexToRgba(depth > 0.5 ? frontColor : backColor, alpha);
        ctx.fillText(point.char, point.x, point.y);
      });

      if (!reduceMotion) {
        time += 0.02;
        frameRef.current = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      resize();
      if (reduceMotion && visible) render();
    };

    // Pausa el loop cuando el canvas sale del viewport (o está oculto por CSS)
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        visible = entry.isIntersecting;
        cancelAnimationFrame(frameRef.current);
        if (visible) {
          frameRef.current = requestAnimationFrame(render);
        }
      },
      { rootMargin: "100px" }
    );

    window.addEventListener("resize", handleResize);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
