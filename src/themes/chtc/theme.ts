'use client'

import {createTheme, responsiveFontSizes} from "@mui/material";
import Link from "next/link";

import {rhd, rht} from "./fonts"

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#B61F24"
      },
      secondary: {
        main: "#000000"
      }
    },
    typography: {
      h1: {
        fontFamily: rhd.style.fontFamily,
        fontWeight: 500
      },
      h2: {
        fontFamily: rhd.style.fontFamily,
        fontWeight: 500,
      },
      h3: {
        fontFamily: rhd.style.fontFamily,
        fontWeight: 500,
      },
      h4: {
        fontFamily: rhd.style.fontFamily,
        fontWeight: 700,
      },
      h5: {
        fontFamily: rhd.style.fontFamily,
        fontWeight: 700,
      },
      h6: {
        fontFamily: rhd.style.fontFamily,
        fontWeight: 700,
      },
      fontFamily: [
        rht.style.fontFamily,
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "Lucida Grande",
        "sans-serif"
      ].join(",")
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: Link
        }
      }
    },
  }),
  {factor: 2}
)

export default theme;
