/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--c-bg-primary)',
        'bg-secondary': 'var(--c-bg-secondary)',
        'text-primary': 'var(--c-text-primary)',
        'text-muted': 'var(--c-text-muted)',
        'border-subtle': 'var(--c-border-subtle)',
        'border-faint': 'var(--c-border-faint)',
        'accent-purple': '#8b5cf6',
        'accent-blue': '#3b82f6',
        'accent-violet': '#a855f7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)',
        'gradient-radial-glow':
          'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(4,4,10,0) 70%)',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(139,92,246,0.45)',
        'glow-blue': '0 0 40px rgba(59,130,246,0.35)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139,92,246,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
