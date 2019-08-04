// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import tempTemplate from './components/new'
import $ from 'jquery'


Vue.config.productionTip = false

Vue.component("tempTemplate",tempTemplate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
