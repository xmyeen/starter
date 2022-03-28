<script lang="ts">
// import AlgorithmPackageConfigDialog from './components/AlgorithmPackageConfigDialog.vue'
// import HelloWorld from './components/HelloWorld.vue'
import { Route, RouteConfig } from 'vue-router'
import { Component, Prop, Vue } from "vue-property-decorator"
// import {IRouterOption} from "../common/i/irouter"
// import {EvtDefs} from "../constant/evt_defs"
import { view } from "../common/i"
import { MenuPage } from '../components/datatype/menu'
import Navigate from './components/Navigate.vue'
import Demo from './components/Demo.vue'

@Component({
  components: {
    Navigate,
    Demo
  }
})
export default class App extends Vue {
  name:string = 'App'
  pages: Array<MenuPage> = [
    // new Page('ALGORITHM_KERNAL_VIEWER', '/AlgorithmKernalViewerPage', '算核浏览', 'algorithm-kernal.viewer'),
    // new Page('ALGORITHM_VIEWER', '/AlgorithmViewerPage', '算法浏览', 'algorithm.viewer')
    // new Page('ALG_EDITOR', '/AlgEditorPage', '算法编辑'),
    new MenuPage('DEMO_PAGE', '/Demo', '样例页面')
  ]

  created() {
    // this.pages.concat([
    //   // new Page('HOME', '/', '主页'),
    // ])
    // console.log('1', 'xxxxxxxxxxxxxxxxxxxxxx');

    let routerOption = this.$router.options as view.IRouterOption
    routerOption.fromPage(this.$router, ...this.pages)
    routerOption.active(this.$router)
    // this.$store.commit(EvtDefs[EvtDefs.GOTO_MENU], this.pages[0].code)
  }

  get menus():Array<view.IMenuPage> {
    return this.pages.filter(page => page.menuCode);
  }
}
</script>

<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Demo></Demo>
    <Navigate v-bind:menus="menus"></Navigate>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>