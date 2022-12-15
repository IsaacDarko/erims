//const proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/bulksms/bulksms", {
            target:"http://sms.apavone.com:8080",
            secure: false,
            changeOrigin: true
        })
    )
}
