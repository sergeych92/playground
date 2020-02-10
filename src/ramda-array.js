export class RamdaArray extends Array {
    unique() {
        return new RamdaArray(...new Set(this));
    }
}
