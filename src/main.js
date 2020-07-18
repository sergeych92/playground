import '../css/style.scss';
import { topologicalSortReachability } from './graphs';

const a = {label: 'a', adj: []};
const b = {label: 'b', adj: []};
const c = {label: 'c', adj: []};
const d = {label: 'd', adj: []};
const e = {label: 'e', adj: []};
const f = {label: 'f', adj: []};
const g = {label: 'g', adj: []};
const h = {label: 'h', adj: []};
const k = {label: 'k', adj: []};
const l = {label: 'l', adj: []};
const m = {label: 'm', adj: []};
const p = {label: 'p', adj: []};
const q = {label: 'q', adj: []};
const n = {label: 'n', adj: []};

const nodes = [n, q, p, m, l, k, d, h, g, f, e, a, b, c];

// No loops
b.adj.push(a, c);
c.adj.push(a);
d.adj.push(e);
g.adj.push(b);
k.adj.push(g);
l.adj.push(g, h);
h.adj.push(c);
m.adj.push(k, l);
p.adj.push(h);
q.adj.push(p, n);
n.adj.push(m, a);


// const root = new BinaryNode(10);
// root.right = new BinaryNode(40, root);
// root.right.right = new BinaryNode(50, root.right);
// root.right.right.left = new BinaryNode(45, root.right.right);
// root.right.right.left.left = new BinaryNode(42, root.right.right.left);

// printTree(root);
// const searchValue = 40;
// const target = findNodeByValue(root, searchValue);
// if (target) {
//     console.log(`Node with the value of ${searchValue} is found.`);
//     const next = findNodeSuccessor(target);
//     console.log(`Node successor is ${next ? next.value : 'none'}`);    
// }

const sorted = topologicalSortReachability(nodes);
console.log(`Sorted: ${sorted.map(n => n.label).join(', ')}`);
