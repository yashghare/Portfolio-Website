import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "./About";

const ITEMS = [
  {
    when: "2024 — Present",
    role: "Data Analyst Intern",
    org: "FinTech Startup",
    text: "Built churn models and KPI dashboards used by leadership weekly. Automated reporting pipelines (Python + Airflow).",
  },
  {
    when: "2023",
    role: "BI Developer (Freelance)",
    org: "Retail Client",
    text: "Designed Power BI dashboards with row-level security; cut weekly reporting time by 70%.",
  },
  {
    when: "2022",
    role: "Data Science Trainee",
    org: "Online Bootcamp",
    text: "Hands-on ML, statistics and SQL across 12+ end-to-end capstone projects.",
  },
  {
    when: "2021",
    role: "B.Tech, Data Science",
    org: "University",
    text: "Foundation in math, statistics, programming and data engineering.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Journey" title="Experience & Education" />
        <div className="relative mt-14">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--cyan)] via-[var(--violet)] to-transparent md:left-1/2" />
          <ul className="space-y-10">
            {ITEMS.map((it, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={it.role}
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-2 ${
                    right ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className={`md:px-8 ${right ? "md:text-left" : "md:text-right"}`}>
                    <div className="hidden md:block">
                      <div className="font-mono text-xs text-[var(--cyan)]">{it.when}</div>
                      <div className="mt-1 font-display text-lg font-semibold">{it.role}</div>
                      <div className="text-sm text-muted-foreground">{it.org}</div>
                    </div>
                  </div>

                  <div className="relative md:px-8">
                    <span className="absolute left-0 top-2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-[var(--background)] ring-2 ring-[var(--cyan)] md:left-0">
                      <Briefcase className="h-3.5 w-3.5 text-[var(--cyan)]" />
                    </span>
                    <div className="ml-6 rounded-2xl glass-strong p-4 md:ml-4">
                      <div className="md:hidden">
                        <div className="font-mono text-xs text-[var(--cyan)]">{it.when}</div>
                        <div className="mt-1 font-display text-lg font-semibold">{it.role}</div>
                        <div className="text-sm text-muted-foreground">{it.org}</div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground md:mt-0">{it.text}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
