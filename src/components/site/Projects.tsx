import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { MouseEvent } from "react";
import { SectionHeading } from "./About";
import churn from "@/assets/project-churn.jpg";
import sales from "@/assets/project-sales.jpg";
import seg from "@/assets/project-segmentation.jpg";
import wa from "@/assets/project-whatsapp.jpg";
import fin from "@/assets/project-finance.jpg";

const PROJECTS = [
  { title: "Customer Churn Analysis", image: churn, tags: ["Python", "SQL", "Power BI"], desc: "Predicting churn with logistic regression + actionable BI." },
  { title: "Sales Analytics Dashboard", image: sales, tags: ["Power BI", "SQL"], desc: "Executive dashboard with cohort, region & SKU drilldowns." },
  { title: "Customer Segmentation", image: seg, tags: ["Python", "Machine Learning"], desc: "RFM + K-Means clusters that drove a 22% retention lift." },
  { title: "WhatsApp Food Ordering Automation", image: wa, tags: ["n8n", "PostgreSQL", "AI"], desc: "End-to-end ordering bot with AI intent parsing." },
  { title: "Financial Data Analysis", image: fin, tags: ["Python", "Pandas"], desc: "Trend, volatility and anomaly detection on market data." },
];

function TiltCard({ p, idx }: { p: (typeof PROJECTS)[number]; idx: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

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
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: idx * 0.06, duration: 0.55 }}
      className="group relative overflow-hidden rounded-3xl glass-strong p-1 transition-shadow hover:glow-cyan"
    >
      <div className="absolute inset-0 rounded-3xl bg-[image:var(--gradient-primary)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30" />
      <div className="relative overflow-hidden rounded-[1.4rem] bg-[var(--surface)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/30 to-transparent" />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold">{p.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.desc}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-[var(--cyan)]">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium hover:bg-white/10"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full bg-[image:var(--gradient-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--background)]"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          sub="A few of the data products I've shipped end-to-end."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <TiltCard key={p.title} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
