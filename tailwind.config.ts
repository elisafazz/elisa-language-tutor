import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EE',
        ink: '#1F1A14',
        muted: '#7A6F60',
        line: '#E5DCC9',
        terra: '#B85C3F',
        sage: '#7A8B6F',
        'sage-deep': '#4F5B47',
        gold: '#C9A961',
      },
      fontFamily: {
        serif: ['ui-serif', 'Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
