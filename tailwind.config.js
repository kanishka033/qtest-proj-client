module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      width: {},
      spacing: {},
      height: {
        cardcontainer: ["70vh"],
      },
      fontFamily: {
        pops: ["Poppins", "Helvetica", "Arial", "sans-serif"],
        inter: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },

      shadow: {
        shadow3xl: ["3xl", "35px 35px 60px -15px rgba(0, 0, 0, 0.3)"],
      },
      fontSize: {
        xss: [
          "8px",
          {
            letterSpacing: "-0.02em",
            lineHeight: "12px",
          },
        ],
        xssmob: [
          "10px",
          {
            letterSpacing: "-0.02em",
            lineHeight: "12px",
          },
        ],
        basemobile: [
          "12px",
          {
            letterSpacing: "-0.02em",
            lineHeight: "18px",
          },
        ],
      },
      colors: {
        transparent: "transparent",
        nav: {
          bg: "#F7F9FF",
        },
        primary: {
          pink: "#E40678",
          pinkDark: "#bd0061",
          gray: "#153059",
          dotcolor: "#E8EFF5",
          lightpink: "#FFDBED",
          placeholder: "#f7f9ff",
          lightblue: "#c4d7e7",
          hover: "#F7F9FF",
          privatebtn: "#FA8D8D",
          lightgreen: "#27AE60",
          design: "#E8FFFE",
        },
        extra: {
          blue: "#0D417F",
          purple: "#92278F",
          purple2: "#864798",
          darkgreen: "#48999A",
          blue2: "#3C82AF",
          blue3: "#595CA6",
          orange: "#D7634E",
          pink: "#D13077",
          placeholder: "#839FC0",
          placeholdermob: "#2886DC",
        },
      },
      textColor: {
        primary: "#E40678",
        secondary: "#153059",
        text: "#415f8b",
        grey: "#839FC0",
        white: "#ffffff",
        quicklinkdes: "#7A97B9",
        lightgreen: "#27AE60",
        link: "#0058DB",
      },
      lineHeight: {},
      borderColor: (theme) => ({
        DEFAULT: theme("colors.gray.300", "currentColor"),
        primary: "#E40678",
        secondary: "#153059",
        placeholder: "#f7f9ff",
        lightblue: "#c4d7e7",
        bar: "#e8eff5",
        lightgreen: "#27AE60",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"],
      display: ["group-hover"],
    },
  },
  plugins: [],
}
