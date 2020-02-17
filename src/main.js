import '../css/style.scss';
import { deepClone } from './deep-clone';

const age = Symbol('age');
const obj = {
    _name: 'Alice Cooper',
    [age]: 39,
    height: 184,
    sex: 'male',
    weight: 78,
    wife: null,
    husband: undefined,
    vegeterian: Boolean(true),
    vegan: false,
    groceries: [
        {name: 'Potatoes', weight: 2},
        {name: 'Sneakers', amount: 12},
        {name: 'Crisps', amount: 2}
    ],
    skills: {
        painting: 7,
        singing: 8,
        math: 2,
        driving: {
            car: 5,
            bike: 10
        }
    },
    get name() { return this._name},
    sayHi() {
        console.log(`Hi, my name is ${this.name}. I'm a ${this.height}cm ${this.sex} who weighs ${this.weight}kg.`);
    }
};
Object.defineProperty(obj, 'deadName', {value: 'Ashley Weed'});

const copy = deepClone(obj);
console.log(copy);
