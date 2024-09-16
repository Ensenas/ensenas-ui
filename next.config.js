const nextConfig = {
    compiler: {
        styledComponents: true
    },
    async rewrites() {
        return [
            {
                source: '/ens-api/:path*',
                destination: `${process.env.BACKEND_URL}/:path*`
            }
        ]
    }
}

module.exports = nextConfig
