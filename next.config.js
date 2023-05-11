module.exports = {
  images: {
    domains: ["media.graphassets.com", "fakestoreapi.com"],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  evn: {
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  },
};
