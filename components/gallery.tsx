"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { cn } from "cn";
import {
  filterProjects,
  parseTopics,
  projects,
  topicCount,
  topics,
  type TopicId,
} from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

const tone: Record<TopicId, string> = {
  agentic: "bg-topic-agentic",
  spatial: "bg-topic-spatial",
  erp: "bg-topic-erp",
  tools: "bg-topic-tools",
};

function summary(count: number, total: number) {
  if (count === total) return `Showing all ${total} prototypes`;
  return `Showing ${count} of ${total} prototypes`;
}

function writeTopics(next: TopicId[]) {
  const params = new URLSearchParams();
  for (const topic of next) params.append("topic", topic);
  const query = params.toString();
  const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.pushState(null, "", url);
}

export function Gallery() {
  const searchParams = useSearchParams();
  return (
    <GalleryView
      initial={parseTopics(searchParams.getAll("topic"))}
      active
    />
  );
}

export function GalleryFallback() {
  return <GalleryView initial={[]} active={false} />;
}

function GalleryView({
  initial,
  active,
}: {
  initial: TopicId[];
  active: boolean;
}) {
  const [selected, setSelected] = useState(initial);
  const reduceMotion = useReducedMotion();
  const instant = reduceMotion === true;
  const visible = filterProjects(projects, selected);
  const status = summary(visible.length, projects.length);

  useLayoutEffect(() => {
    if (!active) return;
    document.documentElement.removeAttribute("data-topics");
    function onPop() {
      setSelected(
        parseTopics(new URLSearchParams(window.location.search).getAll("topic")),
      );
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [active]);

  function commit(next: TopicId[]) {
    writeTopics(next);
    setSelected(next);
  }

  function toggle(id: TopicId) {
    const next = topics
      .map((topic) => topic.id)
      .filter((topicId) =>
        topicId === id ? !selected.includes(id) : selected.includes(topicId),
      );
    commit(next);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const chips = [
      ...event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-chip]"),
    ];
    const index = chips.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? chips.length - 1
          : event.key === "ArrowRight" || event.key === "ArrowDown"
            ? (index + 1) % chips.length
            : (index - 1 + chips.length) % chips.length;
    chips[next]?.focus();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-20 -mx-4 border-b bg-background px-4 py-3 sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3">
          <div
            role="group"
            aria-label="Filter by topic"
            className="flex flex-wrap gap-2"
            onKeyDown={onKeyDown}
          >
            <Button
              type="button"
              data-chip="all"
              variant={selected.length === 0 ? "default" : "outline"}
              aria-pressed={selected.length === 0}
              className="min-h-11 px-3.5"
              onClick={() => commit([])}
            >
              All
              <span className="tabular-nums opacity-70">{projects.length}</span>
            </Button>
            {topics.map((topic) => {
              const pressed = selected.includes(topic.id);
              return (
                <Button
                  key={topic.id}
                  type="button"
                  data-chip={topic.id}
                  variant={pressed ? "default" : "outline"}
                  aria-pressed={pressed}
                  className="min-h-11 px-3.5"
                  onClick={() => toggle(topic.id)}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1.5 rounded-full",
                      pressed ? "bg-primary-foreground" : tone[topic.id],
                    )}
                  />
                  {topic.label}
                  <span className="tabular-nums opacity-70">
                    {topicCount(topic.id)}
                  </span>
                </Button>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
            {status}
          </p>
        </div>
      </div>

      {visible.length === 0 ? (
        <Empty className="min-h-64 border">
          <EmptyHeader>
            <EmptyTitle>Nothing in this mix</EmptyTitle>
            <EmptyDescription>
              Those topics have no live prototype. Show the full list.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" className="min-h-11" onClick={() => commit([])}>
              Show all
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => {
              const catalog = String(
                projects.findIndex((item) => item.slug === project.slug) + 1,
              ).padStart(2, "0");
              return (
                <motion.li
                  key={project.slug}
                  layout={!instant}
                  data-project={project.topics.join(" ")}
                  className="min-w-0 scroll-mt-28"
                  initial={instant ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={instant ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={
                    instant
                      ? { duration: 0 }
                      : { type: "spring", duration: 0.28, bounce: 0 }
                  }
                >
                  <ProjectCard
                    project={project}
                    catalog={catalog}
                    priority={index < 2}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
