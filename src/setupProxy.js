const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

module.exports = function (app) {
//   app.use(proxy('/api', { target: 'http://0.0.0.0:5000/' }))
  app.use(proxy('/api', { target: 'http://0.0.0.0:8080/' }))
}
 
   