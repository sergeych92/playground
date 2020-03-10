import '../css/style.scss';

function showFloat(uint8a) {
    const allButHead = ((1 << 7) - 1);
    const sign = (uint8[3] & (1 << 7)) >> 7;
    console.log(`sign: ${sign ? '-' : '+'}`);

    let powerEncoded = (uint8[3] << 1) | (uint8[2] >>> 7);
    console.log(`power encoded: ${powerEncoded}, number: ${powerEncoded - allButHead}`);

    let fraction = ((uint8[2] & allButHead) << 16) | (uint8[1] << 8) | uint8[0];
    // TODO: calculate the number of leading zeros before, 1.__leading_zeros__1110101...0000
    while (fraction !== 0 && (fraction & 1) === 0) {
        fraction >>>= 1;
    }
    console.log(`fraction: 1.${fraction.toString(2)}`);
}

const mem = new ArrayBuffer(4);
const float32 = new Float32Array(mem);
const uint8 = new Uint8Array(mem);

float32[0] = 1437;
showFloat(uint8);
