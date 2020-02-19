const GLOBAL_OBJECTS = [window, Window, document, body, Document, DocumentFragment];
const COMMON_CLASSES = [Function, Object, Number, Boolean, Date, String];

export class CloneError extends Error {
    constructor(msg, objRef, errRef) {
        super(msg);
        this.objRef = objRef;
        this.errRef = errRef;
    }
}

/*
    Cycle examples:

    const obj = {
        children: [{x: 1}]
    };
    obj.children.push(obj);


    const obj = {
        children: new Map(['first', {x: 1}])
    };
    obj.children.set('self', obj);


    const simple = {x: 1};
    const obj = {
        first: simple,
        second: simple,
        thid: simple
    };


    const obj = {
        one: {x: 1}
    };
    obj.two = obj;


    const obj = {
        one: {x: 1},
        two: {x: 2}
    };
    obj.one.link = obj.two;
    obj.two.link = obj.one;
*/

const cycleToken = Symbol('cycle');

export function deepClone(target) {
    const links = new Map();
    const copy = deepCloneInternal(target, links);
    // TODO: update cyclical links to the parent
    return copy;
}

function deepCloneInternal(target, links, key = null, parent = null) {
    if (target) {
        if (['number', 'boolean', 'string', 'function', 'symbol'].includes(typeof target)) {
            return target;
        } else if (Array.isArray(target)) {
            return target.map(v => deepCloneInternal(v, links));
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
        } else { // An object with properties to clone
            if (target.clone) {
                return target.clone();
            }

            // If target is a cycle, return an info token
            if (links.has(target)) {
                return cycleToken;
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

            // TODO: clone the entire prototype chain up to Object.prototype?
            const descriptors = Object.getOwnPropertyDescriptors(target);
            const pairs = [
                ...Object.getOwnPropertyNames(descriptors),
                ...Object.getOwnPropertySymbols(descriptors)
            ].map(n => [n, descriptors[n]]);
            for (let [key, description] of pairs) {
                const {value} = description;
                if (value) {
                    Object.defineProperty(copy, key, {...description, value: deepCloneInternal(value, links, key, target)});
                } else {
                    // Either a data accessor or (null or undefined)
                    Object.defineProperty(copy, key, description);
                }
            }

            links.delete(target);
            return copy;
        }
    } else {
        // Null or undefined.
        return target;
    }
}