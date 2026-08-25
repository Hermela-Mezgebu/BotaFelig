"use client";

import { useMemo, useState } from "react";
import {
  Maximize,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Eye,
  Lightbulb,
  MapPin,
  Monitor,
  Move3D,
  Star,
  Users,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const billboardImages = [
  {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=85",
    alt: "Premium digital billboard at night",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85",
    alt: "Billboard advertising display",
  },
  {
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85",
    alt: "Busy city road and advertising space",
  },
  {
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85",
    alt: "Urban roadside advertising location",
  },
];

const specifications = [
  {
    icon: Monitor,
    label: "Type",
    value: "Digital",
  },
  {
    icon: Maximize,
    label: "Size",
    value: "12m × 5m",
  },
  {
    icon: Eye,
    label: "Visibility",
    value: "High",
  },
  {
    icon: Lightbulb,
    label: "Lighting",
    value: "LED Backlit",
  },
  {
    icon: CarFront,
    label: "Traffic",
    value: "High",
  },
  {
    icon: Users,
    label: "Daily Reach",
    value: "50,000+",
  },
];

const reviews = [
  {
    initials: "JA",
    name: "John Doe Agency",
    date: "October 2025",
    rating: 5,
    comment:
      "Exceptional visibility. Our campaign saw a significant increase in engagement during the month we rented this space.",
  },
  {
    initials: "MK",
    name: "Mekdes Marketing",
    date: "September 2025",
    rating: 5,
    comment:
      "Excellent location and very strong traffic. The booking process was simple and the billboard performed exactly as expected.",
  },
];

export default function BillboardDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("1");

  const monthlyPrice = 15000;

  const durationMonths = Number(duration);

  const discount =
    durationMonths === 3
      ? 0.05
      : durationMonths === 6
        ? 0.1
        : 0;

  const subtotal = useMemo(() => {
    const original = monthlyPrice * durationMonths;
    return original - original * discount;
  }, [durationMonths, discount]);

  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const nextImage = () => {
    setActiveImage((current) =>
      current === billboardImages.length - 1 ? 0 : current + 1,
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? billboardImages.length - 1 : current - 1,
    );
  };

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
      <Navbar />

      {/* =========================================================
          PAGE
      ========================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* =======================================================
            BREADCRUMB
        ======================================================== */}

        <div className="mb-6 flex items-center gap-2 text-sm">
          <a
            href="/"
            className="
              font-medium
              text-slate-500
              transition
              hover:text-orange-600
              dark:text-slate-400
              dark:hover:text-orange-400
            "
          >
            Home
          </a>

          <ChevronRight
            size={15}
            className="text-slate-400"
          />

          <a
            href="/#explore"
            className="
              font-medium
              text-slate-500
              transition
              hover:text-orange-600
              dark:text-slate-400
              dark:hover:text-orange-400
            "
          >
            Explore
          </a>

          <ChevronRight
            size={15}
            className="text-slate-400"
          />

          <span className="font-semibold text-slate-900 dark:text-white">
            Billboard Details
          </span>
        </div>

        {/* =======================================================
            HEADER
        ======================================================== */}

        <div className="mb-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className="
                    rounded-full
                    bg-orange-100
                    px-3
                    py-1
                    text-xs
                    font-bold
                    text-orange-700
                    dark:bg-orange-500/10
                    dark:text-orange-400
                  "
                >
                  DIGITAL
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1
                    text-xs
                    font-bold
                    text-emerald-700
                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </div>

              <h1
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-950
                  sm:text-4xl
                  lg:text-5xl
                  dark:text-white
                "
              >
                Premium LED Billboard - Bole Road
              </h1>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                <span className="flex items-center gap-1.5">
                  <MapPin
                    size={16}
                    className="text-orange-600 dark:text-orange-400"
                  />
                  Bole, Addis Ababa
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block dark:bg-slate-700" />

                <span className="flex items-center gap-1.5">
                  <Star
                    size={16}
                    fill="currentColor"
                    className="text-amber-500"
                  />
                  <strong className="text-slate-900 dark:text-white">
                    4.9
                  </strong>
                  <span>(24 reviews)</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-bold
                text-slate-700
                shadow-sm
                transition
                hover:border-orange-200
                hover:text-orange-600
                dark:border-slate-800
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:border-orange-500/30
                dark:hover:text-orange-400
              "
            >
              <CircleDollarSign size={17} />
              Pricing details
            </button>
          </div>
        </div>

        {/* =======================================================
            GALLERY
        ======================================================== */}

        <section className="mb-12">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:grid-rows-2">
            {/* Main image */}

            <div
              className="
                group
                relative
                h-[360px]
                overflow-hidden
                rounded-2xl
                bg-slate-200
                shadow-sm
                md:col-span-3
                md:row-span-2
                md:h-[570px]
                dark:bg-slate-900
              "
            >
              <img
                src={billboardImages[activeImage].src}
                alt={billboardImages[activeImage].alt}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-500
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />

              {/* Main image controls */}

              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className="
                  absolute
                  left-4
                  top-1/2
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-slate-900
                  shadow-lg
                  backdrop-blur
                  transition
                  hover:bg-white
                "
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="
                  absolute
                  right-4
                  top-1/2
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-slate-900
                  shadow-lg
                  backdrop-blur
                  transition
                  hover:bg-white
                "
              >
                <ChevronRight size={20} />
              </button>

              {/* Image counter */}

              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  rounded-full
                  bg-black/55
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-white
                  backdrop-blur-md
                "
              >
                {activeImage + 1} / {billboardImages.length}
              </div>
            </div>

            {/* Thumbnail 1 */}

            <button
              type="button"
              onClick={() => setActiveImage(1)}
              className={`
                group
                relative
                hidden
                overflow-hidden
                rounded-2xl
                bg-slate-200
                md:block
                dark:bg-slate-900
                ${
                  activeImage === 1
                    ? "ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-[#080d16]"
                    : ""
                }
              `}
            >
              <img
                src={billboardImages[1].src}
                alt={billboardImages[1].alt}
                className="
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-105
                "
              />
            </button>

            {/* Thumbnail 2 */}

            <button
              type="button"
              onClick={() => setActiveImage(2)}
              className={`
                group
                relative
                hidden
                overflow-hidden
                rounded-2xl
                bg-slate-200
                md:block
                dark:bg-slate-900
                ${
                  activeImage === 2
                    ? "ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-[#080d16]"
                    : ""
                }
              `}
            >
              <img
                src={billboardImages[2].src}
                alt={billboardImages[2].alt}
                className="
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-105
                "
              />
            </button>
          </div>

          {/* Mobile thumbnails */}

          <div className="mt-3 flex gap-3 overflow-x-auto md:hidden">
            {billboardImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`
                  h-20
                  w-24
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  ${
                    activeImage === index
                      ? "ring-2 ring-orange-500"
                      : "opacity-70"
                  }
                `}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* =======================================================
            CONTENT + BOOKING
        ======================================================== */}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div className="space-y-12 lg:col-span-2">
            {/* Description */}

            <section>
              <SectionTitle title="Description" />

              <p
                className="
                  text-base
                  leading-8
                  text-slate-600
                  dark:text-slate-400
                "
              >
                Premium roadside billboard located in a high-traffic area
                with excellent visibility. Strategically positioned on Bole
                Road, this digital display captures the attention of
                thousands of commuters, professionals, and shoppers every
                day.
              </p>

              <p
                className="
                  mt-4
                  text-base
                  leading-8
                  text-slate-600
                  dark:text-slate-400
                "
              >
                The location is ideal for high-impact brand awareness
                campaigns, product launches, retail promotions, financial
                services, telecommunications, and other campaigns targeting
                Addis Ababa&apos;s growing business community.
              </p>
            </section>

            {/* Specifications */}

            <section>
              <SectionTitle title="Specifications" />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {specifications.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                        shadow-sm
                        transition
                        hover:-translate-y-0.5
                        hover:shadow-md
                        dark:border-slate-800
                        dark:bg-slate-900
                      "
                    >
                      <Icon
                        size={21}
                        className="
                          mb-4
                          text-orange-600
                          dark:text-orange-400
                        "
                      />

                      <p
                        className="
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        {item.label}
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-bold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Location */}

            <section>
              <SectionTitle title="Location" />

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                <div
                  className="
                    flex
                    min-h-[300px]
                    items-center
                    justify-center
                    bg-slate-100
                    p-8
                    dark:bg-slate-950
                  "
                >
                  <div className="text-center">
                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-orange-100
                        text-orange-600
                        dark:bg-orange-500/10
                        dark:text-orange-400
                      "
                    >
                      <MapPin size={25} />
                    </div>

                    <h3
                      className="
                        mt-4
                        font-bold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      Bole Road, Addis Ababa
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Premium roadside advertising location
                    </p>

                    <button
                      type="button"
                      className="
                        mt-5
                        rounded-xl
                        bg-orange-600
                        px-5
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        transition
                        hover:bg-orange-700
                      "
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Availability */}

            <section>
              <SectionTitle title="Availability" />

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-7
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-orange-100
                      text-orange-600
                      dark:bg-orange-500/10
                      dark:text-orange-400
                    "
                  >
                    <CalendarDays size={28} />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-lg
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Availability Calendar
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-md
                      text-sm
                      leading-6
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Select your preferred dates from the booking panel.
                    Real-time availability will be connected to the BotaFelig
                    booking system.
                  </p>
                </div>
              </div>
            </section>

            {/* Reviews */}

            <section className="pb-8">
              <SectionTitle title="Reviews" />

              <div className="space-y-7">
                {reviews.map((review) => (
                  <div
                    key={`${review.name}-${review.date}`}
                    className="
                      border-b
                      border-slate-200
                      pb-7
                      last:border-0
                      dark:border-slate-800
                    "
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-orange-100
                          text-sm
                          font-extrabold
                          text-orange-700
                          dark:bg-orange-500/10
                          dark:text-orange-400
                        "
                      >
                        {review.initials}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3
                              className="
                                text-sm
                                font-bold
                                text-slate-900
                                dark:text-white
                              "
                            >
                              {review.name}
                            </h3>

                            <p
                              className="
                                mt-1
                                text-xs
                                text-slate-400
                              "
                            >
                              {review.date}
                            </p>
                          </div>

                          <div className="flex gap-1">
                            {Array.from({
                              length: review.rating,
                            }).map((_, index) => (
                              <Star
                                key={index}
                                size={14}
                                fill="currentColor"
                                className="text-amber-500"
                              />
                            ))}
                          </div>
                        </div>

                        <p
                          className="
                            mt-4
                            text-sm
                            leading-7
                            text-slate-600
                            dark:text-slate-400
                          "
                        >
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* =====================================================
              BOOKING CARD
          ====================================================== */}

          <aside className="lg:col-span-1">
            <div
              className="
                sticky
                top-28
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-xl
                shadow-slate-900/5
                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-black/20
              "
            >
              {/* Price */}

              <div
                className="
                  border-b
                  border-slate-200
                  pb-5
                  dark:border-slate-800
                "
              >
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Starting from
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span
                    className="
                      text-3xl
                      font-extrabold
                      tracking-tight
                      text-slate-950
                      dark:text-white
                    "
                  >
                    ETB {monthlyPrice.toLocaleString()}
                  </span>

                  <span
                    className="
                      mb-1
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    / month
                  </span>
                </div>
              </div>

              {/* Booking form */}

              <div className="mt-6 space-y-5">
                {/* Dates */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Campaign Dates
                  </label>

                  <div
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-slate-200
                      dark:border-slate-700
                    "
                  >
                    <div className="relative border-b border-slate-200 dark:border-slate-700">
                      <CalendarDays
                        size={17}
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        type="date"
                        value={startDate}
                        onChange={(event) =>
                          setStartDate(event.target.value)
                        }
                        className="
                          h-12
                          w-full
                          bg-white
                          pl-10
                          pr-3
                          text-sm
                          font-medium
                          text-slate-900
                          outline-none
                          dark:bg-slate-900
                          dark:text-white
                        "
                      />
                    </div>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        type="date"
                        value={endDate}
                        onChange={(event) =>
                          setEndDate(event.target.value)
                        }
                        className="
                          h-12
                          w-full
                          bg-white
                          pl-10
                          pr-3
                          text-sm
                          font-medium
                          text-slate-900
                          outline-none
                          dark:bg-slate-900
                          dark:text-white
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* Duration */}

                <div>
                  <label
                    htmlFor="duration"
                    className="
                      mb-2
                      block
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Duration
                  </label>

                  <div className="relative">
                    <Clock3
                      size={17}
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <select
                      id="duration"
                      value={duration}
                      onChange={(event) =>
                        setDuration(event.target.value)
                      }
                      className="
                        h-12
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-10
                        pr-10
                        text-sm
                        font-semibold
                        text-slate-900
                        outline-none
                        transition
                        focus:border-orange-500
                        focus:ring-2
                        focus:ring-orange-500/20
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-white
                      "
                    >
                      <option value="1">1 Month</option>
                      <option value="3">3 Months — 5% off</option>
                      <option value="6">6 Months — 10% off</option>
                    </select>

                    <ChevronRight
                      size={17}
                      className="
                        pointer-events-none
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rotate-90
                        text-slate-400
                      "
                    />
                  </div>
                </div>

                {/* Price breakdown */}

                <div
                  className="
                    space-y-3
                    rounded-xl
                    bg-slate-50
                    p-4
                    dark:bg-slate-950
                  "
                >
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      ETB {monthlyPrice.toLocaleString()} ×{" "}
                      {durationMonths} month
                      {durationMonths > 1 ? "s" : ""}
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      ETB {(monthlyPrice * durationMonths).toLocaleString()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Campaign discount
                      </span>

                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        -ETB{" "}
                        {(
                          monthlyPrice *
                          durationMonths *
                          discount
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Service fee
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      ETB {serviceFee.toLocaleString()}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                      border-t
                      border-slate-200
                      pt-3
                      dark:border-slate-800
                    "
                  >
                    <span className="font-bold text-slate-900 dark:text-white">
                      Total
                    </span>

                    <span className="font-extrabold text-slate-950 dark:text-white">
                      ETB {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Request booking */}

                <button
                  type="button"
                  className="
                    flex
                    h-13
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-orange-600
                    px-5
                    py-3.5
                    text-sm
                    font-extrabold
                    text-white
                    shadow-lg
                    shadow-orange-600/20
                    transition
                    hover:bg-orange-700
                    hover:shadow-orange-600/30
                    focus:outline-none
                    focus:ring-4
                    focus:ring-orange-500/20
                  "
                >
                  Request to Book
                  <ChevronRight size={18} />
                </button>

                <p
                  className="
                    text-center
                    text-xs
                    leading-5
                    text-slate-400
                  "
                >
                  You won&apos;t be charged yet. Your request will be
                  reviewed before payment.
                </p>
              </div>

              {/* Trust */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  p-4
                  dark:border-emerald-900/50
                  dark:bg-emerald-500/5
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-500
                    text-white
                  "
                >
                  <Check size={16} strokeWidth={3} />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-bold
                      text-emerald-800
                      dark:text-emerald-400
                    "
                  >
                    Verified billboard
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      leading-4
                      text-emerald-700/70
                      dark:text-emerald-400/70
                    "
                  >
                    Location and owner information verified by BotaFelig.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}

/* =============================================================
   SECTION TITLE
============================================================= */

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <h2
        className="
          shrink-0
          text-xl
          font-extrabold
          tracking-tight
          text-slate-950
          dark:text-white
        "
      >
        {title}
      </h2>

      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}