/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Carried over from the original Empyrean palette (#161922 charcoal,
        // #8e8e8e smoke, #f7f7f7 bone) and deepened for a modern dark canvas.
        ink: '#0B0D12',
        charcoal: '#161922',
        graphite: '#1E222D',
        smoke: '#8E8E8E',
        bone: '#F7F7F7',
        // The chrome logo reads as platinum; champagne warms the CTAs so the
        // whole page isn't cold grey-on-grey.
        champagne: '#C5A059',
        'champagne-light': '#E0C88B',
        'champagne-dark': '#9C7C3C',
        ember: '#571600',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.28em',
        wide2: '0.16em',
      },
      boxShadow: {
        lift: '0 18px 50px -12px rgba(0,0,0,0.65)',
        gold: '0 0 0 1px rgba(197,160,89,0.35), 0 12px 40px -12px rgba(197,160,89,0.35)',
      },
      backgroundImage: {
        platinum:
          'linear-gradient(180deg,#FFFFFF 0%,#E4E6EA 38%,#9DA2AC 62%,#F2F3F5 100%)',
        'gold-line':
          'linear-gradient(90deg,transparent,rgba(197,160,89,0.85),transparent)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'ken-burns': 'kenBurns 22s ease-in-out infinite alternate',
        shimmer: 'shimmer 6s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.02) translate(0,0)' },
          '100%': { transform: 'scale(1.14) translate(-1.5%,-1%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
