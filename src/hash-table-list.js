import { LinkedList } from "./list-duplicates";

const MIN_SIZE = 11;

export class HashTableList {
    constructor() {
        this.size = MIN_SIZE;
        this.used = 0;
        this.table = new Array(this.size);
    }

    setElement(key, data) {
        const index = getHashOf(key, this.size);
        if (this.table[index]) {
            if (this.table[index] instanceof LinkedList) {
                const replaced = this.table[index].replace(x => x.key === key, {key, data});
                if (!replaced) {
                    this.table[index].addTail({key, data});
                }
            } else {
                if (this.table[index].key !== key) {
                    // convert a single element into a list of 2 (+the newly added)
                    const item = this.table[index];
                    this.table[index] = new LinkedList();
                    this.table[index].addTail([item, {key, data}]);
                } else {
                    this.table[index].data = data; // just replace data
                }
            }
        } else {
            this.table[index] = {key, data};
        }

        // TODO: adjust table size??
    }

    getElement(key) {
        const index = getHashOf(key, this.size);
        if (this.table[index]) {
            if (this.table[index] instanceof LinkedList) {
                return this.table[index].search(x => x.key === key);
            } else {
                return this.table[index].key === key ? this.table[index] : null;
            }
        }
        return null;
    }

    deleteElement(key) {
        const index = getHashOf(key, this.size);
        if (this.table[index]) {
            if (this.table[index] instanceof LinkedList) {
                this.table[index].delete(x => x.key === key);
                if (this.table[index].isEmpty()) {
                    this.table[index] = null;
                }
            } else {
                if (this.table[index].key === key) {
                    this.table[index] = null;          
                }
            }
            // TODO: Adjust table size??
        }
        return null;
    }

    debug() {
        for (let i = 0; i < this.size; i++) {
            if (this.table[i]) {
                if (this.table[i] instanceof LinkedList) {
                    let j = 0;
                    // Having just 2 elements has disturbed the first element once (converting from plain)
                    for (let node of this.table[i]) {
                        console.log(`[${i}] = { key: "${node.key}",${''
                            } data: "${JSON.stringify(node.data)}",${''
                            } displaced: "${j === 0 ? 1 : j}" }`);
                        j++;
                    }
                } else {
                    console.log(`[${i}] = { key: "${this.table[i].key}",${''
                        } data: "${JSON.stringify(this.table[i].data)}",${''
                        } displaced: "${0}" }`);
                }
            } else {
                console.log(`[${i}] = empty`);
            }
        }
    }

    _resize() {

    }
}


function getHashOf(str, divisor) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str[i].charCodeAt(0);
    }
    return (sum + str.length) % divisor;
}
