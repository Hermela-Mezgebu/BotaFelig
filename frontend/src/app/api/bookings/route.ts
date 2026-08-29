import { NextRequest, NextResponse } from "next/server";

type BookingStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

type BookingItem = {
  billboardId: string;
  startDate: string;
  endDate: string;
};

type BookingRecord = {
  id: string;
  campaignId: string;
  userId: string;
  billboardId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  createdAt: string;
};

type BookingRequestBody = {
  userId?: string;
  campaignId?: string;
  billboardId?: string;
  startDate?: string;
  endDate?: string;
  items?: BookingItem[];
};

/*
 * ------------------------------------------------------------
 * DEMO STORAGE
 * ------------------------------------------------------------
 *
 * This is temporary in-memory storage.
 *
 * Replace with Prisma/PostgreSQL/Supabase/etc. later.
 */
const bookings: BookingRecord[] = [];

/*
 * ------------------------------------------------------------
 * HELPERS
 * ------------------------------------------------------------
 */

function generateId(prefix: "BH" | "CAM") {
  const random = Math.floor(
    100000 + Math.random() * 900000,
  );

  return `${prefix}-${random}`;
}

function getTodayKey() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

function isValidDateKey(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);

  return !Number.isNaN(date.getTime());
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
 * ------------------------------------------------------------
 * GET /api/bookings
 * ------------------------------------------------------------
 *
 * Optional:
 *
 * /api/bookings?billboardId=xxx
 *
 * /api/bookings?campaignId=CAM-123456
 *
 * /api/bookings?userId=demo-user
 */
export async function GET(
  request: NextRequest,
) {
  const searchParams =
    request.nextUrl.searchParams;

  const billboardId =
    searchParams.get("billboardId");

  const campaignId =
    searchParams.get("campaignId");

  const userId =
    searchParams.get("userId");

  let result = [...bookings];

  if (billboardId) {
    result = result.filter(
      (booking) =>
        booking.billboardId === billboardId,
    );
  }

  if (campaignId) {
    result = result.filter(
      (booking) =>
        booking.campaignId === campaignId,
    );
  }

  if (userId) {
    result = result.filter(
      (booking) =>
        booking.userId === userId,
    );
  }

  return NextResponse.json({
    bookings: result,
  });
}

/*
 * ------------------------------------------------------------
 * POST /api/bookings
 * ------------------------------------------------------------
 *
 * Accepts:
 *
 * {
 *   userId,
 *   items: [
 *     {
 *       billboardId,
 *       startDate,
 *       endDate
 *     }
 *   ]
 * }
 *
 * OR a single billboard:
 *
 * {
 *   userId,
 *   billboardId,
 *   startDate,
 *   endDate
 * }
 */
export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      (await request.json()) as BookingRequestBody;

    const userId =
      body.userId?.trim() || "demo-user";

    let items: BookingItem[] = [];

    if (Array.isArray(body.items)) {
      items = body.items;
    } else if (
      body.billboardId &&
      body.startDate &&
      body.endDate
    ) {
      items = [
        {
          billboardId: body.billboardId,
          startDate: body.startDate,
          endDate: body.endDate,
        },
      ];
    }

    if (items.length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one billboard must be selected.",
        },
        { status: 400 },
      );
    }

    /*
     * Remove accidental duplicates from the
     * same campaign request.
     */
    const uniqueItems =
      Array.from(
        new Map(
          items.map((item) => [
            `${item.billboardId}-${item.startDate}-${item.endDate}`,
            item,
          ]),
        ).values(),
      );

    const today = getTodayKey();

    /*
     * ----------------------------------------------------------
     * VALIDATE EVERYTHING BEFORE CREATING ANYTHING
     * ----------------------------------------------------------
     */

    for (const item of uniqueItems) {
      if (
        !item.billboardId ||
        !item.startDate ||
        !item.endDate
      ) {
        return NextResponse.json(
          {
            error:
              "Every billboard requires a start date and end date.",
          },
          { status: 400 },
        );
      }

      if (
        !isValidDateKey(item.startDate) ||
        !isValidDateKey(item.endDate)
      ) {
        return NextResponse.json(
          {
            error:
              "Dates must use YYYY-MM-DD format.",
          },
          { status: 400 },
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
          { status: 400 },
        );
      }

      if (
        item.startDate < today
      ) {
        return NextResponse.json(
          {
            error:
              "A campaign cannot start in the past.",
            billboardId:
              item.billboardId,
          },
          { status: 400 },
        );
      }

      /*
       * Check existing pending/approved
       * bookings for this billboard.
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
              "One of the selected billboard dates is no longer available.",
            billboardId:
              item.billboardId,
            startDate:
              item.startDate,
            endDate:
              item.endDate,
            conflictingBookingId:
              conflict.id,
          },
          { status: 409 },
        );
      }
    }

    /*
     * Also prevent two billboards from accidentally
     * containing conflicting ranges for the SAME
     * billboard in one request.
     */
    for (
      let i = 0;
      i < uniqueItems.length;
      i++
    ) {
      for (
        let j = i + 1;
        j < uniqueItems.length;
        j++
      ) {
        const first =
          uniqueItems[i];

        const second =
          uniqueItems[j];

        if (
          first.billboardId ===
            second.billboardId &&
          datesOverlap(
            first.startDate,
            first.endDate,
            second.startDate,
            second.endDate,
          )
        ) {
          return NextResponse.json(
            {
              error:
                "The same billboard cannot be selected with overlapping campaign dates.",
              billboardId:
                first.billboardId,
            },
            { status: 409 },
          );
        }
      }
    }

    /*
     * ----------------------------------------------------------
     * CREATE ONE CAMPAIGN
     * ----------------------------------------------------------
     */

    const campaignId =
      body.campaignId?.trim() ||
      generateId("CAM");

    const createdBookings =
      uniqueItems.map(
        (item) => {
          const booking: BookingRecord =
            {
              id: generateId("BH"),
              campaignId,
              userId,
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
        },
      );

    return NextResponse.json(
      {
        success: true,
        campaignId,
        status: "pending",
        message:
          "Campaign submitted successfully. Billboard owners will review the requests.",
        bookings:
          createdBookings,
      },
      { status: 201 },
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
      { status: 500 },
    );
  }
}