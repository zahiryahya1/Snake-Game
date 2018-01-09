var s;
var scl = 20;
var food;

function setup() {
	createCanvas(600, 600);
	s = new Snake();
	frameRate(10);
	pickLocation();
}


function pickLocation() {
	// create 'grid' cell
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(
		floor(random(cols)), 
		floor(random(rows) 
	));
	food.mult(scl);
}


function draw() {
	background(51);

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
		console.log(s.direction);
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
