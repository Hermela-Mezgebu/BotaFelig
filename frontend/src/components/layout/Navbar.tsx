import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-zinc-200/80
        bg-white/85 backdrop-blur-xl
        transition-colors duration-300

        dark:border-zinc-800/80
        dark:bg-zinc-950/85
      "
    >
      <div
        className="
          mx-auto flex h-20 max-w-7xl
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* ================= LOGO ================= */}
        <Logo />

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden items-center gap-7 lg:flex">
          {/* Explore */}
          <a
            href="#explore"
            className="
              relative py-2
              text-sm font-bold
              text-[#A04100]
              transition-colors duration-200
              hover:text-[#FD7C33]

              dark:text-[#FD7C33]
              dark:hover:text-[#FF9B68]

              after:absolute
              after:bottom-0
              after:left-0
              after:h-0.5
              after:w-full
              after:rounded-full
              after:bg-[#A04100]
              after:content-['']

              dark:after:bg-[#FD7C33]
            "
          >
            Explore
          </a>

          {/* Map */}
          <a
            href="#map"
            className="
              py-2
              text-sm font-medium
              text-zinc-600
              transition-colors duration-200
              hover:text-[#A04100]

              dark:text-zinc-300
              dark:hover:text-[#FD7C33]
            "
          >
            Map
          </a>

          {/* How It Works */}
          <a
            href="#how-it-works"
            className="
              py-2
              text-sm font-medium
              text-zinc-600
              transition-colors duration-200
              hover:text-[#A04100]

              dark:text-zinc-300
              dark:hover:text-[#FD7C33]
            "
          >
            How It Works
          </a>

          {/* My Bookings */}
          <a
            href="#bookings"
            className="
              py-2
              text-sm font-medium
              text-zinc-600
              transition-colors duration-200
              hover:text-[#A04100]

              dark:text-zinc-300
              dark:hover:text-[#FD7C33]
            "
          >
            My Bookings
          </a>

          {/* For Owners */}
          <a
            href="#owners"
            className="
              py-2
              text-sm font-medium
              text-zinc-600
              transition-colors duration-200
              hover:text-[#A04100]

              dark:text-zinc-300
              dark:hover:text-[#FD7C33]
            "
          >
            For Owners
          </a>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Login */}
          <a
            href="/login"
            className="
              hidden
              rounded-lg
              border border-zinc-300
              bg-white
              px-4 py-2.5
              text-sm font-bold
              text-zinc-800
              transition-all duration-200

              hover:border-[#A04100]
              hover:text-[#A04100]
              hover:shadow-sm

              sm:block

              dark:border-zinc-700
              dark:bg-zinc-900
              dark:text-zinc-100

              dark:hover:border-[#FD7C33]
              dark:hover:text-[#FD7C33]
            "
          >
            Login
          </a>

          {/* Get Started */}
          <a
            href="/register"
            className="
              hidden
              rounded-lg
              bg-[#A04100]
              px-5 py-2.5
              text-sm font-bold
              text-white
              shadow-sm
              transition-all duration-200

              hover:bg-[#8B3800]
              hover:shadow-md
              hover:-translate-y-0.5

              sm:block

              dark:bg-[#FD7C33]
              dark:text-zinc-950

              dark:hover:bg-[#FF985E]
            "
          >
            Get Started
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              border border-zinc-200
              bg-white
              text-zinc-700
              transition-colors

              hover:border-zinc-300
              hover:bg-zinc-50

              lg:hidden

              dark:border-zinc-700
              dark:bg-zinc-900
              dark:text-zinc-200

              dark:hover:bg-zinc-800
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}