const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://13.125.96.124:8080',
            changeOrigin: true,
        })
    );
};