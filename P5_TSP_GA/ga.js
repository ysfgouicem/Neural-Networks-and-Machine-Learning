/*
Genetic Algorithm core functions implementations
*/

function calculateFitness() {
  let currentRecord = Infinity;
  for (let i = 0; i < population.length; i++) {
    let d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }
    /*
    making the fitness function exponential 
    the +1 is to avoid the case of distance = 0
    */
    fitness[i] = 1 / (pow(d, 8) + 1);
  }
}

function normalizeFitness() {
  let sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

function nextGeneration() {
  let newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    let orderA = pickOne(population, fitness);
    let orderB = pickOne(population, fitness);
    let order = crossOver(orderA, orderB);
    mutate(order, 0.01);
    newPopulation[i] = order;
  }
  population = newPopulation;

}

/*
Improved Pool Selection function 
*/
function pickOne(list, prob) {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(orderA, orderB) {
  let start = floor(random(orderA.length));
  let end = floor(random(start + 1, orderA.length));
  let neworder = orderA.slice(start, end);
  // let left = totalCities - neworder.length;
  for (let i = 0; i < orderB.length; i++) {
    let city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }
  return neworder;
}
/*
mutation => swapping 2 different cities 
*/
function mutate(order, mutationRate) {
  for (let i = 0; i < totalCities; i++) {
    if (random(1) < mutationRate) {
      let indexA = floor(random(order.length));
      let indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}
