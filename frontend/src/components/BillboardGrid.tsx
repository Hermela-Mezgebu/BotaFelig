import BillboardCard from "@/components/BillboardCard";
import { BILLBOARDS } from "@/data/billboards";

export default function BillboardGrid() {
  return (
    <section
      id="explore"
      className="bg-white px-5 py-20 dark:bg-zinc-950 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-wider text-[#A04100] dark:text-[#FD7C33]">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            Featured Billboards
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Discover premium advertising spaces across Addis Ababa.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BILLBOARDS.map((billboard) => (
            <BillboardCard
              key={billboard.id}
              billboard={billboard}
              
            />
          ))}
        </div>
      </div>
    </section>
  );
}