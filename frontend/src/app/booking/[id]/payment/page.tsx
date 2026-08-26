"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-[#f8f9ff] px-5 py-12 text-slate-950 dark:bg-[#080d16] dark:text-white lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/booking/BH-10293/upload"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 dark:text-slate-400"
        >
          <ArrowLeft size={16} />
          Back to advertisement
        </Link>

        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Final Step
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Complete Your Payment
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your booking has been approved. Complete the payment
            to confirm your advertising campaign.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Payment */}

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  <CreditCard size={20} />
                </div>

                <div>
                  <h2 className="font-extrabold">
                    Payment Method
                  </h2>

                  <p className="text-xs text-slate-500">
                    Secure payment
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Cardholder name
                  </label>

                  <input
                    type="text"
                    placeholder="Full name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Card number
                  </label>

                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Expiry
                    </label>

                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      CVV
                    </label>

                    <input
                      type="text"
                      placeholder="123"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
              >
                <Lock size={17} />
                Pay ETB 15,750
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} />
                Secure payment processing
              </div>
            </div>
          </div>

          {/* Summary */}

          <aside className="lg:col-span-2">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Booking
              </p>

              <h2 className="mt-2 text-lg font-extrabold">
                Bole Premium Roadside
              </h2>

              <div className="mt-5 space-y-4 border-b border-slate-200 pb-5 dark:border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Campaign
                  </span>

                  <span className="font-bold">
                    Nov 1 – Nov 30
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Billboard
                  </span>

                  <span className="font-bold">
                    Bole Road
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-5">
                <span className="font-bold">
                  Total
                </span>

                <span className="text-xl font-extrabold">
                  ETB 15,750
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/5">
                <div className="flex gap-3">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <p className="text-xs leading-5 text-emerald-700 dark:text-emerald-400">
                    Your billboard request has already been
                    approved by the owner.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}