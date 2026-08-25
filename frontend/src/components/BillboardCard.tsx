import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  Maximize2,
  Monitor,
} from "lucide-react";

import type { Billboard } from "@/data/billboards";

type BillboardCardProps = {
  billboard: Billboard;
  listView?: boolean;
};

export default function BillboardCard({
  billboard,
  listView = false,
}: BillboardCardProps) {
  /*
   * =========================================================
   * LIST VIEW
   * =========================================================
   */
  if (listView) {
    return (
      <article
        className="
          group flex flex-col overflow-hidden rounded-2xl
          border border-zinc-200/80 bg-white
          shadow-sm transition-all duration-300
          hover:border-orange-200 hover:shadow-lg

          dark:border-zinc-800
          dark:bg-zinc-900
          dark:hover:border-orange-900

          md:flex-row
        "
      >
        {/* Image */}
        <div
          className="
            relative h-56 w-full shrink-0 overflow-hidden

            md:h-auto md:w-72
            lg:w-80
          "
        >
          <img
            src={billboard.image}
            alt={billboard.title}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          {/* Image overlay */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/50
              via-transparent
              to-transparent
            "
          />

          {/* Type */}
          <div
            className="
              absolute left-4 top-4
              flex items-center gap-1.5
              rounded-full
              bg-white/95
              px-3 py-1.5
              text-xs font-bold
              text-zinc-900
              shadow-sm
              backdrop-blur-md

              dark:bg-zinc-950/90
              dark:text-white
            "
          >
            <Monitor className="h-3.5 w-3.5" />
            {billboard.type}
          </div>

          {/* Availability */}
          <div
            className="
              absolute bottom-4 left-4
              rounded-full
              bg-emerald-500
              px-3 py-1.5
              text-xs font-bold
              text-white
              shadow-sm
            "
          >
            {billboard.availability}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="
                  text-xl font-bold leading-tight
                  text-zinc-950
                  dark:text-white
                "
              >
                {billboard.title}
              </h3>

              <div
                className="
                  mt-2 flex items-center gap-1.5
                  text-sm
                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                <MapPin className="h-4 w-4 shrink-0" />
                {billboard.location}
              </div>
            </div>

            {/* Favorite */}
            <button
              type="button"
              aria-label={`Add ${billboard.title} to favorites`}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                border border-zinc-200
                text-zinc-500
                transition

                hover:border-red-200
                hover:text-red-500

                dark:border-zinc-700
                dark:text-zinc-400
                dark:hover:border-red-900
                dark:hover:text-red-400
              "
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          {/* Information */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {/* Size */}
            <div
              className="
                rounded-xl
                bg-zinc-50
                p-3
                dark:bg-zinc-800/70
              "
            >
              <div
                className="
                  flex items-center gap-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-zinc-400
                "
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Size
              </div>

              <p
                className="
                  mt-1 text-sm font-semibold
                  text-zinc-800
                  dark:text-zinc-200
                "
              >
                {billboard.size}
              </p>
            </div>

            {/* Type */}
            <div
              className="
                rounded-xl
                bg-zinc-50
                p-3
                dark:bg-zinc-800/70
              "
            >
              <div
                className="
                  flex items-center gap-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-zinc-400
                "
              >
                <Monitor className="h-3.5 w-3.5" />
                Type
              </div>

              <p
                className="
                  mt-1 truncate
                  text-sm font-semibold
                  text-zinc-800
                  dark:text-zinc-200
                "
              >
                {billboard.type}
              </p>
            </div>

            {/* City */}
            <div
              className="
                hidden rounded-xl
                bg-zinc-50
                p-3
                sm:block
                dark:bg-zinc-800/70
              "
            >
              <div
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-zinc-400
                "
              >
                City
              </div>

              <p
                className="
                  mt-1 text-sm font-semibold
                  text-zinc-800
                  dark:text-zinc-200
                "
              >
                Addis Ababa
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="
              mt-auto
              flex flex-col gap-4
              border-t border-zinc-200
              pt-4

              sm:flex-row
              sm:items-end
              sm:justify-between

              dark:border-zinc-800
            "
          >
            <div>
              <p
                className="
                  text-xs font-medium
                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                Starting from
              </p>

              <div className="mt-1 flex items-baseline">
                <span
                  className="
                    text-xl font-black
                    text-zinc-950
                    dark:text-white
                  "
                >
                  ETB {billboard.price.toLocaleString()}
                </span>

                <span
                  className="
                    ml-1 text-sm font-medium
                    text-zinc-500
                    dark:text-zinc-400
                  "
                >
                  /mo
                </span>
              </div>
            </div>

            <Link
              href={`/billboards/${billboard.id}`}
              className="
                flex items-center justify-center
                gap-1.5 rounded-xl
                bg-[#A04100]
                px-5 py-2.5
                text-sm font-bold
                text-white
                transition-all

                hover:bg-[#8b3800]
                hover:shadow-lg

                dark:bg-[#FD7C33]
                dark:text-zinc-950
                dark:hover:bg-[#ff985e]
              "
            >
              View Details

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  /*
   * =========================================================
   * GRID VIEW
   * =========================================================
   */
  return (
    <article
      className="
        group flex h-full flex-col overflow-hidden
        rounded-2xl
        border border-zinc-200/80
        bg-white
        shadow-sm
        transition-all duration-300

        hover:-translate-y-1
        hover:border-orange-200
        hover:shadow-xl
        hover:shadow-orange-950/10

        dark:border-zinc-800
        dark:bg-zinc-900
        dark:hover:border-orange-900
        dark:hover:shadow-black/30
      "
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={billboard.image}
          alt={billboard.title}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-x-0 bottom-0
            h-28
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
          "
        />

        {/* Type */}
        <div
          className="
            absolute left-4 top-4
            flex items-center gap-1.5
            rounded-full
            bg-white/95
            px-3 py-1.5
            text-xs font-bold
            text-zinc-900
            shadow-sm
            backdrop-blur-md

            dark:bg-zinc-950/90
            dark:text-white
          "
        >
          <Monitor className="h-3.5 w-3.5" />
          {billboard.type}
        </div>

        {/* Favorite */}
        <button
          type="button"
          aria-label={`Add ${billboard.title} to favorites`}
          className="
            absolute right-4 top-4
            flex h-9 w-9
            items-center justify-center
            rounded-full
            bg-white/95
            text-zinc-600
            shadow-sm
            backdrop-blur-md
            transition-all

            hover:bg-white
            hover:text-red-500
            hover:scale-105

            dark:bg-zinc-950/90
            dark:text-zinc-300
            dark:hover:bg-zinc-900
            dark:hover:text-red-400
          "
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Availability */}
        <div
          className="
            absolute bottom-4 left-4
            rounded-full
            bg-emerald-500
            px-3 py-1.5
            text-xs font-bold
            text-white
            shadow-sm
          "
        >
          {billboard.availability}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3
          className="
            line-clamp-2
            text-lg font-bold leading-tight
            text-zinc-950
            dark:text-white
          "
        >
          {billboard.title}
        </h3>

        {/* Location */}
        <div
          className="
            mt-2
            flex items-center gap-1.5
            text-sm
            text-zinc-500
            dark:text-zinc-400
          "
        >
          <MapPin className="h-4 w-4 shrink-0" />

          <span>{billboard.location}</span>
        </div>

        {/* Details */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          {/* Size */}
          <div
            className="
              rounded-xl
              bg-zinc-50
              p-3
              dark:bg-zinc-800/70
            "
          >
            <div
              className="
                flex items-center gap-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-zinc-400
              "
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Size
            </div>

            <p
              className="
                mt-1 text-sm font-semibold
                text-zinc-800
                dark:text-zinc-200
              "
            >
              {billboard.size}
            </p>
          </div>

          {/* Type */}
          <div
            className="
              rounded-xl
              bg-zinc-50
              p-3
              dark:bg-zinc-800/70
            "
          >
            <div
              className="
                flex items-center gap-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-zinc-400
              "
            >
              <Monitor className="h-3.5 w-3.5" />
              Type
            </div>

            <p
              className="
                mt-1 truncate
                text-sm font-semibold
                text-zinc-800
                dark:text-zinc-200
              "
            >
              {billboard.type}
            </p>
          </div>
        </div>

        {/* Price */}
        <div
          className="
            mt-auto
            flex items-end justify-between
            gap-4
            border-t
            border-zinc-200
            pt-4
            dark:border-zinc-800
          "
        >
          <div>
            <p
              className="
                text-xs font-medium
                text-zinc-500
                dark:text-zinc-400
              "
            >
              Starting from
            </p>

            <div className="mt-1 flex items-baseline">
              <span
                className="
                  text-xl font-black
                  text-zinc-950
                  dark:text-white
                "
              >
                ETB {billboard.price.toLocaleString()}
              </span>

              <span
                className="
                  ml-1 text-sm font-medium
                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                /mo
              </span>
            </div>
          </div>

          {/* Details */}
          <Link
            href={`/billboards/${billboard.id}`}
            className="
              flex shrink-0
              items-center gap-1.5
              rounded-xl
              bg-[#A04100]
              px-4 py-2.5
              text-sm font-bold
              text-white
              transition-all

              hover:bg-[#8b3800]
              hover:shadow-lg
              hover:shadow-orange-900/20

              dark:bg-[#FD7C33]
              dark:text-zinc-950
              dark:hover:bg-[#ff985e]
              dark:hover:shadow-orange-500/20
            "
          >
            Details

            <ArrowRight
              className="
                h-4 w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </article>
  );
}