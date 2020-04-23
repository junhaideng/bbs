const getPages = require('../utils/pages');

const pages = getPages.pages();
console.log(process.env.NODE_ENV)
module.exports = {
    // devServer:{
    //     // before: require('../mock')  // 拦截请求
    // },
    pages,
    filenameHashing:false,
    assetsDir: 'static',
    publicPath: process.env.NODE_ENV === 'production'
    ? './bbs-vue/'
    : './',
    configureWebpack:{
        title: "bbs"
    },
    devServer:{
        port: 8888,  // port
        open: true,  // 打开浏览器
    }
};
