// import { MessageBox } from 'element-ui'
import Vue,{ PluginFunction } from 'vue'
// import {MessageBox} from 'element-ui'
// import {AxiosResponse} from "axios"
// import axios, {AxiosStaticAxiosResponse} from 'axios'
import { AxiosPromise } from 'axios'
import defination, { ErrcodeDefs } from "../common/d"
import { api } from "../common/i"
import util,{ singleton } from "../common/u"
import { AlertBox, Rsp } from '../components/datatype'
// import {singleton, StringUtil, ModuleUtil, DateUtil} from "./common/util"
// import {IVueDefination, IVueUtil, IVueAlertBox} from "./common/i/ivue"

// const VUE_UTIL_DEF: IVueUtil = { 
//     $string: new StringUtil(), 
//     $module: new ModuleUtil(), 
//     $date: new DateUtil()
// }



// let PLUGIN_MESSAGE_BOX: IPluginMessageBox|undefined = undefined

//使用ApiDef
// Vue.use(ApiDef)

//使用PageDef
// Vue.use(PageDef)

export const pluginInstaller:PluginFunction<any> = (V: typeof Vue, options?:any) => {
    Object.defineProperties(Vue.prototype, {
        $d: {
            get : () => defination
        },

        $u: {
            get : () => util
        },

        $ab: {
            get() {
                return singleton(AlertBox, this as Vue)
            }
        }
    })

    Object.defineProperty(Vue.prototype, "$rs", async function(promise:AxiosPromise<api.IRsp>, ...options:any[]):Promise<api.IRsp | undefined> {
        let response = await promise
        if( 200 != response.status ) {
            console.log("HTTP Error:", ErrcodeDefs[ErrcodeDefs.HTTP_STATUS_ERROR], response.status)
            return undefined;
        }

        let rsp = new Rsp(response.data)
        if ( !rsp.successful ) {
            console.log(rsp.prompt)
            return rsp
        }

        return rsp
    })

    // Object.defineProperty(Vue.prototype, "$prompt", {
    //     value: new Prompt()
    // })
}