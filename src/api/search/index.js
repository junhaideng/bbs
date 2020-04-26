// import Mock from 'mockjs'
// 搜索api，向后台请求信息
// const data = [
//     {
//         type: "帖子",
//         data: [1,2,3,4,5],
//         query: [1,2,3,4,5]
//     },
//     {
//         type: "文件",
//         data: ["文件一", "文件二", "文件三"],
//         query: [1,2,3]
//     }

// ]
import axios from "axios"
export default{
    search(value){  
        axios.post("/api/search", {q: value}).then(res=>{return res.data})
    }
}

