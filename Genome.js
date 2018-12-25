class Genome {

  constructor(genome_length, mutation_probability = 0.01) {
    this._genome = [];
    this._mutation_probability = mutation_probability;
    this._string_distance = null;
    this._fitness = null;
    this.initialise_random_genome(genome_length);
    this.mutate();
  }

  initialise_random_genome(genome_length) {
    let new_genome = [];
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ 0123456789';
    for (let i = 0; i < genome_length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      new_genome.push(chars[index]);
    }
    this._genome = new_genome;
  }

  mutate() {
    let new_genome = [];
    for (let letter of this._genome) {
      if (Math.random() < this._mutation_probability) {
        // Pick a random character
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ 0123456789';
        const index = Math.floor(Math.random() * chars.length);
        letter = chars[index];
      }
      new_genome.push(letter);
    }
    this.genome = new_genome;
  }

  get genome_as_string() {
    return this._genome.join('');
  }

  get genome() {
    return this._genome;
  }

  set genome(new_genome) {
    this._genome = new_genome;
  }

  get string_distance() {
    return this._string_distance;
  }

  set string_distance(new_string_distance) {
    this._string_distance = new_string_distance;
  }

  get fitness() {
    return this._fitness;
  }

  set fitness(new_fitness) {
    this._fitness = new_fitness;
  }

}
