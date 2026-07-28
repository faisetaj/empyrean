/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Light, bright palette taken from the original site: white and
        // #f7f7f7 grounds, #161922 charcoal type, silver-grey accents.
        // No gold anywhere — the brand reads black, white and chrome.
        ink: '#14171E',
        charcoal: '#161922',
        graphite: '#3A3F4A',
        // Body copy on white. #8e8e8e (the original grey) only clears ~3.5:1,
        // so text uses slate and smoke is kept for decoration alone.
        slate: '#5C6270',
        smoke: '#8E8E8E',
        silver: '#C4C7CD',
        pearl: '#E9EAEC',
        mist: '#F7F7F7',
        bone: '#FDFDFD',
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
        lift: '0 18px 45px -20px rgba(20,23,30,0.28)',
        card: '0 1px 3px rgba(20,23,30,0.05), 0 12px 32px -16px rgba(20,23,30,0.18)',
      },
      backgroundImage: {
        // Brushed-chrome ramp echoing the EB monogram, for dark panels only.
        chrome:
          'linear-gradient(180deg,#FFFFFF 0%,#E4E6EA 38%,#9DA2AC 62%,#F2F3F5 100%)',
        'silver-line':
          'linear-gradient(90deg,transparent,rgba(20,23,30,0.35),transparent)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'ken-burns': 'kenBurns 22s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.02) translate(0,0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%,-1%)' },
        },
      },
    },
  },
  plugins: [],
};
