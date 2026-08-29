import { NextRequest, NextResponse } from "next/server";

type BookingStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

type BookingRecord = {
  id: string;
  billboardId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
};

/*
 * DEMO AVAILABILITY DATA
 *
 * Replace this with a database query later.
 *
 * August 27, 2026:
 * TAKEN for Piassa.
 *
 * September 5-8, 2026:
 * TAKEN for Piassa.
 */
const bookings: BookingRecord[] = [
  {
    id: "demo-piassa-1",
    billboardId:
      "piassa-intersection-led",
    startDate: "2026-08-27",
    endDate: "2026-08-27",
    status: "approved",
  },
  {
    id: "demo-piassa-2",
    billboardId:
      "piassa-intersection-led",
    startDate: "2026-09-05",
    endDate: "2026-09-08",
    status: "approved",
  },
  {
    id: "demo-bole-1",
    billboardId:
      "bole-ring-road-premium",
    startDate: "2026-09-10",
    endDate: "2026-09-12",
    status: "approved",
  },
];

function formatDateKey(
  date: Date,
) {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(2, "0");

  const day =
    String(
      date.getDate(),
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function datesOverlap(
  date: string,
  startDate: string,
  endDate: string,
) {
  return (
    date >= startDate &&
    date <= endDate
  );
}

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } =
      await context.params;

    const searchParams =
      request.nextUrl.searchParams;

    const monthParam =
      searchParams.get("month");

    const yearParam =
      searchParams.get("year");

    if (
      !monthParam ||
      !yearParam
    ) {
      return NextResponse.json(
        {
          error:
            "month and year are required.",
        },
        { status: 400 },
      );
    }

    const month =
      Number(monthParam);

    const year =
      Number(yearParam);

    if (
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12
    ) {
      return NextResponse.json(
        {
          error:
            "month must be between 1 and 12.",
        },
        { status: 400 },
      );
    }

    if (
      !Number.isInteger(year) ||
      year < 2000 ||
      year > 2100
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid year.",
        },
        { status: 400 },
      );
    }

    /*
     * JS months:
     * January = 0
     *
     * API months:
     * January = 1
     */
    const firstDay =
      new Date(
        year,
        month - 1,
        1,
      );

    const lastDay =
      new Date(
        year,
        month,
        0,
      );

    const days: Array<{
      date: string;
      status:
        | "available"
        | "taken";
    }> = [];

    const cursor =
      new Date(firstDay);

    while (
      cursor <= lastDay
    ) {
      const dateKey =
        formatDateKey(cursor);

      const booking =
        bookings.find(
          (item) => {
            if (
              item.billboardId !==
              id
            ) {
              return false;
            }

            /*
             * Pending requests also block
             * dates so two users cannot
             * request the same space while
             * the owner is reviewing.
             */
            if (
              item.status !==
                "pending" &&
              item.status !==
                "approved"
            ) {
              return false;
            }

            return datesOverlap(
              dateKey,
              item.startDate,
              item.endDate,
            );
          },
        );

      days.push({
        date: dateKey,
        status: booking
          ? "taken"
          : "available",
      });

      cursor.setDate(
        cursor.getDate() + 1,
      );
    }

    return NextResponse.json({
      billboardId: id,
      month,
      year,
      days,
    });
  } catch (error) {
    console.error(
      "Availability API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Failed to load availability.",
      },
      { status: 500 },
    );
  }
}