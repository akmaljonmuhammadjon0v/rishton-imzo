// Deterministic number formatter (never causes React hydration mismatch between server and client)
export function formatPrice(num: number | undefined | null): string {
  if (num === null || num === undefined) return '0';
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
