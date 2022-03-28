import {Module, ActionContext} from 'vuex'

export class Widget {
    static MAX_MENU_SIZE_DEF = 3;

    menuCodes:Array<string> = []

    get latestMenuCode():string | null {
        if ( 0 == this.menuCodes.length ) {
            return null
        } else {
            return this.menuCodes[0]
        }
    }

    getHistoryMenuCode(index:number):string | null {
        if ( index >= this.menuCodes.length ) {
            return null
        } else {
            return this.menuCodes[index]
        }
    }

    changeToMenu(menuCode:string) {
        if ( !menuCode ) {
            return 
        }

        this.menuCodes.unshift(menuCode);
        if ( Widget.MAX_MENU_SIZE_DEF <= this.menuCodes.length ) {
            this.menuCodes.pop()
        }
    }
}

// class ChangingMenuAction implements ActionObject<PageState, PageState> {
//     handler(context:ActionContext<PageState, PageState>, payload:any) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 context.commit('showMenu', payload);
//                 resolve();
//             }, 1000)
//         })
//     }
// }

export class MenuStore<R> implements Module<Widget, R> {
    namespaced: boolean = true;
    state: Widget = new Widget()

    getters = {
        getLatestMenuCode(state:Widget, getters:any, rootState:R): string|null {
            return state.latestMenuCode
        },

        getLastMenuCode(state:Widget, getters:any, rootState:R): string|null {
            return state.getHistoryMenuCode(1)
        }
    }
    mutations = {
        CHANGE_MENU(state:Widget, menuCode:string) {
            state.changeToMenu(menuCode)
        }
    }
    actions = {
        TRIGGER_MENU(context:ActionContext<Widget, R>, payload:any){
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(context.commit('CHANGE_MENU', payload));
                }, 1000)
            })
        }
    }
};
  