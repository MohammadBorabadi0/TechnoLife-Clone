/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.technolife.ir',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'technolife.ir',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '**',
            },
        ],
    }

    // images: { domains: ['technolife.ir', 'www.technolife.ir'], }
}

module.exports = nextConfig;
