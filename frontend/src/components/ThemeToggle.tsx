"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      document.documentElement.classList.toggle(
        "dark",
        prefersDark,
      );

      setIsDark(prefersDark);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;

    document.documentElement.classList.toggle(
      "dark",
      nextTheme,
    );

    localStorage.setItem(
      "theme",
      nextTheme ? "dark" : "light",
    );

    setIsDark(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        flex h-10 w-10 items-center justify-center
        rounded-full
        border border-slate-200
        bg-white
        text-slate-700
        shadow-sm
        transition-all
        hover:bg-slate-100

        dark:border-slate-700
        dark:bg-slate-900
        dark:text-slate-200
        dark:hover:bg-slate-800
      "
    >
      {isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}