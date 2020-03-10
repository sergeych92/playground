function roundToDecimals(n, decimals = 0) {
    decimals = Math.round(decimals);
    if (decimals <= 0) {
        return Math.round(n);
    }
    const mult = 10 ** decimals;
    return Math.round(n * mult) / mult;
    // 12.341 = 12.34           -12.341 = -12.34
    // 12.348 = 12.35           -12.348 = -12.35
}

console.log(`Round 12.341 = ${roundToDecimals(12.341, 2)}`);
console.log(`Round 12.345 = ${roundToDecimals(12.345, 2)}`);
console.log(`Round 12.348 = ${roundToDecimals(12.348, 2)}`);

console.log(`Round -12.341 = ${roundToDecimals(-12.341, 2)}`);
console.log(`Round -12.345 = ${roundToDecimals(-12.345, 2)}`);
console.log(`Round -12.348 = ${roundToDecimals(-12.348, 2)}`);