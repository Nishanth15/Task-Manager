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
                active_background: '#F1F6FE',
            },
            boxShadow: {
                primary:
                    '0  5px 10px rgba(154,160,185,0.05), 0 15px 40px rgba(166,173,201,0.2)',
                secondary: '0 7px 30px -10px rgba(150,170,180,0.5)',
            },
            fontSize: {
                xxs: '.65rem',
            },
            screens: {
                '-sm': { max: '639px' },
                '-md': { max: '767px' },
                '-lg': { max: '1023px' },
                '-xl': { max: '1279px' },
                '-2xl': { max: '1535px' },
            },
            spacing: {
                46: '11.5rem',
                50: '12.5rem',
            },
            inset: {
                46: '11.5rem',
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
