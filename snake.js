function Snake() {
	this.x = 40;
	this.y = 40;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];
	this.direction = "RIGHT";


	this.dir = function(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}


	this.eat = function(pos) {
		var d = dist(this.x, this.y, pos.x, pos.y);
		if ( d < 1) {
			this.total++;
			return true;
		} else {
			return false;
		}
	}


	this.death = function() {
		// if the head ever intersects the body, game over
		for ( var i = 0; i < this.tail.length; i++) {
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			
			if (d < 1) {
				console.log("start over");
				this.total = 0;
				this.tail = [];
			}
		}
	}


	this.update = function() {
		// add to the tail if a food is eaten,
		// basically when total 
		if ( this.total === this.tail.length) {
			for (var i = 0; i < this.tail.length - 1; i++) {
				this.tail[i] = this.tail[i+1];
			}
		}
		this.tail[this.total - 1] = createVector(this.x, this.y);


		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		// keeps snake within canvas
		this.x = constrain(this.x, scl, width-scl-scl);
		this.y = constrain(this.y, scl, height-scl-scl);
	}


	this.show = function() {
		fill(255);
		
		for(var i = 0; i < this.total; i++) {
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}

		rect(this.x, this.y, scl, scl);
	}
}