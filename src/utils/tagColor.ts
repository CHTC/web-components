/**
 * Deterministically maps a string (e.g. a keyword/tag) to a stable color so the
 * same tag always renders with the same color across components.
 */

function getStringHash(value: string): number {
  // Simple hash function to generate a number from the tag string
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

export function getTagColor(tag: string): string {
  let hue = getStringHash(tag) % 360;
  if (hue >= 60 && hue <= 140) {
    hue = (hue + 80) % 360; // avoid ugly colors
  }

  return `hsl(${hue}, 70%, 40%)`;
}
