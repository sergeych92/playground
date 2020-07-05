export class StackEmptyError extends TypeError {}

export class MultiWayStack {
    constructor() {
        this.stackSpace = [];
        this.removedStartIndex = null;
        this.lastNodeByStackId = new Map();
    }

    push(data, stackId) {
        if (this.removedStartIndex) {
            const {position} = this.stackSpace.pop();
            this.stackSpace[position] = {
                data,
                prev: this.lastNodeByStackId.has(stackId) ? this.lastNodeByStackId.get(stackId) : null
            }
            this.lastNodeByStackId.set(stackId, position);
            if (this.removedStartIndex >= this.stackSpace.length) {
                this.removedStartIndex = null;
            }
        } else {
            this.stackSpace.push({
                data,
                prev: this.lastNodeByStackId.has(stackId) ? this.lastNodeByStackId.get(stackId) : null
            });
            this.lastNodeByStackId.set(stackId, this.stackSpace.length - 1);
        }
    }

    pop(stackId) {
        if (this.lastNodeByStackId.has(stackId)) {
            const position = this.lastNodeByStackId.get(stackId);
            const node = this.stackSpace[position];
            this.stackSpace[position] = null;
            this.lastNodeByStackId.set(stackId, node.prev !== null ? node.prev : null);
            this.stackSpace.push({ position });
            if (this.removedStartIndex !== null) {
                this.removedStartIndex = this.stackSpace.length - 1;
            }
            // TODO: check the size of the empty space in between stack elements. If there is too much of it,
            // remove it by bringing the elements closer together.
            // this.packUp();
            return node.data;
        } else {
            throw new StackEmptyError();
        }
    }

    // packUp() {
    //     const emptynessFactor = (this.stackSpace.length - this.removedStartIndex) / this.stackSpace.length;
    //     if (this.stackSpace.length > 20 && emptynessFactor > 0.6) {
    //         const newStackSpace = [];
    //         for (let i = 0; i < this.removedStartIndex; i++) {
    //             if (this.stackSpace[i]) {
    //                 newStackSpace.push(this.stackSpace[i]);
    //             }
    //         }
    //         this.stackSpace = newStackSpace;
    //         this.removedStartIndex = null;
    //     }
    // }
}



export class MinStack {
    constructor() {
        this.space = [];
    }

    push(num) {
        if (this.space.length) {
            const {min: minIndex} = this._lastElement();
            const min = this.space[minIndex].num;
            if (num < min) {
                this.space.push({
                    num,
                    min: this.space.length
                });
            } else {
                this.space.push({
                    num,
                    min: minIndex
                });
            }
        } else {
            this.space.push({
                num,
                min: 0
            });
        }
    }

    pop() {
        if (this.space.length) {
            return this.space.pop();
        } else {
            throw new StackEmptyError();
        }
    }

    min() {
        if (this.space.length) {
            const {min: minIndex} = this._lastElement();
            return this.space[minIndex].num;
        } else {
            throw new StackEmptyError();
        }
    }

    _lastElement() {
        return this.space[this.space.length - 1];
    }
}



export class StackIsFullException extends TypeError {}

export class StackIndexOutOfBounds extends TypeError {}

export class LimitedStack {
    get isFull() {
        return this.space.length >= this.limit;
    }

    get isEmpty() {
        return this.space.length === 0;
    }

    constructor(limit = 5) {
        this.space = [];
        this.limit = limit;
    }

    push(...args) {
        if (args.length === 0) {
            throw new TypeError('push must be provided with at least one argument');
        }
        if (this.isFull) {
            throw new StackIsFullException();
        } else {
            if (args.length === 1) {
                if (Array.isArray(args[0])) {
                    this.space.push(...args[0]);
                } else {
                    this.space.push(args[0]);
                }
            } else {
                this.space.push(...args);
            }
        }
    }

    pop() {
        if (this.space.length) {
            return this.space.pop();
        } else {
            throw new StackEmptyError();
        }
    }

    peek() {
        if (this.space.length) {
            return this.space[this.space.length - 1];
        } else {
            throw new StackEmptyError();
        }
    }

    debug() {
        const itemsStr = [...this.space].reverse().join(', ')
        console.log(itemsStr);
    }
}

export class StackOfPlates {
    get isEmpty() {
        return !this.stacks.length;
    }

    constructor() {
        this.stacks = [];
    }

    push(data) {
        if (!this.stacks.length || this.peek().isFull) {
            const ns = new LimitedStack();
            ns.push(data);
            this.stacks.push(ns);
        } else {
            this.peek().push(data);
        }
    }

    pop() {
        const activeStack = this.peek();
        const data = activeStack.pop();
        if (activeStack.isEmpty) {
            this.stacks.pop();
        }
        return data;
    }

