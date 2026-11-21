"use client";

import { ArrowUpRightIcon, GitBranchIcon } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { cn } from "cn";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";

const spring = { stiffness: 260, damping: 28, mass: 0.4 };

const fullFrame = new Set([
  "impact-compare",
  "keyword-tracker",
  "grocery-first-order-prototype",
]);

const iconButton =
  "size-8 border-white/55 bg-black/35 text-white hover:bg-black/55 focus-visible:ring-white";

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
      <article className="group/card relative h-full overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={1280}
          height={960}
          priority={priority}
          sizes="(min-width: 768px) 42rem, 100vw"
          className={cn(
            "aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover/card:scale-[1.03]",
            fullFrame.has(project.slug) ? "object-center" : "object-right",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3 pt-10 pb-2.5",
            "motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out",
            "[@media(hover:hover)_and_(pointer:fine)]:opacity-0",
            "[@media(hover:hover)_and_(pointer:fine)]:group-hover/card:opacity-100",
            "[@media(hover:hover)_and_(pointer:fine)]:group-focus-within/card:opacity-100",
          )}
        >
          <h2 className="min-w-0 flex-1 truncate text-sm font-medium text-white" translate="no">
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
    </motion.div>
  );
}
