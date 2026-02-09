export function formatNumber(value: number | string): number {
  return parseFloat(Number(value).toFixed(10)); // removes floating-point noise
}
