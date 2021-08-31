
const {createProxyMiddleware} = require('http-proxy-middleware');

// const  createProxyMiddleware  = require('http-proxy-middleware') || require('http-proxy-middleware').createProxyMiddleware;

module.exports = function(app) {
  // target 表示目标服务器的地址
  app.use(
    createProxyMiddleware(
      '/agent', {
      target: 'http://192.168.1.166:8889',  //http://192.168.1.166:8889  // http://192.168.1.188:8889/
      changeOrigin: true,
      // 重写接口路由
      pathRewrite: {
        '^/agent': '', // 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
      },
    }),
    
    createProxyMiddleware(
      '/tt', {
      target: 'http://192.168.1.188/',
      changeOrigin: true,
      // 重写接口路由
      pathRewrite: {
        '^/tt': '', // 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
      },
    })
  )
}
