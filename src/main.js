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

// 101.1101 * 2^3
function binaryToDecimal(numStr, power) {
    const [_, mainStr, fractionStr] = /^([01]+)(?:\.([01]+))?$/.exec(numStr);
    power = Math.floor(power);

    const main = parseInt(mainStr, 2);

    // Convert fraction to a decimal fraction
    let fraction = 0;
    if (fractionStr) {
        let sum = 0;
        let divisor = 1/2;
        for (let i = 0; i < fractionStr.length; i++) {
            sum += +fractionStr[i] * divisor;
            divisor /= 2;
        }
        fraction = sum;
    }
    
    return (main + fraction) * (2 ** power);
}

// float32[0] = binaryToDecimal('0.1', -130);
// sign: 0
// power: 00000000
// fraction: 00001000000000000000000


// float32[0] = binaryToDecimal('1.1', -130);
// sign: 0
// power: 00000000
// fraction: 00011000000000000000000

showFloat(uint8);
// 0.1101 == 0.8125


function convertToFloatManually(num) {

}
