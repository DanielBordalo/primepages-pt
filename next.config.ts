/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Esta opção impede que erros do ESLint falhem o build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
