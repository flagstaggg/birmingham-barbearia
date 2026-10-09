/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta central — espelha as variáveis CSS em src/styles/index.css.
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        accent: 'var(--accent)',
        text: 'var(--text)',
        muted: 'var(--text-muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        // Cormorant Garamond para títulos, Montserrat para o corpo.
        display: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Montserrat', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        // Rótulos, menu e subtítulos em caixa alta com respiro.
        widest: '0.2em',
        wides: '0.15em',
      },
      maxWidth: {
        content: '1280px',
      },
      transitionDuration: {
        400: '400ms',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}
