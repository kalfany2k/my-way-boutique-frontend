import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-nude': {
          100: '#FFF5EB',
          200: '#FFE8D6',
          300: '#FFDAB8',
          400: '#FFC99A',
          500: '#FFB77C',
          600: '#FFA15E',
          700: '#FF8B40',
          800: '#FF7522',
          900: '#FF5F04',
        },
        'cool-nude': {
          100: '#F5F0EB',
          200: '#EBE1D7',
          300: '#E0D2C3',
          400: '#D6C3AF',
          500: '#CCB49B',
          600: '#C2A587',
          700: '#B89673',
          800: '#AE875F',
          900: '#A4784B',
        },
        'rosy-nude': {
          100: '#FFF0F0',
          200: '#FFE1E1',
          300: '#FFD2D2',
          400: '#FFC3C3',
          500: '#FFB4B4',
          600: '#FFA5A5',
          700: '#FF9696',
          800: '#FF8787',
          900: '#FF7878',
        },
        'taupe-nude': {
          100: '#F5F3F2',
          200: '#EBE7E5',
          300: '#E0DBD8',
          400: '#D6CFCB',
          500: '#CCC3BE',
          600: '#C2B7B1',
          700: '#B8ABA4',
          800: '#AE9F97',
          900: '#A4938A',
        },
        'pink-nude': "#fecec1"
      },
      fontFamily: {
        'signika-light': ['Signika-Light', 'sans-serif'],
        'signika': ['Signika-Regular', 'sans-serif'],
        'signika-medium': ['Signika-Medium', 'sans-serif'],
        'signika-semibold': ['Signika-SemiBold', 'sans-serif'],
        'signika-bold': ['Signika-Bold', 'sans-serif'],
        'ethereal-thin': ['EtherealDemoFont-Thin', 'sans-serif'],
        'ethereal-light': ['EtherealDemoFont-Light', 'sans-serif'],
        'ethereal': ['EtherealDemoFont-Regular', 'sans-serif'],
        'ethereal-bold': ['EtherealDemoFont-Bold', 'sans-serif'],
        'nunito-extrabold': ['Nunito-ExtraBold', 'sans-serif'],
        'nunito-extralight': ['Nunito-ExtraLight', 'sans-serif'],
        'nunito-italic': ['Nunito-Italic', 'sans-serif'],
        'nunito-light': ['Nunito-Light', 'sans-serif'],
        'nunito-lightitalic': ['Nunito-LightItalic', 'sans-serif'],
        'nunito-medium': ['Nunito-Medium', 'sans-serif'],
        'nunito-regular': ['Nunito-Regular', 'sans-serif'],
        'nunito-semibold': ['Nunito-SemiBold', 'sans-serif'],
        'nunito-semibolditalic': ['Nunito-SemiBoldItalic', 'sans-serif'],
        'overlock-black': ['Overlock-Black', 'sans-serif'],
        'overlock-blackitalic': ['Overlock-BlackItalic', 'sans-serif'],
        'overlock-bold': ['Overlock-Bold', 'sans-serif'],
        'overlock-bolditalic': ['Overlock-BoldItalic', 'sans-serif'],
        'overlock-italic': ['Overlock-Italic', 'sans-serif'],
        'overlock-regular': ['Overlock-Regular', 'sans-serif'],
        'merriweather-light': ['Merriweather-Light', 'serif'],
        'merriweather': ['Merriweather', 'serif'],
      },
      zIndex: {
        "background": 0,
        "body": 10,
        "buttons": 20,
        "header": 40,
        "overlay": 50,
        "priority": 60,
      },
      height: {
        "page-height": "calc(100dvh - 12.5rem)",
        "header": "5rem",
        "total-header": "7.5rem",
      },
      minHeight: {
        "page-height": "calc(100dvh - 9.5rem)",
      },
      margin: {
        "header": "5rem",
        "total-header": "7.5rem",
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(50%)', opacity: '0' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out forwards',
        slideOut: 'slideOut 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
}

