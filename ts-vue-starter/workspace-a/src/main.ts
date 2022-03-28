import Vue from 'vue';

import axios from 'axios'
import VueAxios from 'vue-axios'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import vueNcform from '@ncform/ncform'
import ncformStdComps from '@ncform/ncform-theme-elementui'

import {pluginInstaller} from "./plugin"
import store from "./store"
import {createRouter} from "./route"
import App from "./views/App.vue";

//使用本地插件
Vue.use(pluginInstaller)

//使用axios
Vue.use(VueAxios, axios)

//使用ElementUI
Vue.use(Element)

//使用ncform
Vue.use(vueNcform as any, { extComponents: ncformStdComps })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: createRouter(),
  store,
  components: { App },
  template: '<App/>'
})
