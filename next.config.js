/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "utfs.io",
          'maps.googleapis.com',
          'media-cdn.tripadvisor.com'
        ]
      },
      typescript:{
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds:true,
      }
}

module.exports = nextConfig