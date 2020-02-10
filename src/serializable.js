export class SerializeError extends Error {
    constructor(msg, err) {
        super(msg);
        if (err) {
            this.innerError = err;
        }
    }
}

export class Serializable {
    serialize() {
        if (typeof this.constructor !== 'function') {
            throw new SerializeError('Object is missing a constructor function.');
        }
        const typed = {
            ...this,
            classType: this.constructor.name
        };
        try {
            return JSON.stringify(typed);
        } catch (err) {
            throw new SerializeError('Could not serialize the object', err);
        }
    }

    deserialize(text) {
        if (typeof this.constructor !== 'function') {
            throw new SerializeError('Object is missing a constructor function.');
        }
        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch (err) {
            throw new SerializeError('Could not reconstruct the object from its serialized state.', err);
        }
        if (typeof parsed.classType !== 'string') {
            throw new SerializeError('The serialized state is missing a class type name.');
        }
        if (parsed.classType !== this.constructor.name) {
            throw new SerializeError('The serialized state must be deserialized by the same class type.');
        }
        delete parsed.classType;
        const newObj = new this.constructor();
        for (let key of Object.keys(parsed)) {
            newObj[key] = parsed[key];
        }
        return newObj;
    }
}
