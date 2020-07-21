import '../css/style.scss';
import { BinaryNode, printTree, allTreeSourcePermutations, weiveTwoArrays } from './graphs';

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


const root = new BinaryNode(5);
root.right = new BinaryNode(10, root);
root.right.left = new BinaryNode(7, root.right);
root.right.right = new BinaryNode(12, root.right);
root.left = new BinaryNode(3, root);
// root.left.right = new BinaryNode(4, root.left);


printTree(root);
const permutations = allTreeSourcePermutations(root);
// const permutations = weiveTwoArrays(
//     ['a'],
//     ['x', 'c']
// );
for (let p of permutations) {
    console.log(p.join(', '));
}
