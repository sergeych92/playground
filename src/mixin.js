function defineMixinMethods(target, classes) {
    for (let cl of classes) {
        // Avoid overwriting properties with the same name by setting configurable: false for all added functions
        const descriptors = Object.getOwnPropertyDescriptors(cl.prototype);
        const asArray = Object.entries(descriptors)
            .filter(([key]) => key !== 'constructor')
            .map(([key, value]) => [
                key,
                value.hasOwnProperty('writable')
                    ? {...value, configurable: false, writable: false} // function
                    : {...value, configurable: false} // data accessor
            ]);
        const asObj = Object.fromEntries(asArray);
        Object.defineProperties(target, asObj);
    }
}

export function getCombinedMixins(...classes) {
    const combinedClass = function() {};
    defineMixinMethods(combinedClass.prototype, classes);
    Object.defineProperty(combinedClass.prototype, 'constructor', {value: combinedClass});
    return combinedClass;
}

export function extendWithMixins(target, ...mixins) {
    defineMixinMethods(target.prototype, mixins);
}
