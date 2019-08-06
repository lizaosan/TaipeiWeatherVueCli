// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import newtemplate from './components/tempTaipei'
import $ from 'jquery'


Vue.config.productionTip = false

Vue.component("newtemplate",newtemplate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
