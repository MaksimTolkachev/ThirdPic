let size = 1000;
let seed = fxrand() * 1000000000;
let arrStars = [];
let galaxyArr = [];
let x;
let y;
let centerX;
let centerY;
let stepRadius = 1;
let angle = 0;
let angleDot = 0;
let speed = 0;
let radius = 0;
let index = 1;
let dot;

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
  // img = loadImage('https://cdn.create.vista.com/api/media/small/332026638/stock-photo-sky-covered-stars-night-cool')
  // fxpreview()
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
  t = rez = c = n = 0.008;
  strokeWeight(3);
}

function draw() {
  background(0, 0, 0);
  // image(img, 0, 0, width, height)
  // noStroke()
  // for (let x = 0; x < width; x+=10) {
	// 	for (let y = 0; y < height; y+=10) {
	// 		let c = 40 * noise(0.01 * x, 0.01 * y);
	// 		fill(c, 170, 10);
	// 		rect(x, y, 100, 100);
	// 	}		
  // 	}
  arrStars.forEach((star) => {
    stroke(star.color[0], star.color[1], star.color[2]);
    angle = atan2(star.y - centerY, star.x - centerX);
    if (star.index <= arrStars.length * 0.25) {
      strokeWeight(random(4, 5));
      speed = 3;
      star.x += cos(angle) * speed;
      star.y += sin(angle) * speed;
      point(star.x, star.y);
    } else if (
      arrStars.length * 0.25 < star.index &&
      star.index <= arrStars.length * 0.7
    ) {
      strokeWeight(random(2, 3));
      speed = 1.5;
      star.x += cos(angle) * speed;
      star.y += sin(angle) * speed;
      point(star.x, star.y);
    } else {
      strokeWeight(random(1.5, 2));
      speed = 0.5;
      star.x += cos(angle) * speed;
      star.y += sin(angle) * speed;
      point(star.x, star.y);
    }
    if (star.x > width || star.x < 0 || star.y > height || star.y < 0) {
      star.x = random(30, width - 50);
      star.y = random(30, height - 50);
    }
  });
  galaxyArr.forEach((galaxy) => {
    stroke(galaxy.color[0], galaxy.color[1], galaxy.color[2]);
    strokeWeight(random(1, 3));
    galaxy.dot = noise(galaxy.index % 100.0) * 9 + galaxy.speed / galaxy.radius;
    galaxy.radius += abs(noise(galaxy.index) - 0.2) * stepRadius;
    // galaxy.radius = abs(noise(galaxy.index) - 0.2) * 600;
    galaxy.speed += 1;
    galaxy.x = centerX + cos(galaxy.dot) * galaxy.radius;
    galaxy.y = centerY + (sin(galaxy.dot) * galaxy.radius) / 4.0;
    if (galaxy.index < galaxyArr.length * 0.7) {
      point(galaxy.x, galaxy.y);
    } else {
      newX = galaxy.x + cos(galaxy.radius) * 2;
      newY = galaxy.y + sin(galaxy.radius) * 2;
      line(newX, newY, galaxy.x, galaxy.y);
    }
    if (frameCount > 450) {
      stepRadius = 0;
    }
  });
}
