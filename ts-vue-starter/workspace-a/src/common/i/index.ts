import VueRouter, { RouterOptions as VueRouterOptions } from "vue-router"

//页面配置抽象
export interface IPageConfig  {
    code: string
    menuCode?: string
    path: string
    redirectPath?: string
    name: string
    roles: Array<string>
    children: Array<IPageConfig>
}

export namespace evt {
    export interface IEvent {
        id: number
        objectCode?: string
        objectName?: string
        errorcode?: string
        content?: any
        passingContent?: any
        state?: string
        previousState?: string
    }

    export interface IEventCallback {
        (event: IEvent): any
    }

    export interface IEventSender {
        sendEvent(evt:IEvent): number
    }
}

export namespace api {
    export interface IStatusdata {
        code: string
        message: string
        label?: string
        prompt?: string
    
        successful: boolean
    }
    
    export interface IReq {
        version: string
        metadata?: any
        data: any
    }
    
    export interface IRsp {
        version: string
        statusdata: IStatusdata
        metadata?: any
        datas: Array<any>
    
        successful: boolean
        error:string 
        label:string
        message: string
        prompt: string
    }
}


export namespace view {
    export interface IMenuPage {
        code: string
        menuCode?: string
        path: string
        redirectPath?: string
        name: string
        roles: Array<string>
        children: Array<IMenuPage>
    }

    export interface IRouterOption extends VueRouterOptions {
        isAdded: boolean 

        // beforeRoute(to:Route, from:Route, next:VueNavigationGuardNext<any>): void
        active(router: VueRouter): void

        fromPage(router:VueRouter, ...pages:Array<IMenuPage>): void
    }
}

// export interface IVueAlertBox {
//     rs(promise:AxiosPromise<IRsp>, ...options:any[]):Promise<IRsp | undefined>

//     warn(text?:string):Promise<boolean>
// }







