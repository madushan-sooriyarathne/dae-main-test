/* eslint-disable @typescript-eslint/no-var-requires */

const { fontFamily } = require('tailwindcss/defaultTheme');
// const {playfairDisplay, plusJakartaSans} = require('src/styles/fonts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "18": "4.5rem",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      backgroundImage: {
        lightArtifacts: "var(--gradient-bg-artifacts-light)",
        darkWater: "var(--dark-water)",
      }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        DEFAULT: "hsl(0, 0%, 5%)",
        100: "hsl(0, 0%, 95%)",
        200: "hsl(0, 0%, 85%)",
        300: "hsl(0, 0%, 75%)",
        400: "hsl(0, 0%, 65%)",
        500: "hsl(0, 0%, 55%)",
        600: "hsl(0, 0%, 45%)",
        700: "hsl(0, 0%, 35%)",
        800: "hsl(0, 0%, 25%)",
        900: "hsl(0, 0%, 15%)",
      },
      white: {
        DEFAULT: "hsl(0, 0%, 100%)",
        100: "hsl(0, 0%, 98%)",
        200: "hsl(0, 0%, 95%)",
        300: "hsl(0, 0%, 90%)",
        400: "hsl(0, 0%, 85%)",
        500: "hsl(0, 0%, 80%)",
        600: "hsl(0, 0%, 75%)",
        700: "hsl(0, 0%, 65%)",
        800: "hsl(0, 0%, 60%)",
        900: "hsl(0, 0%, 55%)",
      },
      primary: {
        DEFAULT: "hsl(358, 85%, 55%)",
        100: "hsl(358, 85%, 95%)",
        200: "hsl(358, 85%, 85%)",
        300: "hsl(358, 85%, 75%)",
        400: "hsl(358, 85%, 65%)",
        500: "hsl(358, 85%, 60%)",
        600: "hsl(358, 85%, 50%)",
        700: "hsl(358, 85%, 45%)",
        800: "hsl(358, 85%, 35%)",
        900: "hsl(358, 85%, 25%)",
      },
      water: {
        DEFAULT: "hsl(202, 95%, 15%)",
        100: "hsl(202, 95%, 95%)",
        200: "hsl(202, 95%, 85%)",
        300: "hsl(202, 95%, 75%)",
        400: "hsl(202, 95%, 65%)",
        500: "hsl(202, 95%, 55%)",
        600: "hsl(202, 95%, 45%)",
        700: "hsl(202, 95%, 35%)",
        800: "hsl(202, 95%, 25%)",
        900: "hsl(202, 95%, 10%)",
      },
      land: {
        DEFAULT: "hsl(34, 100%, 21%)",
        100: "hsl(34, 100%, 95%)",
        200: "hsl(34, 100%, 85%)",
        300: "hsl(34, 100%, 75%)",
        400: "hsl(34, 100%, 65%)",
        500: "hsl(34, 100%, 55%)",
        600: "hsl(34, 100%, 45%)",
        700: "hsl(34, 100%, 35%)",
        800: "hsl(34, 100%, 25%)",
        900: "hsl(34, 100%, 15%)",
      },
      success: "hsl(120, 95%, 32%)",
      danger: "hsl(358, 85%, 45%)",
      warning: "hsl(34, 100%, 45%)",
    },
    fontFamily: {
      sans: ['var(--primary-font)', ...fontFamily.sans],
      serif: ['var(--secondary-font)', ...fontFamily.serif]
    },
    screens: {
      xsm: "360px",
      sm: "480px",
      md: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1366px",
      "3xl": "1440px",
      "4xl": "1600px",
      "xxl": "1920px",
    },
  },
  plugins: [],
};
