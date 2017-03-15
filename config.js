// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/webapp/index.html'), //为了和svn同步路径加了webapp
    assetsRoot: path.resolve(__dirname, 'dist/webapp/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: process.env.NODE_ENV === 'production' ? '../' : '/',
    productionSourceMap: true
  },
  dev: {
    port: 8081,
    proxyTable: {
      '/proxyapi': {
        // target: 'http://220.170.15.132:8082/', //钟凯磊电脑IP
        // target: 'http://115.236.19.147:15982/',
        target: 'http://10.0.26.61:8081/', //朱雄敏电脑IP
        // target: 'http://10.0.26.23:8080/', //江辉电脑IP
        // target: 'http://220.170.15.132:8082/', //湘潭中心医院的服务器IP
        changeOrigin: true,
        pathRewrite: {
          '^/proxyapi': ''
        }
      }
    }
  }
}