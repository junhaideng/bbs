
module.exports = {
    devServer: {
        proxy: "http://jhdeng.pythonanywhere.com/"
        },

    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'home.html',
            title: '主页',
        },
        community: {
            entry: 'src/main.js',
            template: 'public/index.hmtl',
            filename: 'community.html',
            title: "社区"
        },
        course:{
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'course.html',
            title: '课程'
        },
        login: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'login.html',
            title: '登录'
        },
        signup: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'signup.html',
            title: '注册'
        },

    }

};
