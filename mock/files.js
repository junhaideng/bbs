const Mock = require("mockjs")
let num = 20
let files = []
for(let j=1;j<=num;j++){
    files.push(
        {
            id: j,
            filename: "@title()",
            type: "@Random.integer(1, 4)",
            downloadTimes: "@Random.integer(0)",
            date: "@date()",
            desc: "@@sentence()"
        }
    )
}
console.log(Mock.mock("@image('200x100', '#50B347', '#FFF', 'Mock.js')"))

module.exports = function(){
    return files
}


