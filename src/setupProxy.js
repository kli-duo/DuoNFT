const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/2017-06-30/*",
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: "localhost",
      target: "http://api.duolingo.com",
    })
  );
};
