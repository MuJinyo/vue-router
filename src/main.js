import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
// import store from './store'
// import axios from 'axios'


Vue.config.productionTip = false
// Vue.prototype.$axios = axios
// Vue.use(VueImg)
new Vue({
  router,
  // store,
  render: h => h(App) // 创建虚拟DOM，手动创建模板的时候，会用到它
}).$mount('#app')
