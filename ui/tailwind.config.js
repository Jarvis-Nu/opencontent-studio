/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#6b7280"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("daisyui")
  ],
  variants: {
      scrollbars: ['rounded']
  },
  daisyui: {
    themes: [
      {
        darkmode: {
          secondary: "#6b7280",
        },
        lightmode: {
          secondary: "#6b7280",
        },
      },
    ],
  }
}