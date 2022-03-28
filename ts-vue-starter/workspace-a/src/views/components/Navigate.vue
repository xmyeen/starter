<template>
    <el-container>
      <el-header>
        <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="selectMenu"
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <!-- <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            </template> -->
            <!-- <el-menu-item 
              v-for="route in $router.options.routes"
              v-bind:key="route.path"
              v-bind:index="route.path">
              {{route.name}}
            </el-menu-item> -->
            <el-menu-item 
              v-for="menu in menus"
              v-bind:key="menu.path"
              v-bind:index="menu.path">
              {{menu.name}}
            </el-menu-item>
            <!-- <el-menu-item index="ALG_LIST">查看算法包</el-menu-item>
            <el-menu-item index="ALG_MAKER">新建算法包</el-menu-item> -->
            <!-- <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
        </el-menu>
      </el-header>
      <el-main>
        <!-- <router-link :to="{name: '查看'}">查看</router-link> -->
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import { MenuPage } from "../../components/datatype"

@Component({})
export default class Navigate extends Vue {
  // 接受父组件的值

  @Prop({
    type: Array, // 父组件传递给子组件的数据类型
    required: true, // 是否必填
    default: [] // 默认值， 如果传入的是 Object，则要 default: ()=>({}) 参数为函数
  }) menus!: Array<MenuPage>

  mounted() {
    // let codes = Object.keys(this.pages);
    // this.activeMenuCode = codes[0];
    // this.selectMenu(codes[0], this.$pageDef[codes[0]].path);
  }

  selectMenu(key:string, keyPath:string) {
    // this.$router.push(this.$pageDef[key].path)

    // switch(key) {
    // case 'algList':
    //   this.$router.push('/Page1');
    //   break;
    // case 'algMaker':
    //   this.$router.push('/Page2');
    //   break;
    // }

    // for( let page of this.pages ) {
    //   if ( key == page.menuCode ) {
    //     this.$router.push(page.path)
    //     break
    //   }
    // }

    // console.log('selectMenu', key, keyPath)
    // this.$router.push(key)
  }
}

</script>
