"use client";

import { alpha, createTheme, lighten } from "@mui/material/styles";

// My default color:
const primaryBase = "#642b8c";
const secondaryBase = "#D1CD36";

const primary = {
  main: alpha(primaryBase, 0.7),
  light: alpha(primaryBase, 0.5),
  dark: alpha(primaryBase, 0.9),
  contrastText: "#fff",
};

const primaryDark = {
  main: lighten(primaryBase, 0.4),
  light: lighten(primaryBase, 0.5),
  dark: lighten(primaryBase, 0.2),
  contrastText: "rgb(236,230,230)",
};

const secondary = {
  main: alpha(secondaryBase, 0.2),
  light: alpha(secondaryBase, 0.5),
  dark: alpha(secondaryBase, 0.9),
  contrastText: alpha("#000", 0.7), // Black text for contrast
};

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: primary,
        secondary: secondary,
        background: {
          default: "#f5f5f5", // Light gray background
          paper: "#fffefe", // White paper background
        },
      },
    },
    dark: {
      palette: {
        primary: primaryDark,
        secondary: secondary,
        background: {
          default: "#2f2f2f", // Almost completely black background
          paper: "#41403f", // Lighter Black paper background
        },
        text: {
          primary: "rgb(236,230,230)", // Light text color for dark mode
          secondary: "#b0b0b0",
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "data-theme",
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
