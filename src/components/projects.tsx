import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="container-page py-20 sm:py-24">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Selected Projects</h2>
        <p className="mt-2 text-muted">Systems I&apos;ve designed, built, and shipped.</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
