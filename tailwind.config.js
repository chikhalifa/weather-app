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
                    50: '#f7f9fb',
                    100: '#e8ecf1',
                    200: '#d1dae4',
                    300: '#a8b9c9',
                    400: '#7a8fa3',
                    500: '#5a7287',
                    600: '#4a5f73',
                    700: '#3a4a5c',
                    800: '#2a3542',
                    900: '#1a2129',
                },
                sunset: {
                    50: '#faf8f6',
                    100: '#f5ede5',
                    200: '#e8d5c4',
                    300: '#d4b39a',
                    400: '#b58a6f',
                    500: '#9a6f56',
                    600: '#7a5842',
                },
                storm: {
                    50: '#f8f9fa',
                    100: '#e9ecef',
                    500: '#6c757d',
                    600: '#545b62',
                    700: '#2d3339',
                    800: '#1a1d21',
                    900: '#12141a',
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
