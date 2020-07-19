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
    constructor(value, parent = null) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = parent;
    }

    toString() { return this.value; }
}

export function buildBinarySearchTree(sortedAsc, parent = null) {
    if (sortedAsc.length) {
        const middleIndex = Math.floor(sortedAsc.length / 2);
        const node = new BinaryNode(sortedAsc[middleIndex], parent);
        node.left = buildBinarySearchTree(sortedAsc.slice(0, middleIndex), node);
        node.right = buildBinarySearchTree(sortedAsc.slice(middleIndex + 1), node);
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



// Find a node in a binary search tree
export function findNodeByValue(root, value) {
    if (root) {
        if (root.value === value) {
            return root;
        } else{
            if (value <= root.value) {
                return findNodeByValue(root.left, value);
            } else {
                return findNodeByValue(root.right, value);
            }
        }   
    } else {
        return null;
    }
}




// Find an in-order successor element of the given node in a binary search tree
export function findNodeSuccessor(node) {
    if (!node) {
        return null;
    }
    if (node.right) {
        return findMinElement(node.right);
    } else if (node.parent) {
        // find the first ancestor which is a left child of its parent and return the parent
        return findFirstParentWithLeftChild(node);
    } else {
        return null; // There is no successor
    }
}

function findMinElement(node) {
    if (node.left) {
        return findMinElement(node.left);
    } else {
        return node;
    }
}

function findFirstParentWithLeftChild(node) {
    if (node.parent) {
        if (node.parent.left === node) {
            return node.parent;
        } else {
            return findFirstParentWithLeftChild(node.parent);
        }
    } else {
        return null;
    }
}




// topological sort: reachability matrix + insertion sort
export function topologicalSortReachability(nodes) {
    if (!nodes.length) {
        return [];
    }
    // Build the reachability matrix
    const matrix = new Map();
    let remaining = [...nodes];
    while (remaining.length) {
        buildReachabilityMatrix(remaining.pop(), matrix);
        remaining = remaining.filter(n => !matrix.has(n));
    }

    // insert all of the nodes into a sorted array one by one using the matrix as a guide
    remaining = [...nodes];
    const sorted = [remaining.pop()];
    while (remaining.length) {
        const nextNode = remaining.pop();
        let insertionPoint = null;
        for (let i = 0; i < sorted.length; i++) {
            const sortedCanReach = matrix.get(sorted[i]).has(nextNode);
            const nextNodeCanReach = matrix.get(nextNode).has(sorted[i]);
            if (sortedCanReach) {
                insertionPoint = i;
                break;
            } else if (nextNodeCanReach) {
                insertionPoint = i + 1;
            }
        }
        if (insertionPoint !== null) {
            sorted.splice(insertionPoint, 0,  nextNode);
        } else {
            sorted.unshift(nextNode);
        }
    }

    return sorted;
}

function buildReachabilityMatrix(node, matrix) {
    if (matrix.has(node)) {
        return matrix.get(node);
    } else {
        const reachableSets = (node.adj || []).map(n => buildReachabilityMatrix(n, matrix));
        const reachableCombined = new Set();
        for (let nodeSet of reachableSets) {
            for (let n of nodeSet) {
                reachableCombined.add(n);
            }
        }
        for (let adjNode of (node.adj || [])) {
            reachableCombined.add(adjNode);
        }
        matrix.set(node, reachableCombined);
        return reachableCombined;
    }
}





// Topological sort using reverse depth-first search
export function topologicalSortRevDF(nodes) {
    if (!nodes.length) {
        return [];
    }

    const visited = new Set();
    let remaining = [...nodes];
    const sorted = [];

    while (remaining.length) {
        sorted.push(...topSortVisitAdj(remaining.pop(), visited));
        remaining = remaining.filter(n => !visited.has(n));
    }
    return sorted;
}

function topSortVisitAdj(node, visited) {
    if (visited.has(node)) {
        return [];
    } else {
        visited.add(node);
        if (Array.isArray(node.adj) && node.adj.length) {
            const adjOrdered = node.adj
                .filter(n => !visited.has(n))
                .map(n => topSortVisitAdj(n, visited))
                .flatMap(x => x);
            return [...new Set(adjOrdered), node];   
        } else {
            return [node];
        }
    }
}





// topological sort level by level (like in the green book). No cycles please.
// A -> B means that a compiles first, then B (arrow direction represents compilation order)
export function topologicalSortByLevel(projects, dependencies) {
    if (!projects.length) {
        return [];
    }
    if (!dependencies.length) {
        return projects;
    }

    const incoming = new Map();
    const outgoing = new Map();

    for (let [prev, next] of dependencies) {
        if (incoming.has(next)) {
            incoming.get(next).add(prev);
        } else {
            incoming.set(next, new Set([prev]));
        }

        if (outgoing.has(prev)) {
            outgoing.get(prev).add(next);
        } else {
            outgoing.set(prev, new Set([next]));
        }
    }

    let currentLevel = projects.filter(p => !incoming.has(p));
    let nextLevel = [];
    const sorted = [];
    while (currentLevel.length) {
        sorted.push(...currentLevel);

        nextLevel = currentLevel
            .map(p => outgoing.has(p) ? outgoing.get(p) : [])
            .map(s => [...s])
            .flatMap(p => p);
        nextLevel = [...new Set(nextLevel)];
        
        for (let p of currentLevel) {
            if (outgoing.has(p)) {
                outgoing.delete(p);
            }
        }
        for (let pn of nextLevel) {
            if (incoming.has(pn)) {
                for (let pc of currentLevel) {
                    if (incoming.get(pn).has(pc)) {
                        incoming.get(pn).delete(pc);
                    }
                }
                if (incoming.get(pn).size === 0) {
                    incoming.delete(pn);
                }
            }
        }
        
        currentLevel = nextLevel.filter(p => !incoming.has(p));
    }

    return sorted;
}
