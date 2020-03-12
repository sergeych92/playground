export function showFloat(uint8) {
    const allButHead8 = ((1 << 7) - 1);
    const sign = (uint8[3] & (1 << 7)) >> 7;
    console.log(`sign: ${sign ? '-' : '+'}`);

    let powerEncoded = (uint8[3] << 1) | (uint8[2] >>> 7);
    console.log(`power encoded: ${powerEncoded}, number: ${powerEncoded - allButHead8}`);

    let fraction = ((uint8[2] & allButHead8) << 16) | (uint8[1] << 8) | uint8[0];
    
    // Calculate the number of leading zeros 1.__leading_zeros__1110101...0000
    let leadingZeros = 0;
    fraction <<=  1;
    while (fraction !== 0 && (fraction & (1 << 23)) === 0) {
        fraction <<= 1;
        leadingZeros++;
    }

    // Push trailing zeros out
    while (fraction !== 0 && (fraction & 1) === 0) {
        fraction >>>= 1;
    }

    console.log(`fraction: ${powerEncoded === 0 ? '0' : '1'}.${'0'.repeat(leadingZeros)}${fraction.toString(2)}`);
}
