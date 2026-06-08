/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070b14',
          900: '#0b1220',
          850: '#0e1626',
          800: '#121c30',
          700: '#1b2740',
          600: '#26334f'
        },
        accent: {
          DEFAULT: '#3b6cff',
          600: '#2f5be0'
        }
      },
      borderRadius: { card: '1rem' }
    }
  },
  plugins: []
}
