import '../css/style.scss';
const mem = new ArrayBuffer(4);
const float32 = new Float32Array(mem);
const uint8 = new Uint8Array(mem);

function showFloat(bytes) {
    let str = '';
    for (let i = bytes.length - 1; i >= 0; i--) {
        str += bytes[i].toString(2).padStart(8, '0');
    }
    console.log(`sign: ${str[0]}`);
    console.log(`power: ${str.substring(1, 9)}`);
    console.log(`fraction: ${str.substring(9)}`);
}

float32[0] = 13;
showFloat(uint8);


function binaryToDecimal(main, fraction, power) {
    // Convert fraction to a decimal fraction
    let decimalFrac = 0;
    if (fraction > 0) {
        // Find the position of the highest 1 (leftmost)
        let digitMask = ~1;
        while (fraction !== 0 && (fraction & digitMask) !== 0) {
            digitMask <<= 1;
        }
        digitMask = (~digitMask + 1) >>> 1;

        // Sum the binary digits from left to right multiplied by 0.5
        let sum = 0;
        while (digitMask > 0) {
            const nextDigit = fraction & digitMask;
            sum = 0.5 * (nextDigit + sum);
            digitMask >>>= 1;
        }
        decimalFrac = sum;
    }
    return (main + decimalFrac) * (2 ** power);
}

function convertToFloatManually(num) {

}
