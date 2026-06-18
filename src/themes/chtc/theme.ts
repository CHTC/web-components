'use client'

import Link from "next/link";

import {createBaseTheme} from "../createBaseTheme";
import {rhd, rht} from "./fonts"

const theme = createBaseTheme({
  palette: {
    primary: {
      main: "#B61F24"
    },
    secondary: {
      main: "#000000"
    }
  },
  headingFontFamily: rhd.style.fontFamily,
  bodyFontFamily: rht.style.fontFamily,
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      }
    }
  },
})

export default theme;
