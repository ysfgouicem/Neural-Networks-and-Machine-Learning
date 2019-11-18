//representation of agents
let population = [];
// food represented by green dots
let food = [];
// poison represented by red dots
let poison = [];

let nutrition = [0.1, -1];
// Show additional info on DNA
let debug;

function setup() {
  let canvas = createCanvas(1200, 600);
  canvas.parent("canvascontainer");
  debug = select("#debug");

  // Create 20 vehicles
  angleMode(RADIANS);
  for (let i = 0; i < 20; i++) {
    population[i] = new Vehicle(width / 2, height / 2);
  }
  //initial food dots
  for (let i = 0; i < 20; i++) {
    food[i] = createVector(random(width), random(height));
  }
  //initial poison dots
  for (let i = 0; i < 10; i++) {
    poison[i] = createVector(random(width), random(height));
  }
}

// Add new vehicles by dragging mouse
function mouseDragged() {
  population.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(0);

  // 20% chance of new food
  if (random(1) < 0.2) {
    food.push(createVector(random(width), random(height)));
  }

  // 2% chance of new poison
  if (random(1) < 0.02) {
    poison.push(createVector(random(width), random(height)));
  }

  // Go through all vehicles
  for (let i = population.length - 1; i >= 0; i--) {
    let v = population[i];

    v.eat(food, 0);
    v.eat(poison, 1);
    v.boundaries();
    v.update();
    v.display();

    // case where agent is dead
    if (v.dead()) {
      population.splice(i, 1);
    } else {
      // Every vehicle has a chance of cloning itself
      let child = v.birth();
      if (child != null) {
        population.push(child);
      }
    }
  }

  // Draw all the food and all the poison
  for (let i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4);
  }

  for (let i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4);
  }
}
