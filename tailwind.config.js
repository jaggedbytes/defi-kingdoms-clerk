module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'header': ['Lora', 'serif'],
      'sans': ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        'obsidian': '#100f21',
        'daffodil': '#fbeb74',
        'honey': '#fac05d',
        'ivy': '#14c25a',
      }
    },
  },
  plugins: [],
}
