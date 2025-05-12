/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.stories.tsx',
    './node_modules/@bbodek/internal-ui/dist/**.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  safelist: [],
};
