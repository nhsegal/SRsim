
var beta1 = -0.0;
var beta2 = 0;
var gamma1 = 1/Math.sqrt(1 - beta1*beta1);
var gamma2 = 1/Math.sqrt(1 - beta2*beta2);
var spacing = 45;
var spacing1 = spacing/gamma1;
var spacing2 = spacing/gamma2;

var speedSlider;
var speedSlider2;
var speedInput;
var button;

function setup() {
  var cnv = createCanvas(1000, 500);
  cnv.parent("myContainer");
  strokeWeight(.25);
  stroke(0);
  speedSlider = createSlider(-90,90,0);
  speedSlider2 = createSlider(-90,90,0);
  speedSlider.position(100,430);
  speedSlider2.position(100,460);
  //speedSlider.parent("myContainer");
  //speedSlider2.parent("sliderPos2");
  speedSlider.style("width", "200px");

  speedSlider2.style("width", "200px");
  //speedSlider.oninput("setSpeed1()");
  //speedSlider.style("position", "absolute");
  //speedSlider.style("top", "0px");
  //speedSlider.style("left", "0px");

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(150, 65);
  button.mousePressed(function (){
  	speedSlider.value(input.value()*100);
  	setSpeed1();
  });

  console.log(speedSlider);

  speedSlider.oninput = function (){ 
  	console.log("dfa");
  	//input.value(speedSlider.value()*100);
  	//setSpeed1();
  };

  
  
}

function draw() {
  background(255);
  //setSpeed1();
  setSpeed2();

  //borders
  line(0, 0, 0, height);
  line(0, height, 0, height);
  line(width, 0, width, height);
  line(width, height, 0, height);

  push();
  translate(width/2,height);
 

  //dotted lines for light cone
  strokeWeight(1);
  fill(0);
  for (var i=0; i<height; i=i+10) {
  	line(i,-i,i+5,-i-5);
  	line(-i,-i,-i-5,-i-5);
  }

  //black axes
  strokeWeight(1);
  line(0, 0, beta1*height, -height);
  line(0, 0, beta1*height, -height);
  line(0, 0, width, -beta1*width);
  line(0, 0, -width, beta1*width);
  
  //black equitemp lines 
  strokeWeight(.5);
  for (var i=0; i<2*height; i=i+spacing1) {
  	line(0, -i, width, -i-beta1*width);
  	line(0, -i, -width, -i+beta1*width);

 //black clocks 
    strokeWeight(1);
  	fill(255);
  	ellipse(gamma1*gamma1*beta1*i, -gamma1*gamma1*i, 17, 17);
  	textAlign(CENTER,CENTER);
  	text((i/spacing1).toFixed(0), (gamma1*gamma1*beta1*i+1), (-gamma1*gamma1*i+4));
  
  	strokeWeight(.5);
    fill(0);
 	//ellipse((1/(1-beta1*beta2))*beta2*i, -(1/(1-beta1*beta2))*i, 4, 4);

  }
  
  //red equitemps
  stroke(255,0,0);
  for (var i=0; i<2*height; i=i+spacing2) {
  	line(0, -i, width, -i-beta2*width);
  	line(0, -i, -width, -i+beta2*width);
  }

  //red axes
  strokeWeight(1);
  line(0, 0, beta2*height, -height);
  line(0, 0, beta2*height, -height);
  line(0, 0, width, -beta2*width);
  line(0, 0, -width, beta2*width);

  strokeWeight(.25);


 for (var i=0; i<2*height; i=i+spacing2) {
  
  //red dots on black t axis
  	//fill(255,0,0);
  	//ellipse((1/(1-beta1*beta2))*beta1*i, -(1/(1-beta1*beta2))*i, 5, 5);

  //red clocks on red axis
    strokeWeight(1);
  	fill(255);
  	ellipse(gamma2*gamma2*beta2*i, -gamma2*gamma2*i, 17, 17);
  	textAlign(CENTER,CENTER);
  	text((i/spacing2).toFixed(0), (gamma2*gamma2*beta2*i+1), (-gamma2*gamma2*i+4));
  	strokeWeight(.25);
  }

  pop();
  fill(255);
  rect(0,400,300,100);
}

function setSpeed1() {
	beta1 = speedSlider.value()/100;
	gamma1 = 1/Math.sqrt(1 - beta1*beta1);
	spacing1 = spacing/gamma1;
	button.value(beta1);
	input.value(beta1);
}

function setSpeed2() {
	beta2 = speedSlider2.value()/100;
	gamma2 = 1/Math.sqrt(1 - beta2*beta2);
	spacing2 = spacing/gamma2;
}

