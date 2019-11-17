// The data we are loading
let training;

// What is the learning rate
// This could change over time!
let lrSlider;

// Values of b and m for linear regression
// y = mx + b (formula for a line)
let b = 0;
let m = 0;

// Current number of iterations through data
let iterations = 0;
// How many iterations should we do total
let totalIterations = 10;
// Which sample are we on
let index = 0;


// A function to calculate the "loss"
// Formula for doing this is "sum of squared errors"
function calculateError() {
  // Start sum at 0
  let sum = 0;
  // For each sample
  for (let i = 0; i < training.length; i++) {
    // This is the guess based on the line
    let guess = m * training[i].x + b;
    // The error is the guess minus the actual temperature
    let error = guess - training[i].y;
    // Add up the error squared
    sum += error * error;
  }

  // Divide by total data points to average
  let avg = sum / training.length;
  return avg;
}

function setup() {
  let canvas = createCanvas(700, 600)
  canvas.parent('#canvascontainer');
  canvas.mousePressed(addPoints);
  lrSlider = select('#lrslider');

  // Data will be entered by user clicking
  training = [];
}

function addPoints() {
  // Add a data point
  training.push(createVector(mouseX / width, mouseY / height));
}

function draw() {
  let learning_rate = lrSlider.value();
  select('#lr').html(learning_rate);
  background(200);

  // Calculate the overall error
  let error = calculateError();

  // Draw everything
  drawPoints();
  drawLine();

  // Do an entire run through all the data
  let deltaB = 0;
  let deltaM = 0;
  for (let i = 0; i < training.length; i++) {
    let x = training[i].x;
    let y = training[i].y;
    let yguess = m * x + b;
    let error = y - yguess;
    deltaB += (2 / training.length) * error;
    deltaM += (2 / training.length) * x * error;
  }
  b += (deltaB * learning_rate);
  m += (deltaM * learning_rate);

}

// Draw the current line
function drawLine() {
  // Draw a line between any two points (use min and max x)
  let x1 = 0;
  let y1 = m * x1 + b;
  let x2 = 1;
  let y2 = m * x2 + b;
  line(x1 * width, y1 * height, x2 * width, y2 * height);
}

// Plot all the training data
function drawPoints() {
  stroke(0);
  fill(0);
  for (let i = 0; i < training.length; i++) {
    ellipse(training[i].x * width, training[i].y * height, 4, 4);
  }
}