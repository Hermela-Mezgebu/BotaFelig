"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileImage,
  Upload,
} from "lucide-react";
import { useState } from "react";

export default function UploadAdvertisementPage() {
  const [fileName, setFileName] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setUploaded(true);
  };

  return (
    <main className="min-h-screen bg-[#f8f9ff] px-5 py-12 text-slate-950 dark:bg-[#080d16] dark:text-white lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/booking/submitted"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 dark:text-slate-400"
        >
          <ArrowLeft size={16} />
          Back to booking
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <FileImage size={27} />
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight">
              Upload Your Advertisement
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Upload the artwork or product creative that you want
              displayed on your billboard.
            </p>
          </div>

          <label
            htmlFor="advertisement"
            className="
              flex
              min-h-64
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
              p-8
              text-center
              transition
              hover:border-orange-400
              hover:bg-orange-50/50
              dark:border-slate-700
              dark:bg-slate-950
              dark:hover:border-orange-500
            "
          >
            {uploaded ? (
              <>
                <CheckCircle2
                  size={48}
                  className="text-emerald-500"
                />

                <h2 className="mt-4 font-extrabold">
                  Advertisement uploaded
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {fileName}
                </p>

                <span className="mt-4 text-sm font-bold text-orange-600">
                  Choose another file
                </span>
              </>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-900">
                  <Upload
                    size={25}
                    className="text-orange-600"
                  />
                </div>

                <h2 className="mt-5 font-extrabold">
                  Upload your campaign artwork
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  PNG, JPG, JPEG, PDF up to 10MB
                </p>

                <span className="mt-5 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white">
                  Choose File
                </span>
              </>
            )}

            <input
              id="advertisement"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="mt-8 rounded-xl bg-slate-50 p-5 dark:bg-slate-950">
            <h3 className="text-sm font-extrabold">
              Before continuing
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>• Make sure your artwork is high quality.</li>
              <li>• Make sure the content is appropriate for advertising.</li>
              <li>• The billboard owner may review your artwork.</li>
            </ul>
          </div>

          <Link
            href={`/booking/BH-10293/payment`}
            className={`
              mt-8
              flex
              h-13
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              px-5
              py-3.5
              text-sm
              font-extrabold
              transition
              ${
                uploaded
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "pointer-events-none bg-slate-200 text-slate-400 dark:bg-slate-800"
              }
            `}
          >
            Continue to Payment
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}