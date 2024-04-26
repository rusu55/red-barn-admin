/** @type {import('next').NextConfig} */
const nextConfig = {
    //basePath: '/admin',   
    images: {
        domains: ['files.edgestore.dev']
      },
      headers: () => [
        {
          source: '/',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store',
            },
          ],
        },
      ],
}

module.exports = nextConfig
