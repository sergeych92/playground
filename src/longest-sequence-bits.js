
function longestOnesSequence(n) {
    if (n === 0) {
        return 1;
    }

    let longestSequence = 1;
    const leftmostZeros = (n & (1 << 31)) === 0;
    let prev = null;
    let next = null;

    while (n) {
        let zerosLen = 0;
        while (!(n & 1)) {
            zerosLen++;
            n >>>= 1;
        }
    
        let onesLen = 0;
        while (n & 1) {
            onesLen++;
            n >>>= 1;
        }

        let newLen = onesLen;
        if (!next) {
            next = {
                zeros: zerosLen,
                ones: onesLen
            };
            newLen += zerosLen ? 1 : (((!n && leftmostZeros) || n) ? 1 : 0);
        } else {
            prev = next;
            next = {
                zeros: zerosLen,
                ones: onesLen
            };
            newLen += 1 + (zerosLen === 1 ? prev.ones : 0);
        }

        if (newLen > longestSequence) {
            longestSequence = newLen;
        }
    }
    
    return longestSequence;
}



// let failed = false;
// for (let [num, length] of [
//     [1775, 8],              // 11011101111
//     [31, 6],                // 11111
//     [62, 6],                // 111110
//     [206, 4],               // 11001110
//     [5871, 8],              // 1011011101111
//     [(2 ** 32) - 1, 32],    // 111...1
//     [31 << 27, 6],          // 1111100..0
// ]) {
//     const actual = longestOnesSequence(num);
//     if (actual !== length) {
//         console.log(`FAILED. Num ${num} expected ${length} but was ${actual}`);
//         failed = true;
//     }
// }

// if (!failed) {
//     console.log('PASSED');
// }



// Draw a line in a screen of bit pixels
function drawLine(bytes, width, x1, x2, y) {
    const row = width * y >> 3;
    const x1b = x1 >> 3;
    const x2b = x2 >> 3;
    for (let i = x1b + 1; i < x2b; i++) {
        bytes[row + i] = 0xFF;
    }
    const left = (1 << (8 - x1 % 8)) - 1;
    const right = ((-1 >>> 0) << (7 - x2 % 8)) & 0xFF;
    if (x1b === x2b) {
        bytes[row + x1b] = left & right;
    } else {
        bytes[row + x1b] = left;
        bytes[row + x2b] = right;
    }
}


const bytes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// drawLine(bytes, 32, 35, 54, 0); // 3 & 22
drawLine(bytes, 32, 3, 15, 1); // 3 & 22
for (let i = 0; i < bytes.length / 4; i++) {
    const toStr = n => n.toString(2).padStart(8, '0');
    console.log(`${toStr(bytes[i*4])}  ${toStr(bytes[i*4 + 1])}  ${toStr(bytes[i*4 + 2])}  ${toStr(bytes[i*4 + 3])}`);
}