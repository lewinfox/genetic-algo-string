class Population {

  constructor(genomes) {
    this._population = [];
    for (let x of genomes) {
      this._population.push(new Genome(x));
    }
  }

  get population() {
    return this._population;
  }

  get best_candidate() {
    const sorted_pop = this._population.sort((x, y) => {
      return y.fitness - x.fitness;
    })
    return sorted_pop[0];
  }

  calculate_fitness(target) {
    let max_fitness = 0;
    // Calculate all fitnesses, then normalise
    for (let genome of this._population) {
      const str_genome = genome.genome_as_string;
      const string_distance = levenshtein(target, str_genome);
      genome.string_distance = string_distance;
      genome.fitness = target.length - string_distance;
      max_fitness = Math.max(max_fitness, genome.fitness);
    }
    for (let genome of this._population) {
      genome.fitness = genome.fitness / max_fitness;
    }
  }

  breed(n_children = this._population.length) {

    let pairs = [];
    let children = [];

    while (pairs.length < n_children) {
      let parents = [];
      while (parents.length < 2) {
        const idx = Math.floor(Math.random() * this.population.length);
        const threshold = Math.random();
        const parent = this._population[idx];
        if (threshold < parent.fitness || threshold < 0.01) {
          parents.push(parent);
        }
      }
      pairs.push(parents);
    }

    for (let pair of pairs) {
      let child_genome = [];
      const parent_1 = pair[0];
      const parent_2 = pair[1];
      const genome_1 = parent_1.genome;
      const genome_2 = parent_2.genome;
      for (let i = 0; i < genome_1.length; i++) {
        if (Math.random() < 0.5) {
          child_genome.push(genome_1[i]);
        } else {
          child_genome.push(genome_2[i]);
        }
      }
      children.push(new Genome(child_genome));
    }
    this._population = children;
  }

}
