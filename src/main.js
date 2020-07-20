import '../css/style.scss';
import { findNodeByValue, BinaryNode, printTree, findFirstCommonAncestorViaDFS } from './graphs';

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


const root = new BinaryNode(10);
root.right = new BinaryNode(40, root);
root.right.right = new BinaryNode(50, root.right);

root.right.right.left = new BinaryNode(45, root.right.right);
root.right.right.left.left = new BinaryNode(42, root.right.right.left);

root.right.right.right = new BinaryNode(60, root.right.right);

printTree(root);
const one = findNodeByValue(root, 60);
const another = findNodeByValue(root, 42);
if (one && another) {
    console.log(`Both nodes are found.`);
    const ancestor = findFirstCommonAncestorViaDFS(root, one, another);
    console.log(`First ancestor is ${ancestor ? ancestor.value : 'none'}`);
}
