module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: '#2a8cff',
                layout_background: '#edf5ff',
                text_color: '#2e5284',
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
            margin: {
                88: '22rem',
            },
            inset: {
                54: '13.5rem',
                58: '14.5rem',
            },
            container: {
                center: true,
            },
            rotate: {
                '-180': '-180deg',
                '-90': '-90deg',
                '-45': '-45deg',
                0: '0',
                45: '45deg',
                90: '90deg',
                135: '135deg',
                180: '180deg',
                270: '270deg',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
