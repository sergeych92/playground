import '../css/style.scss';
import { MinHeap } from './min-heap';

const minHeap = new MinHeap();

minHeap.add(7);
minHeap.add(5);
minHeap.add(10);
minHeap.add(20);
minHeap.add(17);
minHeap.add(2);
minHeap.add(40);
minHeap.add(1);

minHeap.popMin();

console.log(minHeap.popMin());