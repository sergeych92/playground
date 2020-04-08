import '../css/style.scss';

function flipEvenAndOddBits(n) {
    const mask = (-1 >>> 0) / 3; // 101010...10 covering all 32 bits
    return ((n & mask) << 1) | ((n & (mask << 1)) >> 1);
}


// 0b1000011100
const n = 0b10001101;
const flipped = flipEvenAndOddBits(n);
console.log(`original: ${n.toString(2).padStart(10, '0')}`);
console.log(`flipped:  ${flipped.toString(2).padStart(10, '0')}`);
