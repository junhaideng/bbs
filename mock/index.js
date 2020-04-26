const Mock = require('mockjs')

// 用户信息
Mock.mock("/user/userinfo/", 'get', {
    "data|10": [{
        id: "@increment(1)",
        name: "@cname()"
    }]
})

// 用户登录 TODO
Mock.mock("/user/login/", "post", function (options) { // 用户 提交的内容在body里面
    console.log(options)
    return Mock.mock({
        "data|10": [{
            id: '@id()',
            name: '@cname()'
        }]

    })
})

// 用户上传的文件 TODO
Mock.mock("/user/profile/files/", "post", function (options) {
    console.log(options)
    return Mock.mock({
        "data|100": [{
            id: "@increment(1)",
            filename: "@cword(5,10)",
            type: "@integer(1, 4)",
            downloadTimes: "@integer(0, 1000)",
            date: "@date()",
            desc: "@cword(20, 40)"
        }]

    })
})


// 登录日志 TODO
Mock.mock("/user/profile/log", 'post', function (options) {
    console.log(options)
    return Mock.mock({
        "data|40-96": [{
            ip: "@ip()",
            date: "@date()",
            address: "@city()"
        }]
    })
})


// 上传文件 TODO
Mock.mock("/file/upload", "post", function (options) {
    console.log(options)
    return Mock.mock({
        status: 200,
        message: "@cword(10, 20)",

    })
})

// 用户帖子  TODO
Mock.mock("/user/articles", 'post', function (options) {
    console.log(options);
    return Mock.mock({
        "data|40-90": [{
            title: "@cword(6,10)",
            content: "@cword(100)",
            // star: "@integer(20,100)",
            // comments: "@integer(20,1000)",
            read: "@integer(0,40)",
            create_time: "@date",
            // like: "@integer(0, 100)",
            data: [
                "@integer(20,100)", // star 
                "@integer(20,1000)", // like
                "@integer(20,1000)", // comments
                "@date"
            ]
        }]
    })
})


// 消息通知数目 TODO
Mock.mock("/user/messageCount", "post", function (options) {
    console.log(options.body)
    return Mock.mock({
        data: {
            messageCount: 1000
        }
    })
})

// 信息通知具体信息
Mock.mock("/user/profile/messages", "post", function (options) {
    console.log(options)
    return Mock.mock({
        "data|20": [{
            type: "@integer(0,2)", // 消息，评论， 收藏
            post: "@cword(10,20)",
            user: "@cword(2,4)",
            userId: "@integer(0,100)",
            url: "@url"
        }]
    })
})

Mock.mock("/api/get_post", "get", {
    "data|20-30": [{
        username: "@cword(2,8)",
        avatar: "@image('200x100', '#50B347', '#FFF', 'test')",
        type: "@integer(0, 4)",
        title: "@cword(10,20)",
        content: "@cword(40,100)"
    }]
})

Mock.mock("/api/search", "post", function (options) {
    return Mock.mock([{
            type: "帖子",
            data: [1,2,3],
            query: [options.body.q]
        },
        {
            type: "文件",
            data: ["文件一", "文件二", "文件三"],
            query: [options.body.q]
        },
    ])
})