import '../css/style.scss';
import { BinaryNode, printTree } from './graphs';
import { BinaryTree } from './binary-tree';

// const a = {label: 'a', adj: []};
// const b = {label: 'b', adj: []};
// const c = {label: 'c', adj: []};
// const d = {label: 'd', adj: []};
// const e = {label: 'e', adj: []};
// const f = {label: 'f', adj: []};
// const g = {label: 'g', adj: []};
// const h = {label: 'h', adj: []};
// const k = {label: 'k', adj: []};
// const l = {label: 'l', adj: []};
// const m = {label: 'm', adj: []};
// const p = {label: 'p', adj: []};
// const q = {label: 'q', adj: []};
// const n = {label: 'n', adj: []};

// const nodes = [n, q, p, m, l, k, d, h, g, f, e, a, b, c];

// // No loops
// b.adj.push(a, c);
// c.adj.push(a);
// d.adj.push(e);
// g.adj.push(b);
// k.adj.push(g);
// l.adj.push(g, h);
// h.adj.push(c);
// m.adj.push(k, l);
// p.adj.push(h);
// q.adj.push(p, n);
// n.adj.push(m, a);


// const root = new BinaryNode(5);
// root.right = new BinaryNode(3, root);
// root.right.left = new BinaryNode(1, root.right);
// root.right.right = new BinaryNode(12, root.right);
// root.left = new BinaryNode(3, root);
// root.left.left = new BinaryNode(1, root.left);
// root.left.right = new BinaryNode(4, root.left);


// const subtree = new BinaryNode(3);
// subtree.left = new BinaryNode(1, subtree);
// subtree.right = new BinaryNode(4, subtree);



const tree = new BinaryTree();
tree.insert(10);
tree.insert(5);
tree.insert(17);
tree.insert(20);
tree.insert(30);
tree.insert(19);

printTree(tree.root);

tree.delete(30);

printTree(tree.root);

tree.insert(30);

printTree(tree.root);