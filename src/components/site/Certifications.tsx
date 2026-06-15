import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { Award } from "lucide-react";
import { SectionHeading } from "./About";

const CERTS = [
  { title: "Google Data Analytics", issuer: "Coursera", year: "2024" },
  { title: "Power BI Data Analyst", issuer: "Microsoft", year: "2024" },
  { title: "IBM Data Science", issuer: "IBM", year: "2023" },
  { title: "SQL Advanced", issuer: "HackerRank", year: "2023" },
  { title: "Machine Learning Specialization", issuer: "Stanford / DeepLearning.AI", year: "2024" },
  { title: "Tableau Desktop Specialist", issuer: "Tableau", year: "2023" },
];

function Card({ c, i }: { c: (typeof CERTS)[number]; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.05, duration: 0.5 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative overflow-hidden rounded-2xl glass-strong p-6 transition-shadow hover:glow-violet"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--violet)] opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-[var(--background)]">
            <Award className="h-5 w-5" />
          </span>
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground">
            {c.year}
          </span>
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{c.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
      </div>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Credentials" title="Certifications" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <Card key={c.title} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
