import { view } from "../../common/i"

export class MenuPage implements view.IMenuPage {
    code: string
    menuCode?: string
    path: string
    redirectPath?: string
    name: string
    // component: any
    roles: Array<string> = []
    children: Array<MenuPage> = []

    constructor(code:string, path:string, name: string, menuCode?:string, redirectPath?: string) {
        // this.pageCode = pageCode;
        this.code = code
        this.name = name
        this.path = path
        this.menuCode = menuCode
        this.redirectPath = redirectPath
    }

    // appendChild(child:Page) {
    //     this.children.push(child);
    // }

    // component() {
    //     return import(`@/views/page${this.path}.vue`)
    // }

    // static kv() : { [ k:string ] : Page } {
    //     let pages:Page[] = [
    //         new Page('ALG_LIST', '查看算法包', '/AlgList', AlgListPage),
    //         new Page('ALG_MAKER', '新建算法包', '/AlgMaker', AlgMakerPage)
    //     ]

    //     let o:{ [ k:string ] : Page } = {}
    //     for(let p of pages) {
    //         o[p.menuCode] = p;
    //     }

    //     return o;
    // }
}

// export const PAGE_KV_DEFS = Page.kv();

// const install = function(V: typeof Vue, _ = {}) {  
//     V.prototype.$pageDef = PAGE_KV_DEFS;
// };

// export default {
//     install
// }

// export function install (vue: typeof Vue, options: InstallationOptions): void