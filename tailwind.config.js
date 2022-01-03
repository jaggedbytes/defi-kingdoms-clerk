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
        'hazelnut': '#4c3e23',
        'fading-hazelnut': 'rgb(76, 62, 35, .6)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        'profile-frame': "url('../public/profile-border.png')",
      },
      spacing: {
        'profile-frame-top': '138px',
        'profile-frame-left': '45px',
        'profile-frame-width': '155px',
        'profile-frame-height': '156px',
      }
    }
  },
  plugins: [],
}
