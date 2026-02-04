"use client";

import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-sm font-medium">
          logo
        </div>
        <h1 className="text-lg font-semibold">Turph-app</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
