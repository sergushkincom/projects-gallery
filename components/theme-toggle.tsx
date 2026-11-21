"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="relative size-11"
      aria-label="Toggle color theme"
      onClick={() => {
        const dark = document.documentElement.classList.contains("dark");
        setTheme(dark ? "light" : "dark");
      }}
    >
      <SunIcon className="dark:hidden" data-icon="inline-start" aria-hidden="true" />
      <MoonIcon
        className="hidden dark:block"
        data-icon="inline-start"
        aria-hidden="true"
      />
    </Button>
  );
}
