var connect = require('connect');
var http = require('http');
var proxy = require('http-proxy-middleware');

var app = connect();
module.exports = function(app) {
    console.log("setupProxy");
  app.use(proxy('/api', { 
      target: 'http://localhost:8080/',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }));
};

var serveur = http.createServer(app);