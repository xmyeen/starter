import {Module, ActionContext, Getter} from 'vuex'
// import {ActionNS, DialogModel, DialogSet} from "../components/datatype/store/modal"
// import {evt} from "../common/i"
// import {EvtDefs,EvtFn} from "../common/evt"
import {ModalModel, ModalController} from "../components/datatype"
// import {SchemaMgr} from "../components/mgr/schema"

export class ModalStore<R> implements Module<ModalController, R> {
    namespaced: boolean = true

    state: ModalController = new ModalController()

    getters = {
        // schemas(state:DialogModel, getter:Getter<DialogModel, R>): {[key:string]:any} {
        //     return Schema
        // }
    }

    mutations = {
        // [ModalOp.PUT](state:ModalStoreState, payload:[string, ModalModel]) {
        //     state.putModal(payload[0], payload[1])
        // },

        // [ModalOp.EVT](state:ModalStoreState, payload:[string, evt.IEvent]) {
        //     state.sendEvent(payload[0], payload[1])
        // },

        // [ModalOp.TURN](state:ModalStoreState, payload:[string, string]) {
        //     state.turnModalOn(payload[0], payload[1])
        // },

        // [EvtDefs.SHOWING_MODAL_EVENT](state:ModalStoreState, payload:string) {
        //     let controller = state.getController(payload)

        //     let m = controller && controller[EvtDefs[EvtDefs.SHOWING_MODAL_EVENT] as keyof ModalController] as EvtFn<any>

        //     return m && m()
        // }

        // [modal.OPENING](state: ModalStoreState, payload:{[key:string]:any}) {
        //     state.controllers
        //         .filter(m => m.code !== payload.code)
        //         .forEach(m => {
        //             m.visible = false
        //         })
        //     state.controllers
        //         .filter(m => m.code === payload.code)
        //         .forEach(m => {
        //             if ( m.activeModel ) {
        //                 m.visible = true
        //                 m.activeModel.on(payload.event, "SUCCESS")
        //             }
        //         })
        // },

        // [modal.CLOSING](state: ModalStoreState, payload:{[key:string]:any}) {
        //     state.closeDialog(payload)
        // }
    }

    actions = {
        // OPEN_DIALOG(context: ActionContext<ModalStoreState, R>, payload:ActionNS.Opening) {
        //     context.commit("OPEN_DIALOG", payload);
        // }
    }

    constructor() {
        // SchemaMgr.getInstance().asForms().then((forms: Array<ModalStoreState>) => {
        //     this.state.setForms(...forms)
        // });

        // this.state = 
    }
}