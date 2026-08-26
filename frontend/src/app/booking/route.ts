import { NextRequest, NextResponse } from "next/server";

import {
  bookings,
  datesOverlap,
  generateBookingId,
  parseDate,
} from "@/lib/bookingStore";

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();

    const {
      billboardId,
      userId,
      startDate,
      endDate,
    } = body;

    if (
      !billboardId ||
      !userId ||
      !startDate ||
      !endDate
    ) {
      return NextResponse.json(
        {
          error:
            "Billboard, user, start date and end date are required.",
        },
        {
          status: 400,
        },
      );
    }

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return NextResponse.json(
        {
          error: "Invalid booking dates.",
        },
        {
          status: 400,
        },
      );
    }

    if (start > end) {
      return NextResponse.json(
        {
          error:
            "End date must be after start date.",
        },
        {
          status: 400,
        },
      );
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return NextResponse.json(
        {
          error:
            "You cannot book a date in the past.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Check if another pending or approved
     * booking already occupies this billboard.
     */
    const conflict = bookings.find(
      (booking) => {
        if (
          booking.billboardId !==
          billboardId
        ) {
          return false;
        }

        if (
          booking.status !== "PENDING" &&
          booking.status !== "APPROVED"
        ) {
          return false;
        }

        return datesOverlap(
          booking.startDate,
          booking.endDate,
          startDate,
          endDate,
        );
      },
    );

    if (conflict) {
      return NextResponse.json(
        {
          error:
            "One or more selected dates are no longer available.",
          conflict: true,
          booking: conflict,
        },
        {
          status: 409,
        },
      );
    }

    const booking = {
      id: generateBookingId(),
      billboardId,
      userId,
      startDate,
      endDate,
      status: "PENDING" as const,
      createdAt:
        new Date().toISOString(),
    };

    bookings.push(booking);

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Booking API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Failed to create booking request.",
      },
      {
        status: 500,
      },
    );
  }
}