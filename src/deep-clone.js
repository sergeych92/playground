const COMMON_CLASSES = [Function, Object, Number, Boolean, Date, String];

export class CloneError extends Error {
    constructor(msg, objRef, errRef) {
        super(msg);
        this.objRef = objRef;
        this.errRef = errRef;
    }
}

export function deepClone(target) {
    const links = new Map();
    return deepCloneInternal(target, links);
}

function deepCloneInternal(target, links) {
    if (target) {
        if (['number', 'boolean', 'string', 'function', 'symbol'].includes(typeof target)) {
            return target;
        } else if (Array.isArray(target)) {
            return target.map(v => deepCloneInternal(v, links));
        } else if ([Boolean, Number, Date, String].some(type => target instanceof type)) {
            try {
                return new target.constructor(target);
            } catch {
                throw new CloneError('There was a problem creating an object by calling its constructor.', target);
            }
        } else if (target instanceof Map) {
            return new Map(
                [...target].map(([key, value]) => [deepCloneInternal(key, links), deepCloneInternal(value, links)])
            );
        } else if (target instanceof Set) {
            return new Set(
                [...target].map(v => deepCloneInternal(v, links))
            );
        } else if (target instanceof EventTarget) {
            return target; // Don't clone nodes (Document, Window, any Element)
        } else if (COMMON_CLASSES.includes(target) || COMMON_CLASSES.some(cl => cl.prototype === target)) {
            return target; // Skip cloning built-ins and globals
        } else { // An object with properties to clone
            if (target.clone) {
                return target.clone();
            }

            // Check for a cycle
            if (links.has(target)) {
                return links.get(target);
            }

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

            links.set(target, copy);

            // TODO: clone the entire prototype chain up to Object.prototype?
            const descriptors = Object.getOwnPropertyDescriptors(target);
            const pairs = [
                ...Object.getOwnPropertyNames(descriptors),
                ...Object.getOwnPropertySymbols(descriptors)
            ].map(n => [n, descriptors[n]]);
            for (let [key, description] of pairs) {
                const {value} = description;
                if (value) {
                    Object.defineProperty(copy, key, {...description, value: deepCloneInternal(value, links)});
                } else {
                    // Either a data accessor or (null or undefined)
                    Object.defineProperty(copy, key, description);
                }
            }

            return copy;
        }
    } else {
        // Null or undefined.
        return target;
    }
}