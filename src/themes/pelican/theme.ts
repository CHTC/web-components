'use client'

import {createTheme, responsiveFontSizes} from "@mui/material";
import Link from "next/link";

import { poppins } from "./fonts";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        dark: "#002b54",
        main: "#0885ff",
        light: "#CFE4FF"
      }
    },
    typography: {
      h1: {
        fontFamily: poppins.style.fontFamily,
        fontWeight: 500
      },
      h2: {
        fontFamily: poppins.style.fontFamily,
        fontWeight: 500,
      },
      h3: {
        fontFamily: poppins.style.fontFamily,
        fontWeight: 500,
      },
      h4: {
        fontFamily: poppins.style.fontFamily,
        fontWeight: 700,
      },
      h5: {
        fontFamily: poppins.style.fontFamily,
        fontWeight: 700,
      },
      h6: {
        fontFamily: poppins.style.fontFamily,
        fontWeight: 700,
      },
      body1: {
        fontSize: "1.2rem",
        paddingBottom: "1rem",
      },
      fontFamily: [
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
