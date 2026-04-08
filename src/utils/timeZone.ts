const INDIA_TIME_ZONE = "Asia/Kolkata";
const INDIA_LOCALE = "en-IN";

function toDate(value: Date | string | number): Date {
  return value instanceof Date ? value : new Date(value);
}

export function formatIndianDate(
  value: Date | string | number,
  locale: string = INDIA_LOCALE
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: INDIA_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(toDate(value));
}

export function formatIndianTime(
  value: Date | string | number,
  locale: string = INDIA_LOCALE,
  is24Hour: boolean = false
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: INDIA_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !is24Hour,
  }).format(toDate(value));
}

export function formatIndianDateTime(
  value: Date | string | number,
  locale: string = INDIA_LOCALE,
  is24Hour: boolean = false
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: INDIA_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !is24Hour,
  }).format(toDate(value));
}
