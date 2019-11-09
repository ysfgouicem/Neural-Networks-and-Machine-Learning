/*
Cities = [(x,y),(x,y),(x,y)] => contains position of the cities
*/
let cities = [];
const totalCities = 20;
const popSize = 60;

let population = [];
/*
fitness score of every population 
*/
let fitness = [];

let recordDistance = Infinity;
let bestEver;
let currentBest;

let statusP;

function setup() {
  statusP = createP('Travel Sales Person Problem').style('font-size', '32pt');
  createCanvas(1300, 550);
  /*
Order = [0,4,1,2,5,3] => contains order of visit of the cities
*/
  let order = [];
  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  for (let i = 0; i < popSize; i++) {
    // shuffle the population using the P5 shuffle function
    population[i] = shuffle(order);
  }
 
}

function draw() {
  background(2);
  // GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();

  stroke(255);
  strokeWeight(5);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();

  translate(0, height / 2);
  stroke(50);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i < currentBest.length; i++) {
    let n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 5, 5);
  }
  endShape();





}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
   

function calcDistance(locations, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let cityAIndex = order[i];
    let cityA = locations[cityAIndex];
    let cityBIndex = order[i + 1];
    let cityB = locations[cityBIndex];
    // Calculating the Euclidean distance using the P5 dist() function
    let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
