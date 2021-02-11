import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import getApi from './api/index';
//工具类
import utils from './Utils/Utils'

Vue.config.productionTip = false
//统一出口挂载Vue原型上
Vue.prototype.$api = getApi;
Vue.prototype.utils = utils;
//事件总线
Vue.prototype.bus = new Vue();
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
