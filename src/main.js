import '../css/style.scss';
import { hasPathBetween } from './graphs';

const a1 = {adj: []};
const a2 = {adj: []};
const a3 = {adj: []};
const a4 = {adj: []};
const a5 = {adj: []};
const a6 = {adj: []};
const a7 = {adj: []};
const a8 = {adj: []};

a1.adj.push(a2, a5);
a2.adj.push(a3);
a3.adj.push(a4);
a4.adj.push(a2);
a5.adj.push(a6, a7);
a6.adj.push(a7);
a7.adj.push(a5, a8);
a8.adj.push(a4);

const r = hasPathBetween(a3, a8);
console.log(`Has path: ${r}`);
