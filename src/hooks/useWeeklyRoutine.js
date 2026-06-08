import { useEffect, useMemo } from "react";
import {
  formatDateKey,
  getMonthCalendarDays,
  getMonthKey,
  getMonthLabel,
  getShortDateLabel,
  getTodayRoutine,
  getWeekDates,
  getWeekKey,
  parseDateKey
} from "../utils/dates.js";
import useLocalStorage from "./useLocalStorage.js";

export default function useWeeklyRoutine(days) {
  const todayDate = useMemo(() => new Date(), []);
  const weekKey = useMemo(() => getWeekKey(todayDate), [todayDate]);
  const monthKey = useMemo(() => getMonthKey(todayDate), [todayDate]);
  const monthLabel = useMemo(() => getMonthLabel(todayDate), [todayDate]);
  const weekDates = useMemo(() => getWeekDates(todayDate), [todayDate]);
  const storageKey = "juba:calendar-completions";
  const [completedDates, setCompletedDates] = useLocalStorage(storageKey, {});

  const weekEntries = useMemo(
    () =>
      days.map((day, index) => {
        const date = weekDates[index];
        const dateKey = formatDateKey(date);

        return {
          ...day,
          date,
          dateKey,
          dateLabel: getShortDateLabel(date),
          dateNumber: date.getDate(),
          isCompleted: Boolean(completedDates[dateKey])
        };
      }),
    [completedDates, days, weekDates]
  );

  const completedDays = useMemo(
    () =>
      weekEntries.reduce((acc, day) => {
        acc[day.id] = day.isCompleted;
        return acc;
      }, {}),
    [weekEntries]
  );

  const completedCount = weekEntries.filter((day) => day.isCompleted).length;
  const percent = Math.round((completedCount / days.length) * 100);
  const today = getTodayRoutine(days, todayDate);
  const todayEntry = weekEntries.find((day) => day.id === today.id) ?? weekEntries[0];

  const calendarCells = useMemo(
    () =>
      getMonthCalendarDays(todayDate).map((cell) => {
        const routine = getTodayRoutine(days, cell.date);
        return {
          ...cell,
          routine,
          entry: completedDates[cell.dateKey],
          isCompleted: Boolean(completedDates[cell.dateKey])
        };
      }),
    [completedDates, days, todayDate]
  );

  const completedThisMonth = calendarCells.filter(
    (cell) => cell.isCurrentMonth && cell.isCompleted
  ).length;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        `juba:weekly-progress:${weekKey}`,
        JSON.stringify({
          completedCount,
          completedDateKeys: weekEntries.filter((day) => day.isCompleted).map((day) => day.dateKey),
          total: days.length,
          percent,
          updatedAt: new Date().toISOString()
        })
      );
    } catch {
      // Progress is derived from completed days if this write is unavailable.
    }
  }, [completedCount, days.length, percent, weekEntries, weekKey]);

  const toggleDate = (dateKey) => {
    setCompletedDates((current) => {
      const next = { ...current };
      if (next[dateKey]) {
        delete next[dateKey];
        return next;
      }

      const routine = getTodayRoutine(days, parseDateKey(dateKey));
      next[dateKey] = {
        dayId: routine.id,
        stage: routine.stage,
        completedAt: new Date().toISOString()
      };

      return next;
    });
  };

  const toggleDay = (dayId) => {
    const day = weekEntries.find((entry) => entry.id === dayId);
    if (!day) {
      return;
    }

    toggleDate(day.dateKey);
  };

  const resetWeek = () => {
    setCompletedDates((current) => {
      const next = { ...current };
      weekEntries.forEach((day) => {
        delete next[day.dateKey];
      });
      return next;
    });
  };

  return {
    calendar: {
      cells: calendarCells,
      completedThisMonth,
      entries: completedDates,
      monthKey,
      monthLabel,
      toggleDate
    },
    completedCount,
    completedDays,
    completedDates,
    days,
    percent,
    resetWeek,
    storageKey,
    today,
    todayEntry,
    toggleDay,
    total: days.length,
    weekEntries,
    weekKey
  };
}
