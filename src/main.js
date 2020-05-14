import '../css/style.scss';
import {HashTableStringKey} from './hash-table';

const ht = new HashTableStringKey();
ht.setElement('a', {phone: 123});
ht.setElement('b', {phone: 6});
ht.setElement('bd', {phone: 7});
ht.setElement('bdd', {phone: 19});
ht.setElement('bddd', {phone: 21});
ht.setElement('bdddd', {phone: 23});
ht.setElement('bddddd', {phone: 25});
ht.setElement('e', {phone: 987});

ht.debug();

ht.deleteElement('a');
ht.deleteElement('b');
ht.deleteElement('e');
ht.deleteElement('bd');

console.log(`After remove:\n\n`);
ht.debug();

const key = 'bddd';
const obj = ht.getElement(key);
if (obj) {
    console.log(`key: "${obj.key}", value: "${JSON.stringify(obj.data)}"`);
} else {
    console.log(`No element with key == "${key}"`);
}
