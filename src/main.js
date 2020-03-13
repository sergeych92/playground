import '../css/style.scss';

function showFloat(mem) {
    const bytes = new Uint8Array(mem);
    let str = '';
    for (let i = bytes.length - 1; i >= 0; i--) {
        str += bytes[i].toString(2).padStart(8, '0');
    }
    console.log(`sign: ${str[0]}`);
    console.log(`power: ${str.substring(1, 9)}`);
    console.log(`fraction: ${str.substring(9)}`);

    const float32 = new Float32Array(mem)[0];
    console.log(`float32: ${float32}`);
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

function convertToFloat32Manually(binaryStr = '1', power = 0, sign = 0) {
    const mem = new ArrayBuffer(4);
    const uint8 = new Uint8Array(mem);

    // set the sign
    uint8[3] |= sign << 7;

    // set the power
    power = Math.min(128, power);
    power = Math.max(-127, power);
    power += 127;
    uint8[3] |= power >>> 1;
    uint8[2] |= (power & 1) << 7;

    const num1 = binaryStr.substring(0, 7); // the first part of the binary number [0, 1, 2]
    if (num1.length) {
        for (let i = 0; i < num1.length; i++) {
            uint8[2] |= +num1[i] << 6 - i;
        }
    }
    
    const num2 = binaryStr.substring(7, 15);
    if (num2.length) {
        for (let i = 0; i < num2.length; i++) {
            uint8[1] |= +num2[i] << 7 - i;
        }
    }
    
    const num3 = binaryStr.substring(15, 23);
    if (num3.length) {
        for (let i = 0; i < num3.length; i++) {
            uint8[0] |= +num3[i] << 7 - i;
        }
    }

    return mem;
}

// float32[0] = binaryToDecimal('1', -140);
// float32[0] = 1.5;
// sign: 0
// power: 00000000
// fraction: 00001000000000000000000


// float32[0] = binaryToDecimal('1.1', -130);
// sign: 0
// power: 00000000
// fraction: 00011000000000000000000

const mem = convertToFloat32Manually('1001010', 128, 0);
showFloat(mem);
// 0.1101 == 0.8125
