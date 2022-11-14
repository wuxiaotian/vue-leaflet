import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router";
import 'normalize.css/normalize.css'
import '@/styles/fonts/font.css'
//注册全局组件
import './components/index'

//全局注册后台服务
import './api/index'

import './icons/index'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
