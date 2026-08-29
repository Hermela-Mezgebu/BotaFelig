import { MapPin } from "lucide-react";

/* =============================================================
   BILLBOARD CARD
============================================================= */

function BillboardCard({
  title,
  location,
  type,
  price,
  image,
}: {
  title: string;
  location: string;
  type: string;
  price: string;
  image: string;
}) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        dark:border-slate-800
        dark:bg-slate-950
        dark:hover:border-slate-700
      "
    >
      {/* Image */}

      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />

        {/* Type badge */}

        <div
          className="
            absolute
            left-3
            top-3
            rounded-full
            border
            border-white/30
            bg-white/90
            px-3
            py-1.5
            text-xs
            font-bold
            text-slate-800
            backdrop-blur

            dark:border-slate-600
            dark:bg-slate-900/90
            dark:text-slate-100
          "
        >
          {type}
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        <h3
          className="
            font-bold
            text-slate-950

            dark:text-white
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-2
            flex
            items-center
            gap-1.5
            text-sm
            text-slate-500

            dark:text-slate-400
          "
        >
          <MapPin size={15} />

          {location}
        </div>

        <div
          className="
            mt-5
            border-t
            border-slate-100
            pt-4

            dark:border-slate-800
          "
        >
          <p
            className="
              text-xs
              font-medium
              text-slate-400
            "
          >
            Starting from
          </p>

          <p
            className="
              mt-1
              text-xl
              font-extrabold
              text-slate-950

              dark:text-white
            "
          >
            ETB {price}

            <span
              className="
                ml-1
                text-xs
                font-medium
                text-slate-400
              "
            >
              /month
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}