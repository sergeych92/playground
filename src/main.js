import '../css/style.scss';
import { RamdaArray } from './ramda-array';

const arr = new RamdaArray(1, 2, 3, 3, 4, 5, 6, 6, 6);
console.log(arr);

const unique = arr.unique();
console.log(unique);

const filtered = unique.filter(x => x % 2 === 0);
console.log(filtered);
