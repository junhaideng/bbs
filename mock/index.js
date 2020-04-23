const Mock = require('mockjs')


Mock.mock("/user/userinfo/", 'get', {
    "data|10":[
        {
            id: "@increment(1)",
            name: "@cname()"
        }
    ]
})

Mock.mock("/user/login/", "post", function(options){  // 用户 提交的内容在body里面
    console.log(options)
    return Mock.mock({
        "data|10":[
            {
                id: '@id()',
                name: '@cname()'
            }
        ]

    })
})

Mock.mock("/user/profile/files/", "post", function(options){
    console.log(options)
    return Mock.mock({
        "data|100":[
            {
                id: "@increment(1)",
                filename: "@cword(5,10)",
                type: "@integer(1, 4)",
                downloadTimes: "@integer(0, 1000)",
                date: "@date()",
                desc: "@cword(20, 40)"
            }
        ]

    })
})


Mock.mock("/user/profile/log", 'post', function(options){
    console.log(options)
    return Mock.mock({
        "data|100":[
            {
                ip:"@ip()",
                date:"@date()",
                address: "@city()"
            }
        ]
    })
})


Mock.mock("/file/upload", "post", function(options){
    console.log(options)
    return Mock.mock({
        status: 200, 
        message: "@cword(10, 20)",
        
    })
})

Mock.mock("/user/articles", 'get', {
    "data|40-90":[
        {
            title: "@cword(6,10)",
            content: "@cword(100)",
            // star: "@integer(20,100)",
            // comments: "@integer(20,1000)",
            read: "@integer(0,40)",
            create_time: "@date",
            // like: "@integer(0, 100)",
            data: [
                "@integer(20,100)",  // star 
                "@integer(20,1000)", // like
                "@integer(20,1000)", // comments
                "@date"
            ]
        }
    ]
})


Mock.mock("/user/messageCount", "post", function(options){
    console.log(options.body)
    return Mock.mock({
        data:{
           messageCount: 1000
        }
    })
})