import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Credibility } from "@/components/credibility";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { EngineeringApproach } from "@/components/engineering-approach";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Credibility />
        <EngineeringApproach />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
