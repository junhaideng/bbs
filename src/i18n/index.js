import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh_cn',
    messages:{
        'zh_cn': require('@/assets/languages/zh_cn.json'),  // 中文
        'en_us': require('@/assets/languages/en_us.json'),  // 英文
    }
})

export default i18n