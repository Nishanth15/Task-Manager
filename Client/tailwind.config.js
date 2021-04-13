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
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
