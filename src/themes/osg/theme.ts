'use client'

import {createBaseTheme} from "../createBaseTheme";

const theme = createBaseTheme({
  palette: {
    primary: {
      main: "#f6a32a"
    },
    secondary: {
      main: "rgb(17 24 39)"
    }
  },
  typography: {
    body1: {
      fontSize: "1.2rem",
    },
  },
})

export default theme;
