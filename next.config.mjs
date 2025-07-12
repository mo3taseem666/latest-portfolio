/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
import withBundleAnalyzer from '@next/bundle-analyzer';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
    // Add your base config here
    reactStrictMode: true,
    images: {
        domains: ['your-domain.com'] // if needed
    }
};

export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
})(
    withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: isDev,
        ...nextConfig
    })
);
