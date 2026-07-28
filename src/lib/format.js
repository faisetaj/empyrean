/**
 * Renders an ISO date (YYYY-MM-DD) as "18 June 2026".
 *
 * Parsed as UTC deliberately — `new Date('2026-06-18')` is already UTC
 * midnight, so formatting in a negative-offset timezone like Texas would
 * otherwise roll the displayed date back by a day.
 */
export function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
