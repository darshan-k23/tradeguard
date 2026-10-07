/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--base-bg)',
        surface: 'var(--surface)',
        surfaceHover: 'var(--surface-hover)',
        border: 'var(--border-base)',
        borderLight: 'var(--border-light)',
        borderFocus: 'var(--border-focus)',
        cyan: {
          500: 'var(--ai-primary)',
          900: 'rgba(0, 240, 255, 0.1)',
        },
        purple: {
          500: 'var(--ai-secondary)',
          900: 'rgba(168, 85, 247, 0.1)',
        },
        neon: {
          green: 'var(--status-success)',
          red: 'var(--status-danger)',
          amber: 'var(--status-warning)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        'glow-cyan': '0 0 10px rgba(0, 240, 255, 0.2), inset 0 0 10px rgba(0, 240, 255, 0.1)',
        'glow-green': '0 0 10px rgba(0, 255, 102, 0.2)',
        'glow-red': '0 0 10px rgba(255, 51, 102, 0.2)',
        'glow-amber': '0 0 10px rgba(255, 184, 0, 0.2)',
        'glow-purple': '0 0 10px rgba(168, 85, 247, 0.2)',
        'glow-cyan-sm': '0 0 5px rgba(0, 240, 255, 0.3)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      }
    },
  },
  plugins: [],
}
