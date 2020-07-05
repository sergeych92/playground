import '../css/style.scss';
import { sortStack, LimitedStack } from './stack';

const stack = new LimitedStack(10);
stack.push(1);
stack.push(1);
stack.push(1);
stack.push(7);
stack.push(2);
stack.push(2);
stack.push(13);
stack.push(5);

sortStack(stack);

stack.debug();