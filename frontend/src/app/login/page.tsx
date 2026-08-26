"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import Logo from "@/components/layout/Logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);

    // Backend authentication will be connected here later.
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -left-32 -top-32
            h-[420px] w-[420px]
            rounded-full
            bg-[#FD7C33]/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute -bottom-40 -right-32
            h-[520px] w-[520px]
            rounded-full
            bg-[#A04100]/10
            blur-[150px]
          "
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div
          className="
            grid w-full max-w-5xl
            overflow-hidden
            rounded-3xl
            border border-zinc-200
            bg-white/80
            shadow-2xl
            backdrop-blur-xl
            dark:border-zinc-800
            dark:bg-zinc-950/80
            md:grid-cols-2
          "
        >
          {/* Left */}
          <section
            className="
              relative hidden
              min-h-[650px]
              overflow-hidden
              bg-zinc-950
              p-10
              md:flex
              md:flex-col
              md:justify-between
              lg:p-12
            "
          >
            <div
              className="
                absolute -right-32 top-20
                h-96 w-96
                rounded-full
                bg-[#FD7C33]/20
                blur-[100px]
              "
            />

            <div
              className="
                absolute -bottom-40 -left-40
                h-[500px] w-[500px]
                rounded-full
                bg-[#A04100]/20
                blur-[120px]
              "
            />

            <div
              className="
                absolute inset-0
                opacity-[0.05]
                [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
                [background-size:40px_40px]
              "
            />

            <div className="relative z-10">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            <div className="relative z-10">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#FD7C33]">
                Welcome back
              </p>

              <h1 className="max-w-md text-4xl font-black leading-tight text-white lg:text-5xl">
                Your next campaign starts here.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-zinc-400">
                Sign in to manage your billboard bookings, campaigns, and
                advertising spaces on BotaFelig.
              </p>
            </div>
          </section>

          {/* Right */}
          <section className="flex min-h-[650px] flex-col justify-center bg-white p-6 dark:bg-zinc-950 sm:p-10 lg:p-14">
            {/* Mobile logo */}
            <div className="mb-10 flex justify-center md:hidden">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#A04100] dark:text-[#FD7C33]">
                Welcome back
              </p>

              <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                Sign in
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Enter your details to access your BotaFelig account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        email: event.target.value,
                      }))
                    }
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-zinc-200
                      bg-zinc-50
                      pl-10
                      pr-3
                      text-sm
                      text-zinc-900
                      outline-none
                      transition
                      placeholder:text-zinc-400
                      focus:border-[#A04100]
                      focus:ring-4
                      focus:ring-[#A04100]/10
                      dark:border-zinc-800
                      dark:bg-zinc-900
                      dark:text-white
                      dark:focus:border-[#FD7C33]
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#A04100] hover:underline dark:text-[#FD7C33]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        password: event.target.value,
                      }))
                    }
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-zinc-200
                      bg-zinc-50
                      pl-10
                      pr-11
                      text-sm
                      text-zinc-900
                      outline-none
                      transition
                      placeholder:text-zinc-400
                      focus:border-[#A04100]
                      focus:ring-4
                      focus:ring-[#A04100]/10
                      dark:border-zinc-800
                      dark:bg-zinc-900
                      dark:text-white
                      dark:focus:border-[#FD7C33]
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="
                    h-4 w-4
                    rounded
                    border-zinc-300
                    text-[#A04100]
                    focus:ring-[#A04100]
                    dark:border-zinc-700
                    dark:bg-zinc-900
                  "
                />

                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Remember me
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="
                  group
                  flex h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#A04100]
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-[#A04100]/20
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#8b3800]
                  dark:bg-[#FD7C33]
                  dark:text-zinc-950
                  dark:hover:bg-[#ff985e]
                "
              >
                Sign in

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Signup */}
            <div className="mt-8 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#A04100] hover:underline dark:text-[#FD7C33]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}