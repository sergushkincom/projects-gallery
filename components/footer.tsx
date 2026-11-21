import { projects } from "@/data/projects";

const textLink =
  "underline decoration-border underline-offset-4 transition-[text-decoration-color] duration-150 ease-out hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="tabular-nums">{projects.length} live prototypes</p>
        <a
          href="https://github.com/sergushkincom/sergushkincom#by-topic"
          className={textLink}
        >
          Topics from the profile
        </a>
      </div>
    </footer>
  );
}
