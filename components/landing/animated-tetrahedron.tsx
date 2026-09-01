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

export function AnimatedTetrahedron() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    const baseColor = getThemeColor("--primary", "#d99414");
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

    // Tetrahedron vertices
    const vertices = [
      { x: 0, y: 1, z: 0 },           // Top
      { x: -0.943, y: -0.333, z: -0.5 }, // Bottom left back
      { x: 0.943, y: -0.333, z: -0.5 },  // Bottom right back
      { x: 0, y: -0.333, z: 1 },         // Bottom front
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1],
    ];

    const faces = [
      [0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2],
    ];

    const rotateY = (p: { x: number; y: number; z: number }, angle: number) => ({
      x: p.x * Math.cos(angle) - p.z * Math.sin(angle),
      y: p.y,
      z: p.x * Math.sin(angle) + p.z * Math.cos(angle),
    });

    const rotateX = (p: { x: number; y: number; z: number }, angle: number) => ({
      x: p.x,
      y: p.y * Math.cos(angle) - p.z * Math.sin(angle),
      z: p.y * Math.sin(angle) + p.z * Math.cos(angle),
    });

    const rotateZ = (p: { x: number; y: number; z: number }, angle: number) => ({
      x: p.x * Math.cos(angle) - p.y * Math.sin(angle),
      y: p.x * Math.sin(angle) + p.y * Math.cos(angle),
      z: p.z,
    });

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      if (!visible || rect.width === 0 || rect.height === 0) {
        return;
      }

      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = Math.min(rect.width, rect.height) * 0.6;

      ctx.font = "16px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const points: { x: number; y: number; z: number; char: string }[] = [];

      edges.forEach(([i, j]) => {
        const v1 = vertices[i];
        const v2 = vertices[j];

        for (let t = 0; t <= 1; t += 0.05) {
          let point = {
            x: v1.x + (v2.x - v1.x) * t,
            y: v1.y + (v2.y - v1.y) * t,
            z: v1.z + (v2.z - v1.z) * t,
          };

          point = rotateY(point, time * 0.4);
          point = rotateX(point, time * 0.3);
          point = rotateZ(point, time * 0.2);

          const depth = (point.z + 1.5) / 3;
          const charIndex = Math.floor(depth * (chars.length - 1));

          points.push({
            x: centerX + point.x * scale,
            y: centerY - point.y * scale,
            z: point.z,
            char: chars[Math.min(charIndex, chars.length - 1)],
          });
        }
      });

      faces.forEach(([i, j, k]) => {
        const v1 = vertices[i];
        const v2 = vertices[j];
        const v3 = vertices[k];

        for (let u = 0; u <= 1; u += 0.12) {
          for (let v = 0; v <= 1 - u; v += 0.12) {
            const w = 1 - u - v;
            let point = {
              x: v1.x * u + v2.x * v + v3.x * w,
              y: v1.y * u + v2.y * v + v3.y * w,
              z: v1.z * u + v2.z * v + v3.z * w,
            };

            point = rotateY(point, time * 0.4);
            point = rotateX(point, time * 0.3);
            point = rotateZ(point, time * 0.2);

            const depth = (point.z + 1.5) / 3;
            const charIndex = Math.floor(depth * (chars.length - 1));

            points.push({
              x: centerX + point.x * scale,
              y: centerY - point.y * scale,
              z: point.z,
              char: chars[Math.min(charIndex, chars.length - 1)],
            });
          }
        }
      });

      points.sort((a, b) => a.z - b.z);

      points.forEach((point) => {
        const depth = (point.z + 1.5) / 3;
        const alpha = 0.12 + depth * 0.45;
        ctx.fillStyle = hexToRgba(baseColor, Math.min(alpha, 0.9));
        ctx.fillText(point.char, point.x, point.y);
      });

      if (!reduceMotion) {
        time += 0.015;
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
