export enum EvtDefs {
    GOTO_MENU = 5,
    STARTING_MODAL_EVENTS = 1000,
    SHOWING_MODAL_EVENT,
    CACELING_MODAL_EVENT,
    SWITCH_MODAL_PAGE_EVENT,
    ROLLBACK_MODAL_PAGE_EVENT,
    ENDING_MODEL_EVENTS = 1010 
}

export type EvtFn<O> = (...args:any) => Promise<O>