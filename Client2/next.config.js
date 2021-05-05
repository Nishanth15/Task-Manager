module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/inbox',
                permanent: true,
            },
        ];
    },
};
