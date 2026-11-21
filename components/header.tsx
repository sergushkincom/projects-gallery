import { ThemeToggle } from "@/components/theme-toggle";

const textLink =
  "inline-flex min-h-11 items-center underline decoration-border underline-offset-4 transition-[text-decoration-color] duration-150 ease-out hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 max-w-2xl flex-col gap-3">
          <h1
            className="font-serif text-4xl font-medium tracking-tight text-balance sm:text-6xl"
            translate="no"
          >
            Denys Sergushkin
          </h1>
          <p className="text-lg text-pretty text-muted-foreground sm:text-xl">
            Interfaces for software that acts on its own: an agent does part of
            the work, and a person stays in charge.
          </p>
        </div>
        <nav aria-label="Profile" className="flex shrink-0 items-center gap-4">
          <a href="https://sergushkin.com" className={textLink}>
            sergushkin.com
          </a>
          <a href="https://github.com/sergushkincom" className={textLink}>
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
