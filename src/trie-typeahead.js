export class TrieNode {
    get hasChildren() {
        return this._children.size > 0;
    }

    constructor(key) {
        this.terminated = false;
        this.key = key;
        this._children = new Map();
    }

    setChild(key) {
        const child = new TrieNode(key);
        this._children.set(key, child);
        return child;
    }

    hasChild(key) {
        return this._children.has(key);
    }

    getChild(key) {
        if (!this._children.has(key)) {
            throw new TypeError('There is no such key');
        }
        return this._children.get(key);
    }

    *[Symbol.iterator]() {
        for (let [key, value] of this._children) {
            yield value;
        }
    }
}

export function buildTrie(words) {
    words = [...words].sort();
    const root = new TrieNode();
    for (let word of words) {
        let currentNode = root;
        for (let char of word) {
            if (currentNode.hasChild(char)) {
                currentNode = currentNode.getChild(char);
            } else {
                currentNode = currentNode.setChild(char);
            }
        }
        currentNode.terminated = true;
    }
    return root;
}

export function findTypeaheadMatches(root, partial) {
    let startNode = root;
    for (let char of partial) {
        if (startNode.hasChild(char)) {
            startNode = startNode.getChild(char);
        } else {
            return []; // There are no matches for the provided partial string
        }
    }

    const withoutLastLetter = partial.substring(0, partial.length - 1);
    return visitChildren(startNode).map(postfix => withoutLastLetter + postfix);
}

function visitChildren(node) {
    if (node.hasChildren) {
        const combinedChars = [];
        if (node.terminated) {
            combinedChars.push([node.key]);
        }
        for (let child of node) {
            combinedChars.push(
                ...visitChildren(child).map(postfix => node.key + postfix)
            );
        }
        return combinedChars;
    } else {
        return node.terminated ? [node.key] : [];
    }
}
