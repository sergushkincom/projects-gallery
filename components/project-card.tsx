"use client";

import { ArrowUpRightIcon, GitBranchIcon } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";

const iconButton =
  "size-7 border-white/55 bg-black/40 text-white hover:bg-black/60 focus-visible:ring-white";

export function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  return (
    <article className="group/card relative overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <Image
        src={project.image}
        alt={project.imageAlt}
        width={1440}
        height={900}
        priority={priority}
        sizes="(min-width: 768px) 42rem, 100vw"
        className="block h-auto w-full"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-black/80 px-2.5 py-1.5">
        <h2 className="min-w-0 flex-1 truncate text-xs font-medium text-white" translate="no">
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
    </article>
  );
}
