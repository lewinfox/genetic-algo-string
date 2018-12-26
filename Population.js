class Population {

  constructor(n_genomes, target, mutation_probability = 0.01, gene_size = 1) {
    this._population = [];
    this._target = target;
    this._mutation_probability = mutation_probability;
    this._gene_size = gene_size;
    this._max_fitness = 0;
    for (let i = 0; i < n_genomes; i++) {
      this._population.push(new Genome(target.length, mutation_probability));
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

  calculate_fitness() {
    // Calculate all fitnesses
    for (let genome of this._population) {
      const str_genome = genome.genome_as_string;
      const string_distance = levenshtein(this._target, str_genome);
      let fitness = Math.max(this._target.length - string_distance, 0);
      this._max_fitness = Math.max(this._max_fitness, fitness);
      genome.fitness = fitness;
    }
    for (let genome of this._population) {
      genome.fitness = genome.fitness / this._max_fitness;
    }
  }

  breed() {

    let pairs = [];
    let children = [];
    let gene_regex = new RegExp(`.{1,${this._gene_size}}`, 'g');

    while (pairs.length < this._population.length) {
      let parents = [];
      while (parents.length < 2) {
        const idx = Math.floor(Math.random() * this.population.length);
        const threshold = Math.random();
        const parent = this._population[idx];
        if (threshold < parent.fitness || threshold < 0.001) {
          parents.push(parent);
        }
      }
      pairs.push(parents);
    }

    for (let pair of pairs) {
      let child = new Genome(target.length, this._mutation_probability);
      let child_genome = [];
      const parent_1 = pair[0];
      const parent_2 = pair[1];
      const genome_1 = parent_1.genome_as_string.match(gene_regex);
      const genome_2 = parent_2.genome_as_string.match(gene_regex);
      for (let i = 0; i < genome_1.length; i++) {
        if (Math.random() < 0.5) {
          child_genome.push(genome_1[i]);
        } else {
          child_genome.push(genome_2[i]);
        }
      }
      child.genome = child_genome.flat();
      child.mutate();
      children.push(child);
    }
    this._population = children;
  }

}
