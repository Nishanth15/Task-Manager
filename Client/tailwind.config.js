module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#2a8cff',
                layout_background: '#edf5ff',
                sidebar_text: '#2e5284',
                sidebar_active: '#F1F6FE',
            },
            boxShadow: {
                topbar: '0px -5px 26px 10px #bfd5ff91',
            },
            screens: {
                '-sm': { max: '639px' },
                '-md': { max: '767px' },
                '-lg': { max: '1023px' },
                '-xl': { max: '1279px' },
                '-2xl': { max: '1535px' },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
