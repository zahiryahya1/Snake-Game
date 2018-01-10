var snake;
var scl = 20;
var food;
var highscore = 0;
var gameState = "init";


function setup() {
	createCanvas(600, 400);
	frameRate(10);
}


function initGame() {
	background(51);
	var name = 'Snake Game';
	textSize(50);
 	fill(255);
  	nameWidht = textWidth(name);
  	text(name, (width - nameWidht)/2, height/2 - 40);
  	startBtn = createButton('Start Game');
  	startBtn.position(width/2 - startBtn.width/2, height/2);
  	startBtn.mousePressed(startGame);
  	snake = new Snake();
  	noLoop();
}


function startGame() {
	removeElements(); // removes the start game menu elements
	gameState = 'play';
	snake.reset();
 	pickLocation();
 	loop();
}


function runGame() {
	background(51);
	
  	textSize(12);
  	fill(255);
  	text("score: " + snake.tail.length, 1+scl, 10+scl);
  	text("highscore: " + highscore, 1+scl, 24+scl);

	snake.update();

	// updates high score
	if (snake.total > highscore) {
		highscore = snake.total;
	}

	snake.show();
	if ( snake.isDead() )
		gameState = "end";	

	if ( snake.eat(food) ) {
		pickLocation();
	}

	// draw food
	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);

	drawBorder();
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


function endGame(){
  background(51);
  textSize(32);
  var msg = 'Game Over';
  var score = 'Your Score is ' + snake.tail.length;
  msgWidht = textWidth(msg);
  scoreWidht = textWidth(score);
  fill(255);
  text(msg, (width - msgWidht)/2, height/2 - 40);
  text(score, (width - scoreWidht)/2, height/2);
  startBtn = createButton('Restart Game');
  startBtn.position(width/2 - startBtn.width/2, height/2 + 40);
  startBtn.mousePressed(startGame);
  noLoop();
}

function draw() {

	if (gameState =='init') {
		initGame();
	}
	else if (gameState == 'play') {
		runGame();
	}
	else if (gameState == 'end') {
		endGame();
	}
}


function keyPressed() {
	if (keyCode === UP_ARROW && snake.direction !== "DOWN") {
		snake.direction = "UP";
		snake.dir(0, -1);
	} else if (keyCode === DOWN_ARROW && snake.direction !== "UP") {
		snake.direction = "DOWN";
		snake.dir(0, 1);
	} else if (keyCode === LEFT_ARROW && snake.direction !== "RIGHT") {
		snake.direction = "LEFT";
		snake.dir(-1, 0);
	} else if (keyCode === RIGHT_ARROW && snake.direction !== "LEFT") {
		snake.direction = "RIGHT";
		snake.dir(1, 0);
	}

	if (keyCode == 82) { // 82 is ascii for 'r' to reset game
		snake.reset();
		pickLocation();
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
