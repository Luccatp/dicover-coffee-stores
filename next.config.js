/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'fastly.4sqi.net',
				port: '',
				pathname: '/img/general/260x160/**'
			}
		],
	},
}

module.exports = nextConfig
