let beta1 = 0;
let beta2 = 0;
let gamma1 = 1 / Math.sqrt(1 - beta1 * beta1);
let gamma2 = 1 / Math.sqrt(1 - beta2 * beta2);
const spacing = 45;
let spacing1 = spacing / gamma1;
let spacing2 = spacing / gamma2;

let speedSlider;
let speedSlider2;

let input1;
let input2;
let input3;
let box1;
let box2;

function setup() {
  let cnv = createCanvas(1200, 660);
  cnv.parent("myContainer");
  strokeWeight(0.25);
  stroke(0);
  speedSlider = createSlider(-196, 196, 0);
  speedSlider2 = createSlider(-196, 196, 0);
  speedSlider.position(145, 598);
  speedSlider2.position(145, 638);
  speedSlider.parent("sliderPos");
  speedSlider2.parent("sliderPos2");
  speedSlider.style("width", "130px");
  speedSlider2.style("width", "130px");

  box1 = document.getElementById("box1");
  box2 = document.getElementById("box2");
  box3 = document.getElementById("box3");
  box4 = document.getElementById("box4");

  input1 = createInput("0");
  input1.parent("buttonPos");
  input1.position(80, 597);
  input1.style("width", "30px");

  input2 = createInput("0");
  input2.parent("buttonPos2");
  input2.position(80, 637);
  input2.style("width", "30px");
}

