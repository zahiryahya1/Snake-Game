function food(scale) {
	this.x = 0;
	this.y = 0;
	this.scl = scale;


	this.spawn = function() {

		// create 'grid' cell
		var cols = floor(width/this.scl);
		var rows = floor(height/this.scl);

		// choose a cell within 0 and n, not including edges
	 	this.x = floor(Math.random()*((cols-1) - 1) + 1) * scl;
	 	this.y =  floor(Math.random()*((rows-1) - 1) + 1) * scl;


		//food.mult(scl);
	}


	this.show = function() {
		// draw food
		fill(255, 0, 100);
		rect(this.x, this.y, this.scl, this.scl);
	}
}