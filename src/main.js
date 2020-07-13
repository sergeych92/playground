import '../css/style.scss';
import { printTree, BinaryNode, validateBinarySearchTree } from './graphs';

// const a1 = {adj: []};
// const a2 = {adj: []};
// const a3 = {adj: []};
// const a4 = {adj: []};
// const a5 = {adj: []};
// const a6 = {adj: []};
// const a7 = {adj: []};
// const a8 = {adj: []};

// const nodes = [a1, a2, a3, a4, a5, a6, a7, a8];

// 2 Loops
// a1.adj.push(a2, a5);
// a2.adj.push(a3);
// a3.adj.push(a4);
// a4.adj.push(a2);
// a5.adj.push(a6, a7);
// a6.adj.push(a7);
// a7.adj.push(a5, a8);
// a8.adj.push(a4);

// No loops
// a1.adj.push(a2);
// a2.adj.push(a3, a7);
// a3.adj.push(a4);
// a4.adj.push(a5);
// a5.adj.push(a6);
// a6.adj.push(a1);
// a7.adj.push(a8);
// a8.adj.push(a5);

const subTree = new BinaryNode(30);
subTree.left = new BinaryNode(18);
subTree.right = new BinaryNode(35);

const root = new BinaryNode(20);
root.left = new BinaryNode(10);
root.right = subTree;
root.left.left = new BinaryNode(3);
root.left.right = new BinaryNode(12);

printTree(root);
const result = validateBinarySearchTree(root);
console.log(`Binary search tree`);
console.log(result);
