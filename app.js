let targetString = 'it was the best of times';
let bestString = "";
let secondBestString = "";
let counter = 0;

const generateStrings = (stringLength, nStrings) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz 0123456789';
  let stringArray = [];
  for (let i = 0; i < nStrings; i++) {
    let string = '';
    for (let i = 0; i < stringLength; i++) {
      const index = Math.floor(Math.random() * chars.length);
      string += chars[index];
    }
    stringArray.push({"string": string});
  }
  return stringArray;
}

const calculateScores = (stringArray, targetString) => {
  // Calculate Levenshtein distance and normalise
  let totalDist = 0;
  for (item of stringArray) {
    let dist = levenshtein(item.string, targetString);
    item["distance"] = dist;
    totalDist += dist;
  }
  for (item of stringArray) {
    item["normalisedDist"] = item.distance / totalDist;
  }
  // Sort by normalised distance
  let sortedArray = stringArray.sort((a, b) => {
    return a.normalisedDist - b.normalisedDist;
  })
  return sortedArray;
}

const breedStrings = (a, b, gene_size=1) => {
  // Divide the parent strings into units of `gene_size` letters, and randomly
  // insert one from each parent into the child string
  let child_genome = [];
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
  return child_genome.join("");
}

const mutateString = (string, mutation_probability=0.05) => {
  let newString = "";
  for (letter of string) {
    if (Math.random() < mutation_probability) {
      // Pick a random character
      const chars = 'abcdefghijklmnopqrstuvwxyz 0123456789';
      const index = Math.floor(Math.random() * chars.length);
      letter = chars[index];
    }
    newString += letter;
  }
  return newString;
}

const newStringPopulation = (parent_a, parent_b, n_children=10) => {
  let newStrings = [];
  for (let i = 0; i < n_children; i++) {
    let child = breedStrings(parent_a, parent_b);
    child = mutateString(child);
    newStrings.push({"string": child});
  }
  return newStrings;
}

let strings = generateStrings(targetString.length, 3);
console.log(strings);

while (bestString.string != targetString) {
  strings = calculateScores(strings, targetString);
  bestString = strings[0];
  secondBestString = strings[1];
  if (counter % 10 == 0) {
    console.log(`Iteration ${counter}`);
    console.log(`Best string: ${bestString.string}`)
  }
  strings = newStringPopulation(bestString.string, secondBestString.string);
  counter ++;
}

console.log(`Converged in ${counter} generations:`);
console.log(`Best string: ${bestString.string}`);
console.log(`Second best string: ${secondBestString.string}`);
