var snake;
var food;
var scl = 20;
var food;
var highscore = 0;
var gameState = "init";
var pause = false;


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
  	food = new food(scl);
  	noLoop();
}


function startGame() {
	removeElements(); // removes the start game menu elements
	gameState = 'play';
	snake.reset();
 	food.spawn();
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
	food.show();

	if ( snake.isDead() )
		gameState = "end";	

	if ( snake.eat(food) ) {
		food.spawn()	
	}

	drawBorder();
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
	if (keyCode === 87 && snake.direction !== "DOWN") {
		snake.direction = "UP";
		snake.dir(0, -1);
	} else if (keyCode === 83 && snake.direction !== "UP") {
		snake.direction = "DOWN";
		snake.dir(0, 1);
	} else if (keyCode === 65 && snake.direction !== "RIGHT") {
		snake.direction = "LEFT";
		snake.dir(-1, 0);
	} else if (keyCode === 68 && snake.direction !== "LEFT") {
		snake.direction = "RIGHT";
		snake.dir(1, 0);
	}

	if (keyCode == 82) { // 82 is ascii for 'r' to reset game
		snake.reset();
		food.spawn();
	}

	if (keyCode == 80) { // 80 is ascii for 'p' to puase game
		if (pause == false) {
			pause = true;		
			noLoop();
		}
		else {
			pause = false;
			loop();
		}
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
