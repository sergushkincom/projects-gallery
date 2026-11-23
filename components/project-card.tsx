"use client";

import { ArrowUpRightIcon, GitBranchIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "cn";
import { topicLabel, type Project, type TopicId } from "@/data/projects";
import { Button } from "@/components/ui/button";

const iconButton =
  "size-7 border-white/55 bg-black/40 text-white hover:bg-black/60 focus-visible:ring-white";

const tone: Record<TopicId, string> = {
  agentic: "bg-topic-agentic",
  spatial: "bg-topic-spatial",
  erp: "bg-topic-erp",
  tools: "bg-topic-tools",
};

export function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  return (
    <article className="project-card group/card relative overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <Image
        src={project.image}
        alt={project.imageAlt}
        width={1440}
        height={900}
        priority={priority}
        sizes="(min-width: 768px) 42rem, 100vw"
        className="project-card-image block h-auto w-full"
      />
      <div className="project-card-strip absolute inset-x-0 bottom-0 bg-black text-white">
        <div className="flex h-(--project-card-bar) items-center gap-1.5 px-2.5">
          <h2 className="min-w-0 flex-1 truncate text-xs font-medium" translate="no">
            {project.name}
          </h2>
          <Button
            nativeButton={false}
            variant="outline"
            size="icon"
            className={iconButton}
            aria-label={`${project.name} live demo, opens in a new tab`}
            render={
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />
            }
          >
            <ArrowUpRightIcon aria-hidden="true" />
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            size="icon"
            className={iconButton}
            aria-label={`${project.name} repository, opens in a new tab`}
            render={
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" />
            }
          >
            <GitBranchIcon aria-hidden="true" />
          </Button>
        </div>
        <div className="flex items-center gap-2 px-2.5 pt-0.5 pb-2.5">
          <ul className="flex shrink-0 items-center gap-1" aria-label="Topics">
            {project.topics.map((topic) => (
              <li key={topic}>
                <span
                  aria-hidden="true"
                  className={cn("block size-1.5 rounded-full", tone[topic])}
                />
                <span className="sr-only">{topicLabel(topic)}</span>
              </li>
            ))}
          </ul>
          <p className="min-w-0 flex-1 truncate text-xs text-white/90">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}
