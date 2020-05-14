// A hashtable that operates on string keys and employes linear probing
const MIN_SIZE = 11;

export class HashTableStringKey {
    constructor() {
        this.size = MIN_SIZE;
        this.used = 0;
        this.table = new Array(this.size);
    }

    setElement(key, data) {
        if (key) {
            this._setElement(key, data);
            this.used++;
            // If more than 70% of slots are occupied in the current table, make it twice as large.
            if (this.used > 0.7 * this.size) {
                this.resize(true);
            }
        }
    }

    _setElement(key, data) {
        const index = getHashOf(key, this.size);
        const find = this._findByCriteria(index, x => !x || x.key === key);
        this.table[find.index] = {key, data, displaced: find.displaced};
    }

    deleteElement(key) {
        if (!key) {
            return null;
        }
        const index = getHashOf(key, this.size);
        const find = this._findByCriteria(index, x => x && x.key === key);
        if (find) {
            this.table[find.index] = null;
            this.used--;
            // If less than half of slots are used in a table half as small as the current one,
            // reduce the table by half.
            if (this.size > MIN_SIZE && this.used < .25 * this.size) {
                this.resize(false);
            }
        }
        return null;
    }

    getElement(key) {
        if (!key) {
            return null;
        }
        const index = getHashOf(key, this.size);
        const find = this._findByCriteria(index, x => x && x.key === key);
        return find && find.data;
    }
    
    resize(add) {
        const oldSize = this.size;
        const oldTable = this.table;
        if (add) {
            this.size = this.size * 2 - 1;
        } else {
            this.size = Math.floor(this.size / 2);
        }
        this.table = new Array(this.size);
        for (let i = 0; i < oldSize; i++) {
            if (oldTable[i]) {
                const {key, data} = oldTable[i];
                this._setElement(key, data);
            }
        }
    }

    debug() {
        for (let i = 0; i < this.size; i++) {
            if (this.table[i]) {
                console.log(`[${i}] = { key: "${this.table[i].key}",${''
                } data: "${JSON.stringify(this.table[i].data)}",${''
                } displaced: "${JSON.stringify(this.table[i].displaced)}" }`);
            } else {
                console.log(`[${i}] = empty`);
            }
        }
    }

    _findByCriteria(start, satisfy) {
        let index = start;
        let displaced = 0;
        while (index < this.size && !satisfy(this.table[index])) {
            index++;
            displaced++;
        }
        if (index < this.size) {
            return {
                index,
                data: this.table[index],
                displaced
            };
        } else {
            index = 0;
            while (index < start && !satisfy(this.table[index])) {
                index++;
                displaced++;
            }
            if (index < start) {
                return {
                    index,
                    data: this.table[index],
                    displaced
                };
            }
        }
        return null;
    }
}

function getHashOf(str, divisor) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str[i].charCodeAt(0);
    }
    return (sum + str.length) % divisor;
}
