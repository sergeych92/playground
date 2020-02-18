import { deepClone, CloneError } from "./deep-clone";

test('Primitives', () => {
    expect(true).toEqual(deepClone(true));
    expect('abc').toEqual(deepClone('abc'));
    expect(123).toEqual(deepClone(123));
    expect(null).toEqual(deepClone(null));
    expect(undefined).toEqual(deepClone(undefined));
    let f = function() { return 123; };
    expect(f).toEqual(deepClone(f));
    let s = Symbol('s');
    expect(s).toEqual(deepClone(s));
});

test('Array', () => {
    const arr = [1, 2, 3];
    const copy = deepClone(arr);
    expect(arr).toEqual(copy);
    arr[1] = 10;
    expect(arr[1]).toEqual(10);
    arr[1] !== copy[1];
});

test('Plain object', () => {
    const o = {
        a: 1,
        b: '123',
        c: false
    };
    const copy = deepClone(o);
    expect(o).toEqual(copy);
    o.b = '321';
    expect(o.b).toEqual('321');
    expect(o).not.toEqual(copy);
});


test('Composite object', () => {
    const age = Symbol('age');
    const obj = {
        _name: 'Alice Cooper',
        [age]: 39,
        height: 184,
        sex: 'male',
        weight: 78,
        wife: null,
        husband: undefined,
        vegeterian: Boolean(true),
        vegan: false,
        groceries: [
            {name: 'Potatoes', weight: 2},
            {name: 'Sneakers', amount: 12},
            {name: 'Crisps', amount: 2}
        ],
        skills: {
            painting: 7,
            singing: 8,
            math: 2,
            driving: {
                car: 5,
                bike: 10
            }
        },
        get name() { return this._name},
        sayHi() {
            return `Hi, my name is ${this.name}. I'm a ${this.height}cm ${this.sex} who weighs ${this.weight}kg.`;
        }
    };
    Object.defineProperty(obj, 'deadName', {value: 'Ashley Weed'});

    const copy = deepClone(obj);
    expect(obj !== copy).toBeTruthy();
    expect(obj).toEqual(copy);

    expect(obj.skills).not.toBe(copy.skills);
    expect(obj.skills.driving).not.toBe(copy.skills.driving);
    expect(obj.groceries).not.toBe(copy.groceries);
    expect(obj.groceries[0]).not.toBe(copy.groceries[0]);
    expect(obj.sayHi()).toEqual(copy.sayHi());
    expect(obj.name).toEqual(copy.name);
});

test('Check for cycles while cloning', () => {
    const a = {one: 1};
    const b = {two: 2};
    const c = {three: 3};
    a.link = b;
    b.link = c;
    c.link = a;

    expect(() => deepClone(a)).toThrow('The object contains a cycle.');
});

test('Clone objects with a clone method: cannot copy an object error', () => {
    class PalmTree {
        constructor(height) {
            this.height = height;
            this.width = 1;
        }

        showSummary() {
            return `A ${this.height}foot tall tree with a diameter of ${this.width}inches.`;
        }
    }

    const palmTree = new PalmTree(11);
    const obj = {
        prop1: {
            a: 1,
            b: 2,
            palmTree
        }
    };
    const copy = deepClone(obj);
});
