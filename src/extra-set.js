export class CollectionTypeError extends TypeError {
    constructor() {
        super('Values must be stored in a set or an iterable collection');
    }
}

export class ExtraSet extends Set {
    static get [Symbol.species]() { return ExtraSet; }

    subtract(other) {
        if (!other) {
            return this;
        }
        if (!(other instanceof Set)) {
            if (Array.isArray(other) || other.hasOwnProperty(Symbol.iterator)) {
                other = new Set(other);
            } else {
                throw new CollectionTypeError();
            }
        }
        return new ExtraSet(
            [...this].filter(v => !other.has(v))
        );
    }

    toString() {
        return `ExtraSet (${[...this].join(',')})`;
    }
}


// const s1 = new ExtraSet([1, 2, 3, 3, 4]);
// console.log(`s1 == ${s1}`);

// const s2 = {
//     *[Symbol.iterator]() {
//         yield 1;
//         yield 2;
//         yield 3;
//     }
// };
// console.log(`s2 == ${s2}`);

// const sd = s1.subtract(s2);
// console.log(`s1 - s2 == ${sd}`);