function draw() {
  background(255);

  //borders
  stroke(50);
  line(0, 0, 0, height);
  line(0, height, 0, height);
  line(width, 0, width, height);
  line(width, height, 0, height);

  push();
  translate(width / 2, height - 150);
  scale(1, -1);

  //dotted lines for light cone
  stroke(0, 150, 0);
  strokeWeight(2.5);
  fill(0);
  for (let i = 0; i < height; i = i + 12) {
    line(i, i, i + 7, i + 7);
    line(-i, i, -i - 7, i + 7);
  }

  //black axes
  stroke(0);
  strokeWeight(1);
  line(0, 0, beta1 * height, height);
  line(0, 0, beta1 * height, height);

  //black equitemp lines
  for (let i = 0; i < 2 * height; i = i + spacing1) {
    if (box1.checked == true) {
      strokeWeight(0.6);
      for (let dash = 0; dash < width; dash = dash + 12) {
        line(0 + dash, i + dash * beta1, dash + 6, i + beta1 * (dash + 6));
        line(0 - dash, i - dash * beta1, -dash - 6, i + beta1 * (-dash - 6));
      }
    }
    //black light signals
    if (box3.checked == true) {
      strokeWeight(0.6);
      stroke(0, 100, 0);
      if (beta1 < beta2) {
        line(
          gamma1 * gamma1 * beta1 * i,
          gamma1 * gamma1 * i,
          gamma1 * gamma1 * beta1 * i + gamma1 * gamma1 * (beta2 - beta1) * i,
          gamma1 * gamma1 * i + gamma1 * gamma1 * (beta2 - beta1) * i
        );
      } else {
        line(
          gamma1 * gamma1 * beta1 * i,
          gamma1 * gamma1 * i,
          gamma1 * gamma1 * beta1 * i + gamma1 * gamma1 * (beta2 - beta1) * i,
          gamma1 * gamma1 * i - gamma1 * gamma1 * (beta2 - beta1) * i
        );
      }
    }

    //black clocks
    textSize(16);
    strokeWeight(3);
    stroke(0, 0, 0, 190);
    fill(255);
    ellipse(gamma1 * gamma1 * beta1 * i, gamma1 * gamma1 * i, 25, 25);
    textAlign(CENTER, CENTER);
    fill(0);
    strokeWeight(1);
    stroke(0);

    push();
    translate(gamma1 * gamma1 * beta1 * i, gamma1 * gamma1 * i);
    scale(1, -1);
    text((i / spacing1).toFixed(0), 0, 0);
    pop();
    //ellipse((1/(1-beta1*beta2))*beta2*i, -(1/(1-beta1*beta2))*i, 4, 4);
  }

  //red axes
  stroke(220, 0, 0);
  strokeWeight(1);

  line(0, 0, beta2 * height, height);
  line(0, 0, beta2 * height, height);

  //red equitemps
  for (let i = 0; i < 2 * height; i = i + spacing2) {
    if (box2.checked == true) {
      strokeWeight(0.6);
      for (let dash = 0; dash < width; dash = dash + 12) {
        line(dash, i + dash * beta2, dash + 6, i + beta2 * (dash + 6));
        line(-dash, i - dash * beta2, -dash - 6, i - beta2 * (dash + 6));
      }
    }

    if (box4.checked == true) {
      strokeWeight(0.6);
      stroke(0, 100, 0);
      if (beta1 < beta2) {
        line(
          gamma2 * gamma2 * beta2 * i,
          gamma2 * gamma2 * i,
          gamma2 * gamma2 * beta2 * i - gamma2 * gamma2 * (beta2 - beta1) * i *(1-beta1) * gamma1 * gamma1,
          gamma2 * gamma2 * i + gamma2 * gamma2 * (beta2 - beta1) * i*(1-beta1)*gamma1*gamma1
        );
      } else {
        line(
          gamma2 * gamma2 * beta2 * i,
          gamma2 * gamma2 * i,
          gamma2 * gamma2 * beta2 * i - gamma2 * gamma2 * (beta2 - beta1) * i *(1+beta1) * gamma1 * gamma1,
          gamma2 * gamma2 * i - gamma2 * gamma2 * (beta2 - beta1) * i*(1+beta1)*gamma1*gamma1
        );
      }
    }

    strokeWeight(3);
    stroke(200, 0, 0, 190);
    fill(255);
    ellipse(gamma2 * gamma2 * beta2 * i, gamma2 * gamma2 * i, 25, 25);
    textSize(16);
    strokeWeight(1);
    fill(200, 0, 0, 190);
    textAlign(CENTER, CENTER);

    push();
    translate(gamma2 * gamma2 * beta2 * i, gamma2 * gamma2 * i);
    scale(1, -1);
    text((i / spacing2).toFixed(0), 0, 0);
    pop();
    //red dots on black t axis
    //fill(255,0,0);
    //ellipse((1/(1-beta1*beta2))*beta1*i, -(1/(1-beta1*beta2))*i, 5, 5);
  }
  pop();
  fill(255);

  rect(0, height - 136, width - 3, 136);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Show Lines of\nSimultaneity", 336, 544);
  text("Send Light \nSignals", 445, 544);
  text("0", 206, 583);
  textSize(16);
  text("-0.98c", 142, 583);
  textSize(16);
  text("0.98c", 268, 583);
  strokeWeight(1);
  line(204, 590, 204, 610);
  line(145, 590, 145, 610);
  line(264, 590, 264, 610);

  line(204, 630, 204, 650);
  line(145, 630, 145, 650);
  line(264, 630, 264, 650);

  strokeWeight(0.25);
  text("Velocity:", 40, 605);
  stroke(220, 0, 0);
  fill(220, 0, 0);
  text("Velocity:", 40, 645);
}

function setSpeed1() {
  beta1 = speedSlider.value() / 200;
  gamma1 = 1 / Math.sqrt(1 - beta1 * beta1);
  spacing1 = spacing / gamma1;
  input1.value(beta1);
}

function setSpeed2() {
  beta2 = speedSlider2.value() / 200;
  gamma2 = 1 / Math.sqrt(1 - beta2 * beta2);
  spacing2 = spacing / gamma2;
  input2.value(beta2);
}

function coordsToPix(coord) {
  return {
    x: width / 2 + coord.x * spacing,
    y: height - 150 - coord.y * spacing,
  };
}

function pixToCoords() {}
