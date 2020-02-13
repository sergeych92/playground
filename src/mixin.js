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
        // Report a potential problem of mixins having the same methods as object parents
        for (let [key] of asArray) {
            if (Object.getPrototypeOf(target).hasOwnProperty(key)) {
                console.warn(`One of the object parents has a method that is being added as a mixin: ${key}`);
            }
        }
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
    // Set the existing methods and data accessorts to immutable to void overwriting them by mixin contents
    const keyDescrs = Object.entries(
        Object.getOwnPropertyDescriptors(target.prototype)
    );
    for (let [key, descr] of keyDescrs) {
        const updatedDescr = descr.hasOwnProperty('writable')
            ? {...descr, writable: false, configurable: false}
            : {...descr, configurable: false};
        Object.defineProperty(target.prototype, key, updatedDescr);
    }
    defineMixinMethods(target.prototype, mixins);
}
