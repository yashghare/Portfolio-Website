import { useEffect, useRef } from "react";

/** Animated particles + grid + gradient blobs. Canvas particles for perf. */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const count = Math.min(90, Math.floor((w * h) / 22000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? 195 : 275,
      a: Math.random() * 0.6 + 0.2,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.a})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 60%, 0.8)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[var(--cyan)] opacity-20 blur-3xl animate-aura" />
      <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-[var(--violet)] opacity-20 blur-3xl animate-aura" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[var(--cyan)] opacity-10 blur-3xl animate-aura" style={{ animationDelay: "3s" }} />
    </div>
  );
}
