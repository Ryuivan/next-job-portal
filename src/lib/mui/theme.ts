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
    mode: "dark",
    primary: {
      main: "#fb8830", // Warna utama aksen oren
    },
    secondary: {
      main: "#f67906", // Warna sekunder aksen oren lebih gelap
    },
    background: {
      default: "#121212", // Warna gelap khas dark mode
      paper: "#1e1e1e", // Warna untuk card atau container
    },
    text: {
      primary: "#ffffff", // Teks utama tetap putih
      secondary: "#b0b0b0", // Teks sekunder abu-abu agar tidak terlalu kontras
    },
    divider: "#f67906", // Divider dengan aksen oren
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
