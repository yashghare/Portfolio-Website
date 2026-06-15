import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, Sparkles, Database, BarChart3, Code2, Brain } from "lucide-react";
import character from "@/assets/data-scientist-character.png";

const ROTATING = ["SQL Expert", "Python Developer", "Power BI Analyst", "Machine Learning Enthusiast"];

function useTyping(words: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = word.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (!next) {
          setDeleting(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return text;
}

export function Hero() {
  const typed = useTyping(ROTATING);

  // Mouse parallax for the character
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const tX = useTransform(sx, (v) => v * 18);
  const tY = useTransform(sy, (v) => v * 12);
  const rY = useTransform(sx, (v) => v * 8);
  const rX = useTransform(sy, (v) => -v * 6);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const kpis = [
    { icon: Sparkles, label: "Projects", value: "10+", color: "from-cyan-400/30 to-cyan-400/0", delay: 0 },
    { icon: Database, label: "SQL", value: "Expert", color: "from-violet-500/30 to-violet-500/0", delay: 0.6 },
    { icon: BarChart3, label: "Power BI", value: "Pro", color: "from-cyan-400/30 to-cyan-400/0", delay: 1.2 },
    { icon: Code2, label: "Python", value: "Advanced", color: "from-violet-500/30 to-violet-500/0", delay: 1.8 },
  ];

  return (
    <section id="home" className="relative isolate min-h-screen pt-28 pb-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-[1.05fr_1fr_1fr]">
        {/* LEFT — copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="z-10 max-w-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_var(--color-cyan)]" />
            Available for opportunities
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Hi, I'm <span className="text-gradient">Yash Ghare</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Data Analyst · Data Scientist · Business Intelligence Enthusiast
          </p>
          <div className="mt-6 flex h-10 items-center gap-2 font-mono text-lg">
            <Brain className="h-5 w-5 text-[var(--cyan)]" />
            <span className="text-foreground">{typed}</span>
            <span className="inline-block h-6 w-[2px] animate-pulse bg-[var(--cyan)]" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] glow-cyan transition-transform hover:scale-105"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* CENTER — 3D character */}
        <div className="relative mx-auto flex h-[440px] w-full max-w-md items-end justify-center md:h-[540px] lg:h-[640px]">
          {/* Aura */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-[70%] w-[70%] rounded-full bg-[var(--cyan)] opacity-30 blur-3xl animate-aura" />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="h-[55%] w-[55%] rounded-full bg-[var(--violet)] opacity-25 blur-3xl animate-aura"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
          {/* Floor ring */}
          <div className="absolute bottom-6 h-6 w-3/4 rounded-[50%] bg-[var(--cyan)] opacity-30 blur-2xl" />

          {/* Character with parallax + breathe + float */}
          <motion.div
            style={{ x: tX, y: tY, rotateY: rY, rotateX: rX, transformPerspective: 1000 }}
            className="relative z-10 h-full w-full animate-float"
          >
            <div className="h-full w-full animate-breathe">
              <img
                src={character}
                alt="3D animated data scientist character"
                className="h-full w-full object-contain drop-shadow-[0_30px_60px_oklch(0.82_0.16_220/0.35)]"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Orbiting badges */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 hidden md:block"
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full glass px-3 py-1 text-xs">
              ✦ Python
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full glass px-3 py-1 text-xs">
              ⌘ SQL
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full glass px-3 py-1 text-xs">
              ⚡ ML
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full glass px-3 py-1 text-xs">
              ◈ BI
            </div>
          </motion.div>
        </div>

        {/* RIGHT — KPI cards */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          {kpis.map((k, idx) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl glass-strong p-4"
              style={{ animation: `float-y 6s ease-in-out ${k.delay}s infinite` }}
            >
              <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${k.color} blur-2xl`} />
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-[var(--cyan)]">
                  <k.icon className="h-4 w-4" />
                </span>
                <span className="text-xs text-muted-foreground">{k.label}</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold">{k.value}</div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 bg-[image:var(--gradient-primary)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
