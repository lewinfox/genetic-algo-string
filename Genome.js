class Genome {

  constructor(new_genome = null, genome_length = null) {

    this.genome = null;
    this.distance = null;
    this.fitness = null;

    if (new_genome) {
      this.genome = new_genome;
    } else {
      this.genome = [];
    }

    if (genome_length) {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ 0123456789';
      for (let i = 0; i < genome_length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        this.genome.push(chars[index]);
      }
    }
  }

  calculate_fitness(target) {
    let genome_string = this.genome.join('');
    this.distance = levenshtein(genome_string, target);
    this.fitness = Math.abs(target.length - this.distance) / target.length;
  }

  calculate_normalised_fitness(max_fitness) {
    this.fitness = this.fitness / max_fitness;
  }

  breed(parent, gene_size = 1) {
    // Divide the parent strings into units of `gene_size` letters, and randomly
    // insert one from each parent into the child string
    let child_genome = [];
    const a = this.genome.join('');
    const b = parent.genome.join('');
    const regex = new RegExp(`.{1,${gene_size}}`, "g");
    const a_genome = a.match(regex);
    const b_genome = b.match(regex);
    for (i = 0; i < a_genome.length; i++) {
      if (Math.random() < 0.5) {
        child_genome.push(a_genome[i]);
      } else {
        child_genome.push(b_genome[i]);
      }
    }
    return new Genome(child_genome);
  }

  mutate(mutation_probability = 0.001) {
    let new_genome = [];
    for (letter of this.genome) {
      if (Math.random() < mutation_probability) {
        // Pick a random character
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ 0123456789';
        const index = Math.floor(Math.random() * chars.length);
        letter = chars[index];
      }
      new_genome.push(letter);
    }
    this.genome = new_genome;
  }

}
