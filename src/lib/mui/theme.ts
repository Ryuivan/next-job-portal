"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

let theme = createTheme({
  palette: {
    primary: {
      main: "#f67906",
    },
    secondary: {
      main: "#fb8830",
    },
    background: {
      default: "#121212",
      paper: "#282828",
    },
    text: {
      primary: "#ffffff",
      secondary: "#121212",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
