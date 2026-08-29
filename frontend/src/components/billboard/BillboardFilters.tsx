"use client";

import { MapPin, RotateCcw } from "lucide-react";

type Props = {
  location: string;
  setLocation: (value: string) => void;

  types: string[];
  setTypes: (value: string[]) => void;

  minPrice: string;
  setMinPrice: (value: string) => void;

  maxPrice: string;
  setMaxPrice: (value: string) => void;

  clearFilters: () => void;
};

const BILLBOARD_TYPES = [
  {
    value: "Digital LED",
    label: "Digital LED",
  },
  {
    value: "Static",
    label: "Static / Print",
  },
  {
    value: "Wallscape",
    label: "Wallscape",
  },
];

export default function BillboardFilters({
  location,
  setLocation,
  types,
  setTypes,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
}: Props) {
  const toggleType = (type: string) => {
    if (types.includes(type)) {
      setTypes(types.filter((item) => item !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-950 dark:text-white">
            Filters
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Refine your search
          </p>
        </div>

        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 dark:text-orange-500"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {/* Location */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Location
          </label>

          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="
                h-11 w-full appearance-none rounded-xl
                border border-slate-200
                bg-slate-50 pl-9 pr-3
                text-sm font-medium text-slate-900
                outline-none
                focus:border-orange-500
                focus:ring-4 focus:ring-orange-500/10
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
              "
            >
              <option>All Addis Ababa</option>
              <option>Bole</option>
              <option>Piassa</option>
              <option>Kazanchis</option>
              <option>Mexico</option>
              <option>Megenagna</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Monthly Price
          </label>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min ETB"
              className="
                h-11 w-full rounded-xl
                border border-slate-200
                bg-slate-50 px-3
                text-sm font-medium outline-none
                placeholder:text-slate-400
                focus:border-orange-500
                focus:ring-4 focus:ring-orange-500/10
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
              "
            />

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max ETB"
              className="
                h-11 w-full rounded-xl
                border border-slate-200
                bg-slate-50 px-3
                text-sm font-medium outline-none
                placeholder:text-slate-400
                focus:border-orange-500
                focus:ring-4 focus:ring-orange-500/10
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
              "
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Billboard Type
          </label>

          <div className="space-y-3">
            {BILLBOARD_TYPES.map((type) => (
              <label
                key={type.value}
                className="flex cursor-pointer items-center justify-between gap-3"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {type.label}
                </span>

                <input
                  type="checkbox"
                  checked={types.includes(type.value)}
                  onChange={() => toggleType(type.value)}
                  className="
                    h-4 w-4 rounded border-slate-300
                    text-orange-600
                    accent-orange-600
                    focus:ring-orange-500
                    dark:border-slate-600
                  "
                />
              </label>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-950/20">
          <p className="text-xs font-bold text-orange-800 dark:text-orange-400">
            Need help choosing?
          </p>

          <p className="mt-1 text-xs leading-5 text-orange-700/80 dark:text-orange-400/70">
            Choose locations with high traffic and visibility for better
            campaign reach.
          </p>
        </div>
      </div>
    </div>
  );
}