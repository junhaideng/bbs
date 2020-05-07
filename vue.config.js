module.exports = {
    devServer:{
        // port: 8888,  // port
        // open: true,  // 打开浏览器
        proxy: {
            "/api": {
              target: process.env.VUE_APP_URL,
              changeOrigin: true, // 是否改变域名
            }
          }
  
    },
    filenameHashing:true,
    // assetsDir: 'static',
    // publicPath: process.env.NODE_ENV === 'production'
    // ? './bbs-vue/'
    // : './',

    
};
