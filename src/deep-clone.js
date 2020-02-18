const GLOBAL_OBJECTS = [window, Window, document, body, Document, DocumentFragment];
const COMMON_CLASSES = [Function, Object, Number, Boolean, Date, String];

export class CloneError extends Error {
    constructor(msg, objRef, errRef) {
        super(msg);
        this.objRef = objRef;
        this.errRef = errRef;
    }
}

export function deepClone(target) {
    const visited = new Set();
    // TODO: keep track of the original to clone map for each object in order to recreate cycles
    return deepCloneInternal(target, visited);
}

function deepCloneInternal(target, visited) {
    if (target) {
        if (['number', 'boolean', 'string', 'function', 'symbol'].includes(typeof target)) {
            return target;
        } else if (Array.isArray(target)) {
            return target.map(v => deepCloneInternal(v, visited));
        } else if ([Boolean, Number, Date, String, Set].some(type => target instanceof type)) {
            if (!target.hasOwnProperty('constructor')) {
                throw new CloneError('The object being cloned does not have a constructor.', target);
            }
            return new target.constructor(target);
        } else if (target instanceof Map) {
            return new Map(
                [...target].map(([key, value]) => [key, deepCloneInternal(value)])
            );
        } else if (target instanceof Node) {
            throw new CloneError('Cloning document nodes is not allowed', target);
        } else if (GLOBAL_OBJECTS.includes(target)
            || COMMON_CLASSES.includes(target)
            || COMMON_CLASSES.some(cl => cl.prototype === target)) {
            return target; // Skip cloning built-ins and globals
        } else {
            if (target.clone) {
                return target.clone();
            }

            // Check that there is no cycles
            if (visited.has(target)) {
                throw new CloneError('The object contains a cycle.', target);
            }
            visited.add(target);

            let copy;
            if (Object.getPrototypeOf(target) === Object.prototype && target.constructor === Object) { // Plain obj
                copy = Object.create(Object.getPrototypeOf(target));
            } else { // Object that was constructred by a class
                try {
                    copy = new target.constructor();
                } catch (err) {
                    throw new CloneError('An error while calling an object constructor', target, err);
                }
            }

            // TODO: clone the entire prototype chain up to Object.prototype?
            const descriptors = Object.getOwnPropertyDescriptors(target);
            const pairs = [
                ...Object.getOwnPropertyNames(descriptors),
                ...Object.getOwnPropertySymbols(descriptors)
            ].map(n => [n, descriptors[n]]);
            for (let [key, description] of pairs) {
                const {value} = description;
                if (value) {
                    Object.defineProperty(copy, key, {...description, value: deepCloneInternal(value, visited)});
                } else {
                    // Either a data accessor or (null or undefined)
                    Object.defineProperty(copy, key, description);
                }
            }

            visited.delete(target);
            return copy;
        }
    } else {
        // Null or undefined.
        return target;
    }
}