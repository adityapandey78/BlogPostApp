module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      aspectRatio: {
        'w-16': '16',
        'h-9': '9',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#f3f4f6',
            fontFamily: 'Poppins, sans-serif',
            h1: {
              fontFamily: 'Cairo, sans-serif',
              color: '#f3f4f6',
            },
            h2: {
              fontFamily: 'Cairo, sans-serif',
              color: '#f3f4f6',
            },
            h3: {
              fontFamily: 'Cairo, sans-serif',
              color: '#f3f4f6',
            },
            h4: {
              fontFamily: 'Cairo, sans-serif',
              color: '#f3f4f6',
            },
            p: {
              color: '#f3f4f6',
              fontSize: '1.125rem',
              lineHeight: '1.75',
              marginBottom: '1.5rem',
            },
            strong: {
              color: '#f3f4f6',
            },
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            'code': {
              color: '#f3f4f6',
              backgroundColor: '#374151',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'blockquote p': {
              fontStyle: 'italic',
              color: '#e5e7eb',
              borderLeftColor: '#60a5fa',
            },
            ul: {
              color: '#f3f4f6',
            },
            ol: {
              color: '#f3f4f6',
            },
            li: {
              color: '#f3f4f6',
            },
          },
        },
        lg: {
          css: {
            p: {
              fontSize: '1.125rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
} 