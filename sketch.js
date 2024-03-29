let beta1 = 0;
let beta2 = 0.6;
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
let box3;
let box4
let modalButton;
let span;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight-30)
  cnv.parent("myContainer");
  strokeWeight(0.25);
  stroke(0);
  speedSlider = createSlider(-196, 196, 0);
  speedSlider2 = createSlider(-196, 196, 120);
  speedSlider.position(145, height -63);
  speedSlider2.position(145, height -23);
  speedSlider.parent("sliderPos");
  speedSlider2.parent("sliderPos2");
  speedSlider.style("width", "130px");
  speedSlider2.style("width", "130px");
  modalButton = createButton("Questions and Answers");
  modalButton.position(width - 168, height - 16);
  modalButton.mousePressed(showModal)

  box1 = createCheckbox("", true);
  box2 = createCheckbox("", false);
  box3 = createCheckbox("", false);
  box4 = createCheckbox("", false);

  box1.position(335, height - 64);
  box2.position(335, height - 22);
  box3.position(442, height - 64);
  box4.position(442,  height - 22);

  input1 = createInput("0");
  input1.parent("buttonPos");
  input1.position(84, height -63);
  input1.style("width", "30px");

  input2 = createInput(".6");
  input2.parent("buttonPos2");
  input2.position(84, height - 23);
  input2.style("width", "30px");
  const modal = document.getElementById('modal');
  span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.classList.remove("my-class");
  }
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
  translate(width / 2, height - 160);
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
    if (box1.checked() == true) {
      strokeWeight(0.6);
      for (let dash = 0; dash < width; dash = dash + 12) {
        line(0 + dash, i + dash * beta1, dash + 6, i + beta1 * (dash + 6));
        line(0 - dash, i - dash * beta1, -dash - 6, i + beta1 * (-dash - 6));
      }
    }
    //black light signals
    if (box3.checked() == true) {
      strokeWeight(0.6);
      stroke(0, 100, 0);
      if (beta1 < beta2) {
        line(
          gamma1 * gamma1 * beta1 * i,
          gamma1 * gamma1 * i,
          gamma1 * gamma1 * beta1 * i +
            gamma1 *
              gamma1 *
              (beta2 - beta1) *
              i *
              (1 + beta2) *
              gamma2 *
              gamma2,
          gamma1 * gamma1 * i +
            gamma1 *
              gamma1 *
              (beta2 - beta1) *
              i *
              (1 + beta2) *
              gamma2 *
              gamma2
        );
      } else {
        line(
          gamma1 * gamma1 * beta1 * i,
          gamma1 * gamma1 * i,
          gamma1 * gamma1 * beta1 * i +
            gamma1 *
              gamma1 *
              (beta2 - beta1) *
              i *
              (1 - beta2) *
              gamma2 *
              gamma2,
          gamma1 * gamma1 * i -
            gamma1 *
              gamma1 *
              (beta2 - beta1) *
              i *
              (1 - beta2) *
              gamma2 *
              gamma2
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
    
  }

  //red axes
  stroke(220, 0, 0);
  strokeWeight(1);

  line(0, 0, beta2 * height, height);
  line(0, 0, beta2 * height, height);

  //red equitemps
  for (let i = 0; i < 2 * height; i = i + spacing2) {
    if (box2.checked() == true) {
      strokeWeight(0.6);
      for (let dash = 0; dash < width; dash = dash + 12) {
        line(dash, i + dash * beta2, dash + 6, i + beta2 * (dash + 6));
        line(-dash, i - dash * beta2, -dash - 6, i - beta2 * (dash + 6));
      }
    }

    if (box4.checked() == true) {
      strokeWeight(0.6);
      stroke(0, 100, 0);
      if (beta1 < beta2) {
        line(
          gamma2 * gamma2 * beta2 * i,
          gamma2 * gamma2 * i,
          gamma2 * gamma2 * beta2 * i -
            gamma2 *
              gamma2 *
              (beta2 - beta1) *
              i *
              (1 - beta1) *
              gamma1 *
              gamma1,
          gamma2 * gamma2 * i +
            gamma2 *
              gamma2 *
              (beta2 - beta1) *
              i *
              (1 - beta1) *
              gamma1 *
              gamma1
        );
      } else {
        line(
          gamma2 * gamma2 * beta2 * i,
          gamma2 * gamma2 * i,
          gamma2 * gamma2 * beta2 * i -
            gamma2 *
              gamma2 *
              (beta2 - beta1) *
              i *
              (1 + beta1) *
              gamma1 *
              gamma1,
          gamma2 * gamma2 * i -
            gamma2 *
              gamma2 *
              (beta2 - beta1) *
              i *
              (1 + beta1) *
              gamma1 *
              gamma1
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

  rect(5, height - 136, width - 5, 136);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Show Lines of\nSimultaneity", 336, height - 115);
  text("Send Light \nSignals", 445, height - 115);
  text("0", 204, height - 78);
  textSize(16);
  text("-0.98c", 144,height - 78);
  textSize(16);
  text("0.98c", 266, height - 78);
  strokeWeight(1);
  line(204, height - 70, 204, height - 52);
  line(145, height - 70, 145, height - 52);
  line(264, height - 70, 264, height - 52);

  line(204, height - 30, 204, height - 12);
  line(145, height - 30, 145, height - 12);
  line(264, height - 30, 264, height - 12);

  strokeWeight(0.25);
  text("Velocity:", 40, height - 55);
  stroke(220, 0, 0);
  fill(220, 0, 0);
  text("Velocity:", 40, height - 15);
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

function showModal(){
  modal.classList.add("my-class");
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight -30);
  speedSlider.position(145, height -63);
  speedSlider2.position(145, height -23);
  modalButton.position(width - 168, height - 16);


  box1.position(335, height - 64);
  box2.position(335, height - 22);
  box3.position(442, height - 64);
  box4.position(442,  height - 22);

 
  input1.position(84, height -63);

  input2.position(84, height - 23);
 

}