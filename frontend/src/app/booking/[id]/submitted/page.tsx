"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  Clock3,
  FileImage,
  Home,
  LayoutDashboard,
  MapPin,
  Package,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type BookingStatus =
  | "pending"
  | "approved"
  | "upload_required"
  | "payment_required"
  | "confirmed";

type Booking = {
  id: string;
  billboard: string;
  location: string;
  startDate: string;
  endDate: string;
  total: number;
  status: BookingStatus;
};

const initialBooking: Booking = {
  id: "BH-10293",
  billboard: "Bole Premium Roadside",
  location: "Bole, Addis Ababa",
  startDate: "Nov 1, 2026",
  endDate: "Nov 30, 2026",
  total: 15750,
  status: "pending",
};

export default function BookingSubmittedPage() {
  const [booking, setBooking] = useState<Booking>(initialBooking);


  const simulateOwnerApproval = () => {
    setBooking((current) => ({
      ...current,
      status: "upload_required",
    }));
  };

  return (
    <main className="min-h-screen bg-[#f8f9ff] text-slate-950 dark:bg-[#080d16] dark:text-white">
      <Navbar />

      {/* =========================================================
          MAIN
      ========================================================== */}

      <div className="relative overflow-hidden px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
        {/* Background decoration */}

        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          {/* =====================================================
              STATUS HEADER
          ====================================================== */}

          <StatusHeader status={booking.status} />

          {/* =====================================================
              BOOKING SUMMARY
          ====================================================== */}

          <BookingSummary booking={booking} />

          {/* =====================================================
              FLOW
          ====================================================== */}

          <BookingFlow status={booking.status} />

          {/* =====================================================
              NEXT ACTION
          ====================================================== */}

          <NextAction
            booking={booking}
            onDemoApprove={simulateOwnerApproval}
          />

          {/* =====================================================
              HELP
          ====================================================== */}

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Need help with your booking?
            </p>

            <button
              type="button"
              className="mt-2 text-sm font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
            >
              Contact BotaFelig Support
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}

/* ================================================================
   STATUS HEADER
================================================================ */

function StatusHeader({
  status,
}: {
  status: BookingStatus;
}) {
  if (status === "pending") {
    return (
      <section className="mb-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-600 shadow-sm dark:bg-orange-500/10 dark:text-orange-400">
          <Clock3 size={40} />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Booking Request Submitted
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
          Your request has been sent to the billboard owner.
          You need the owner&apos;s approval before you can continue
          to upload your advertisement and make the payment.
        </p>

        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
          <Clock3 size={16} />
          Waiting for owner approval
        </div>
      </section>
    );
  }

  if (status === "upload_required") {
    return (
      <section className="mb-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400">
          <CheckCircle2 size={42} />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your Booking Was Approved
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
          Great news! The billboard owner approved your booking
          request. You can now upload your advertisement and continue
          to payment.
        </p>

        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Check size={16} strokeWidth={3} />
          Approved by owner
        </div>
      </section>
    );
  }

  return null;
}

/* ================================================================
   BOOKING SUMMARY
================================================================ */

function BookingSummary({
  booking,
}: {
  booking: Booking;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Booking Summary
          </p>

          <h2 className="mt-1 text-xl font-extrabold">
            {booking.billboard}
          </h2>
        </div>

        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          #{booking.id}
        </span>
      </div>

      <div className="space-y-5">
        <SummaryRow
          label="Billboard"
          value={booking.billboard}
        />

        <SummaryRow
          label="Location"
          value={
            <span className="flex items-center gap-2">
              <MapPin
                size={15}
                className="text-orange-600"
              />
              {booking.location}
            </span>
          }
        />

        <SummaryRow
          label="Campaign dates"
          value={`${booking.startDate} – ${booking.endDate}`}
        />

        <SummaryRow
          label="Total amount"
          value={
            <span className="text-lg font-extrabold">
              ETB {booking.total.toLocaleString()}
            </span>
          }
        />
      </div>
    </section>
    
  );
}

/* ================================================================
   SUMMARY ROW
================================================================ */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span className="text-sm font-bold text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}

/* ================================================================
   BOOKING FLOW
================================================================ */

function BookingFlow({
  status,
}: {
  status: BookingStatus;
}) {
  const steps = [
    {
      number: 1,
      title: "Request submitted",
      description: "Your booking request was sent to the owner.",
      icon: CheckCircle2,
      complete: true,
    },
    {
      number: 2,
      title: "Owner approval",
      description: "The billboard owner reviews your request.",
      icon: ShieldCheck,
      complete:
        status === "upload_required" ||
        status === "payment_required" ||
        status === "confirmed",
    },
    {
      number: 3,
      title: "Upload advertisement",
      description: "Upload your product or campaign artwork.",
      icon: FileImage,
      complete:
        status === "payment_required" ||
        status === "confirmed",
    },
    {
      number: 4,
      title: "Payment",
      description: "Complete the payment to confirm your campaign.",
      icon: Package,
      complete: status === "confirmed",
    },
  ];

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          What happens next
        </p>

        <h2 className="mt-1 text-xl font-extrabold">
          Your booking journey
        </h2>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const isCurrent =
            !step.complete &&
            (index === 0 ||
              steps[index - 1]?.complete);

          return (
            <div
              key={step.number}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    ${
                      step.complete
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : isCurrent
                          ? "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900 dark:bg-orange-500/10 dark:text-orange-400"
                          : "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800"
                    }
                  `}
                >
                  {step.complete ? (
                    <Check size={19} strokeWidth={3} />
                  ) : (
                    <Icon size={19} />
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div className="mt-2 h-8 w-px bg-slate-200 dark:bg-slate-700" />
                )}
              </div>

              <div className="pt-1">
                <h3 className="text-sm font-extrabold">
                  {step.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>

                {isCurrent && status === "pending" && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                    <Clock3 size={12} />
                    Waiting
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================
   NEXT ACTION
================================================================ */

function NextAction({
  booking,
  onDemoApprove,
}: {
  booking: Booking;
  onDemoApprove: () => void;
}) {
  if (booking.status === "pending") {
    return (
      <section className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900/50 dark:bg-orange-500/5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <Bell size={23} />
          </div>

          <div className="flex-1">
            <h2 className="font-extrabold">
              Waiting for the billboard owner
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              You don&apos;t need to do anything right now. The owner
              will review your request. Once approved, we&apos;ll notify
              you so you can upload your advertisement and continue
              with payment.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                <LayoutDashboard size={17} />
                Go to My Dashboard
              </Link>

              <Link
                href="/billboards"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <Search size={17} />
                Explore More Billboards
              </Link>
            </div>

            {/* ---------------------------------------------------
                TEMPORARY DEVELOPMENT BUTTON
                REMOVE THIS AFTER BACKEND IS CONNECTED
            ---------------------------------------------------- */}

            <button
              type="button"
              onClick={onDemoApprove}
              className="mt-6 text-xs font-semibold text-slate-400 underline hover:text-slate-600"
            >
              Development: simulate owner approval
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (booking.status === "upload_required") {
    return (
      <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/50 dark:bg-emerald-500/5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <FileImage size={23} />
          </div>

          <div className="flex-1">
            <h2 className="font-extrabold">
              Upload your advertisement
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              The owner approved your request. Upload your product,
              campaign artwork, or advertisement before continuing
              to payment.
            </p>

            <Link
              href={`/booking/${booking.id}/upload`}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
            >
              Upload Advertisement
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return null;
}