export class Serializable {
    serialize() {
        return JSON.stringify(this, function (key, value) {
            console.log(`context: "${this}", key: "${key}", value: "${value}"`);
            return value;
        });
    }

    deserialize() {

    }
}
