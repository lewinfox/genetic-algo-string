const target = 'to be or not to be';

const random_genome = (length) => {
  let result = [];
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ 0123456789';
  for (i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    result.push(chars[index]);
  }
  return result;
}

let genomes = [];
for (let i = 0; i < 100; i++) {
  const new_genome = random_genome(target.length);
  genomes.push(new_genome);
}
let p = new Population(genomes);
let counter = 0;
while (p.best_candidate.genome_as_string !== target) {
  console.log(`Iteration: ${counter} \t ${p.best_candidate.genome_as_string}`);
  p.calculate_fitness(target);
  p.breed();
  counter ++;
}
console.log(`Iteration: ${counter} \t ${p.best_candidate.genome_as_string}`);
