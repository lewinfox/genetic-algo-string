class Population {

  constructor(new_population = null, population_size = null, genome_length = null) {

    if (new_population) {
      this.population = new_population;
    } else {
      this.population = [];
    }

    this.max_fitness = 0;

    if (population_size && genome_length) {
      for (let i = 0; i < population_size; i++) {
        this.population.push(new Genome(null, genome_length)); // New random genome
      }
    }
  }

  calculate_fitness(target) {
    for (let genome of this.population) {
      genome.calculate_fitness(target);
      this.max_fitness = Math.max(genome.fitness, this.max_fitness);
    }
    for (let genome of this.population) {
      genome.calculate_normalised_fitness(this.max_fitness);
    }
  }

  create_breeding_pool(pool_size) {
    let new_population = [];
    while (new_population.length < pool_size) {
      let index = Math.floor(Math.random(this.population.length));
      let selection_factor = Math.random();
      let candidate = this.population[index];
      if (selection_factor < candidate.fitness) {
        new_population.push(this.population[index]);
      }
    }
    return new Population(new_population);
  }

}
