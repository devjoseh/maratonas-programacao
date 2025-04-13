module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Aceita qualquer hostname via HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // Aceita qualquer hostname via HTTP (útil para desenvolvimento)
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};