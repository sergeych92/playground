export function mixin(...classes) {
    const combinedClass = function() {};
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
        Object.defineProperties(combinedClass.prototype, asObj);
    }
    Object.defineProperty(combinedClass.prototype, 'constructor', {value: combinedClass});
    return combinedClass;
}
