"use client";

import {
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Megaphone,
  Search,
  SlidersHorizontal,
  TicketCheck,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  const heroVideo =
  process.env.NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_URL;
  return (
    <main
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#f8f9ff]
        text-slate-950
        transition-colors
        duration-300

        dark:bg-[#080d16]
        dark:text-white
      "
    >
      {/* =========================================================
          NAVIGATION
      ========================================================== */}

      <Navbar />

<Hero/>

      {/* =========================================================
          POPULAR LOCATIONS
      ========================================================== */}

      <section
        id="locations"
        className="
          bg-white
          px-5
          py-20
          transition-colors
          duration-300

          dark:bg-[#080d16]
          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">

          <div
            className="
              mb-10
              flex
              flex-col
              justify-between
              gap-5
              sm:flex-row
              sm:items-end
            "
          >
            <div>
              <p
                className="
                  mb-2
                  text-sm
                  font-bold
                  uppercase
                  tracking-widest
                  text-orange-600
                  dark:text-orange-400
                "
              >
                Explore Ethiopia
              </p>

              <h2
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-950
                  sm:text-4xl

                  dark:text-white
                "
              >
                Popular Locations
              </h2>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-500
                  sm:text-base

                  dark:text-slate-400
                "
              >
                Find high-traffic areas where your brand can get
                maximum visibility.
              </p>
            </div>

            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                text-sm
                font-bold
                text-orange-600
                transition
                hover:text-orange-700

                dark:text-orange-400
                dark:hover:text-orange-300
              "
            >
              View all

              <ArrowRight size={17} />
            </button>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            <LocationCard
              name="Bole"
              description="Airport Road"
              image="https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1000&q=80"
            />

            <LocationCard
              name="Kazanchis"
              description="Business District"
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
            />

            <LocationCard
              name="Megenagna"
              description="Major Transport Hub"
              image="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=80"
            />

            <LocationCard
              name="Mexico"
              description="Mexico Square"
              image="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80"
            />

            <LocationCard
              name="Piassa"
              description="Central Addis Ababa"
              image="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80"
            />

            <LocationCard
              name="CMC"
              description="CMC Road"
              image="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1000&q=80"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED BILLBOARDS
      ========================================================== */}

      <section
        id="explore"
        className="
          bg-slate-50
          px-5
          py-20
          transition-colors
          duration-300

          dark:bg-slate-900

          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <p
              className="
                mb-2
                text-sm
                font-bold
                uppercase
                tracking-widest
                text-orange-600

                dark:text-orange-400
              "
            >
              Featured Spaces
            </p>

            <h2
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-slate-950
                sm:text-4xl

                dark:text-white
              "
            >
              Premium Billboards
            </h2>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-slate-500
                sm:text-base

                dark:text-slate-400
              "
            >
              Explore advertising spaces currently available for
              your next campaign.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <BillboardCard
              title="Premium Roadside"
              location="Bole, Airport Road"
              type="Static"
              price="45,000"
              image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80"
            />

            <BillboardCard
              title="LED Building Screen"
              location="Mexico Square"
              type="Digital"
              price="85,000"
              image="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80"
            />

            <BillboardCard
              title="Massive Wallscape"
              location="Megenagna"
              type="Wallscape"
              price="120,000"
              image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80"
            />

            <BillboardCard
              title="Suburban Unipole"
              location="CMC Road"
              type="Static"
              price="35,000"
              image="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=80"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}

      <section
        id="how-it-works"
        className="
          bg-[#f7f8ff]
          px-5
          py-24
          transition-colors
          duration-300

          dark:bg-[#0b1220]

          lg:px-8
        "
      >
        <div className="mx-auto max-w-7xl text-center">

          <p
            className="
              mb-2
              text-sm
              font-bold
              uppercase
              tracking-widest
              text-orange-600

              dark:text-orange-400
            "
          >
            Simple Process
          </p>

          <h2
            className="
              text-3xl
              font-extrabold
              tracking-tight
              text-slate-950
              sm:text-4xl

              dark:text-white
            "
          >
            How It Works
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base

              dark:text-slate-400
            "
          >
            The simplest way to plan, book, and launch your
            out-of-home advertising campaign.
          </p>

          {/* Steps */}

          <div className="relative mt-16">

            {/* Connecting line */}

            <div
              className="
                absolute
                left-[12%]
                right-[12%]
                top-8
                hidden
                h-px
                bg-slate-200

                dark:bg-slate-700

                md:block
              "
            />

            <div
              className="
                grid
                grid-cols-1
                gap-12
                md:grid-cols-4
                md:gap-6
              "
            >
              <HowStep
                number="1"
                title="Search"
                description="Browse our extensive inventory of premium billboard locations."
                icon={
                  <Search
                    size={22}
                    strokeWidth={2.5}
                  />
                }
              />

              <HowStep
                number="2"
                title="Compare"
                description="Evaluate prices, visibility, locations, and availability side-by-side."
                icon={
                  <ArrowLeftRight
                    size={22}
                    strokeWidth={2.5}
                  />
                }
              />

              <HowStep
                number="3"
                title="Book"
                description="Securely reserve your chosen advertising space online in minutes."
                icon={
                  <TicketCheck
                    size={22}
                    strokeWidth={2.5}
                  />
                }
              />

              <HowStep
                number="4"
                title="Advertise"
                description="Launch your campaign and reach thousands of potential customers."
                icon={
                  <Megaphone
                    size={22}
                    strokeWidth={2.5}
                  />
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}

      <section
        id="owners"
        className="
          bg-white
          px-5
          py-20
          transition-colors
          duration-300

          dark:bg-[#080d16]

          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-3xl
            bg-slate-950
            px-7
            py-14
            text-center
            shadow-xl
            shadow-slate-950/10

            dark:border
            dark:border-slate-800
            dark:bg-slate-900

            sm:px-12
            lg:py-20
          "
        >
          <p
            className="
              mb-3
              text-sm
              font-bold
              uppercase
              tracking-widest
              text-orange-500
            "
          >
            For Billboard Owners
          </p>

          <h2
            className="
              mx-auto
              max-w-3xl
              text-3xl
              font-extrabold
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Turn Your Billboard Into a Business
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-white/60
              sm:text-base
            "
          >
            List your advertising spaces on BotaFelig and connect
            with businesses looking for premium locations across
            Ethiopia.
          </p>

          <button
            type="button"
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-orange-600
              px-7
              py-3.5
              text-sm
              font-bold
              text-white
              transition
              hover:bg-orange-700
              hover:shadow-lg
              hover:shadow-orange-600/20
            "
          >
            List Your Billboard

            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <Footer />
    </main>
  );
}

/* =============================================================
   LOCATION CARD
============================================================= */

function LocationCard({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}) {
  return (
    <div
      className="
        group
        relative
        h-64
        overflow-hidden
        rounded-2xl
        bg-slate-200
        shadow-sm

        dark:bg-slate-800
      "
    >
      <img
        src={image}
        alt={`${name} billboard advertising location`}
        className="
          h-full
          w-full
          object-cover
          transition
          duration-700
          group-hover:scale-105
        "
      />

      {/* Image overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-slate-950/85
          via-slate-950/20
          to-transparent
        "
      />

      {/* Content */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          flex
          items-end
          justify-between
          p-5
        "
      >
        <div>
          <h3 className="text-xl font-bold text-white">
            {name}
          </h3>

          <p className="mt-1 text-sm text-white/70">
            {description}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Explore ${name}`}
          className="
            rounded-lg
            bg-white/15
            p-2.5
            text-white
            backdrop-blur-md
            transition
            hover:bg-orange-600
          "
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

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

/* =============================================================
   HOW IT WORKS STEP
============================================================= */

function HowStep({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center">

      {/* Icon */}

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-orange-100
          bg-orange-50
          text-orange-600
          shadow-sm
          transition-all
          duration-300

          dark:border-orange-900/50
          dark:bg-orange-950/40
          dark:text-orange-400
        "
      >
        {icon}
      </div>

      {/* Title */}

      <h3
        className="
          mt-5
          text-sm
          font-bold
          text-slate-950

          dark:text-white

          sm:text-base
        "
      >
        {number}. {title}
      </h3>

      {/* Description */}

      <p
        className="
          mt-2
          max-w-[230px]
          text-xs
          leading-5
          text-slate-500

          dark:text-slate-400

          sm:text-sm
        "
      >
        {description}
      </p>
    </div>
  );
}