// import { AxiosStatic } from 'axios';
import "vuex"
import {AxiosPromise} from "axios"
import "vue-axios"
import {IRsp} from "../common/api"
import {IVueDefination, IVueUtil, IVueAlertBox} from "../common/i/ivue"

declare module 'vue/types/vue' {
  interface Vue {
    $rs(promise:AxiosPromise<IRsp>, ...options:any[]):Promise<IRsp | undefined>

    $defs: IVueDefination

    $util: IVueUtil

    $ab: IVueAlertBox
  }
}