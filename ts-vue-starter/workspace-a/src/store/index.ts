import Vue from 'vue';
import Vuex from 'vuex'
import {MenuStore} from './menu'
import {ModalStore} from './modal'
//使用Vuex
Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,  // process.env.NODE_ENV !== 'development',
    modules: {
    //   widgets: new WidgetStore<any>(),
      menus: new MenuStore<any>(),
      modals: new ModalStore<any>()
    }
})

//使用存储
export default store;
  