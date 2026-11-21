"use client";

import { ArrowUpRightIcon, GitBranchIcon } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { cn } from "cn";
import type { Project, TopicId } from "@/data/projects";
import { topicLabel } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const spring = { stiffness: 260, damping: 28, mass: 0.4 };

const tone: Record<TopicId, string> = {
  agentic: "bg-topic-agentic",
  spatial: "bg-topic-spatial",
  erp: "bg-topic-erp",
  tools: "bg-topic-tools",
};

const shortTopic: Record<TopicId, string> = {
  agentic: "Agentic",
  spatial: "3D",
  erp: "ERP",
  tools: "Tools",
};

const fullFrame = new Set([
  "impact-compare",
  "keyword-tracker",
  "grocery-first-order-prototype",
]);

export function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, spring);
  const rotateY = useSpring(tiltY, spring);

  function tilt(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    tiltY.set((px - 0.5) * 5);
    tiltX.set((0.5 - py) * 4);
  }

  function reset() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.div
      className="relative h-full hover:z-10 focus-within:z-10"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={tilt}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <Card className="h-full gap-0 py-0">
        <div className="overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1280}
            height={800}
            priority={priority}
            sizes="(min-width: 768px) 42rem, 100vw"
            className={cn(
              "aspect-[4/3] w-full origin-center object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover/card:scale-[1.03]",
              fullFrame.has(project.slug) ? "object-center" : "object-right",
            )}
          />
        </div>
        <CardHeader className="gap-1 px-3 py-2">
          <div className="flex items-center gap-2">
            <CardTitle className="min-w-0 flex-1 truncate text-sm leading-tight" translate="no">
              {project.name}
            </CardTitle>
            <div className="flex shrink-0 items-center gap-1">
              {project.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex h-4 items-center gap-1 rounded-full border border-border px-1.5 text-[10px] leading-none text-muted-foreground"
                >
                  <span aria-hidden="true" className={cn("size-1 rounded-full", tone[topic])} />
                  <span className="sr-only">{topicLabel(topic)}</span>
                  <span aria-hidden="true">{shortTopic[topic]}</span>
                </span>
              ))}
              <Button
                nativeButton={false}
                variant="outline"
                size="icon"
                className="size-7"
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
                className="size-7"
                aria-label={`${project.name} repository, opens in a new tab`}
                render={
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" />
                }
              >
                <GitBranchIcon aria-hidden="true" />
              </Button>
            </div>
          </div>
          <CardDescription className="line-clamp-1 text-xs">
            {project.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
