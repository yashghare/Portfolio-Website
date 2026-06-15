import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { SectionHeading } from "./About";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
);

const CYAN = "rgb(0,212,255)";
const VIOLET = "rgb(124,58,237)";
const GRID = "rgba(255,255,255,0.06)";
const TICK = "rgba(148,163,184,0.8)";

const baseOpts = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1400, easing: "easeOutQuart" as const },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(15,23,42,0.95)",
      borderColor: "rgba(255,255,255,0.1)",
      borderWidth: 1,
    },
  },
  scales: {
    x: { grid: { color: GRID }, ticks: { color: TICK } },
    y: { grid: { color: GRID }, ticks: { color: TICK } },
  },
};

function VizCard({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="rounded-2xl glass-strong p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold tracking-wide">{title}</h3>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-mono text-[var(--cyan)]">LIVE</span>
      </div>
      <div className="h-[260px]">{inView && children}</div>
    </motion.div>
  );
}

export function DataViz() {
  const [labels] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]);

  const salesData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: [42, 55, 51, 68, 73, 85, 92, 105],
        borderColor: CYAN,
        backgroundColor: (ctx: { chart: { ctx: CanvasRenderingContext2D } }) => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 260);
          g.addColorStop(0, "rgba(0,212,255,0.45)");
          g.addColorStop(1, "rgba(0,212,255,0)");
          return g;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2.5,
      },
    ],
  };

  const growthData = {
    labels,
    datasets: [
      {
        label: "New",
        data: [120, 180, 240, 310, 360, 440, 520, 610],
        backgroundColor: CYAN,
        borderRadius: 6,
      },
      {
        label: "Returning",
        data: [80, 110, 150, 190, 230, 280, 340, 420],
        backgroundColor: VIOLET,
        borderRadius: 6,
      },
    ],
  };

  const revenueShare = {
    labels: ["Subscriptions", "Services", "One-off", "Other"],
    datasets: [
      {
        data: [44, 26, 20, 10],
        backgroundColor: [CYAN, VIOLET, "rgba(0,212,255,0.5)", "rgba(124,58,237,0.5)"],
        borderColor: "transparent",
      },
    ],
  };

  useEffect(() => {
    // ensure chart resize after fonts load
    setTimeout(() => window.dispatchEvent(new Event("resize")), 200);
  }, []);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Visualizations"
          title="Data in motion"
          sub="A taste of the chart styles I build into dashboards."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <VizCard title="Sales Trend">
            <Line data={salesData} options={baseOpts} />
          </VizCard>
          <VizCard title="Customer Growth">
            <Bar data={growthData} options={baseOpts} />
          </VizCard>
          <VizCard title="Revenue Analysis">
            <Doughnut
              data={revenueShare}
              options={{
                ...baseOpts,
                scales: undefined,
                plugins: {
                  ...baseOpts.plugins,
                  legend: { display: true, position: "bottom", labels: { color: TICK, boxWidth: 10 } },
                },
              }}
            />
          </VizCard>
        </div>
      </div>
    </section>
  );
}
