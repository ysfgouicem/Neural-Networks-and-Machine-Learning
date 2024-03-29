class Pipe {
    constructor() {
      this.spacing = 100;
      this.top = random(height / 6, (3 / 4) * height);
      this.bottom = height - (this.top + this.spacing);
      this.x = width;
      this.w = 45;
      this.speed = 8;
    }
  
    hits(bird) {
      if (bird.y < this.top || bird.y > height - this.bottom) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          return true;
        }
      }
      return false;
    }
  
    show() {
      fill(255);
      rectMode(CORNER);
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height - this.bottom, this.w, this.bottom);
    }
  
    update() {
      this.x -= this.speed;
    }
  
    offscreen() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  }
  