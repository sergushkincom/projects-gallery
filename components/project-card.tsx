"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { cn } from "cn";
import type { Project } from "@/data/projects";
import { topicLabel } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const spring = { stiffness: 260, damping: 28, mass: 0.4 };

const tone: Record<Project["topics"][number], string> = {
  agentic: "bg-topic-agentic",
  spatial: "bg-topic-spatial",
  erp: "bg-topic-erp",
  tools: "bg-topic-tools",
};

export function ProjectCard({
  project,
  catalog,
  priority,
}: {
  project: Project;
  catalog: string;
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
      <Card className="h-full pt-0">
        <div className="overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1280}
            height={640}
            priority={priority}
            sizes="(min-width: 768px) 42rem, 100vw"
            className="aspect-[2/1] h-auto w-full origin-center object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover/card:scale-[1.03]"
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <span className="tabular-nums text-xs text-muted-foreground">
              {catalog}
            </span>
            <div className="flex flex-wrap justify-end gap-1.5">
              {project.topics.map((topic) => (
                <Badge key={topic} variant="outline">
                  <span
                    aria-hidden="true"
                    className={cn("size-1.5 rounded-full", tone[topic])}
                  />
                  {topicLabel(topic)}
                </Badge>
              ))}
            </div>
          </div>
          <CardTitle translate="no">{project.name}</CardTitle>
          <CardDescription className="line-clamp-3 min-h-[2.5rem]">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto gap-2">
          <Button
            nativeButton={false}
            className="min-h-11 flex-1"
            render={
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Live
            <span className="sr-only">, opens in a new tab</span>
            <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            className="min-h-11 flex-1"
            render={
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Repo
            <span className="sr-only">, opens in a new tab</span>
            <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
