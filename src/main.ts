import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'

// 导入防止布局偏移的CSS
import './assets/css/anti-cls.css'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(Antd)

app.mount('#app')
