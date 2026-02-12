// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '8081',
//         pathname: '/app/images/**',
//       },
//       // {
//       //   protocol: 'https',
//       //   hostname: 'your-domain.com',
//       //   pathname: '/app/images/**',
//       // },
//     ],
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
// const nextConfig = {

//   images: {
//     dangerouslyAllowLocalIP: true,
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '8081',
//         pathname: '/app/images/**',
//       },
//     ],
//   },
// }

// export default nextConfig

// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8081',
        pathname: '/app/images/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'jbh-design.com',
      //   pathname: '/app/images/**',
      // },
    ],
  },
};

export default withNextIntl(nextConfig);




