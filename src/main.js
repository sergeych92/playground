import '../css/style.scss';
import { HashTableList } from './hash-table-list';

const ht = new HashTableList();
ht.setElement('a', {phone: 123});
ht.setElement('b', {phone: 6});
ht.setElement('bd', {phone: 7});
ht.setElement('bdd', {phone: 19});
ht.setElement('bddd', {phone: 21});
ht.setElement('bdddd', {phone: 23});
ht.setElement('bddddd', {phone: 25});
ht.setElement('bdddddd', {phone: 27});
ht.setElement('bddddddd', {phone: 28});
ht.setElement('bdddddddd', {phone: 29});
ht.setElement('bddddddddd', {phone: 30});
ht.setElement('bdddddddddd', {phone: 31});
ht.setElement('e', {phone: 987});

ht.debug();

// ht.deleteElement('a');
// ht.deleteElement('b');
// ht.deleteElement('e');
// ht.deleteElement('bd');

ht.deleteElement('bd', {phone: 7});
ht.deleteElement('bdd', {phone: 19});
ht.deleteElement('bddd', {phone: 21});
ht.deleteElement('bdddd', {phone: 23});
ht.deleteElement('bddddd', {phone: 25});
ht.deleteElement('bdddddd', {phone: 27});
ht.deleteElement('bddddddd', {phone: 28});
ht.deleteElement('bdddddddd', {phone: 29});
ht.deleteElement('bddddddddd', {phone: 30});
ht.deleteElement('bdddddddddd', {phone: 31});

console.log(`After remove:\n\n`);
ht.debug();

const key = 'e';
const obj = ht.getElement(key);
if (obj) {
    console.log(`key: "${obj.key}", value: "${JSON.stringify(obj.data)}"`);
} else {
    console.log(`No element with key == "${key}"`);
}
