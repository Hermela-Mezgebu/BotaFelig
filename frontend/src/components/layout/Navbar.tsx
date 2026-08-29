import Link from "next/link";

import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}

        <Logo />

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-7 lg:flex">
          {/* Explore */}

          <a
            href="#explore"
            className="text-sm font-semibold text-[#A04100] transition-colors hover:text-[#FD7C33] dark:text-[#FD7C33]"
          >
            Explore
          </a>

          {/* Billboards */}

          <Link
            href="/billboards"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#A04100] dark:text-zinc-300 dark:hover:text-[#FD7C33]"
          >
            Billboards
          </Link>

          {/* Map */}

          <a
            href="#map"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#A04100] dark:text-zinc-300 dark:hover:text-[#FD7C33]"
          >
            Map
          </a>

          {/* How It Works */}

          <a
            href="#how-it-works"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#A04100] dark:text-zinc-300 dark:hover:text-[#FD7C33]"
          >
            How It Works
          </a>

          {/* My Bookings */}

          <a
            href="#bookings"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#A04100] dark:text-zinc-300 dark:hover:text-[#FD7C33]"
          >
            My Bookings
          </a>

          {/* For Owners */}

          <a
            href="#owners"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#A04100] dark:text-zinc-300 dark:hover:text-[#FD7C33]"
          >
            For Owners
          </a>
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}

          <ThemeToggle />

          {/* Login */}

          <Link
            href="/login"
            className="hidden rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-bold text-zinc-700 transition-all hover:border-[#A04100] hover:text-[#A04100] sm:block dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-[#FD7C33] dark:hover:text-[#FD7C33]"
          >
            Login
          </Link>

          {/* Get Started */}

          <Link
            href="/signup"
            className="hidden rounded-full bg-[#A04100] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#8b3800] sm:block dark:bg-[#FD7C33] dark:text-zinc-950 dark:hover:bg-[#ff985e]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}