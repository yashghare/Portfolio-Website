import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/site/Background";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { Projects } from "@/components/site/Projects";
import { DataViz } from "@/components/site/DataViz";
import { Experience } from "@/components/site/Experience";
import { Certifications } from "@/components/site/Certifications";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash Ghare — Data Analyst & Data Scientist Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Yash Ghare — Data Analyst, Data Scientist & BI enthusiast. SQL, Python, Power BI, Machine Learning. Projects, dashboards and case studies.",
      },
      { property: "og:title", content: "Yash Ghare — Data Analyst & Data Scientist" },
      {
        property: "og:description",
        content: "Data products, dashboards and ML projects by Yash Ghare.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Background />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <DataViz />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}
