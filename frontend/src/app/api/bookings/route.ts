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
  createdAt: string;
};

/*
 * DEMO STORAGE
 *
 * This survives during the current server process.
 *
 * Later replace this with Prisma / PostgreSQL /
 * MongoDB / Supabase, etc.
 */
const bookings: BookingRecord[] = [];

function generateBookingId() {
  const random =
    Math.floor(
      100000 +
        Math.random() * 900000,
    );

  return `BH-${random}`;
}

function datesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
) {
  return (
    startA <= endB &&
    endA >= startB
  );
}

/*
 * ----------------------------------------------------------
 * GET
 * ----------------------------------------------------------
 *
 * Returns bookings.
 *
 * Optional:
 *
 * /api/bookings?billboardId=xxx
 */
export async function GET(
  request: NextRequest,
) {
  const billboardId =
    request.nextUrl.searchParams.get(
      "billboardId",
    );

  const result = billboardId
    ? bookings.filter(
        (booking) =>
          booking.billboardId ===
          billboardId,
      )
    : bookings;

  return NextResponse.json({
    bookings: result,
  });
}

/*
 * ----------------------------------------------------------
 * POST
 * ----------------------------------------------------------
 *
 * Creates one or multiple booking requests.
 *
 * Body:
 *
 * {
 *   billboardId,
 *   startDate,
 *   endDate
 * }
 *
 * OR:
 *
 * {
 *   items: [
 *     {
 *       billboardId,
 *       startDate,
 *       endDate
 *     }
 *   ]
 * }
 */
export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();

    let items = [];

    if (Array.isArray(body.items)) {
      items = body.items;
    } else if (
      body.billboardId &&
      body.startDate &&
      body.endDate
    ) {
      items = [body];
    }

    if (items.length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one billboard booking is required.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Validate every booking before creating
     * anything.
     */
    for (const item of items) {
      if (
        !item.billboardId ||
        !item.startDate ||
        !item.endDate
      ) {
        return NextResponse.json(
          {
            error:
              "billboardId, startDate and endDate are required.",
          },
          {
            status: 400,
          },
        );
      }

      if (
        item.startDate >
        item.endDate
      ) {
        return NextResponse.json(
          {
            error:
              "Start date cannot be after end date.",
          },
          {
            status: 400,
          },
        );
      }

      /*
       * Prevent booking in the past.
       */
      const today = new Date();

      const todayKey =
        `${today.getFullYear()}-${String(
          today.getMonth() + 1,
        ).padStart(2, "0")}-${String(
          today.getDate(),
        ).padStart(2, "0")}`;

      if (item.startDate < todayKey) {
        return NextResponse.json(
          {
            error:
              "Booking cannot start in the past.",
          },
          {
            status: 400,
          },
        );
      }

      /*
       * Check against existing bookings.
       */
      const conflict =
        bookings.find(
          (booking) => {
            if (
              booking.billboardId !==
              item.billboardId
            ) {
              return false;
            }

            if (
              booking.status !==
                "pending" &&
              booking.status !==
                "approved"
            ) {
              return false;
            }

            return datesOverlap(
              item.startDate,
              item.endDate,
              booking.startDate,
              booking.endDate,
            );
          },
        );

      if (conflict) {
        return NextResponse.json(
          {
            error:
              "One or more selected billboard dates are no longer available.",
            billboardId:
              item.billboardId,
            startDate:
              item.startDate,
            endDate:
              item.endDate,
          },
          {
            status: 409,
          },
        );
      }
    }

    /*
     * Create bookings.
     */
    const createdBookings =
      items.map((item: any) => {
        const booking: BookingRecord = {
          id: generateBookingId(),
          billboardId:
            item.billboardId,
          startDate:
            item.startDate,
          endDate:
            item.endDate,
          status: "pending",
          createdAt:
            new Date().toISOString(),
        };

        bookings.push(booking);

        return booking;
      });

    /*
     * One campaign can contain
     * multiple billboard bookings.
     */
    const campaignId =
      createdBookings.length > 0
        ? `CAM-${createdBookings[0].id.replace(
            "BH-",
            "",
          )}`
        : generateBookingId();

    return NextResponse.json(
      {
        success: true,
        campaignId,
        status: "pending",
        message:
          "Booking request sent to the billboard owner.",
        bookings:
          createdBookings,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Create booking error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to create booking request.",
      },
      {
        status: 500,
      },
    );
  }
}