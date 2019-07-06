// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import $ from 'jquery'
import common from './common'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'font-awesome/css/font-awesome.css'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN.js'
import 'summernote/dist/summernote.css'
import './assets/css/reset.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);
//import distpicker from 'distpicker'
import VDistpicker from 'v-distpicker'  
Vue.component('v-distpicker', VDistpicker)

Vue.use(VueResource);
Vue.use(ElementUI);

Vue.http.interceptors.push(function(request, next) {//拦截器
  request.credentials = false;
  next((res)=>{
    //401 登陆过期跳转
    if(res.body.code == 401){
        router.push("/");
    }
  })
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
