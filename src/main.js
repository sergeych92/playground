import '../css/style.scss';
import { Serializable } from './serializable';

class Plane extends Serializable {
    constructor() {
        super();
        this.jetEngines = 4;
        this.fuel = {
            kerosine: 96,
            alcohol: 4,
            left: 83
        };
    }
    fly() {
        console.log('flying');
    }
}

const p = new Plane();
const text = p.serialize();
console.log(`serialized: ${text}`);
