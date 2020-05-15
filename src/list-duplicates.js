export class LinkedList {

    get length() {
        let count = 0;
        let tracker = this.head;
        while (tracker !== Node.end) {
            count++;
            tracker = tracker.next;
        }
        return count;
    }

    constructor() {
        this.head = Node.end;
        this.tail = Node.end;
    }

    addTail(data) {
        if (Array.isArray(data)) {
            for (let t of data) {
                this._addTailOne(t);
            }
        } else {
            this._addTailOne(data);
        }
        return this;
    }

    addHead(data) {
        if (this.head === Node.end) {
            this.head = new Node(Node.end, data);
            this.tail = this.head;
        } else {
            this.head = new Node(this.head, data);
        }
        return this;
    }

    getByIndex(index) {
        let tracker = this.head;
        while (tracker !== Node.end && index-- > 0) {
            tracker = tracker.next;
        }
        return tracker;
    }

    search(predicate) {
        let tracker = this.head;
        while (tracker !== Node.end && !predicate(tracker.data)) {
            tracker = tracker.next;
        }
        return tracker === Node.end ? null : tracker.data;
    }

    replace(predicate, data) {
        let tracker = this.head;
        while (tracker !== Node.end && !predicate(tracker.data)) {
            tracker = tracker.next;
        }
        if (tracker !== Node.end) {
            tracker.data = data;
            return tracker;
        }
        return null;
    }

    delete(predicate) {
        if (this.head === Node.end) {
            return null;
        }

        if (predicate(this.head.data)) {
            const deleted = this.head;
            if (this.head === this.tail) {
                this.head = this.tail = Node.end;
            } else {
                this.head = this.head.next;
            }
            return deleted;
        } else {
            let previous = this.head;
            let tracker = this.head.next;
            while (tracker !== Node.end && !predicate(tracker.data)) {
                previous = tracker;
                tracker = tracker.next;
            }
            if (tracker === Node.end) {
                return null;
            } else if (tracker === this.tail) {
                const deleted = this.tail;
                this.tail = previous;
                previous.next = Node.end;
                return deleted;
            } else {
                previous.next = tracker.next;
                return tracker;
            }
        }
    }

    *[Symbol.iterator]() {
        let tracker = this.head;
        while (tracker !== Node.end) {
            yield tracker.data;
            tracker = tracker.next;
        }
    }

    isEmpty() {
        return this.head === Node.end;
    }

    partition(x) {
        let tracker = this.head;
        while (tracker !== Node.end && tracker.data < x) {
            tracker = tracker.next;
        }

        while (tracker !== Node.end) {
            if (tracker.data < x) {
                this.head = new Node(this.head, tracker.data);
                tracker.data = tracker.next.data;
                tracker.next = tracker.next.next;
            } else {
                tracker = tracker.next;
            }
        }
    }

    isPalindrome() {
        if (this.head === this.tail) {
            return true;
        }

        let firstHalfStack = [];
        let single = this.head;
        let double = this.head;
        while (double !== Node.end) {
            firstHalfStack.push(single.data);
            single = single.next;
            double = double.next;

            if (double === Node.end) { // mis-steps (therefore odd)
                firstHalfStack.pop();
            } else { // even so far
                double = double.next;
            }
        }

        while (single !== Node.end) {
            if (firstHalfStack.pop() !== single.data) {
                return false;
            }
            single = single.next;
        }
        return true;
    }

    show() {
        let tracker = this.head;
        while (tracker !== Node.end) {
            console.log(tracker.data);
            tracker = tracker.next;
        }
    }

    getLoopStart() {
        if (this.head === Node.end) {
            return Node.end;
        }
        if (this.head === this.tail && this.tail.next === this.head) {
            return this.head;
        }

        // Find out if the list has a loop and count the path from the start to the intersection
        let slower = this.head;
        let faster = this.head.next;
        let toIntersectionSize = 0; // from start up to the intersection point (not including)
        while (faster !== Node.end && faster !== slower) {
            slower = slower.next;
            toIntersectionSize++;
            faster = faster.next;
            if (faster === Node.end) {
                break;
            } else {
                faster = faster.next;
            }
        }
        if (faster === Node.end) {
            return Node.end; // No loop
        }
        const intersection = slower;

        // Find the size of the loop (size - 1 really)
        let loopSize = 0;
        slower = intersection.next;
        while (slower !== intersection) {
            slower = slower.next;
            loopSize++;
        }

        // Given there is a loop, find where it begins by treating the two pieces as intersecting lists
        let diff = Math.abs(toIntersectionSize - loopSize);
        let longer = this.head;
        let shorter = intersection.next;
        if (toIntersectionSize < loopSize) {
            [longer, shorter] = [shorter, longer];
        }
        while (diff-- > 0) {
            longer = longer.next;
        }

        while (longer !== intersection && shorter !== intersection) {
            if (longer === shorter) {
                return longer;
            }
            longer = longer.next;
            shorter = shorter.next;
        }

        return intersection;
    }

    _addTailOne(data) {
        if (this.head === Node.end) {
            this.head = new Node(Node.end, data);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(Node.end, data);
            this.tail = this.tail.next;
        }
    }
}

