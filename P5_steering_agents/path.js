
class Path {

  constructor() {

    // radius: how far is it ok for the boid to wander off
    this.radius = 20;
    // the agent will follow a set of points
    this.points = [];
  }
// add point to the path
  addPoint(x, y) {
    let point = createVector(x, y);
    this.points.push(point);
  }

  display() {
    strokeJoin(ROUND);
    // radius line
    stroke(175);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    // line for direction of path
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}
