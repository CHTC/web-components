'use client'

import {createTheme, responsiveFontSizes, Theme, ThemeOptions} from "@mui/material";
import Link from "next/link";

const FONT_FALLBACK = [
  "Helvetica Neue",
  "Helvetica",
  "Arial",
  "Lucida Grande",
  "sans-serif",
];

interface BaseThemeConfig {
  palette: ThemeOptions["palette"];
  /** Font family applied to all heading variants (h1–h6). */
  headingFontFamily?: string;
  /** Font family prepended to the shared sans-serif fallback for body text. */
  bodyFontFamily?: string;
  /** Extra typography overrides merged on top of the shared defaults. */
  typography?: ThemeOptions["typography"];
  /** Extra component overrides merged on top of the shared MuiLink default. */
  components?: ThemeOptions["components"];
}

/**
 * Builds a theme from the structure shared by every theme in this library:
 * Next.js `Link` wiring for MUI links, the common heading weights, and the
 * shared sans-serif fallback stack. Themes only supply what differs.
 */
export function createBaseTheme({
  palette,
  headingFontFamily,
  bodyFontFamily,
  typography,
  components,
}: BaseThemeConfig): Theme {
  const heading = (fontWeight: number) =>
    headingFontFamily ? {fontFamily: headingFontFamily, fontWeight} : {fontWeight};

  return responsiveFontSizes(
    createTheme({
      palette,
      typography: {
        h1: heading(500),
        h2: heading(500),
        h3: heading(500),
        h4: heading(700),
        h5: heading(700),
        h6: heading(700),
        fontFamily: [bodyFontFamily, ...FONT_FALLBACK].filter(Boolean).join(","),
        ...typography,
      },
      components: {
        MuiLink: {
          defaultProps: {
            component: Link,
          },
        },
        ...components,
      },
    }),
    {factor: 2}
  )
}
