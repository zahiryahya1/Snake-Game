var s;
var scl = 20;
var food;

function setup() {
	createCanvas(600, 400);
	s = new Snake();
	frameRate(10);
	pickLocation();
}


function pickLocation() {

	// create 'grid' cell
	var cols = floor(width/scl);
	var rows = floor(height/scl);

	// choose a cell within 0 and n, not including edges
 	var foodx = floor(Math.random()*((cols-1) - 1) + 1);
 	var foody =  floor(Math.random()*((rows-1) - 1) + 1);


	food = createVector(
		floor(foodx), 
		floor(foody)
	);
	
	food.mult(scl);
}


function draw() {
	background(51);

	drawBorder();

	s.death();
	s.update();
	s.show();

	if ( s.eat(food) ) {
		pickLocation();
	}


	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}


function keyPressed() {
	if (keyCode === UP_ARROW && s.direction !== "DOWN") {
		s.direction = "UP";
		s.dir(0, -1);
	} else if (keyCode === DOWN_ARROW && s.direction !== "UP") {
		s.direction = "DOWN";
		s.dir(0, 1);
	} else if (keyCode === LEFT_ARROW && s.direction !== "RIGHT") {
		s.direction = "LEFT";
		s.dir(-1, 0);
	} else if (keyCode === RIGHT_ARROW && s.direction !== "LEFT") {
		s.direction = "RIGHT";
		s.dir(1, 0);
	}
}

function drawBorder() {
	fill(100, 50, 30);

	for (var i = 0; i < floor(width/scl); i++ ) {
		rect(scl*i, 0, scl, scl);
	}

	for (var i = 0; i < floor(height/scl); i++ ) {
		rect(0, scl*i, scl, scl);
	}

	for (var i = 0; i < floor(width/scl); i++ ) {
		rect(scl*i, height-scl, scl, scl);
	}

	for (var i = 0; i < floor(height/scl); i++ ) {
		rect(width-scl, scl*i, scl, scl);
	}
	
}
