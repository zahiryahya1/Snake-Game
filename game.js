var s;
var scl = 20;

function setup() {
	createCanvas(600, 600);
	s = new Snake();
	frameRate(10);
}

function draw() {
	background(51);
	s.update();
	s.show();

}