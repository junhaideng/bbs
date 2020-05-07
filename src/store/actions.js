import Vuex from "vuex"
import Vue from "vue"
import axios from 'axios'
import qs from 'qs'

Vue.use(Vuex)


const actions = {
    setIsLogin(context){
context.commit("setIsLogin", true)
    },

    getMessageCount(context) {
        axios.post("/api/user/messageCount", {
            "userId": 2
        }).then(res => {
            let messageCount = res.data.data.messageCount;

            context.commit("setMessageCount", messageCount)

        }).catch(err => {
            console.log(err)
        })
    },

    // 用户的登录
    login(context, data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/user/login", 
                qs.stringify(data)
            ).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err)
                reject()
            })
        })
    },


}

export default actions;