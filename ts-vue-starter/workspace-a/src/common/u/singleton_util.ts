
export function singleton<TClass extends new (...a: any[])=> any> (
    constructor: TClass, 
    ...a: ConstructorParameters<TClass>
    ): InstanceType<TClass> {
    const INSTANCE_PROPERTY_NAME_DEF = "_$inst$"
    if( !(INSTANCE_PROPERTY_NAME_DEF in constructor.prototype) ) {
        constructor.prototype[INSTANCE_PROPERTY_NAME_DEF] = new constructor(...a)
    }

    return constructor.prototype[INSTANCE_PROPERTY_NAME_DEF]
}
