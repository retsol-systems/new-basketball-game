// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/service-worker.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
        ],
      },
    ];
  },
};