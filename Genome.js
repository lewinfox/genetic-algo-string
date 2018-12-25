class Genome {
  constructor(genome_length = null) {
    this.genome = [];
    if (genome_length) {
      const chars = 'abcdefghijklmnopqrstuvwxyz 0123456789';
      for (let i = 0; i < genome_length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        this.genome.push(chars[index]);
      }
    }
  }
}
