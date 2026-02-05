'use client'

import {createTheme, responsiveFontSizes} from "@mui/material";
import Link from "next/link";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#f6a32a"
      },
      secondary: {
        main: "rgb(17 24 39)"
      }
    },
    typography: {
      h1: {
        fontWeight: 500
      },
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
      body1: {
        fontSize: "1.2rem",
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
