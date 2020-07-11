const ROOT_INDEX = 0;

export class MinHeapIsEmptyError extends TypeError {}

export class MinHeap {
    constructor() {
        this._nodes = [];
    }

    peekMin() {
        if (this._nodes.length === 0) {
            throw new MinHeapIsEmptyError();
        } else {
            return this._nodes[ROOT_INDEX];
        }
    }

    popMin() {
        const min = this.peekMin();
        this._nodes[ROOT_INDEX] = this._removeLast();
        this._bubbleDown(ROOT_INDEX, this._nodes[ROOT_INDEX]);
        return min;
    }

    add(value) {
        const addedIndex = this._addLast(value);
        this._bubbleUp(addedIndex);
    }

    _bubbleUp(nodeIndex) {
        if (nodeIndex !== ROOT_INDEX) { // Exclude the root
            const parent = this._getParent(nodeIndex);
            const {left, right} = this._getChildren(parent.index);
            const smallerChild = this._getSmallerChild(left, right);
            if (smallerChild.value < parent.value) {
                this._writeValue(smallerChild.value, parent.index);
                this._writeValue(parent.value, smallerChild.index);
                this._bubbleUp(parent.index);
            }
        }
    }

    _bubbleDown(nodeIndex, nodeValue) {
        const {left, right} = this._getChildren(nodeIndex);
        if (left || right) {
            const smallerChild = this._getSmallerChild(left, right);
            if (smallerChild.value < nodeValue) {
                this._writeValue(smallerChild.value, nodeIndex);
                this._writeValue(nodeValue, smallerChild.index);
                this._bubbleDown(smallerChild.index, nodeValue);
            }
        }
    }

    _addLast(value) {
        this._nodes.push(value);
        return this._nodes.length - 1;
    }

    _removeLast() {
        return this._nodes.pop();
    }

    _getParent(childIndex) {
        const {level, indexLocal} = this._getTreeLevelAndLocalIndex(childIndex);
        const parentIndex = Math.pow(2, level - 1) - 1 + Math.floor(indexLocal / 2);
        return {
            value: this._nodes[parentIndex],
            index: parentIndex
        };
    }

    _getChildren(parentIndex) {
        const {level, indexLocal} = this._getTreeLevelAndLocalIndex(parentIndex);
        const leftChildIndex = Math.pow(2, level + 1) - 1 + indexLocal * 2;
        return {
            left: leftChildIndex < this._nodes.length ? {
                value: this._nodes[leftChildIndex],
                index: leftChildIndex
            } : null,
            right: leftChildIndex + 1 < this._nodes.length ? {
                value: this._nodes[leftChildIndex + 1],
                index: leftChildIndex + 1
            } : null
        };
    }

    _writeValue(value, index) {
        this._nodes[index] = value;
    }

    _getSmallerChild(left, right) {
        let smallerChild = left || right;
        if (left && right) {
            smallerChild = left.value < right.value ? left : right;
        }
        return smallerChild;
    }

    _getTreeLevelAndLocalIndex(nodeIndex) {
        const level = Math.floor(Math.log2(nodeIndex + 1)); // Tree level
        const indexLocal = nodeIndex - Math.pow(2, level) + 1; // 0-based index in its level (from left to right)
        return {
            level,
            indexLocal
        };
    }
}
