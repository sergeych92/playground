export class LinkedList {
    constructor(equals) {
        this.head = Node.tail;
        this.equals = typeof equals === 'function' ? equals : (a, b) => a === b;
    }

    add(data) {
        this.head = new Node(this.head, data);
    }

    markDuplicates() {
        let outer = this.head;
        while (outer !== Node.tail) {
            if (!outer.isMarked()) {
                let inner = outer.next;
                while (inner !== Node.tail) {
                    if (!inner.isMarked() && this.equals(outer.data, inner.data)) {
                        outer.mark();
                        inner.mark();
                    }
                    inner = inner.next;
                }
            }
            outer = outer.next;
        }
    }

    showDuplicates() {
        let tracker = this.head;
        while (tracker !== Node.tail) {
            if (tracker.isMarked()) {
                
            }
            let ns = tracker.data + (tracker.isMarked() ? '(m)' : '');
            ns.padEnd(3, ' ');
            console.log(ns);
            tracker = tracker.next;
        }
    }

    kthToLast(k) {
        let length = 0;
        let tracker = this.head;
        while (tracker !== Node.tail) {
            length++;
            tracker = tracker.next;
        }

        if (k < 0 || k > length - 1) {
            return null;
        }
        let targetIndex = length - 1 - k;
        let index = 0;
        tracker = this.head;
        while (index < targetIndex) {
            tracker = tracker.next;
            index++;
        }
        return tracker.data;
    }
}

class Node {
    constructor(next, data) {
        this.next = next;
        this.data = data;
        this.marked = false;
    }

    mark() {
        this.marked = true;
    }

    isMarked() {
        return this.marked;
    }
}

Node.tail = new Node(null);





// import {LinkedList} from './list-duplicates';

// const list = new LinkedList();
// list.add(2);
// list.add(3);
// list.add(4);
// list.add(5);
// list.add(6);

// const d = list.kthToLast(1);
// console.log(`result: ${d}`);
