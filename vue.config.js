const getPages = require('../utils/pages');

const pages = getPages.pages();

module.exports = {
    // devServer:{
    //     // before: require('../mock')  // 拦截请求
    // },
    pages,
    filenameHashing:false,
    lintOnSave: true,
    publicPath:'./',
    outputDir:'output',
    assetsDir: 'src/assets'
};
