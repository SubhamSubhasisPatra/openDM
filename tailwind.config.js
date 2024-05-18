/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/style.css",
    "./src/app.css",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f1f1f1',
          text: '#000000',
          primary: '#7bb074',
          secondary: '#ffefdc',
          ternary: 'ff6f26'
        },
        dark: {
          background: '#323233',
          text: '#ffffff',
          primary: '#7bb074',
          secondary: '#ffefdc',
          ternary: 'ff6f26'
        },
        successGreenLight: '#2ed34c',
        inCompleteYellow: '#eab308',
        failedRedDeep: '#fa7672'

      },
    },
    plugins: [],
  }
}

