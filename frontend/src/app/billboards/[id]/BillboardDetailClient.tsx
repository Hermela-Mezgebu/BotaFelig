"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Maximize,
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  Lightbulb,
  MapPin,
  Monitor,
  Star,
  Users,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import type {
  Billboard,
} from "@/data/billboards";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BillboardGallery from "@/components/billboard/BillboardGallery";
import AvailabilityCalendar from "@/components/billboard/AvailabilityCalendar";

type BillboardDetailClientProps =
  {
    billboard: Billboard;
  };

type CampaignItem = {
  billboardId: string;
  title: string;
  location: string;
  image: string;
  price: number;
  startDate: string;
  endDate: string;
};

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

function readCampaignItems(): CampaignItem[] {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  try {
    const value =
      localStorage.getItem(
        "botafelig-campaign",
      );

    if (!value) {
      return [];
    }

    const parsed =
      JSON.parse(value);

    return Array.isArray(
      parsed,
    )
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function saveCampaignItems(
  items: CampaignItem[],
) {
  localStorage.setItem(
    "botafelig-campaign",
    JSON.stringify(items),
  );

  window.dispatchEvent(
    new CustomEvent(
      "campaign-updated",
    ),
  );
}

export default function BillboardDetailClient({
  billboard,
}: BillboardDetailClientProps) {
  const router =
    useRouter();

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [duration, setDuration] =
    useState("1");

  const [
    bookingError,
    setBookingError,
  ] = useState("");

  const [
    addedToCampaign,
    setAddedToCampaign,
  ] = useState(false);

  const galleryImages =
    useMemo(
      () => [
        billboard.image,
        billboard.image,
        billboard.image,
      ],
      [billboard.image],
    );

  const monthlyPrice =
    billboard.price || 15000;

  const durationMonths =
    Number(duration);

  const discount =
    durationMonths === 3
      ? 0.05
      : durationMonths === 6
        ? 0.1
        : 0;

  const originalPrice =
    monthlyPrice *
    durationMonths;

  const discountAmount =
    originalPrice *
    discount;

  const subtotal =
    originalPrice -
    discountAmount;

  const serviceFee =
    subtotal * 0.05;

  const total =
    subtotal +
    serviceFee;

  /*
   * ----------------------------------------------------------
   * ADD BILLBOARD TO CAMPAIGN
   * ----------------------------------------------------------
   */
  const handleAddToCampaign =
    () => {
      setBookingError("");

      if (
        !startDate ||
        !endDate
      ) {
        setBookingError(
          "Please select your campaign start and end dates.",
        );

        return;
      }

      const currentItems =
        readCampaignItems();

      /*
       * Do not add the same billboard
       * twice.
       */
      const existingIndex =
        currentItems.findIndex(
          (item) =>
            item.billboardId ===
            billboard.id,
        );

      const newItem: CampaignItem =
        {
          billboardId:
            billboard.id,
          title:
            billboard.title,
          location:
            billboard.location,
          image:
            billboard.image,
          price:
            monthlyPrice,
          startDate,
          endDate,
        };

      let nextItems: CampaignItem[];

      if (
        existingIndex >= 0
      ) {
        nextItems =
          currentItems.map(
            (
              item,
              index,
            ) =>
              index ===
              existingIndex
                ? newItem
                : item,
          );
      } else {
        nextItems = [
          ...currentItems,
          newItem,
        ];
      }

      saveCampaignItems(
        nextItems,
      );

      setAddedToCampaign(
        true,
      );

      /*
       * Go directly to review.
       *
       * The user can then continue
       * browsing and add more billboards.
       */
      router.push(
        "/booking/review",
      );
    };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f9ff] text-slate-950 dark:bg-[#080d16] dark:text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Breadcrumb */}

        <div className="mb-6 flex items-center gap-2 text-sm">
          <a
            href="/"
            className="font-medium text-slate-500 hover:text-orange-600 dark:text-slate-400"
          >
            Home
          </a>

          <ChevronRight
            size={15}
            className="text-slate-400"
          />

          <a
            href="/billboards"
            className="font-medium text-slate-500 hover:text-orange-600 dark:text-slate-400"
          >
            Billboards
          </a>

          <ChevronRight
            size={15}
            className="text-slate-400"
          />

          <span className="font-semibold text-slate-900 dark:text-white">
            Billboard Details
          </span>
        </div>

        {/* Header */}

        <div className="mb-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                  {billboard.type.toUpperCase()}
                </span>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                {billboard.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin
                    size={15}
                  />
                  {billboard.location}
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-amber-500"
                  />
                  4.9
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}

        <BillboardGallery
          title={
            billboard.title
          }
          location={
            billboard.location
          }
          images={
            galleryImages
          }
        />

        {/* Main */}

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left */}

          <div className="space-y-12 lg:col-span-2">
            {/* Description */}

            <section>
              <SectionTitle
                title="Description"
              />

              <p className="text-base leading-8 text-slate-600 dark:text-slate-400">
                Premium roadside
                billboard located in
                a high-traffic area
                with excellent
                visibility.
                Strategically positioned
                in{" "}
                {billboard.location},
                this advertising space
                captures the attention
                of thousands of commuters,
                professionals, and
                shoppers every day.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                This location is ideal
                for high-impact brand
                awareness campaigns,
                product launches, retail
                promotions, financial
                services, telecommunications,
                and other campaigns.
              </p>
            </section>

            {/* Specifications */}

            <section>
              <SectionTitle
                title="Specifications"
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {specifications.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    return (
                      <div
                        key={
                          item.label
                        }
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                      >
                        <Icon
                          size={21}
                          className="mb-4 text-orange-600 dark:text-orange-400"
                        />

                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {item.label}
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {item.label ===
                          "Size"
                            ? billboard.size
                            : item.value}
                        </p>
                      </div>
                    );
                  },
                )}
              </div>
            </section>

            {/* Location */}

            <section>
              <SectionTitle
                title="Location"
              />

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="flex min-h-75 items-center justify-center bg-slate-100 p-8 dark:bg-slate-950">
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                      <MapPin
                        size={25}
                      />
                    </div>

                    <h3 className="mt-4 font-bold">
                      {
                        billboard.location
                      }
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Premium roadside
                      advertising location
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Availability */}

            <section>
              <SectionTitle
                title="Availability"
              />

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <AvailabilityCalendar
                  billboardId={
                    billboard.id
                  }
                  startDate={
                    startDate
                  }
                  endDate={
                    endDate
                  }
                  onChange={(
                    selectedStart,
                    selectedEnd,
                  ) => {
                    setStartDate(
                      selectedStart,
                    );
                    setEndDate(
                      selectedEnd,
                    );
                    setBookingError(
                      "",
                    );
                    setAddedToCampaign(
                      false,
                    );
                  }}
                />

                <div className="border-t border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <DateBox
                      label="Campaign starts"
                      value={
                        startDate
                      }
                    />

                    <DateBox
                      label="Campaign ends"
                      value={
                        endDate
                      }
                    />
                  </div>

                  {!startDate && (
                    <p className="mt-4 text-center text-xs font-medium text-slate-400">
                      Choose your campaign
                      start date, then
                      choose the end date.
                    </p>
                  )}

                  {startDate &&
                    !endDate && (
                      <p className="mt-4 text-center text-xs font-semibold text-orange-600 dark:text-orange-400">
                        Now select your
                        campaign end date.
                      </p>
                    )}

                  {startDate &&
                    endDate && (
                      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center dark:border-emerald-900/50 dark:bg-emerald-500/5">
                        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          Selected dates are
                          available.
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </section>

            {/* Reviews */}

            <section className="pb-8">
              <SectionTitle
                title="Reviews"
              />

              <div className="space-y-7">
                {reviews.map(
                  (review) => (
                    <div
                      key={`${review.name}-${review.date}`}
                      className="border-b border-slate-200 pb-7 last:border-0 dark:border-slate-800"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-extrabold text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                          {
                            review.initials
                          }
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-sm font-bold">
                                {
                                  review.name
                                }
                              </h3>

                              <p className="mt-1 text-xs text-slate-400">
                                {
                                  review.date
                                }
                              </p>
                            </div>

                            <div className="flex gap-1">
                              {Array.from(
                                {
                                  length:
                                    review.rating,
                                },
                              ).map(
                                (
                                  _,
                                  index,
                                ) => (
                                  <Star
                                    key={
                                      `${review.name}-star-${index}`
                                    }
                                    size={
                                      14
                                    }
                                    fill="currentColor"
                                    className="text-amber-500"
                                  />
                                ),
                              )}
                            </div>
                          </div>

                          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                            {
                              review.comment
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          </div>

          {/* Booking Card */}

          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
              {/* Price */}

              <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Starting from
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-extrabold">
                    ETB{" "}
                    {monthlyPrice.toLocaleString()}
                  </span>

                  <span className="mb-1 text-sm text-slate-500 dark:text-slate-400">
                    / month
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {/* Dates */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Campaign Dates
                  </label>

                  <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="relative border-b border-slate-200 dark:border-slate-700">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={
                          startDate
                            ? formatDate(
                                startDate,
                              )
                            : "Select start date"
                        }
                        readOnly
                        className="h-12 w-full bg-white pl-10 pr-3 text-sm font-medium text-slate-900 outline-none dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={
                          endDate
                            ? formatDate(
                                endDate,
                              )
                            : "Select end date"
                        }
                        readOnly
                        className="h-12 w-full bg-white pl-10 pr-3 text-sm font-medium text-slate-900 outline-none dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Duration */}

                <div>
                  <label
                    htmlFor="duration"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                  >
                    Duration
                  </label>

                  <div className="relative">
                    <Clock3
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      id="duration"
                      value={
                        duration
                      }
                      onChange={(
                        event,
                      ) =>
                        setDuration(
                          event
                            .target
                            .value,
                        )
                      }
                      className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm font-semibold text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      <option value="1">
                        1 Month
                      </option>

                      <option value="3">
                        3 Months — 5% off
                      </option>

                      <option value="6">
                        6 Months — 10% off
                      </option>
                    </select>

                    <ChevronRight
                      size={17}
                      className="pointer-events-none absolute right-3 top-1/2 rotate-90 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                {/* Price */}

                <div className="space-y-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      ETB{" "}
                      {monthlyPrice.toLocaleString()}{" "}
                      ×{" "}
                      {durationMonths}{" "}
                      month
                      {durationMonths >
                      1
                        ? "s"
                        : ""}
                    </span>

                    <span className="font-semibold">
                      ETB{" "}
                      {originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {discount >
                    0 && (
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-emerald-600">
                        Campaign discount
                      </span>

                      <span className="font-semibold text-emerald-600">
                        -ETB{" "}
                        {discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Service fee
                    </span>

                    <span className="font-semibold">
                      ETB{" "}
                      {serviceFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                    <span className="font-bold">
                      Total
                    </span>

                    <span className="font-extrabold">
                      ETB{" "}
                      {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Add to campaign */}

                <button
                  type="button"
                  onClick={
                    handleAddToCampaign
                  }
                  disabled={
                    !startDate ||
                    !endDate
                  }
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-800"
                >
                  {addedToCampaign
                    ? "Added to Campaign"
                    : "Add to Campaign"}

                  <ChevronRight
                    size={18}
                  />
                </button>

                {bookingError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                    {
                      bookingError
                    }
                  </div>
                )}

                <p className="text-center text-xs leading-5 text-slate-400">
                  You won't be
                  charged yet.
                  Add this billboard
                  to your campaign
                  and review all
                  selected spaces
                  before submitting.
                </p>
              </div>

              {/* Trust */}

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-500/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check
                    size={16}
                    strokeWidth={3}
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    Verified billboard
                  </p>

                  <p className="mt-0.5 text-[11px] leading-4 text-emerald-700/70 dark:text-emerald-400/70">
                    Location and
                    owner information
                    verified by
                    BotaFelig.
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

/*
 * ------------------------------------------------------------
 * HELPERS
 * ------------------------------------------------------------
 */

function formatDate(
  value: string,
) {
  const [
    year,
    month,
    day,
  ] = value
    .split("-")
    .map(Number);

  return new Date(
    year,
    month - 1,
    day,
  ).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
}

function DateBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold">
        {value
          ? formatDate(
              value,
            )
          : "Select a date"}
      </p>
    </div>
  );
}

function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <h2 className="shrink-0 text-xl font-extrabold tracking-tight">
        {title}
      </h2>

      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}