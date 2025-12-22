/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'lh3.googleusercontent.com', 'drive.google.com'],
        formats: ['image/webp', 'image/avif'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
