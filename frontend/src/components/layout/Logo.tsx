import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group"
      aria-label="BotaFelig Home"
    >
      <Image
        src="/logo.png"
        alt="BotaFelig logo"
        width={42}
        height={42}
        priority
        className="transition-transform duration-300 group-hover:scale-105"
      />

      <div className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
          Bota<span className="text-[#A04100] dark:text-[#FD7C33]">Felig</span>
        </span>

        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          Outdoor Advertising
        </span>
      </div>
    </Link>
  );
}