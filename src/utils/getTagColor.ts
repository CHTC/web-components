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

const SATURATION = 70;
const LIGHTNESS = 40;
/** WCAG AA for normal-size text: tags are drawn as small white labels. */
const MIN_CONTRAST_WITH_WHITE = 4.5;

/** sRGB channels (0–1) of an HSL color. */
function hslToRgb(hue: number, saturation: number, lightness: number): [number, number, number] {
  const s = saturation / 100;
  const l = lightness / 100;
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => {
    const k = (n + hue / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [channel(0), channel(8), channel(4)];
}

/** WCAG relative luminance. */
function luminance([r, g, b]: [number, number, number]): number {
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** Contrast ratio of white text on this color. */
function contrastWithWhite(rgb: [number, number, number]): number {
  return 1.05 / (luminance(rgb) + 0.05);
}

/**
 * A background for a white tag label. At the same lightness some hues are
 * far brighter than others (orange and cyan reach only ~2.4:1 against white
 * at 40%), so each hue is darkened only as far as it needs to meet
 * `MIN_CONTRAST_WITH_WHITE`; the others keep their usual 40%.
 */
export function getTagColor(tag: string): string {
  // Math.abs keeps the hue in range; the hash itself can be negative.
  let hue = Math.abs(getStringHash(tag)) % 360;
  if (hue >= 60 && hue <= 140) {
    hue = (hue + 80) % 360; // skip the harsh yellow/green band
  }

  let lightness = LIGHTNESS;
  while (lightness > 0 && contrastWithWhite(hslToRgb(hue, SATURATION, lightness)) < MIN_CONTRAST_WITH_WHITE) {
    lightness -= 1;
  }

  return `hsl(${hue}, ${SATURATION}%, ${lightness}%)`;
}

export default getTagColor;
