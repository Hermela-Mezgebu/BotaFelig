"use client";

import { useMemo, useState } from "react";
import {
  Grid2X2,
  List,
  Map,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BillboardCard from "@/components/BillboardCard";
import BillboardFilters from "@/components/BillboardFilters";

export type Billboard = {
  id: string;
  title: string;
  location: string;
  city: string;
  type: "Static" | "Digital LED" | "Wallscape";
  size: string;
  width: number;
  height: number;
  price: number;
  availability: string;
  image: string;
  featured?: boolean;
};

const BILLBOARDS: Billboard[] = [
  {
    id: "bole-ring-road-premium",
    title: "Bole Ring Road Premium Static",
    location: "Bole, Addis Ababa",
    city: "Bole",
    type: "Static",
    size: "12m × 5m",
    width: 12,
    height: 5,
    price: 15000,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "piassa-intersection-led",
    title: "Piassa Intersection LED",
    location: "Piassa, Addis Ababa",
    city: "Piassa",
    type: "Digital LED",
    size: "8m × 4m",
    width: 8,
    height: 4,
    price: 25000,
    availability: "Available in 2 Weeks",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "kazanchis-business-display",
    title: "Kazanchis Business Display",
    location: "Kazanchis, Addis Ababa",
    city: "Kazanchis",
    type: "Digital LED",
    size: "10m × 4m",
    width: 10,
    height: 4,
    price: 32000,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mexico-main-road",
    title: "Mexico Main Road Billboard",
    location: "Mexico, Addis Ababa",
    city: "Mexico",
    type: "Static",
    size: "10m × 5m",
    width: 10,
    height: 5,
    price: 18000,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bole-airport-digital",
    title: "Bole Airport Road Digital",
    location: "Bole Airport Road, Addis Ababa",
    city: "Bole",
    type: "Digital LED",
    size: "14m × 6m",
    width: 14,
    height: 6,
    price: 45000,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "megenagna-wallscape",
    title: "Megenagna Premium Wallscape",
    location: "Megenagna, Addis Ababa",
    city: "Megenagna",
    type: "Wallscape",
    size: "18m × 8m",
    width: 18,
    height: 8,
    price: 55000,
    availability: "Available in 1 Month",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BillboardsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Addis Ababa");
  const [types, setTypes] = useState<string[]>([
    "Static",
    "Digital LED",
    "Wallscape",
  ]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("recommended");

  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredBillboards = useMemo(() => {
    let results = BILLBOARDS.filter((billboard) => {
      const searchMatch =
        billboard.title.toLowerCase().includes(search.toLowerCase()) ||
        billboard.location.toLowerCase().includes(search.toLowerCase());

      const locationMatch =
        location === "All Addis Ababa" || billboard.city === location;

      const typeMatch = types.includes(billboard.type);

      const minimum = minPrice ? Number(minPrice) : 0;
      const maximum = maxPrice ? Number(maxPrice) : Infinity;

      const priceMatch =
        billboard.price >= minimum && billboard.price <= maximum;

      return searchMatch && locationMatch && typeMatch && priceMatch;
    });

    if (sort === "price-low") {
      results = [...results].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      results = [...results].sort((a, b) => b.price - a.price);
    }

    if (sort === "size") {
      results = [...results].sort(
        (a, b) => b.width * b.height - a.width * a.height,
      );
    }

    return results;
  }, [search, location, types, minPrice, maxPrice, sort]);

  const clearFilters = () => {
    setSearch("");
    setLocation("All Addis Ababa");
    setTypes(["Static", "Digital LED", "Wallscape"]);
    setMinPrice("");
    setMaxPrice("");
    setSort("recommended");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />

      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Billboard Marketplace
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Find the right billboard
              <span className="text-orange-600 dark:text-orange-500">.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Explore premium advertising locations across Addis Ababa.
              Compare locations, prices, sizes, and availability before
              booking your next campaign.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-3xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by billboard name or location..."
                className="
                  h-14 w-full rounded-2xl border border-slate-200
                  bg-slate-50 pl-12 pr-12 text-sm font-medium
                  text-slate-900 outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-orange-500
                  focus:ring-4 focus:ring-orange-500/10
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:text-white
                "
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Desktop Filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <BillboardFilters
            location={location}
            setLocation={setLocation}
            types={types}
            setTypes={setTypes}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            clearFilters={clearFilters}
          />
        </aside>

        {/* Results */}
        <section className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-950 dark:text-white">
                {filteredBillboards.length} Billboards Available
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Showing the best advertising spaces for your search.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Mobile Filters */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="
                  inline-flex items-center gap-2 rounded-xl border
                  border-slate-200 bg-white px-3 py-2 text-xs
                  font-bold text-slate-700
                  hover:bg-slate-50
                  dark:border-slate-700 dark:bg-slate-900
                  dark:text-slate-200 dark:hover:bg-slate-800
                  lg:hidden
                "
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              {/* View */}
              <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-950 sm:flex">
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-lg p-2 ${
                    view === "grid"
                      ? "bg-white text-orange-600 shadow-sm dark:bg-slate-800"
                      : "text-slate-400"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid2X2 size={17} />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`rounded-lg p-2 ${
                    view === "list"
                      ? "bg-white text-orange-600 shadow-sm dark:bg-slate-800"
                      : "text-slate-400"
                  }`}
                  aria-label="List view"
                >
                  <List size={17} />
                </button>
              </div>

              {/* Map */}
              <button
                className="
                  hidden items-center gap-2 rounded-xl border
                  border-slate-200 px-3 py-2 text-xs font-bold
                  text-slate-700 hover:bg-slate-50
                  dark:border-slate-700 dark:text-slate-200
                  dark:hover:bg-slate-800 sm:flex
                "
              >
                <Map size={16} />
                Map
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="
                  rounded-xl border border-slate-200
                  bg-white px-3 py-2 text-xs font-bold
                  text-slate-700 outline-none
                  focus:border-orange-500
                  dark:border-slate-700 dark:bg-slate-900
                  dark:text-slate-200
                "
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="size">Largest Size</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          {filteredBillboards.length > 0 ? (
            <div
              className={
                view === "grid"
                  ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-5"
              }
            >
              {filteredBillboards.map((billboard) => (
                <BillboardCard
                  key={billboard.id}
                  billboard={billboard}
                  listView={view === "list"}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-500">
                <Search size={24} />
              </div>

              <h2 className="mt-5 text-lg font-black">
                No billboards found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or filters to discover more
                advertising spaces.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-5 dark:bg-slate-950">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-black">Filters</h2>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full bg-slate-100 p-2 dark:bg-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            <BillboardFilters
              location={location}
              setLocation={setLocation}
              types={types}
              setTypes={setTypes}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
            />

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-5 w-full rounded-xl bg-orange-600 py-3 text-sm font-bold text-white"
            >
              Show Results
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}