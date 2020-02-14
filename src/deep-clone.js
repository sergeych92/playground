export class CloneError extends Error {
    constructor(msg, objRef) {
        super(msg);
    }
}

export function deepClone(target) {
    if (target) {
        if (['number', 'boolean', 'string', 'function', 'symbol'].includes(typeof target)) {
            return target;
        } else if (Array.isArray(target)) {
            return target.map(v => deepClone(v));
        } else if ([Boolean, Number, Date, Set, Map, String].some(type => target instanceof type)) {
            if (!target.hasOwnProperty('constructor')) {
                throw new CloneError('The object being cloned does not have a constructor.', target);
            }
            return new target.constructor(target);
        } else if (Object.getPrototypeOf(value) === Object.prototype && value.constructor === Object) { // Plain obj
            const copy = Object.create(Object.getPrototypeOf(target));
            // TODO: clone the entire prototype chain up to Object.prototype?
            for (let [key, description] of Object.entries(Object.getOwnPropertyDescriptors(target))) {
                const {value} = description;
                // TODO: Check that the object doesn't point to any globals, such as Window, Function.prototype, etc
                // TODO: Check that there is no cycles
                if (value) {
                    Object.defineProperty(copy, key, {...description, deepClone(value)});
                } else {
                    // Either a data accessor or (null or undefined)
                    Object.defineProperty(copy, key, description);
                }
            }
            return copy;
        } else {
            throw new CloneError('This object type is not supported', target);
        }
    } else {
        // Null or undefined.
        return target;
    }
}
