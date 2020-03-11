import '../css/style.scss';
import { showFloat } from './floats';

const mem = new ArrayBuffer(4);
const float32 = new Float32Array(mem);
const uint8 = new Uint8Array(mem);

float32[0] = 134567.8125;
showFloat(uint8);
