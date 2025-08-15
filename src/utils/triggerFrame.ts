// Fungsi untuk menghitung triggerFrame berdasarkan index dan introDelay
export function getTriggerFrame(index: number, introDelay: number = 120): number {
  if (index === 0) return introDelay;
  if (index === 1) return introDelay + 60;
  if (index >= 2 && index < 5) {
    return introDelay + 200 + (index - 2) * 364;
  }
  if (index >= 5 && index < 11) {
    return introDelay + 200 + 3 * 364 + (index - 5) * 361;
  }
  if (index >= 11) {
    return introDelay + 200 + 3 * 364 + 6 * 361 + (index - 11) * 363;
  }
  return introDelay;
} 