/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#32586D',

          secondary: '#014048',

          accent: '#00b000',

          neutral: '#1b1b1b',

          'base-100': '#FFFFFF',

          info: '#00e3ff',

          success: '#00ae6a',

          warning: '#927200',

          error: '#ff3265',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
