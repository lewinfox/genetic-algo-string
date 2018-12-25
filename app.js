const target = 'good morning lord nelson';
const population_size = 200;

let p = new Population(population_size, target);
// const original_p = JSON.parse(JSON.stringify(p));
// console.log("Original object:");
// console.log(original_p);

let counter = 0;

// Main loop
while (p.best_candidate.genome_as_string !== target && counter < 10000) {
  console.log(`Iteration: ${counter} \t ${p.best_candidate.genome_as_string}`);
  p.calculate_fitness(target);
  const original_p = JSON.parse(JSON.stringify(p));
  // console.log(original_p);
  p.breed();
  counter ++;
}
console.log(`Iteration: ${counter} \t ${p.best_candidate.genome_as_string}`);
