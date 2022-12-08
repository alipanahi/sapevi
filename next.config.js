/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      "images.unsplash.com",
      'data:image/jpeg;base64'
    ]
  }

}

module.exports = nextConfig
