const target = 'round and round the ragged rock';
const population_size = 100;

let p = new Population(population_size, target, 0.01, 1);
// const original_p = JSON.parse(JSON.stringify(p));
// console.log("Original object:");
// console.log(original_p);

let counter = 0;

// Main loop
while (p.best_candidate.genome_as_string !== target && counter < 10000) {
  if (counter % 1000 == 0 || (counter % 10 == 0 && counter < 1000)) {
    console.log(`Iteration: ${counter} \t ${p.best_candidate.genome_as_string}\tMax fitness: ${p._max_fitness}`);
  }
  p.calculate_fitness(target);
  const original_p = JSON.parse(JSON.stringify(p));
  p.breed();
  counter ++;
}
console.log(`Completed on iteration: ${counter} \t ${p.best_candidate.genome_as_string}`);
console.log(p);
