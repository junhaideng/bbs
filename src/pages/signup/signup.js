import Vue from 'vue'
import SignUpPage from './index'
import Andt from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Andt)

Vue.config.productionTip = false

new Vue({
  render: h => h(SignUpPage),
}).$mount('#app')
