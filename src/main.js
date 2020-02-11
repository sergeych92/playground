import '../css/style.scss';
import { Serializable } from './serializable';
import { Debuggable } from './debuggable';
import { mixin } from './mixin';

class Vehicle extends mixin(Debuggable, Serializable) {
    constructor() {
        super();
        this._name = 'car';
        this.weight = 1.34;
    }

    move() {
        console.log('Vehicle is moving');
    }
}

const v = new Vehicle();
console.log(`Vehicle: ${v}`);

v.weight = 2.2;
const text = v.serialize();
console.log(`serialized: ${text}`);

const restored = v.deserialize(text);
console.log(`restored: ${restored}`);


// class Plane extends Vehicle {
//     constructor() {
//         super();
//         this.jetEngines = 4;
//         this.fuel = {
//             kerosine: 96,
//             alcohol: 4,
//             left: 83
//         };
//     }

//     move() {
//         console.log('Plane is flying');
//     }
// }

// const p = new Plane();
// const text = p.serialize();
// console.log(`serialized: ${text}`);

// const newPlane = p.deserialize(text);
// console.log(`new Plane: ${newPlane}`);
