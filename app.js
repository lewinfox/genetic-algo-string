const target = 'To be or not to be to be';
const population_size = 500;

let p = new Population(population_size, target, 0.005, 1);

let counter = 0;

// Main loop
while (p.best_candidate.genome_as_string !== target && counter < 1000) {
  if (counter % 1000 == 0 || (counter % 10 == 0 && counter < 1000)) {
    console.log(`Iteration: ${counter} \t ${p.best_candidate.genome_as_string}\tMax fitness: ${p._max_fitness}`);
  }
  p.calculate_fitness(target);
  p.breed();
  counter ++;
}
console.log(`Completed on iteration: ${counter} \t ${p.best_candidate.genome_as_string}`);
console.log(p);
