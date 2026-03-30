/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Noto Serif SC"', '"Songti SC"', 'STSong', 'serif'],
                sans: ['"Noto Sans SC"', 'sans-serif'],
            },
            colors: {
                'palace-red': '#9b2e2e',
                'ink-dark': '#111111',
                'paper-bg': '#f2efe8',
                'gold-accent': '#c0a062',
                'water-gray': '#8a979e'
            }
        },
    },
    plugins: [],
}