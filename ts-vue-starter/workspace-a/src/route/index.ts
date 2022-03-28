import Vue from 'vue';
import VueRouter, {
    Location as VueLocation, 
    Route as VueRoute, 
    RouterOptions as VueRouterOptions,
    RouteConfig as VueRouteConfig, 
    RouterMode as VueRouterMode, 
    NavigationGuardNext as VueNavigationGuardNext,
    RouteConfig
} from 'vue-router'
import { view } from "../common/i"

//使用vue-router
Vue.use(VueRouter)

class RouterOption implements view.IRouterOption {
    mode: VueRouterMode = "hash"

    //自定义属性，判断的您是否已经添加动态路由
    isAdded:boolean = false

    routes: RouteConfig[] = []

    // 解决vue框架页面跳转有白色不可追踪色块的bug
    public scrollBehavior() {
        return { x: 0, y: 0 }
    }

    public fromPage(router:VueRouter, ...pages:Array<view.IMenuPage>) {
        this.routes = pages.map(p => {
            return {
                name: p.name,
                path: p.path,
                redirect: p.redirectPath,
                hidden: false,
                component: () => import(`@/views/page${p.path}.vue`)
            }
        })

        router.addRoutes(this.routes)
    }

    public active(router: VueRouter) {
        router.beforeEach(async (to:VueRoute, from:VueRoute, next:VueNavigationGuardNext<any>) => {
            // 进度条开始
            // NProgress.start()
            // 获取路由 meta 中的title，并设置给页面标题
            // document.title = to.meta.title
            // 获取用户登录的token
            // const hasToken = getToken()
      
            // let option = router.options as IRouterOption
            // if ( ! option.isAdded ) {
            //     // 过滤权限以后的路由信息
            //     let accessRoutes: Array<VueRouteConfig> = this.routes
            //     console.log('4', accessRoutes)
        
            //     // 通过用户角色，获取到角色路由表
            //     // const accessRoutes = filterAsyncRoutes(await store.state.routers,roles
            //     router.addRoutes(accessRoutes)
            //     option.isAdded = true
            // }

            // console.log('5', to);

            // next({ ...to, replace: true} as VueLocation)
            next();
        })

        router.afterEach(() => {
            // 结束进度条
            // NProgress.done()
        })
    }

}

export const createRouter = ():VueRouter => new VueRouter(new RouterOption())
