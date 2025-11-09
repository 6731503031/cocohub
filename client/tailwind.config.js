// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'coconut-green': '#759544',
        'coconut-light': '#9dba61',
        'coconut-dark': '#35180e',
        'coconut-bark': '#9B5129',
        'coconut-cream': '#e2e0cc',
        'forest': '#44622d',
        'bark-light-40': '#c3977e', // 9C5229 reduced 40% toward white (approx)
        'leaf-1': '#486142',
        'leaf-2': '#93B58C',
        'ivory-1': '#EAE3D8',
        'ivory-2': '#FAF9F6',
        'stone-1': '#E5E3DD',
        'deep': '#2F3B2D',
        'muted-1': '#75836C',
        'olive': '#729e67',
        'pale': '#d3eece',
        'beige': '#e5dac9',
        'neutral-1': '#908e89',
        'neutral-2': '#d0cdc4',
        'dark-leaf': '#51654e',
        'soft-olive': '#889c7b'
      },
      borderRadius: {
        'xl-2': '1.25rem'
      },
      boxShadow: {
        'soft-lg': '0 10px 25px rgba(15,23,42,0.08)'
      }
    }
  },
  plugins: [],
}