export class Node {
    constructor(next, data) {
        this.next = next;
        this.data = data;
    }
}

Node.end = new Node(null);


export function sumListsReverse(a, b) {
    if (a === Node.end) {
        return a;
    }
    if (b === Node.end) {
        return b;
    }
 
    let digitA = a.head;
    let digitB = b.head;
    let sum = new LinkedList();
    let overflow = 0;
    while (digitA !== Node.end || digitB !== Node.end) {
        let nextSumDigit = (digitA !== Node.end ? digitA.data : 0)
            + (digitB !== Node.end ? digitB.data : 0)
            + overflow;
        overflow = nextSumDigit >= 10 ? 1 : 0;
        nextSumDigit -= overflow * 10;
        sum.addTail(nextSumDigit);
        digitA = digitA !== Node.end ? digitA.next : digitA;
        digitB = digitB !== Node.end ? digitB.next : digitB;
    }

    if (overflow) {
        sum.addTail(overflow);
    }

    return sum;
}


export function sumListsDirect(listA, listB) {
    const lenA = listA.length;
    const lenB = listB.length;
    const result = new LinkedList();
    let overflow = 0;
    if (lenA <= lenB) {
        overflow = doSumDirect(listA.head, lenA, listB.head, lenB, result);
    } else {
        overflow = doSumDirect(listB.head, lenB, listA.head, lenA, result);
    }
    if (overflow) {
        result.addHead(1);
    }
    return result;
}

function doSumDirect(digitA, lenA, digitB, lenB, result) {
    if (lenA === lenB && lenA === 0) {
        return 0;
    } else {
        let overflow = 0;
        let digitsSum = 0;
        if (lenA < lenB) {
            overflow = doSumDirect(digitA, lenA, digitB.next, lenB - 1, result);
            digitsSum = digitB.data + overflow;
        } else {
            overflow = doSumDirect(digitA.next, lenA - 1, digitB.next, lenB - 1, result);
            digitsSum = digitA.data + digitB.data + overflow;
        }
        if (digitsSum >= 10) {
            result.addHead(digitsSum - 10);
            return 1;
        } else {
            result.addHead(digitsSum);
            return 0;
        }
    }
}


export function findIntersection(listA, listB) {
    const lenA = listA.length;
    const lenB = listB.length;
    let diff = Math.abs(lenA - lenB);

    let longer = listA.head;
    let shorter = listB.head;
    if (lenA < lenB) {
        [longer, shorter] = [shorter, longer];
    }
    while (diff-- > 0) {
        longer = longer.next;
    }

    while (longer !== Node.end && shorter !== Node.end) {
        if (longer === shorter) {
            return longer;
        }
        longer = longer.next;
        shorter = shorter.next;
    }

    return Node.end;
}