const withPWA = require('next-pwa')({
  dest: 'public'
 })
 
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "i.postimg.cc",
      'res.cloudinary.com',
      "images.unsplash.com",
      'data:image/jpeg;base64'
    ]
  }

})

module.exports = nextConfig
