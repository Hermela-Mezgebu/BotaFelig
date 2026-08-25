import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function Hero() {
  const heroVideo = process.env.NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_URL;

  return (
    <section
      id="explore"
      className="relative isolate min-h-[680px] overflow-hidden bg-slate-950"
    >
      {/* HERO VIDEO */}
      {heroVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* VIDEO OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-orange-950/20
          via-black/10
          to-slate-950/60
          dark:from-orange-950/30
          dark:via-black/30
          dark:to-black/75
        "
        aria-hidden="true"
      />

      {/* DARK OVERLAY */}
      <div
        className="absolute inset-0 bg-black/10 dark:bg-black/20"
        aria-hidden="true"
      />

      {/* HERO CONTENT */}
      <div
        className="
          relative z-10
          mx-auto
          flex
          min-h-[680px]
          w-full
          max-w-7xl
          flex-col
          justify-end
          px-5
          pb-14
          pt-32
          lg:px-8
        "
      >
        {/* SEARCH BOX */}
        <div
          className="
            mx-auto
            w-full
            max-w-5xl
            rounded-2xl
            border
            border-white/30
            bg-white/95
            p-3
            shadow-2xl
            backdrop-blur-xl
            dark:border-slate-700
            dark:bg-slate-900/95
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-3
              md:grid-cols-2
              lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]
            "
          >
            {/* LOCATION */}
            <div className="search-field">
              <label
                htmlFor="location"
                className="search-label"
              >
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="location"
                  type="text"
                  placeholder="City or Area"
                  className="
                    search-input
                    w-full
                    pl-10
                  "
                />
              </div>
            </div>

            {/* TYPE */}
            <div className="search-field">
              <label
                htmlFor="type"
                className="search-label"
              >
                Type
              </label>

              <div className="relative">
                <SlidersHorizontal
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <select
                  id="type"
                  defaultValue="All Types"
                  className="
                    search-input
                    w-full
                    appearance-none
                    pl-10
                    pr-9
                  "
                >
                  <option>All Types</option>
                  <option>Static</option>
                  <option>Digital</option>
                  <option>Wallscape</option>
                  <option>Unipole</option>
                </select>

                <ChevronDown
                  size={16}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />
              </div>
            </div>

            {/* START DATE */}
            <div className="search-field">
              <label
                htmlFor="start-date"
                className="search-label"
              >
                Start Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="start-date"
                  type="date"
                  className="
                    search-input
                    w-full
                    pl-10
                  "
                />
              </div>
            </div>

            {/* END DATE */}
            <div className="search-field">
              <label
                htmlFor="end-date"
                className="search-label"
              >
                End Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="end-date"
                  type="date"
                  className="
                    search-input
                    w-full
                    pl-10
                  "
                />
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <div className="flex items-end">
              <button
                type="button"
                className="
                  flex
                  h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-orange-600
                  px-7
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-orange-600/20
                  transition
                  duration-200
                  hover:bg-orange-700
                  hover:shadow-orange-600/30
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-500
                  focus:ring-offset-2
                  lg:w-auto
                "
              >
                <Search size={18} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* TRUST TEXT */}
        <div className="mt-5 flex justify-center">
          <p
            className="
              text-center
              text-xs
              font-medium
              text-white/70
            "
          >
            Find advertising spaces across Addis Ababa and beyond
          </p>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-24
          bg-gradient-to-t
          from-[#f8f9ff]
          via-[#f8f9ff]/40
          to-transparent
          dark:from-[#0b111b]
          dark:via-[#0b111b]/40
          dark:to-transparent
        "
        aria-hidden="true"
      />
    </section>
  );
}