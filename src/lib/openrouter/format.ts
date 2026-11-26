// Shared by the build and the chart tooltip script, so keep it free of data imports
export const formatTokens = (n: number) => {
  for (const [div, unit] of [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'K'],
  ] as const)
    if (n >= div) return `${+(n / div).toPrecision(n / div >= 100 ? 3 : 2)}${unit}`;
  return `${Math.round(n)}`;
};
