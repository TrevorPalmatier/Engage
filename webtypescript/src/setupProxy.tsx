import {createProxyMiddleware} from 'http-proxy-middleware';

export default (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://ancient-ridge-25388.herokuapp.com",
            changeOrigin: true,
            secure: false
        })
    )
}