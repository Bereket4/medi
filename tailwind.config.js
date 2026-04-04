/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cinzel Decorative"', 'system-ui', 'sans-serif'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: '#050208',
        plasma: '#7c3aed',
        ember: '#f97316',
        gold: '#fbbf24',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(5,2,8,0.2), rgba(5,2,8,0.95)), radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.35), transparent)',
        shimmer:
          'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 100%)',
      },
      animation: {
        'gradient-flow': 'gradient-flow 18s ease infinite',
        scan: 'scan 3.2s ease-in-out infinite',
        glitch: 'glitch 2.8s infinite',
        'text-flicker': 'text-flicker 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0.3' },
          '50%': { opacity: '0.9' },
          '100%': { transform: 'translateY(100vh)', opacity: '0.3' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', filter: 'blur(40px)' },
          '50%': { opacity: '0.85', filter: 'blur(52px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-6px, 3px)' },
          '40%': { transform: 'translate(6px, -3px)' },
          '60%': { transform: 'translate(-4px, -2px)' },
          '80%': { transform: 'translate(4px, 2px)' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'text-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.72' },
        },
      },
      backgroundSize: {
        '400%': '400%',
      },
    },
  },
  plugins: [],
};