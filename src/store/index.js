import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import actions from './actions'


const store = new Vuex.Store({
    state: {
        messageCount: 0,
        isLogin: false,
        next: "",  // 下一个页面的跳转
        avatar: "",  // 头像连接
    },
    mutations: {
        setMessageCount(state, messageCount) {
            state.messageCount = messageCount
           
        },
        setIsLogin(state, flag){
            console.log(flag)
            state.isLogin = flag
        },

        setNext(state, next){
            state.next = next;
        },

        setAvatar(state, avatar){
            state.avatar = avatar;
        }


    },
    actions

})


export default store