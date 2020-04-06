
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
