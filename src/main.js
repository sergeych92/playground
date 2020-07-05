import '../css/style.scss';
import { StackOfPlates } from './stack';

const stack = new StackOfPlates();

const numbers = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10,
    11, 12, 13, 14, 15,
    16, 17, 18, 19, 20,
    21, 22, 23, 24, 25
];
for (let n of numbers) {
    stack.push(n);
}

const popAt = (count, position) => {
    for (let i = 1; i <= count; i++) {
        stack.popAt(position);
    }
}

const pop4 = position => popAt(4, position);

popAt(3, 0);
pop4(1);
pop4(2);
stack.debug();

console.log('--------------------------');

stack.packUp();
stack.debug();
