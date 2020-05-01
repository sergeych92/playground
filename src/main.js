import '../css/style.scss';


function sum4Formula(n) {
    const sum = (6 * n ** 5 + 15 * n ** 4 + 10 * n ** 3 - n) / 30;
    console.log(`sum of 1 to ${n} is ${sum}`);
}

function sum4(n) {
    let s = 0;
    for (let x = 1; x <= n; x++) {
        s += x ** 4;
    }
    console.log(`sum of 1 to ${n} is: ${s}`);
}

function sumXSquared(a) {
    const n = 1000;
    const dx = a / n;
    let s = 0;
    for (let i = 1; i <= n; i++) {
        s += dx * (dx * i) ** 2;
    }
    console.log(`sum is ${s}`);
}

function max(a, b, c) {
    if (b * b <= 3 * a * c) {
        console.log('No roots');
    }
    const v = -b / (3 * a) - Math.sqrt(b * b - 3 * a * c) / (6 * a * a);
    console.log(`max is ${v}`);
}

function max2(a, b, c) {
    if (b * b <= 3 * a * c) {
        console.log('No roots');
    }
    const v = -b / (3 * a) + Math.sqrt(b * b - 3 * a * c) / (6 * a * a);
    console.log(`max is ${v}`);
}



function modelBirths(families) {
    let girls = 0;
    let boys = 0;
    while (families > 0) {
        let subtract = 0;
        for (let i = 1; i <= families; i++) {
            if (Math.random() >= 0.5) { // baby girl
                girls++;
                subtract++;
            } else {
                boys++;
            }
        }
        families -= subtract;
    }
    const childrenTotal = girls + boys;
    console.log(`children born: ${childrenTotal},
        boys: ${(boys/childrenTotal).toFixed(2)},
        girls: ${(girls/childrenTotal).toFixed(2)}`);
}


function countPermutations(total, selected) {
    if (selected === 0) {
        return 1;
    } else if (selected === 1) {
        return total;
    } else {
        let sum = 0;
        for (let i = selected - 1; i <= total - 1; i++) {
            sum += countPermutations(i, selected - 1);
        }
        return sum;
    }
}

for (let i = 0; i <= 10; i++) {
    const probability = (3 ** i) / (4 ** 10) * countPermutations(10, i);
    console.log(`select ${i} out of ${10}: ${probability}`);
}