// src/lib/bookingStore.ts

export type BookingStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export type Booking = {
  id: string;
  billboardId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  createdAt: string;
};

const globalForBookings = globalThis as unknown as {
  botafeligBookings?: Booking[];
};

export const bookings: Booking[] =
  globalForBookings.botafeligBookings ?? [];

if (process.env.NODE_ENV !== "production") {
  globalForBookings.botafeligBookings = bookings;
}

export function generateBookingId() {
  return `BH-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}

export function parseDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDatesBetween(
  startDate: string,
  endDate: string,
) {
  const dates: string[] = [];

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  const current = new Date(start);

  while (current <= end) {
    dates.push(formatDate(current));

    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function datesOverlap(
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

export function isDateUnavailable(
  billboardId: string,
  date: string,
) {
  return bookings.some((booking) => {
    if (booking.billboardId !== billboardId) {
      return false;
    }

    if (
      booking.status !== "PENDING" &&
      booking.status !== "APPROVED"
    ) {
      return false;
    }

    return (
      booking.startDate <= date &&
      booking.endDate >= date
    );
  });
}

export function getUnavailableDates(
  billboardId: string,
  month: number,
  year: number,
) {
  const unavailable = new Set<string>();

  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = formatDate(
      new Date(year, month, day),
    );

    if (isDateUnavailable(billboardId, date)) {
      unavailable.add(date);
    }
  }

  return Array.from(unavailable);
}