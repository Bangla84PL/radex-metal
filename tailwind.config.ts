import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
          darkGray: '#1A1A1A',
          medGray: '#2D2D2D',
        },
        steel: {
          gray: '#4A4A4A',
          medGray: '#6B6B6B',
        },
        metallic: {
          silver: '#C0C0C0',
          lightSilver: '#E8E8E8',
        },
        accent: {
          orange: '#FF6B35',
          red: '#D64545',
        },
        text: {
          white: '#FFFFFF',
          lightGray: '#E0E0E0',
        },
      },
      fontFamily: {
        bebas: ['var(--font-bebas-neue)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
