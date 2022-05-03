let size = 1000;
let seed = fxrand() * 1000000000;
let arrStars = [];
let x;
let y;
let angle = 0;
let speed = 5;
let centerX;
let centerY;
let index = 1;


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

function setup() {
  size = size || Math.min(windowWidth, windowHeight);
  createCanvas(size, 600);
  // fxpreview()
  noStroke();
  let a = random(0, 30);
  let b = random(120, 230);
  centerX = random(70,width-50);
  centerY = random(90,height-200);
  strokeWeight(5);
  colorMode(HSB, 255);
  for (let i = 1; i <= 650; i++) {
    let star = new Star(
      random(30, width - 50),
      random(30, height - 50),
      centerX,
      centerY,
      random(0, 3),
      speed,
      [random([a, b]), random(255), random(255)],
      index = i
    );
    arrStars.push(star);
  }
}

function draw() {
    background(0, 0, 0, 30);
  arrStars.forEach((star) => {
    
    stroke(star.color[0], star.color[1], star.color[2]);
    angle = atan2(star.y - centerY, star.x - centerX);
    if (star.index <= 150) {
      strokeWeight(random(3, 5));
      speed = 3.5;
      star.x += cos(angle) * speed;
      star.y += sin(angle) * speed;
      point(star.x, star.y);
    } else if (150 < star.index && star.index <= 300) {
      strokeWeight(random(1, 2));
      speed = 1;
      star.x += cos(angle) * speed;
      star.y += sin(angle) * speed;
      point(star.x, star.y);
    } else {
      strokeWeight(random(1, 2));
      speed = 0.2;
      star.x += cos(angle) * speed;
      star.y += sin(angle) * speed;
      point(star.x, star.y);
    }
    if (star.x > width || star.x < 0 || star.y > height || star.y < 0) {
      star.x = random(30, width - 50);
      star.y = random(30, height - 50);
      stroke(star.color[0], star.color[1], star.color[2]);
    }
  });
beginShape();
fill(180, 140, 40)
let xoff = 0;
for (let x = 0; x <= width; x += 10) {
  noStroke();
  let y = map(noise(xoff), 0, 1, 400, 525);
  vertex(x, y);
  // vertex(x + 100, y + 100);
  xoff += 0.16;
  let ctx = canvas.getContext('2d');
let gradient = ctx.createLinearGradient(x, y - 290, width, height);
gradient.addColorStop(0.1, "#FFFFFF");
gradient.addColorStop(0.6, "#1B0357");
gradient.addColorStop(0.9, "#000000");
ctx.fillStyle = gradient;
}
vertex(width, height);
vertex(0, height);
endShape(CLOSE);
}
