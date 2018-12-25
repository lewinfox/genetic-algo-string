class Genome {

  constructor(genome, mutation_probability = 0.01) {
    this._genome = genome;
    this._mutation_probability = mutation_probability;
    this._string_distance = null;
    this._fitness = null;
    this.mutate();
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

  set genome(genome) {
    this._genome = genome;
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
