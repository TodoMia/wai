import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
// axios
import axios from 'axios'
// axios.defaults.timeout = 6000;
import { Message,Loading  } from 'element-ui';

// axios.defaults.baseURL= `http://192.168.3.100:10085/api/v1`;
axios.defaults.baseURL= `http://119.23.48.180:8088/api/v1`;

// 配置发送信息
axios.interceptors.request.use(function(config){
  console.log("加载中")
  return config
},function(error){
//   console.log("请求错误了")
  Message.error('请求错误了')
  return Promise.reject(error)
})
//
axios.interceptors.response.use(function(response){
  console.log("加载完了")
  return response
},function(error){
//   console.log("响应错误了")
//   this.$message.error('响应错误了');
    Message.error('响应错误了')
  return Promise.reject(error)
})
// 挂载
Vue.prototype.$http=axios

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
