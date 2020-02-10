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
    toString() {
        const toKeyValue = obj => Object.entries(obj)
            .map(([key, value]) => typeof value === 'object'
                ? `key: "${key}", value: "${toKeyValue(value)}"`
                : `key: "${key}", value: "${value}"`)
            .join('\n');
        return toKeyValue(this);
    }
}

const p = new Plane();
const text = p.serialize();
console.log(`serialized: ${text}`);

const newPlane = p.deserialize(text);
console.log(`new Plane: ${newPlane}`);
