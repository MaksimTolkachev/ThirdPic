let size = 1000;
let seed = fxrand() * 1000000000;
let arrStars = [];
let galaxyArr = [];
let x;
let y;
let centerX;
let centerY;
let currentX;
let currentY;
let stepRadius = 2.5;
let angle = 0;
let angleDot = 0;
let speed = 10;
let radius = 0;
let index = 1;
let dot;
let maxRadius = 0;

function preload() {
  randomSeed(seed);
  noiseSeed(seed);
}

function Star(x, y, centerX, centerY, angle, speed, color, index) {
  this.x = x;
  this.y = y;
  this.centerX = centerX;
  this.centerY = centerY;
  this.angle = angle;
  this.speed = speed;
  this.color = color;
  this.isStable = random([true, false]);
  this.index = index;
}

function GalaxyDot(x, y, centerX, centerY, speed, radius, stepRadius, dot, color, index) {
  this.x = x;
  this.y = y;
  this.centerX = centerX;
  this.centerY = centerY;
  this.speed = speed;
  this.radius = radius;
  this.dot = dot;
  this.color = color;
  this.index = index;
  this.counter = random([true, false]);
  this.stepRadius = stepRadius;
}

function setup() {
  size = size || Math.min(windowWidth, windowHeight);
  createCanvas(size, size);
  fxpreview()
  noStroke();
  let a = random(0, 30);
  let b = random(120, 230);
  centerX = random(170, width - 200);
  centerY = random(170, height - 200);
  strokeWeight(5);
  colorMode(HSB, 255);
  for (let i = 1; i <= 600; i++) {
    let star = new Star(
      random(30, width - 50),
      random(30, height - 50),
      centerX,
      centerY,
      random(0, 3),
      speed,
      [random([a, b]), random(255), random(255)],
      (index = i)
    );
    arrStars.push(star);
  }
  for (i = 0; i < 1900; i++) {
    let galaxy = new GalaxyDot(
      random(30, width - 50),
      random(30, height - 50),
      centerX,
      centerY,
      speed,
      radius,
      stepRadius,
      dot,
      [random([a, b]), random(255), random(255)],
      (index = i)
    );
    galaxyArr.push(galaxy);
  }
}

function draw() {
  background(0, 0, 0);
  arrStars.forEach((star) => {
    stroke(star.color[0], star.color[1], star.color[2]);
    star.angle = atan2(star.y - centerY, star.x - centerX);
    currentX = star.x;
    currentY = star.y;
    if (star.index <= arrStars.length * 0.25) {
      strokeWeight(random(4, 5));
      star.speed = 3;
      star.x += cos(star.angle) * star.speed;
      star.y += sin(star.angle) * star.speed;
      point(star.x, star.y);
    } else if (
      arrStars.length * 0.25 < star.index &&
      star.index <= arrStars.length * 0.7
    ) {
      strokeWeight(random(2, 3));
      star.speed = 1.5;
      star.x += cos(star.angle) * star.speed;
      star.y += sin(star.angle) * star.speed;
      point(star.x, star.y);
    } else {
      strokeWeight(random(1.5, 2));
      star.speed = 0.5;
      star.x += cos(star.angle) * star.speed;
      star.y += sin(star.angle) * star.speed;
      point(star.x, star.y);
    }
    if (star.x > width || star.x < 0 || star.y > height || star.y < 0) {
      star.x = random(30, width - 50);
      star.y = random(30, height - 50);
    }
    if (frameCount > 200) {
      star.x = currentX;
      star.y = currentY;
    }
  });
  galaxyArr.forEach((galaxy) => {
    stroke(galaxy.color[0], galaxy.color[1], galaxy.color[2]);
    strokeWeight(random(1, 3));

    galaxy.radius += abs(noise(galaxy.index) - 0.2) * stepRadius;

    if (galaxy.radius > maxRadius) {
      maxRadius = galaxy.radius;
    }
    galaxy.speed += 0.005;

    galaxy.dot =
      noise(galaxy.index % 100.0) * 9 +
      galaxy.speed / (galaxy.radius / maxRadius);

    galaxy.x = centerX + cos(galaxy.dot) * galaxy.radius;
    galaxy.y = centerY + (sin(galaxy.dot) * galaxy.radius) / 4.0;
    if (galaxy.index < galaxyArr.length * 0.7) {
      point(galaxy.x, galaxy.y);
    } else {
      newX = galaxy.x + cos(galaxy.radius) * 2;
      newY = galaxy.y + sin(galaxy.radius) * 2;
      line(newX, newY, galaxy.x, galaxy.y);
    }
    if (frameCount > 200) {
      stepRadius = 0;
    }
  });
}
