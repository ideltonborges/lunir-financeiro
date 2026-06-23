export function parseCurrencyInput(value: string): number {
  const sanitizedValue = value
    .trim()
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(?:\D|$))/g, '')
    .replace(',', '.');

  if (!/\d/.test(sanitizedValue)) {
    return Number.NaN;
  }

  return Number(sanitizedValue);
}

export function isValidCurrencyInput(value?: string): boolean {
  if (!value) {
    return true;
  }

  return Number.isFinite(parseCurrencyInput(value));
}
