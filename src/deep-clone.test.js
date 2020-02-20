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

test('Cycle: a => b => c => a', () => {
    const a = {one: 1};
    const b = {two: 2};
    const c = {three: 3};
    a.link = b;
    b.link = c;
    c.link = a;

    const copy = deepClone(a);
    expect(a).toEqual(copy);
    expect(copy).toBe(copy.link.link.link);

    expect(a).not.toBe(copy);
    expect(a.link).not.toBe(copy.link);
    expect(a.link.link).not.toBe(copy.link.link);
});

test('Cycle: a => a', () => {
    const obj = {};
    obj.link = obj;

    const copy = deepClone(obj);
    expect(copy.link).toBe(copy);
    expect(obj).toEqual(copy);
    expect(obj).not.toBe(copy);
    expect(obj.link).not.toBe(copy.link);
});

test('Cycle: a => [a, {a}]', () => {
    const obj = {
        children: [{x: 1}]
    };
    obj.children.push(obj);
    obj.children.push({x:3, link: obj});

    const copy = deepClone(obj);
    expect(obj).toEqual(copy);
    expect(obj).not.toBe(copy);
    expect(copy.children[1]).toBe(copy);
    expect(copy.children[2].link).toBe(copy);
});

test('Cycle: a => new Map([key,a])', () => {
    const obj = {
        children: new Map([['first', {x: 1}]])
    };
    obj.children.set('self', obj);

    const copy = deepClone(obj);
    expect(obj).toEqual(copy);
    expect([...obj.children]).toEqual([...copy.children]);
    expect(obj).not.toBe(copy);
    expect(obj.children.get('first')).not.toBe(copy.children.get('first'));
    expect(obj.children.get('self')).not.toBe(copy.children.get('self'));
    expect(copy.children.get('self')).toBe(copy);
});

test('Cycle: a => new Map([[a,ref1], [b,ref2]])', () => {
    const ref = {y: 1};
    const obj = {
        children: new Map([[ref, {x: 1}]]),
        link: ref
    };
    obj.children.set(obj, obj);

    const copy = deepClone(obj);
    expect(obj).toEqual(copy);
    expect([...obj.children]).toEqual([...copy.children]);
    expect(obj).not.toBe(copy);
    expect(obj.link).not.toBe(copy.link);
    expect(obj.children.get(obj.link)).not.toBe(copy.children.get(copy.link));
    expect(copy.children.get(copy.link)).toEqual({x:1});
    expect(copy.children.get(copy)).toBe(copy);
});

test('Reference: a => {a1: r, a2: r, a3: r}', () => {
    const simple = {x: 1};
    const obj = {
        first: simple,
        second: simple,
        third: simple
    };

    const copy = deepClone(obj);
    expect(obj).toEqual(copy);
    expect(obj).not.toBe(copy);
    expect(copy.first).toBe(copy.second);
    expect(copy.second).toBe(copy.third);
    expect(copy.first).not.toBe(obj.first);
});

test('Cycle & Reference: a => Set(b, c, a)', () => {
    const link1 = {x: 1};
    const link2 = {x: 2};
    const obj = {
        refs: new Set([link1, link2]),
        link1,
        link2
    };
    obj.refs.add(obj);

    const copy = deepClone(obj);
    expect(obj).toEqual(copy);
    expect(obj).not.toBe(copy);
    expect([...obj.refs]).toEqual([...copy.refs]);
    expect(copy.refs.has(copy.link1)).toBeTruthy();
    expect(copy.refs.has(copy.link2)).toBeTruthy();
    expect(copy.refs.has(copy)).toBeTruthy();
    expect(copy.link1).not.toBe(obj.link1);
    expect(copy.link2).not.toBe(obj.link2);
});

test('Cycle: a => b => c => b', () => {
    const obj = {
        one: {x: 1},
        two: {x: 2}
    };
    obj.one.link = obj.two;
    obj.two.link = obj.one;

    const copy = deepClone(obj);
    expect(obj).toEqual(copy);
    expect(copy.one).not.toBe(obj.one);
    expect(copy.two).not.toBe(obj.two);
    expect(copy.one.link).toBe(copy.two);
    expect(copy.two.link).toBe(copy.one);
});

test('Cycle: a => b => c => a', () => {
    const a = {x: 1};
    const b = {x: 2};
    const c = {x: 3};
    a.link = b;
    b.link = c;
    c.link = a;
    const obj = {a,b,c};

    const copy = deepClone(obj);
    expect(obj).toEqual(copy);
    expect(copy).not.toBe(obj);
    expect(copy.a).not.toBe(obj.a);
    expect(copy.b).not.toBe(obj.b);
    expect(copy.c).not.toBe(obj.c);
    expect(copy.a.link).toBe(copy.b);
    expect(copy.a.link).not.toBe(b);
    expect(copy.b.link).toBe(copy.c);
    expect(copy.b.link).not.toBe(c);
    expect(copy.c.link).toBe(copy.a);
});


test('Clone objects with a clone method', () => {
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
