import '../css/style.scss';
import { buildTrie, findTypeaheadMatches } from './trie-typeahead';

const trieRoot = buildTrie([
    'cat',
    'call',
    'man',
    'many',
    'manual',
    'solid'
]);

const matches = findTypeaheadMatches(trieRoot, 'c');
for (let match of matches) {
    console.log(match);
}
