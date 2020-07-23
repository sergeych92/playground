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

// const sorted = topologicalSortByLevel(
//     ['f', 'c', 'b', 'a', 'e', 'd', 'g'],
//     [['f', 'c'], ['f', 'b'], ['f', 'a'], ['c', 'a'], ['b', 'a'], ['a', 'e'], ['b', 'e'], ['d', 'g']]
// );
// console.log(`Sorted: ${sorted.join(', ')}`);

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






// Find the first common ancestor of two nodes in a binary tree using parent links
export function findFirstCommonAncestorViaParent(nodeA, nodeB) {
    if (nodeA === nodeB) {
        return nodeA.parent ? nodeA.parent : null;
    }

    const nodeAOriginal = nodeA;
    const nodeBOriginal = nodeB;

    let nodeADepth = findNodeDepth(nodeA);
    let nodeBDepth = findNodeDepth(nodeB);

    // Make the deeper node go up the hierarchy until it levels with the other node 
    if (nodeADepth !== nodeBDepth) {
        let depthDiff = Math.abs(nodeADepth - nodeBDepth);
        if (nodeADepth > nodeBDepth) {
            while (depthDiff-- > 0) {
                nodeA = nodeA.parent;
            }
        } else {
            while (depthDiff-- > 0) {
                nodeB = nodeB.parent;
            }
        }
    }

    // Go up the hierarchy one step at a time until both are the same node
    while (nodeA !== nodeB) {
        nodeA = nodeA.parent;
        nodeB = nodeB.parent;
    }

    if (nodeA === nodeAOriginal || nodeA === nodeBOriginal) {
        return nodeA.parent ? nodeA.parent : null;
    } else {
        return nodeA;
    }
}

function findNodeDepth(node) {
    let count = 0;
    while (node.parent) {
        count++;
        node = node.parent;
    }
    return count;
}



// Find the first common ancestor of two nodes in a binary tree using depth-first search
export function findFirstCommonAncestorViaDFS(root, nodeA, nodeB) {
    const ancestorCont = {node: null};
    containsNodesDFS(root, [nodeA, nodeB], ancestorCont);
    return ancestorCont.node;
}

function containsNodesDFS(root, nodes, ancestorCont) {
    if (ancestorCont.node) {
        return 2;
    }

    let left = 0;
    if (root.left) {
        left = containsNodesDFS(root.left, nodes, ancestorCont);
        if (left === 2) {
            if (!ancestorCont.node) {
                ancestorCont.node = root;
            }
            return left;
        }
    }

    let right = 0;
    if (root.right) {
        right = containsNodesDFS(root.right, nodes, ancestorCont);
        if (right === 2) {
            if (!ancestorCont.node) {
                ancestorCont.node = root;
            }
            return right;
        }
    }

    if (left + right === 2) {
        ancestorCont.node = root;
        return 2;
    } else {
        const rootMatch = nodes.indexOf(root) > -1 ? 1 : 0;
        return left + right + rootMatch;
    }
}




// Print all possible arrays that could have lead to the creation of the given
// binary search tree if the elements were inserted from left to right.
export function allTreeSourcePermutations(root) {
    if (!root) return [];

    const left = allTreeSourcePermutations(root.left);
    const right = allTreeSourcePermutations(root.right);

    const results = [];
    if (left.length && right.length) {
        for (let leftPerm of left) {
            for (let rightPerm of right) {
                results.push(
                    ...weiveTwoArrays(leftPerm, rightPerm).map(perm => [root.value, ...perm])
                );
            }
        }
    } else {
        if (left.length || right.length) {
            const childPerms = left.length ? left : right;
            results.push(
                ...childPerms.map(perm => [root.value, ...perm])
            );
        } else {
            results.push([root.value]);
        }
    }
    

    return results;
}




// Compute all possible choices of poping items from two stacks into an array.
export function weiveTwoArrays(a, b) {
    if (!a.length || !b.length) {
        return [
            [...a, ...b]
        ];
    } else if (a.length === 1 && b.length === 1) {
        return [
            [...a, ...b],
            [...b, ...a]
        ];
    } else {
        const aLastIndex = a.length - 1;
        const bLastIndex = b.length - 1;
        return [
            ...weiveTwoArrays(a.slice(0, aLastIndex), b).map(perm => [...perm, a[aLastIndex]]),
            ...weiveTwoArrays(a, b.slice(0, bLastIndex)).map(perm => [...perm, b[bLastIndex]])
        ];
    }
}






// Check if a tree is a subtree of another tree
export function checkSubtree(tree, subtree) {
    if (!tree || !subtree) {
        return false;
    }

    const execution = {match: false};
    const subtreeSize = calcTreeSize(subtree, null, execution);
    calcTreeSize(tree, (subRoot, size) => {
        if (size.depth === subtreeSize.depth && size.size === subtreeSize.size) {
            return !compareTwoTrees(subRoot, subtree);
        } else {
            return true;
        }
    }, execution);
    return execution.match;
}

function calcTreeSize(root, onNextSubtree, execution) {
    const emptySize = {depth: 0, size: 0}; 
    if (!root || execution.match) {
        return emptySize;
    }

    const left = calcTreeSize(root.left, onNextSubtree, execution);
    if (execution.match) {
        return emptySize;
    }
    const right = calcTreeSize(root.right, onNextSubtree, execution);
    if (execution.match) {
        return emptySize;
    }
    
    let size = null;
    if (left.depth || right.depth) {
        size = {
            depth: Math.max(left.depth, right.depth) + 1,
            size: left.size + right.size + 1
        };
    } else {
        size = {
            depth: 1,
            size: 1
        };
    }

    if (onNextSubtree) {
        if (!onNextSubtree(root, size)) {
            // stop the execution because whatever was being search has been found.
            execution.match = true;
        }
    }

    return size;
}

function compareTwoTrees(rootA, rootB) {
    if (rootA && rootB) {
        if (rootA.value === rootB.value) {
            return compareTwoTrees(rootA.left, rootB.left)
                && compareTwoTrees(rootA.right, rootB.right);             
        } else {
            return false;
        }
    } else {
        return !rootA && !rootB;
    }
}
