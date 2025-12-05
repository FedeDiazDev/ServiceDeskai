import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.slate,

        primary: {
          50: colors.indigo[50],
          100: colors.indigo[100],
          200: colors.indigo[200],
          300: colors.indigo[300],
          400: colors.indigo[400],
          500: colors.indigo[500],
          600: colors.indigo[600], // Color base de botones
          700: colors.indigo[700],
          800: colors.indigo[800],
          900: colors.indigo[900],
          950: colors.indigo[950],
          DEFAULT: colors.indigo[600],
        },

        // colores de tickets tickets
        status: {
          open: {
            bg: colors.amber[100],
            text: colors.amber[900],
            border: colors.amber[200],
            dark: colors.amber[400], // Para texto en modo oscuro
          },
          assigned: { // O "In Progress"
            bg: colors.blue[100],
            text: colors.blue[900],
            border: colors.blue[200],
            dark: colors.blue[300],
          },
          closed: {
            bg: colors.emerald[100],
            text: colors.emerald[900],
            border: colors.emerald[200],
            dark: colors.emerald[400],
          },
          high: {
            bg: colors.rose[100],
            text: colors.rose[900],
            border: colors.rose[200],
          }
        },

        dark: {
          bg: colors.slate[950],      // Fondo de pantalla
          surface: colors.slate[900],  // Fondo de tarjetas/modales
          border: colors.slate[800],   // Líneas divisorias
          text: {
            main: colors.slate[50],    // Títulos
            muted: colors.slate[400],  // Subtítulos
          }
        }
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}