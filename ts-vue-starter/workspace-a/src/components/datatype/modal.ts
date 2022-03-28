import { EvtDefs } from "../../common/d"
// import {ActionDataCallback, ActionStatusCallback, IAction} from "./action"

// export enum ModalOp {
//     PUT = "PUT_MODAL",
//     TURN = "TURN_MODAL_ON", 
//     // EVT = "SEND_EVENT_TO_MODAL",
//     OPEN = "OPEN_MODAL",
//     CLOSE = "CLOSE_MODAL",
//     SWITCH = "SWITCH_MODAL"
// }

export abstract class ModalPage {
    private _code: string
    private _name: string = ""
    private _title: string = ""
    private _formData?: any
    private _extensionData?: any
    // private _evtCb?: evt.IEventCallback

    constructor(code: string) {
        this._code = code
    }

    get code():string {
        return this._code
    }

    get name():string {
        return this._name
    }

    get title():string {
        return this._title
    }

    get formData():any {
        return this._formData
    }

    get extensionData():any {
        return this._extensionData
    }

    set(name:string, title:string, formData?:any, extensionData?:any) {
        this._name = name
        this._title = title
        this._formData = formData
        this._extensionData = extensionData
    }

    // onShow() {}
    
    // onClose() {}
    
    // onButtonClicked(_buttonCode:string) {}

    // on(event:evt.IEvent, errorcode:string, state?:string, previousState?:string) {
    //     if ( this._callback ) {
    //         this._callback(event, errorcode, this.content, this, state, previousState)
    //     }
    // }
}

export class ModalModel {
    private _code: string
    private _visible: boolean = false
    private _editable: boolean = false
    private _showable: boolean = false

    // private _openingEvent: evt.IEvent
    // private _closingEvent: evt.IEvent

    private _activePageCode?: string;
    private _lastPageCode?: string
    private _page_info: Map<string, ModalPage> = new Map();
    // private formVal: {[key:string]:any} = {}
    
    constructor(code:string) {
        this._code = code
    }

    get code(): string {
        return this._code
    }

    get visible(): boolean {
        return this._visible
    }

    set visible(visible: boolean) {
        this._visible = visible
    }

    get editable(): boolean {
        return this._editable
    }

    set editable(editable: boolean) {
        this._editable = editable
    }

    get activePage(): ModalPage|undefined {
        return this._activePageCode ? this._page_info.get(this._activePageCode) : undefined
    }

    putPage(model:ModalPage) {
        this._page_info.set(model.code, model)
    }

    getPage(code:string): ModalPage | undefined {
        return this._page_info.get(code)
    }

    async [EvtDefs[EvtDefs.SHOWING_MODAL_EVENT]](): Promise<any> {
        if (  !this._showable ) {
            this._showable = true
        }
    }

    async [EvtDefs[EvtDefs.CACELING_MODAL_EVENT]]():Promise<any> {
        if (  this._showable ) {
            this._showable = false
        }
    }

    async [EvtDefs[EvtDefs.SWITCH_MODAL_PAGE_EVENT]](code:string):Promise<any> {
        if ( this._page_info.has(code) ) {
            if ( this._activePageCode != code ) {
                this._lastPageCode = this._activePageCode
                this._activePageCode = code
            }
        }
    }

    async [EvtDefs[EvtDefs.ROLLBACK_MODAL_PAGE_EVENT]]():Promise<any> {
        if(this._lastPageCode) {
            let code = this._activePageCode
            this._activePageCode = this._lastPageCode
            this._lastPageCode = code
        }
    }

    // sendEvent(evt: evt.IEvent):number {
    //     this._evtCb && this._evtCb(evt)
    //     return 0
    // }
}


export class ModalController implements Iterable<ModalModel> {
    private _model_info: Map<string, ModalModel> = new Map()

    public getModel(code:string):ModalModel | undefined {
        return this._model_info.get(code)
    }

    public putModal(modalCode:string, modalPage:ModalPage) {
        if(!this._model_info.has(modalCode)) {
            let mc = new ModalModel(modalCode)
            this._model_info.set(modalCode, mc)
        }

        this._model_info.get(modalCode)?.putPage(modalPage)
    }

    [Symbol.iterator](): Iterator<ModalModel> {
        return this._model_info.values()
    }
}