/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'], // Hacker feel ke liye
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        neon: {
          blue: "#00f3ff",
          purple: "#bc13fe",
          green: "#0aff0a",
          bg: "#050505",
          surface: "#111111"
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-flow': 'gridFlow 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        gridFlow: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        }
      }
    },
  },
  plugins: [],
}