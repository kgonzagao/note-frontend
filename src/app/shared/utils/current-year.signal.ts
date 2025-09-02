import { computed, signal } from '@angular/core';

export function currentYearSignal() {
  const now = signal(new Date());

  const year = computed(() => now().getFullYear());

  return year;
}
