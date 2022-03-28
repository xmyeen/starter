import { AxiosPromise } from 'axios'
import { ErrcodeDefs } from '../../common/d/ec_defs'
import { api } from '../../common/i'
import { Rsp } from './rs'

export class AlertBox {
    private vue: Vue

    constructor(vue: Vue) {
        this.vue = vue
    }

    async rs(promise:AxiosPromise<api.IRsp>, ...options:any[]):Promise<api.IRsp | undefined> {
        // let vue = this as Vue
        let response = await promise
        if( 200 != response.status ) {
            this.vue.$alert("系统错误，请检查网络或者联系管理员", "请求失败:" + ErrcodeDefs[ErrcodeDefs.HTTP_STATUS_ERROR] + " " + response.status)
            return undefined;
        }

        let rsp = new Rsp(response.data)
        if ( !rsp.successful ) {
            this.vue.$alert(rsp.prompt, rsp.label)
            return rsp
        }

        return rsp
    }

    async warn(text?:string):Promise<boolean> {
        // let vue = this as Vue
        let rv = await this.vue.$confirm(
            text || "是否继续当前操作", 
            "提示", 
            {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }
        ).catch(() => {

        })

        return rv === 'confirm'
    }
}