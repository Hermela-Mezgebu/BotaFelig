"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Layers3,
  LockKeyhole,
  Mail,
  Megaphone,
  User,
} from "lucide-react";

import Logo from "@/components/layout/Logo";

type Role = "advertiser" | "owner";

export default function SignupPage() {
  const [role, setRole] = useState<Role>("advertiser");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      ...formData,
      role,
    });

    // Backend registration will be connected here later.
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

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

      {/* =====================================================
          PAGE CONTAINER
      ====================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div
          className="
            grid w-full max-w-6xl
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
          {/* =================================================
              LEFT BRANDING PANEL
          ================================================== */}

          <section
            className="
              relative hidden
              min-h-[720px]
              overflow-hidden
              bg-zinc-950
              p-10
              md:flex
              md:flex-col
              md:justify-between
              lg:p-12
            "
          >
            {/* Background glow */}
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

            {/* Decorative grid */}
            <div
              className="
                absolute inset-0
                opacity-[0.05]
                [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
                [background-size:40px_40px]
              "
            />

            {/* Content */}
            <div className="relative z-10">
              <Link href="/" className="inline-flex">
                <Logo />
              </Link>
            </div>

            <div className="relative z-10">
              <div
                className="
                  mb-6 inline-flex
                  items-center gap-2
                  rounded-full
                  border border-white/10
                  bg-white/5
                  px-3 py-1.5
                  text-xs font-bold
                  uppercase tracking-wider
                  text-orange-300
                  backdrop-blur-sm
                "
              >
                <span className="h-2 w-2 rounded-full bg-[#FD7C33]" />
                Ethiopia&apos;s billboard marketplace
              </div>

              <h1
                className="
                  max-w-lg
                  text-4xl
                  font-black
                  leading-[1.05]
                  tracking-tight
                  text-white
                  lg:text-5xl
                "
              >
                Put your brand
                <span className="text-[#FD7C33]"> where people look.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-zinc-400">
                Join BotaFelig to discover premium billboard locations,
                compare advertising spaces, and manage your outdoor campaigns
                from one place.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-4">
                <Benefit
                  title="Discover premium locations"
                  description="Find high-impact billboard spaces across Ethiopia."
                />

                <Benefit
                  title="Book with confidence"
                  description="Compare prices, sizes, locations, and availability."
                />

                <Benefit
                  title="Manage everything in one place"
                  description="Keep your campaigns and bookings organized."
                />
              </div>

              {/* Bottom trust */}
              <div
                className="
                  mt-10
                  border-t border-white/10
                  pt-6
                  text-sm text-zinc-500
                "
              >
                Trusted marketplace experience for advertisers and billboard
                owners.
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT FORM PANEL
          ================================================== */}

          <section className="bg-white p-6 dark:bg-zinc-950 sm:p-10 lg:p-12">
            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center md:hidden">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <p
                className="
                  mb-3
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#A04100]
                  dark:text-[#FD7C33]
                "
              >
                Get started
              </p>

              <h2
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-zinc-950
                  dark:text-white
                "
              >
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Choose your role and start using BotaFelig.
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role */}
              <div>
                <label
                  className="
                    mb-3
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-zinc-500
                    dark:text-zinc-400
                  "
                >
                  I want to...
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Advertiser */}
                  <RoleCard
                    selected={role === "advertiser"}
                    onClick={() => setRole("advertiser")}
                    icon={<Megaphone className="h-5 w-5" />}
                    title="Advertise"
                    description="Book billboard spaces and manage campaigns."
                  />

                  {/* Owner */}
                  <RoleCard
                    selected={role === "owner"}
                    onClick={() => setRole("owner")}
                    icon={<Layers3 className="h-5 w-5" />}
                    title="List Billboards"
                    description="List spaces, manage bookings, and earn."
                  />
                </div>
              </div>

              <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

              {/* Full Name */}
              <InputField
                id="name"
                label="Full Name"
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(value) =>
                  setFormData((previous) => ({
                    ...previous,
                    name: value,
                  }))
                }
                icon={<User className="h-4 w-4" />}
              />

              {/* Email */}
              <InputField
                id="email"
                label="Work Email"
                type="email"
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(value) =>
                  setFormData((previous) => ({
                    ...previous,
                    email: value,
                  }))
                }
                icon={<Mail className="h-4 w-4" />}
              />

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                  "
                >
                  Password
                </label>

                <div className="relative">
                  <div
                    className="
                      pointer-events-none
                      absolute inset-y-0 left-0
                      flex items-center
                      pl-3
                      text-zinc-400
                    "
                  >
                    <LockKeyhole className="h-4 w-4" />
                  </div>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Enter at least 8 characters"
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
                      dark:placeholder:text-zinc-600
                      dark:focus:border-[#FD7C33]
                      dark:focus:ring-[#FD7C33]/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="
                      absolute inset-y-0 right-0
                      flex items-center
                      pr-3
                      text-zinc-400
                      transition
                      hover:text-zinc-700
                      dark:hover:text-zinc-200
                    "
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                  Password must contain at least 8 characters.
                </p>
              </div>

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
                  hover:shadow-xl
                  dark:bg-[#FD7C33]
                  dark:text-zinc-950
                  dark:shadow-[#FD7C33]/10
                  dark:hover:bg-[#ff985e]
                "
              >
                Continue to Dashboard

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="
                    font-bold
                    text-[#A04100]
                    hover:underline
                    dark:text-[#FD7C33]
                  "
                >
                  Log in
                </Link>
              </p>
            </div>

            {/* Terms */}
            <p className="mt-8 text-center text-[11px] leading-5 text-zinc-400 dark:text-zinc-600">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="underline transition hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline transition hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   BENEFIT COMPONENT
============================================================ */

function Benefit({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div
        className="
          mt-0.5
          flex h-7 w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#FD7C33]/10
          text-[#FD7C33]
        "
      >
        <CheckCircle2 className="h-4 w-4" />
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

/* ============================================================
   ROLE CARD
============================================================ */

function RoleCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`
        relative
        min-h-[150px]
        rounded-2xl
        border
        p-4
        text-left
        transition-all
        duration-200
        ${
          selected
            ? "border-[#A04100] bg-[#A04100]/5 shadow-lg shadow-[#A04100]/5 dark:border-[#FD7C33] dark:bg-[#FD7C33]/5"
            : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700"
        }
      `}
    >
      {/* Selected icon */}
      <div
        className={`
          absolute right-3 top-3
          transition-all
          ${
            selected
              ? "scale-100 text-[#A04100] opacity-100 dark:text-[#FD7C33]"
              : "scale-75 text-zinc-300 opacity-0 dark:text-zinc-700"
          }
        `}
      >
        <CheckCircle2 className="h-5 w-5" />
      </div>

      {/* Icon */}
      <div
        className={`
          mb-4
          flex h-10 w-10
          items-center justify-center
          rounded-xl
          transition-colors
          ${
            selected
              ? "bg-[#A04100]/10 text-[#A04100] dark:bg-[#FD7C33]/10 dark:text-[#FD7C33]"
              : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          }
        `}
      >
        {icon}
      </div>

      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-1 pr-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </button>
  );
}

/* ============================================================
   INPUT FIELD
============================================================ */

function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-zinc-700
          dark:text-zinc-300
        "
      >
        {label}
      </label>

      <div className="relative">
        <div
          className="
            pointer-events-none
            absolute inset-y-0 left-0
            flex items-center
            pl-3
            text-zinc-400
          "
        >
          {icon}
        </div>

        <input
          id={id}
          name={id}
          type={type}
          required
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
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
            dark:placeholder:text-zinc-600
            dark:focus:border-[#FD7C33]
            dark:focus:ring-[#FD7C33]/10
          "
        />
      </div>
    </div>
  );
}