import '../css/style.scss';
import { MultiWayStack } from './stack';

const stack = new MultiWayStack();
stack.push('a', 1);
stack.push('a1', 2);
stack.push('b', 1);
stack.push('b1', 2);

stack.pop(1);
stack.pop(2);

stack.push('b', 1);
stack.push('b1', 2);

console.log(stack.pop(2));
console.log(stack.pop(1));
console.log(stack.pop(2));
console.log(stack.pop(1));
