'use client'

import {createBaseTheme} from "../createBaseTheme";
import {poppins} from "./fonts";

const theme = createBaseTheme({
  palette: {
    primary: {
      dark: "#002b54",
      main: "#0885ff",
      light: "#CFE4FF"
    }
  },
  headingFontFamily: poppins.style.fontFamily,
  typography: {
    body1: {
      fontSize: "1.2rem",
      paddingBottom: "1rem",
    },
  },
})

export default theme;
