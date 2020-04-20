// const fs = require('fs')
// const path = require("path")
// const JSON5 = require("json5")
const Mock = require('mockjs')
// const getFiles = require('files')


// function getJsonFile(filePath) {
//     let json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
//     return JSON5.parse(json)
// }

// module.exports = function (app) {
//     // if(process.env.MOCK==='true') // 开发模式下使用mock 需要在.env文件下进行配置
//     // {
//     app.get("/user/userinfo/", function (req, res) {
//         let json = getJsonFile('./userInfo.json5');
//         res.json(Mock.mock(json));
//     });

//     app.get("/user/login/", function (req, res) {
//         // console.log(req.body)
//         if (req.params) {
//             res.json(req.params) //{"status":"successful"}
//         } else {
//             res.json({"status": "failed"})
//         }
//     });

//     app.post("/user/signup/", function (req, res) {
//         console.log(req.params);
//         res.json({"status": "success"})
//     });

//     app.post("/user/files/", function (req, res) {
//         console.log(req);

//         res.json(Mock.mock(getFiles()))
//     })
//     // }
// };


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
                desc: "@sentence()"
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