"use client";
import { useEffect, useRef } from "react";
// Neural-network canvas: nodes drift and bend toward the pointer
export default function Bg() {
  const r = useRef();
  useEffect(() => {
    const c = r.current, x = c.getContext("2d");
    const red = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let w, h, pts = [], m = { x: -999, y: -999 }, id;
    const rs = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      const n = Math.min(90, Math.floor((w * h) / 16000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    };
    const mv = (e) => { m.x = e.clientX; m.y = e.clientY; document.body.style.setProperty("--mx", e.clientX + "px"); document.body.style.setProperty("--my", e.clientY + "px"); };
    const draw = () => {
      x.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!red) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = m.x - p.x, dy = m.y - p.y;
        if (!red && Math.hypot(dx, dy) < 170) { p.x += dx * 0.012; p.y += dy * 0.012; }
        x.fillStyle = "rgba(160,170,255,.75)"; x.fillRect(p.x, p.y, 2, 2);
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 125) { x.strokeStyle = `rgba(139,124,255,${0.28 * (1 - d / 125)})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
      }
      id = requestAnimationFrame(draw);
    };
    rs(); draw();
    addEventListener("resize", rs); addEventListener("pointermove", mv);
    return () => { cancelAnimationFrame(id); removeEventListener("resize", rs); removeEventListener("pointermove", mv); };
  }, []);
  return <canvas ref={r} className="bg" aria-hidden="true" />;
}
