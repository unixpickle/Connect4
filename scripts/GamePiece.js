function GamePiece (board, width, height, kind) {
	this.board = board;
	this.width = width;
	this.height = height;
	this.kind = kind;
}

GamePiece.prototype.draw = function () {
	if (this.kind == 0) return;
	var canvas = this.board.canvas;
	var context = canvas.getContext('2d');
	var xoff = 0;
	var yoff = 0;
	var drawSize = 0;
	if (this.width > this.height) {
		xoff = (this.width - this.height) / 2;
		yoff = 3;
		drawSize = this.height - 4;
	} else {
		yoff = (this.height - this.width) / 2;
		xoff = 2;
		drawSize = this.width - 4;
	}
	if (this.kind == 1) {
		context.fillStyle = "#F00";
	} else {
		context.fillStyle = "#00F";
	}
	context.beginPath();
	context.arc(drawSize / 2 + xoff, drawSize / 2 + yoff, drawSize/ 2, 0, 2*3.141593, false);
	context.closePath();
	context.fill();
}
