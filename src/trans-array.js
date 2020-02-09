export class TransArray extends Array {
    static get [Symbol.species]() { return  NormalArray; }

    unique() {
        return new TransArray(...new Set(this));
    }

    filter(...args) {
        console.log('Trans array presents:')
        return super.filter(...args);
    }
}

export class NormalArray extends Array {
    static get [Symbol.species]() { return  TransArray; }

    filter() {
        console.log('Normal array presents:')
        return super.filter.apply(this, arguments);
    }
}
