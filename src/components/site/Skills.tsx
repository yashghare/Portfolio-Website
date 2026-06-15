import { motion } from "framer-motion";
import { SectionHeading } from "./About";

const SKILLS = [
  { name: "SQL", value: 95, accent: "from-cyan-400 to-cyan-200" },
  { name: "Excel", value: 95, accent: "from-emerald-400 to-cyan-300" },
  { name: "Python", value: 90, accent: "from-violet-500 to-cyan-400" },
  { name: "Power BI", value: 90, accent: "from-yellow-400 to-orange-400" },
  { name: "Statistics", value: 85, accent: "from-pink-400 to-violet-500" },
  { name: "Machine Learning", value: 80, accent: "from-cyan-400 to-violet-500" },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="My technical stack"
          sub="The tools I reach for when turning ambiguity into answers."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl glass-strong p-6 transition-all hover:-translate-y-1 hover:glow-cyan"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent opacity-60" />
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">{s.name}</span>
                <span className="font-mono text-sm text-[var(--cyan)]">{s.value}%</span>
              </div>
              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 + i * 0.06 }}
                  className={`relative h-full rounded-full bg-gradient-to-r ${s.accent}`}
                >
                  <span
                    className="absolute inset-0 rounded-full opacity-70 blur-md"
                    style={{ background: "inherit" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
