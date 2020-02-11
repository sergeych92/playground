export class Debuggable {
    get name() { return this._name; }

    toString() {
        const toKeyValue = obj => Object.entries(obj)
            .map(([key, value]) => typeof value === 'object'
                ? `key: "${key}", value: "${toKeyValue(value)}"`
                : `key: "${key}", value: "${value}"`)
            .join('\n');
        return toKeyValue(this);
    }
}
