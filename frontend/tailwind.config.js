export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {        
        light: {
          background: '#ffffff',
          surface: '#f3f4f6',
          primary: '#3b82f6',
          secondary: '#6b7280',
          text: '#1f2937',
          textMuted: '#6b7280',
          border: '#e5e7eb',
          accent: '#2563eb',
        },        
        dark: {
          background: '#111827',
          surface: '#1f2937',
          primary: '#60a5fa',
          secondary: '#9ca3af',
          text: '#f9fafb',
          textMuted: '#9ca3af',
          border: '#374151',
          accent: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
}