import { api } from "../../common/i"
import { ErrcodeDefs } from "../../common/d"

export class Statusdata implements api.IStatusdata {
    code: string
    message: string
    label?: string
    prompt?: string

    // constructor(code:string, message:string, label:string, prompt:string) {
    //     this.code = code
    //     this.message = message
    //     this.label = label
    //     this.prompt = prompt
    // }

    constructor(o:{[key:string]:any}) {
        this.code = o.code
        this.message = o.message
        this.label = o.label
        this.prompt = o.prompt
    }

    get successful():boolean  {
        try {
            let code = this.code.toLowerCase()
            
            let ec = code.startsWith('0x')
                ? parseInt(code.slice(2), 16)
                : parseInt(code, 10)

            return ErrcodeDefs.SUCCESS == ec
        } catch(ex) {
            console.log(ex)
            return false
        }
    }
}

export class Req implements api.IReq {
    version: string
    metadata?: any
    data: any

    constructor(version:string, data:any) {
        this.version = version
        this.data = data
    }
};

export class Rsp implements api.IRsp {
    version: string
    statusdata: Statusdata
    metadata?: any
    datas: Array<any>

    constructor(o:{[key:string]:any}) {
        //version:string, statusdata:Statusdata, datas:Array<any>
        this.version = o.version
        this.statusdata = new Statusdata(o.statusdata)
        this.metadata = o.metadata
        this.datas = o.datas
    }

    get successful(): boolean {
        return this.statusdata && this.statusdata.successful
    }

    get error() {
        return (this.statusdata && this.statusdata.code) || "UNKNOWN_ERROR"
    }

    get label():string {
        if ( this.statusdata && this.statusdata.label ) {
            return this.statusdata.label
        } else {
            return this.successful ? "成功" : "失败"
        }
    }

    get message(): string {
        return (this.statusdata && this.statusdata.message) || "UNKOWN_MESSAGE"
    }

    get prompt(): string {
        let msg = "请求失败，请检查后重试"
        if ( this.statusdata ) {
            return this.statusdata.label || this.statusdata.prompt || this.statusdata.message || msg
        } else {
            return msg
        }
    }
};
