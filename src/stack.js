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

    push(data) {
        if (this.isFull) {
            throw new StackIsFullException();
        } else {
            this.space.push(data);
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
}

export class StackOfPlates {
    get isEmpty() {
        return !this.stacks.length;
    }

    constructor() {
        this.stacks = [];
    }

    push(data) {
        if (this.stacks.length) {
            if (this.peek().isFull) {
                const ns = new LimitedStack();
                ns.push(data);
                this.stacks.push(ns);
            } else {
                this.peek().push(data);
            }
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
}
