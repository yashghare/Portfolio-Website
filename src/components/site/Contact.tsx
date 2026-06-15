import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";
import { SectionHeading } from "./About";

const LINKS = [
  { icon: Mail, label: "Email", value: "yash.ghare@example.com", href: "mailto:yash.ghare@example.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/yashghare", href: "#" },
  { icon: Github, label: "GitHub", value: "github.com/yashghare", href: "#" },
  { icon: ExternalLink, label: "Kaggle", value: "kaggle.com/yashghare", href: "#" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something with data"
          sub="Open to full-time roles, contract work and interesting collaborations."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-3xl glass-strong p-8 md:p-12"
        >
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--cyan)] opacity-20 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[var(--violet)] opacity-20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Have a project or role in mind?
              </h3>
              <p className="mt-3 text-muted-foreground">
                The fastest way to reach me is email — I usually reply within a day.
              </p>
              <a
                href="mailto:yash.ghare@example.com"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] glow-cyan transition-transform hover:scale-105"
              >
                <Mail className="h-4 w-4" /> Say hello
              </a>
            </div>
            <ul className="grid gap-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group flex items-center gap-3 rounded-2xl glass p-4 transition-all hover:-translate-y-0.5 hover:glow-cyan"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-[var(--cyan)] transition-all group-hover:bg-[image:var(--gradient-primary)] group-hover:text-[var(--background)]">
                      <l.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">{l.label}</div>
                      <div className="truncate text-sm font-medium">{l.value}</div>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        <footer className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Yash Ghare · Built with React, Framer Motion & Chart.js
        </footer>
      </div>
    </section>
  );
}
