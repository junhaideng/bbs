import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'


const store = new Vuex.Store({
    state: {
        messageCount: 0
    },
    mutations: {
        setMessageCount(state, messageCount) {
            state.messageCount = messageCount
           
        }
    },
    actions: {
        getMessageCount(context) {
            axios.post("/user/messageCount", {
                "userId": 2
            }).then(res => {
                let messageCount = res.data.data.messageCount;
               
                context.commit("setMessageCount", messageCount)
                
            }).catch(err => {
                console.log(err)
            })
        }
    }

})


export default store