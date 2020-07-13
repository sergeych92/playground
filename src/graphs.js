// Checks for the existence of a path between any two nodes
export function hasPathBetween(nodeA, nodeB) {
    const aVisited = new Set();
    const bVisited = new Set();
    const aNext = [];
    const bNext = [];

    aNext.push(nodeA);
    bNext.push(nodeB);
    while (aNext.length > 0 || bNext.length > 0) {
        if (aNext.length > 0) {
            const a = aNext.shift();
            aVisited.add(a);
            if (bVisited.has(a)) {
                return true;
            }
            aNext.push(
                ...(a.adj || []).filter(v => !aVisited.has(v))
            );
        }
        
        if (bNext.length > 0) {
            const b = bNext.shift();
            bVisited.add(b);
            if (aVisited.has(b)) {
                return true;
            }
            bNext.push(
                ...(b.adj || []).filter(v => !bVisited.has(v))
            );
        }
    }

    return false;
}



// Checks whether a graph contains a loop
export function detectLoop(nodes) {
    let remainingNodes = [...nodes];
    const processedNodes = new Set();

    while (remainingNodes.length) {
        const startNode = remainingNodes.pop();
        const trackedNodes = new Set();
        const hasLoop = detectLoopInSubgraph(startNode, trackedNodes, processedNodes);
        if (hasLoop) {
            return true;
        }
        remainingNodes = remainingNodes.filter(n => !processedNodes.has(n));
    }

    return false;
}

function detectLoopInSubgraph(startNode, trackedNodes, processedNodes) {
    if (trackedNodes.has(startNode)) {
        return true;
    } else {
        trackedNodes.add(startNode);
        processedNodes.add(startNode);
        for (let child of startNode.adj) {
            const hasLoop = detectLoopInSubgraph(child, trackedNodes, processedNodes);
            if (hasLoop) {
                return true;
            }
        }
        trackedNodes.delete(startNode);
        return false;
    }
}



// Build a binary search tree of a minimal height from a sorted array (ascending order)
export class BinaryNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    toString() { return this.value; }
}

export function buildBinarySearchTree(sortedAsc) {
    if (sortedAsc.length) {
        const middleIndex = Math.floor(sortedAsc.length / 2);
        const node = new BinaryNode(sortedAsc[middleIndex]);
        node.left = buildBinarySearchTree(sortedAsc.slice(0, middleIndex));
        node.right = buildBinarySearchTree(sortedAsc.slice(middleIndex + 1));
        return node;
    } else {
        return null;
    }
}



// Create a list of nodes for each level of a binary tree
export function createListOfDepthsDFS(root) {
    const levels = [];
    doCreateListOfDepths(root, 0, levels);
    return levels;
}

function doCreateListOfDepths(node, level, levels) {
    if (!Array.isArray(levels[level])) {
        levels[level] = [];
    }
    levels[level].push(node);
    if (node.left) {
        doCreateListOfDepths(node.left, level + 1, levels);
    }
    if (node.right) {
        doCreateListOfDepths(node.right, level + 1, levels);
    }
}


export function createListOfDepthsBFS(root) {
    const queue = [{
        node: root,
        level: 0
    }];
    const levels = [];
    while (queue.length) {
        const {node, level} = queue.shift();
        if (!Array.isArray(levels[level])) {
            levels[level] = [];
        }
        levels[level].push(node);
        if (node.left) {
            queue.push({
                node: node.left,
                level: level + 1
            });
        }
        if (node.right) {
            queue.push({
                node: node.right,
                level: level + 1
            });
        }
    }
    return levels;
}




// print out a tree
export function printTree(root) {
    doPrintTree(root, 0);
}

const BLOCK_SIZE = 4;
function doPrintTree(node, level, left = null) {
    if (node) {
        const str = ' '.repeat(level * BLOCK_SIZE)
            + (left === true ? 'L' : (left === false ? 'R' : ''))
            + node.value.toString().padStart(BLOCK_SIZE, ' ');
        console.log(str);
        if (node.right) {
            doPrintTree(node.right, level + 1, false);
        }
        if (node.left) {
            doPrintTree(node.left, level + 1, true);
        }
    }
}



// Checks whether or not the tree is balanced;
export function checkTreeIsBalanced(root) {
    if (root.left && root.right) {
        const left = checkTreeIsBalanced(root.left);
        const right = checkTreeIsBalanced(root.right);
        if (left.balanced && right.balanced) {
            if (Math.abs(left.height - right.height) > 1) {
                return {balanced: false};
            } else {
                return {
                    balanced: true,
                    height: Math.max(left.height, right.height) + 1
                };
            }
        } else {
            return {balanced: false};
        }
    } else if (root.left || root.right) {
        const child = checkTreeIsBalanced(root.left || root.right);
        if (child.balanced) {
            return {
                balanced: true,
                height: child.height + 1  
            }
        } else {
            return {balanced: false};
        }
    } else {
        return {
            balanced: true,
            height: 1
        };
    }
}



// Validate that binary tree is a binary search tree
export function validateBinarySearchTree(root) {
    if (root.left || root.right) {
        const subtree = {
            valid: true,
            min: root.value,
            max: root.value
        };
        if (root.left) {
            const left = validateBinarySearchTree(root.left);
            if (left.valid) {
                left.valid = left.valid && left.max <= root.value;
            }
            if (!left.valid) {
                return {valid: false};
            }
            subtree.min = Math.min(subtree.min, left.min);
            subtree.max = Math.max(subtree.max, left.max);
        }
        if (root.right) {
            const right = validateBinarySearchTree(root.right);
            if (right.valid) {
                right.valid = right.valid && right.min >= root.value;
            }
            if (!right.valid) {
                return {valid: false};
            }
            subtree.min = Math.min(subtree.min, right.min);
            subtree.max = Math.max(subtree.max, right.max);
        }
        return subtree;
    } else {
        return {
            min: root.value,
            max: root.value,
            valid: true
        };
    }
}
