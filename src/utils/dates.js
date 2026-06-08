export function getTodayDayId(date = new Date()) {
  const map = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday"
  };

  return map[date.getDay()];
}

export function formatDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function isSameDate(a, b) {
  return formatDateKey(a) === formatDateKey(b);
}

export function getStartOfWeek(date = new Date()) {
  const start = new Date(date);
  const mondayOffset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - mondayOffset);
  start.setHours(0, 0, 0, 0);

  return start;
}

export function getWeekDates(date = new Date()) {
  const start = getStartOfWeek(date);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

export function getTodayRoutine(days, date = new Date()) {
  const dayId = getTodayDayId(date);
  return days.find((day) => day.id === dayId) ?? days[0];
}

export function getWeekKey(date = new Date()) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((target - yearStart) / 86400000 + 1) / 7);

  return `${target.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

export function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getMonthLabel(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric"
  }).format(date);
}

export function getShortDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short"
  })
    .format(date)
    .replace(".", "");
}

export function getMonthCalendarDays(date = new Date()) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstGridDay = getStartOfWeek(firstDay);
  const today = new Date();

  return Array.from({ length: 42 }, (_, index) => {
    const currentDate = addDays(firstGridDay, index);

    return {
      date: currentDate,
      dateKey: formatDateKey(currentDate),
      dayNumber: currentDate.getDate(),
      isCurrentMonth: currentDate.getMonth() === date.getMonth(),
      isToday: isSameDate(currentDate, today)
    };
  });
}
