import '../css/style.scss';
import {Node, LinkedList, sumListsDirect} from './list-duplicates';

const numA = new LinkedList();
numA.addTail([9, 9, 9]);

const numB = new LinkedList();
// numB.addTail([9, 9]);

const sum = sumListsDirect(numA, numB);
sum.show();