    popAt(index) {
        if (index < 0 || index >= this.stacks.length) {
            throw new StackIndexOutOfBounds();
        }
        const data = this.stacks[index].pop();
        if (this.stacks[index].isEmpty) {
            this.stacks.splice(index, 1);
        }
        return data;
    }

    peek() {
        if (this.stacks.length) {
            return this.stacks[this.stacks.length - 1];
        } else {
            throw new StackEmptyError();
        }
    }

    packUp() {
        const maxIndex = () => this.stacks.length - 1;
        let feedIndex = 0;
        let borrowIndex = 0;
        const feed = () => this.stacks[feedIndex];
        const borrow = () => this.stacks[borrowIndex];
        if (this.stacks.length >= 2) {
            while (feedIndex < maxIndex()) {
                if (feed().isFull) {
                    feedIndex++;
                } else {
                    borrowIndex = feedIndex + 1;
                    let filledUp = false;
                    while (borrowIndex <= maxIndex()) {
                        const reverse = new LimitedStack();
                        while (!borrow().isEmpty) {
                            reverse.push(borrow().pop());
                        }
                        while (!feed().isFull && !reverse.isEmpty) {
                            feed().push(reverse.pop());
                        }
                        if (feed().isFull) {
                            if (reverse.isEmpty) {
                                this.stacks.splice(feedIndex + 1, borrowIndex - feedIndex);
                            } else {
                                while (!reverse.isEmpty) {
                                    borrow().push(reverse.pop());
                                }
                                const gapSize = borrowIndex - feedIndex - 1;
                                if (gapSize > 0) {
                                    this.stacks.splice(feedIndex + 1, gapSize);
                                }
                                feedIndex++;
                            }
                            filledUp = true;
                            break;
                        } else {
                            borrowIndex++;
                        }
                    }
                    if (!filledUp) {
                        this.stacks.splice(feedIndex + 1);
                    }
                }
            }
        }
    }

    debug() {
        for (let i = 0; i < this.stacks.length; i++) {
            console.log(`Stack ${i}:`);
            this.stacks[i].debug();
        }
    }
}

// TESTING CODE
// const stack = new StackOfPlates();

// const numbers = [
//     1, 2, 3, 4, 5,
//     6, 7, 8, 9, 10,
//     11, 12, 13, 14, 15,
//     16, 17, 18, 19, 20,
//     21, 22, 23, 24, 25
// ];
// for (let n of numbers) {
//     stack.push(n);
// }

// const popAt = (count, position) => {
//     for (let i = 1; i <= count; i++) {
//         stack.popAt(position);
//     }
// }

// const pop4 = position => popAt(4, position);

// popAt(3, 0);
// pop4(1);
// pop4(2);
// stack.debug();

// console.log('--------------------------');

// stack.packUp();
// stack.debug();




// ---------------------------------------------------------------------
export class QueueEmptyException extends TypeError {}

export class MyQueue {
    constructor() {
        this.stackLeft = [];
        this.stackRight = [];
    }

    enqueue(data) {
        if (Array.isArray(data)) {
            this.stackLeft.push(...data);
        } else {
            this.stackLeft.push(data);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new QueueEmptyException();
        } else {
            if (this.stackRight.length) {
                return this.stackRight.pop();
            } else {
                this.stackRight = this.stackLeft.reverse();
                this.stackLeft = [];
                return this.stackRight.pop();
            }
        }
    }

    isEmpty() {
        return this.stackLeft.length === 0 && this.stackRight.length === 0;
    }
}



// --------------------------------------------------------------------------
export function sortStack(stack) {
    if (stack.isEmpty) {
        return stack;
    }

    const holder = new LimitedStack(Number.MAX_SAFE_INTEGER);
    let itemsCount = 0;
    let itemsCountInit = false;
    let itemsLeft = Number.MAX_SAFE_INTEGER;
    while (itemsLeft) {
        let maxItem = null;
        let sameItemsCount = 0;

        // Find the max item and the number of occurancies of that item
        let takeItems = itemsLeft;
        while (takeItems && !stack.isEmpty) {
            const nextItem = stack.pop();
            if (maxItem !== null) {
                if (nextItem > maxItem) {
                    maxItem = nextItem;
                    sameItemsCount = 1;
                } else if (nextItem === maxItem) {
                    sameItemsCount++;
                }
            } else {
                maxItem = nextItem;
                sameItemsCount = 1;
            }
            holder.push(nextItem);
            if (!itemsCountInit) {
                itemsCount++;
            }
            takeItems--;
        }
        if (!itemsCountInit) {
            itemsLeft = itemsCount;
            itemsCountInit = true;
        }
        
        // Move max items to the bottom of the stack and return the remaining items
        const maxItemsArr = new Array(sameItemsCount).fill(maxItem);
        stack.push(...maxItemsArr);
        while (!holder.isEmpty) {
            const nextItem = holder.pop();
            if (nextItem !== maxItem) {
                stack.push(nextItem);
            }
        }
        itemsLeft -= sameItemsCount;
    }
}