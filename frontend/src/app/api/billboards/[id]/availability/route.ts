import { NextRequest, NextResponse } from "next/server";

type BookingRecord = {
  id: string;
  billboardId: string;
  startDate: string;
  endDate: string;
  status:
    | "pending"
    | "approved"
    | "rejected"
    | "cancelled";
};

/*
 * ============================================================
 * DEMO BOOKING DATA
 * ============================================================
 *
 * Replace this with your database query later.
 *
 * For now:
 *
 * August 27, 2026 = TAKEN
 *
 * September 5 - September 8, 2026 = TAKEN
 */
const bookings: BookingRecord[] = [
  {
    id: "demo-booking-1",
    billboardId:
      "piassa-intersection-led",
    startDate: "2026-08-27",
    endDate: "2026-08-27",
    status: "approved",
  },

  {
    id: "demo-booking-2",
    billboardId:
      "piassa-intersection-led",
    startDate: "2026-09-05",
    endDate: "2026-09-08",
    status: "approved",
  },
];

function formatDateKey(date: Date) {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
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
            "month and year are required",
        },
        {
          status: 400,
        },
      );
    }

    const month =
      Number(monthParam);

    const year =
      Number(yearParam);

    /*
     * API uses:
     *
     * January = 1
     * February = 2
     * ...
     * August = 8
     * ...
     * December = 12
     */
    if (
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12
    ) {
      return NextResponse.json(
        {
          error:
            "month must be between 1 and 12",
        },
        {
          status: 400,
        },
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
            "Invalid year",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * JavaScript Date:
     *
     * new Date(year, month - 1, 1)
     *
     * because JavaScript months are zero-based.
     */
    const firstDay =
      new Date(
        year,
        month - 1,
        1,
      );

    /*
     * Last day of requested month.
     */
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

    /*
     * Generate every day in this month.
     */
    while (
      cursor <= lastDay
    ) {
      const dateKey =
        formatDateKey(cursor);

      /*
       * Find a booking for this billboard
       * that overlaps this date.
       */
      const booking =
        bookings.find(
          (item) => {
            /*
             * Different billboard.
             */
            if (
              item.billboardId !==
              id
            ) {
              return false;
            }

            /*
             * Approved and pending
             * bookings block the date.
             *
             * Rejected/cancelled bookings
             * do NOT block it.
             */
            if (
              item.status !==
                "approved" &&
              item.status !==
                "pending"
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

    /*
     * Also return unavailableDates.
     *
     * This makes the API compatible with
     * either version of the calendar component.
     */
    const unavailableDates =
      days
        .filter(
          (day) =>
            day.status ===
            "taken",
        )
        .map(
          (day) =>
            day.date,
        );

    return NextResponse.json({
      billboardId: id,
      month,
      year,

      /*
       * Full calendar information.
       */
      days,

      /*
       * Simple list of taken dates.
       */
      unavailableDates,
    });
  } catch (error) {
    console.error(
      "Availability API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Failed to load availability",
      },
      {
        status: 500,
      },
    );
  }
}