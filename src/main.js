import '../css/style.scss';
import { MinStack } from './stack';

const stack = new MinStack();

stack.push(5);
stack.push(7);
stack.push(13);
console.log(`Min: ${stack.min()}, should be 5`);

stack.pop();
stack.push(13);
console.log(`Min: ${stack.min()}, should be 5`);

stack.push(8);
stack.push(3);
console.log(`Min: ${stack.min()}, should be 3`);

stack.pop();
console.log(`Min: ${stack.min()}, should be 5`);
