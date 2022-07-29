module.exports = {
    content: ["./src/**/*.{html,tsx}"],
    important: true,
    mode: 'jit',
    theme: {
        colors: {
            'blue': '#1fb6ff',
            'purple': '#7e5bef',
            'pink': '#ff49db',
            'orange': '#ff7849',
            'green': '#13ce66',
            'yellow': '#ffc82c',
            'gray-dark': '#273444',
            'gray': '#8492a6',
            'gray-light': '#d3dce6',
            'red': '#FF0000',
            'white': '#FFFFFF'
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
        }
    },
    plugins: [require('daisyui'), require('@tailwindcss/typography')],
}