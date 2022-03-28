import api from "./api_defs"
import { ErrcodeDefs } from "./ec_defs"
import { EvtDefs } from "./evt_defs"

export { ErrcodeDefs } from "./ec_defs"
export { EvtDefs, EvtFn } from "./evt_defs"
export default {
    api,
    ec: ErrcodeDefs,
    evt: EvtDefs
}