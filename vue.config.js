
'use strict'
const path = require('path')

const name = "bbs" // page title

function resolve(dir) {
    return path.join(__dirname, dir)
  }
module.exports = {
    // devServer:{
    //     port: 8888,  // port
    //     open: true,  // 打开浏览器
    // },
    filenameHashing:true,
    // assetsDir: 'static',
    // publicPath: process.env.NODE_ENV === 'production'
    // ? './bbs-vue/'
    // : './',
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
          alias: {
            '@': resolve('src')
          }
        }
      },
    
};
