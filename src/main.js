// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    //session状态控制
    session: true,
    //用户ID
    uid:'',
    //用户名称
    username:'',
    //用户权限
    role:1
  },
  mutations: {
    conSession(state, bool) {
      // console.log(bool)
      state.session = bool
    },
    conUid(state, uid) {
      // console.log(bool)
      state.uid = uid
    },
    conUsername(state, username) {
      // console.log(bool)
      state.username = username
    },
    conRole(state, num) {
      // console.log(bool)
      state.role = num
    }
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
