import '../css/style.scss';

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