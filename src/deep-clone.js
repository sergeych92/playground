const GLOBAL_OBJECTS = [
    Window, Document, DocumentFragment, Node, Function.prototype, Object.prototype, Number.prototype
];

export class CloneError extends Error {
    constructor(msg, objRef) {
        super(msg);
    }
}

export function deepClone(target) {
    const visited = new Set();
    return deepCloneInternal(target, visited);
}

function deepCloneInternal(target, visited) {
    if (target) {
        if (['number', 'boolean', 'string', 'function', 'symbol'].includes(typeof target)) {
            return target;
        } else if (Array.isArray(target)) {
            return target.map(v => deepCloneInternal(v, visited));
        } else if ([Boolean, Number, Date, Set, Map, String].some(type => target instanceof type)) {
            if (!target.hasOwnProperty('constructor')) {
                throw new CloneError('The object being cloned does not have a constructor.', target);
            }
            return new target.constructor(target);
            // TODO: check for a clone method that an object may provide to help clone it (esp if it's a class)
        } else if (Object.getPrototypeOf(target) === Object.prototype && target.constructor === Object) { // Plain obj
            // Check that there is no cycles
            if (visited.has(target)) {
                throw new CloneError('The object contains a cycle.', target);
            }
            visited.add(target);

            const copy = Object.create(Object.getPrototypeOf(target));
            // TODO: clone the entire prototype chain up to Object.prototype?
            const descriptors = Object.getOwnPropertyDescriptors(target);
            const pairs = [
                ...Object.getOwnPropertyNames(descriptors),
                ...Object.getOwnPropertySymbols(descriptors)
            ].map(n => [n, descriptors[n]]);
            for (let [key, description] of pairs) {
                const {value} = description;
                // TODO: Check that the object doesn't point to any globals, such as Window, Function.prototype, etc
                if (value) {
                    Object.defineProperty(copy, key, {...description, value: deepCloneInternal(value, visited)});
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