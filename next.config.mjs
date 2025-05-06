/** @type {import('next').NextConfig} */

const nextConfig = {

    reactStrictMode: true,
    // Note: This feature is required to use NextJS Image in SSG mode.
    // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
    images: {
        unoptimized: true,
        remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'lh3.googleusercontent.com',
                }
            ]
    },
    swcMinify: true,
    logging: {
        fetches: {
            fullUrl: true,
        }
    },
};

export default nextConfig;
