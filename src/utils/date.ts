export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getCurrentLocalDate(): string {
  return formatLocalDate(new Date());
}

export function getMonthBounds(date = new Date()): { start: string; end: string } {
  const year = date.getFullYear();
  const month = date.getMonth();

  return {
    start: formatLocalDate(new Date(year, month, 1)),
    end: formatLocalDate(new Date(year, month + 1, 0)),
  };
}

export function getDateForMonthDay(date: Date, day: number): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const safeDay = Math.min(Math.max(day, 1), lastDay);

  return formatLocalDate(new Date(year, month, safeDay));
}

export function getDayFromDateString(date: string): number {
  return Number(date.substring(8, 10));
}
