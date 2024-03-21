module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    borderRadius: {
      none: "0px",
      DEFAULT: "0.1875rem",
      container: "0.375rem",
    },
    colors: {
      link: "var(--pds-color-link-default)",
      hover: "var(--pds-color-link-hover)",
    },
    fontSize: {
      xs: ["0.694rem", { lineHeight: "1rem" }],
      sm: ["0.833rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.2rem", { lineHeight: "1.75rem" }],
      xl: ["1.44rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.728rem", { lineHeight: "2rem" }],
      "3xl": ["2.074rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.488rem", { lineHeight: "2.5rem" }],
      "5xl": ["2.986rem", { lineHeight: "1" }],
      "6xl": ["3.583rem", { lineHeight: "1" }],
    },
    fontWeight: {
      normal: "400",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    letterSpacing: {
      tight: "-0.02em",
      normal: "0em",
      wide: "0.02em",
      wider: "0.04em",
      widest: "0.06em",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--pds-color-text-default)",
            "--tw-prose-headings": "var(--pds-color-text-default)",
            "--tw-prose-bold": "var(--pds-color-text-default)",
            "--tw-prose-bullets": "var(--pds-color-text-default)",
            "--tw-prose-counters": "var(--pds-color-text-default)",
            "--tw-prose-hr": "var(--pds-color-border-default)",
            "--tw-prose-th-borders": "var(--pds-color-border-default)",
            "--tw-prose-td-borders": "var(--pds-color-border-default)",
            a: {
              color: "var(--pds-color-interactive-link)",
            },
            "a:hover": {
              color: "var(--pds-color-interactive-link-hover)",
              textDecoration: "none",
            },
            p: {
              marginBlockEnd: "1rem",
              marginBlockStart: 0,
            },
            h1: {
              fontSize: "2.986rem",
              fontWeight: "700",
            },
            h2: {
              fontSize: "2.074rem",
              marginBlockEnd: "1.25rem",
              marginBlockStart: "3.052rem",
              fontWeight: "700",
            },
            h3: {
              fontSize: "1.728rem",
              marginBlockEnd: "1.25rem",
              marginBlockStart: "2.441rem",
              fontWeight: "700",
            },
            h4: {
              fontSize: "1.44rem",
              marginBlockEnd: "1.25rem",
              marginBlockStart: "1.953rem",
              fontWeight: "700",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
