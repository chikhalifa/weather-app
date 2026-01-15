/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
                display: ['Fraunces', 'Georgia', 'serif'],
            },
            colors: {
                atmosphere: {
                    50: '#f0f4f8',
                    100: '#d9e5f0',
                    200: '#b3cce0',
                    300: '#8db3cf',
                    400: '#6799bf',
                    500: '#4180af',
                    600: '#34668c',
                    700: '#274d6a',
                    800: '#1a3347',
                    900: '#0d1a25',
                },
                sunset: {
                    50: '#fff4ed',
                    100: '#ffe4d1',
                    200: '#ffc7a3',
                    300: '#ffa370',
                    400: '#ff773d',
                    500: '#ff5714',
                    600: '#e63c00',
                },
                storm: {
                    50: '#f3f4f6',
                    100: '#e5e7eb',
                    500: '#4b5563',
                    600: '#475569',
                    700: '#1f2937',
                    800: '#111827',
                    900: '#0a0f1a',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'drift': 'drift 20s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)' },
                },
                drift: {
                    '0%, 100%': { transform: 'translateX(0) translateY(0)' },
                    '50%': { transform: 'translateX(30px) translateY(-15px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            }
        },
    },
    plugins: [],
}
