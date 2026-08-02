/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Anton"', '"Bodoni Moda"', 'serif'],
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        teknic: {
          red: '#C8102E',
          steel: '#4A5568',
          graphite: '#0A0A0A',
          spark: '#F97316',
        },
        usinage: { light: '#94A3B8', mid: '#334155', dark: '#0F172A' },
        fabrication: { light: '#FCD34D', mid: '#F59E0B', dark: '#451A03' },
        soudure: { light: '#60A5FA', mid: '#2563EB', dark: '#1E3A8A' },
        mecanique: { light: '#FCA5A5', mid: '#DC2626', dark: '#450A0A' },
      },
      letterSpacing: {
        widest2: '0.4em',
      },
      animation: {
        'spin-slow': 'spin 120s linear infinite',
        'spark-fall': 'spark-fall 3s linear infinite',
      },
      keyframes: {
        'spark-fall': {
          '0%': { transform: 'translateY(-10vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
