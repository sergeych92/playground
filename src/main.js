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

// for (let i = 0; i <= 10; i++) {
//     const probability = (3 ** i) / (4 ** 10) * countPermutations(10, i);
//     console.log(`select ${i} out of ${10}: ${probability}`);
// }




function computeMaxCapacity(tests, roundsLeft) {
    if (roundsLeft <= 0) {
        return 1;
    } else if (roundsLeft === 1) {
        return tests + 1;
    } else if (roundsLeft === 2) {
        return tests ** 2 + tests + 1;
    } else if (roundsLeft === 3) {
        return tests ** 3 + 2 * tests + 1;
    } else {
        let sum = 0;
        for (let i = 0; i <= roundsLeft - 1; i++) {
            sum += tests * computeMaxCapacity(tests - 1, i);
        }
        return sum + 1;
    }
}

function isBatchPoisonous(bottles, left, right) {
    for (let i = left; i <= right; i++) {
        if (bottles[i]) {
            return true;
        }
    }
    return false;
}

function findPoisonedBottle(bottles, tests, left, right) {
    const bottlesCount = right - left + 1;
    if (bottlesCount <= tests + 1) {
        for (let i = left; i <= right; i++) {
            if (bottles[i]) {
                console.log(`test size: ${tests}`);
                return i;
            }
        }
        console.log(`test size: ${tests}`);
        return right + 1;
    } else {
        let depestLevel = 1;
        while (computeMaxCapacity(tests - 1, depestLevel) * tests < bottlesCount) {
            depestLevel++;
        }
        const nextBatchSize = computeMaxCapacity(tests - 1, depestLevel - 1);

        for (let i = 0; i < tests; i++) {
            const subLeft = left + nextBatchSize * i;
            const subRight = left + nextBatchSize * (i + 1) - 1;
            const found = isBatchPoisonous(bottles, subLeft, subRight);
            if (found) {
                return findPoisonedBottle(bottles, tests - 1, subLeft, subRight);
            }
        }
    
        return findPoisonedBottle(bottles, tests, left + nextBatchSize * tests, right);
    }    
}

const bottles = [...'0'.repeat(1000)].map(c => !!+c);
bottles[132] = true;
const poisonedIndex = findPoisonedBottle(bottles, 10, 0, bottles.length - 1);
console.log(`Spiked drink is in bottle ${poisonedIndex}`);
