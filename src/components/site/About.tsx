import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import character from "@/assets/data-scientist-character.png";

const STATS = [
  { label: "Projects Completed", value: 12 },
  { label: "SQL Problems Solved", value: 250 },
  { label: "Dashboards Built", value: 18 },
  { label: "Certifications", value: 8 },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}+</span>;
}

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="About" title="Turning raw data into business decisions" />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl glass-strong p-1">
              <div className="absolute inset-0 bg-[image:var(--gradient-primary)] opacity-20" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--surface)]">
                <img
                  src={character}
                  alt="Yash Ghare portrait"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--cyan)]" /> Currently learning Deep Learning
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold">Yash Ghare</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl glass-strong p-4 glow-cyan">
              <GraduationCap className="h-6 w-6 text-[var(--cyan)]" />
              <div className="mt-1 text-xs text-muted-foreground">B.Tech</div>
              <div className="text-sm font-semibold">Data Science</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              I'm a data professional who lives at the intersection of analytics, engineering and
              storytelling. From <span className="text-foreground">SQL pipelines</span> and{" "}
              <span className="text-foreground">Python modeling</span> to{" "}
              <span className="text-foreground">Power BI dashboards</span> that executives actually
              use, I build the full loop — from messy CSV to the decision it informs.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              I care about clarity over complexity, ship-ready visualizations, and models that hold
              up in production. Recent work spans churn prediction, customer segmentation, automated
              ordering pipelines and financial trend analysis.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl glass p-4 text-center">
                  <div className="font-display text-3xl font-bold text-gradient">
                    <Counter to={s.value} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="mx-auto inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-[var(--cyan)]" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}
