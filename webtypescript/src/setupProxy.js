import * as proxy from 'http-proxy-middleware';

module.exports = function(app) {
    app.use(
        proxy.createProxyMiddleware("/api", {
            target: "http://ancient-ridge-25388.herokuapp.com",
            changeOrigin: true,
            secure: false
        }) 
    )
}