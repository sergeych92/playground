import '../css/style.scss';
import { AnimalShelter, ANIMAL_TYPES } from './stack';

const shelter = new AnimalShelter();
shelter.enqueue('Barrry', ANIMAL_TYPES.DOG);
shelter.enqueue('Effy', ANIMAL_TYPES.DOG);

shelter.enqueue('Tail', ANIMAL_TYPES.CAT);
shelter.enqueue('Whiskers', ANIMAL_TYPES.CAT);
shelter.enqueue('Paws', ANIMAL_TYPES.CAT);


console.log(shelter.dequeueCat());
console.log(shelter.dequeueCat());