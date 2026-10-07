/**
 * Deterministically map a string (e.g. a keyword or tag) to a stable color so
 * the same tag always renders with the same color across components.
 */
function getStringHash(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function getTagColor(tag: string): string {
  // Math.abs keeps the hue in range; the hash itself can be negative.
  let hue = Math.abs(getStringHash(tag)) % 360;
  if (hue >= 60 && hue <= 140) {
    hue = (hue + 80) % 360; // skip the harsh yellow/green band
  }

  return `hsl(${hue}, 70%, 40%)`;
}

export default getTagColor;
