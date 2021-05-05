module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/user/sign-in',
          permanent: true,
        }
      ]
    },
  }