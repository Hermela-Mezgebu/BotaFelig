"use client";

import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type AvailabilityCalendarProps = {
  billboardId: string;
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
};

function formatISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseISODate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function startOfDay(date: Date) {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

function isBeforeToday(date: Date) {
  return startOfDay(date) < startOfDay(new Date());
}

function isBetween(
  date: string,
  startDate: string,
  endDate: string,
) {
  if (!startDate || !endDate) {
    return false;
  }

  return date > startDate && date < endDate;
}

export default function AvailabilityCalendar({
  billboardId,
  startDate,
  endDate,
  onChange,
}: AvailabilityCalendarProps) {
  const today = useMemo(() => {
    const now = new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
  }, []);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    ),
  );

  const [unavailableDates, setUnavailableDates] =
    useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectingEnd, setSelectingEnd] = useState(false);

  /*
   * ----------------------------------------------------------
   * LOAD AVAILABILITY
   * ----------------------------------------------------------
   *
   * IMPORTANT:
   * JavaScript months are 0-based.
   * Our API uses normal months:
   *
   * January = 1
   * August = 8
   */
  const loadAvailability = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();

      const response = await fetch(
        `/api/billboards/${encodeURIComponent(
          billboardId,
        )}/availability?month=${month}&year=${year}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      if (!response.ok) {
        const text = await response.text();

        console.error(
          "Availability API error:",
          response.status,
          text,
        );

        throw new Error(
          `Failed to load availability: ${response.status}`,
        );
      }

      const data = await response.json();

      /*
       * API returns:
       *
       * {
       *   days: [
       *     {
       *       date: "2026-08-27",
       *       status: "taken"
       *     }
       *   ]
       * }
       */

      const taken = Array.isArray(data.days)
        ? data.days
            .filter(
              (item: {
                date: string;
                status: string;
              }) => item.status === "taken",
            )
            .map(
              (item: {
                date: string;
              }) => item.date,
            )
        : [];

      setUnavailableDates(taken);
    } catch (error) {
      console.error(
        "Availability loading error:",
        error,
      );

      setUnavailableDates([]);

      setError(
        "Unable to load billboard availability.",
      );
    } finally {
      setLoading(false);
    }
  }, [billboardId, currentMonth]);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  /*
   * Refresh availability every 15 seconds.
   */
  useEffect(() => {
    const interval = window.setInterval(() => {
      loadAvailability();
    }, 15000);

    return () => {
      window.clearInterval(interval);
    };
  }, [loadAvailability]);

  const unavailableSet = useMemo(
    () => new Set(unavailableDates),
    [unavailableDates],
  );

  /*
   * ----------------------------------------------------------
   * CALENDAR DAYS
   * ----------------------------------------------------------
   */
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(
      year,
      month,
      1,
    );

    const lastDay = new Date(
      year,
      month + 1,
      0,
    );

    const startingDay = firstDay.getDay();

    const daysInMonth = lastDay.getDate();

    const days: Array<Date | null> = [];

    for (
      let i = 0;
      i < startingDay;
      i++
    ) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(
        new Date(
          year,
          month,
          day,
        ),
      );
    }

    return days;
  }, [currentMonth]);

  const monthLabel =
    currentMonth.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      },
    );

  /*
   * ----------------------------------------------------------
   * MONTH NAVIGATION
   * ----------------------------------------------------------
   */

  const isCurrentMonth =
    currentMonth.getFullYear() ===
      today.getFullYear() &&
    currentMonth.getMonth() ===
      today.getMonth();

  const goPreviousMonth = () => {
    if (isCurrentMonth) {
      return;
    }

    setCurrentMonth((current) => {
      return new Date(
        current.getFullYear(),
        current.getMonth() - 1,
        1,
      );
    });
  };

  const goNextMonth = () => {
    setCurrentMonth((current) => {
      return new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        1,
      );
    });
  };

  /*
   * ----------------------------------------------------------
   * DATE CLICK
   * ----------------------------------------------------------
   */
  const handleDateClick = (date: Date) => {
    const dateString = formatISODate(date);

    setError("");

    /*
     * Past dates cannot be selected.
     */
    if (isBeforeToday(date)) {
      return;
    }

    /*
     * Already booked dates cannot be selected.
     */
    if (unavailableSet.has(dateString)) {
      return;
    }

    /*
     * FIRST CLICK
     *
     * Select start date.
     */
    if (
      !startDate ||
      (startDate && endDate) ||
      !selectingEnd
    ) {
      onChange(dateString, "");

      setSelectingEnd(true);

      return;
    }

    /*
     * If user selects a date before
     * the current start date,
     * make it the new start.
     */
    if (dateString < startDate) {
      onChange(dateString, "");

      setSelectingEnd(true);

      return;
    }

    /*
     * SECOND CLICK
     *
     * Check every day in the range.
     */
    const rangeStart =
      parseISODate(startDate);

    const rangeEnd = date;

    const cursor = new Date(rangeStart);

    while (cursor <= rangeEnd) {
      const current =
        formatISODate(cursor);

      if (
        unavailableSet.has(current) ||
        isBeforeToday(cursor)
      ) {
        setError(
          "Your selected range contains a date that is already taken.",
        );

        return;
      }

      cursor.setDate(
        cursor.getDate() + 1,
      );
    }

    onChange(
      startDate,
      dateString,
    );

    setSelectingEnd(false);
  };

  return (
    <div className="w-full">
      {/* Header */}

      <div
        className="
          flex items-center justify-between
          border-b border-slate-200
          px-5 py-4
          dark:border-slate-800
        "
      >
        <div>
          <h3
            className="
              text-lg font-extrabold
              text-slate-950
              dark:text-white
            "
          >
            {monthLabel}
          </h3>

          <p
            className="
              mt-1 text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Select your campaign dates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPreviousMonth}
            disabled={isCurrentMonth}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              border border-slate-200
              text-slate-600
              transition
              hover:border-orange-300
              hover:text-orange-600
              disabled:cursor-not-allowed
              disabled:opacity-30
              dark:border-slate-700
              dark:text-slate-300
            "
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={goNextMonth}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              border border-slate-200
              text-slate-600
              transition
              hover:border-orange-300
              hover:text-orange-600
              dark:border-slate-700
              dark:text-slate-300
            "
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="p-5">
        {error && (
          <div
            className="
              mb-4 rounded-xl
              border border-red-200
              bg-red-50
              px-4 py-3
              text-sm font-medium
              text-red-700
              dark:border-red-900/50
              dark:bg-red-950/30
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}

        <div
          className="
            grid grid-cols-7
            gap-1 sm:gap-2
          "
        >
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div
              key={day}
              className="
                py-2 text-center
                text-[10px]
                font-extrabold
                uppercase
                tracking-wider
                text-slate-400
                sm:text-xs
              "
            >
              {day}
            </div>
          ))}

          {calendarDays.map(
            (date, index) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="h-11 sm:h-12"
                  />
                );
              }

              const dateString =
                formatISODate(date);

              const unavailable =
                unavailableSet.has(
                  dateString,
                );

              const past =
                isBeforeToday(date);

              const selectedStart =
                dateString === startDate;

              const selectedEnd =
                dateString === endDate;

              const inRange =
                isBetween(
                  dateString,
                  startDate,
                  endDate,
                );

              const selected =
                selectedStart ||
                selectedEnd;

              const disabled =
                past || unavailable;

              const isToday =
                formatISODate(today) ===
                dateString;

              return (
                <button
                  key={dateString}
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    handleDateClick(date)
                  }
                  title={
                    past
                      ? "Past date"
                      : unavailable
                        ? "This date is already taken"
                        : "Available"
                  }
                  className={`
                    relative flex h-11 w-full
                    items-center justify-center
                    rounded-xl text-sm
                    font-bold transition
                    sm:h-12

                    ${
                      disabled
                        ? "cursor-not-allowed bg-slate-100 text-slate-300 dark:bg-slate-950 dark:text-slate-700"
                        : selected
                          ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                          : inRange
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-300"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400"
                    }
                  `}
                >
                  {date.getDate()}

                  {isToday && !selected && (
                    <span
                      className="
                        absolute bottom-1
                        h-1 w-1 rounded-full
                        bg-orange-500
                      "
                    />
                  )}

                  {unavailable && (
                    <span
                      className="
                        absolute right-1 top-1
                        text-red-400
                      "
                    >
                      <X size={11} />
                    </span>
                  )}

                  {selected && (
                    <span
                      className="
                        absolute right-1 top-1
                      "
                    >
                      <Check size={11} />
                    </span>
                  )}
                </button>
              );
            },
          )}
        </div>

        {/* Legend */}

        <div
          className="
            mt-6 flex flex-wrap
            gap-x-5 gap-y-3
            border-t border-slate-200
            pt-5
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">
              Available
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-600" />
            <span className="text-xs text-slate-500">
              Selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            <span className="text-xs text-slate-500">
              Past
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="text-xs text-slate-500">
              Taken
            </span>
          </div>
        </div>

        {loading && (
          <div
            className="
              mt-4 text-center
              text-xs font-medium
              text-slate-400
            "
          >
            Checking availability...
          </div>
        )}
      </div>
    </div>
  );
}