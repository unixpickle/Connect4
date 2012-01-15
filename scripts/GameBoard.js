console.log("GameBoard.js: loaded");

function GameBoard (canvas) {
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.state = new GameState(7, 6);
	this.winner = 0;
}

GameBoard.prototype.handleMouseDown = function (event) {
	if (this.winner != 0) {
		this.winner = 0;
		this.state = new GameState(7, 6);
		this.draw();
		return;
	}
	var widthPerSpace = this.width / this.state.width;
	var spaceNum = Math.floor(event.offsetX / widthPerSpace);
	if (spaceNum >= this.state.width) {
		return;
	}
	if (this.state.addPieceToColumn(spaceNum)) {
		this.state.turn = (this.state.turn == 1 ? 2 : 1);
		this.winner = this.state.checkWinner();
		this.draw();
	}
}

GameBoard.prototype.handleMouseUp = function (event) {
}

GameBoard.prototype.handleMouseMove = function (event) {
}

GameBoard.prototype.draw = function () {
	var context = this.canvas.getContext('2d');

	// draw background gradient
	var bggradient = context.createRadialGradient(this.width / 2,
												  this.height / 2,
												  0, this.width / 2,
												  this.height / 2, 600);
	bggradient.addColorStop(0, '#FFF');
	bggradient.addColorStop(1, '#AAA');

	context.fillStyle = bggradient;
	context.fillRect(0, 0, this.width, this.height);

	var widthPerSpace = this.width / this.state.width;
	var heightPerSpace = this.height / this.state.height;

	// draw separators between squares
	context.strokeStyle = '#000';
	for (var x = 1; x < this.state.width; x++) {
		var xcoord = Math.floor(widthPerSpace * x) + 0.5;
		context.beginPath();
		context.moveTo(xcoord, 0);
		context.lineTo(xcoord, this.height);
		context.stroke();
	}
	for (var y = 1; y < this.state.height; y++) {
		var ycoord = Math.floor(heightPerSpace * y) + 0.5;
		context.beginPath();
		context.moveTo(0, ycoord);
		context.lineTo(this.width, ycoord);
		context.stroke();
	}

	// draw individual pieces
	for (var y = 0; y < this.state.height; y++) {
		for (var x = 0; x < this.state.width; x++) {
			var xcoord = Math.round(x * widthPerSpace);
			var ycoord = Math.round(y * heightPerSpace);
			var kind = this.state.getPiece(x, y);
			var piece = new GamePiece(this, widthPerSpace, heightPerSpace, kind);
			context.save();
			context.translate(xcoord, ycoord);
			piece.draw();
			context.restore();
		}
	}
	
	if (this.winner != 0) {
		context.save();
		var text = 'Red Wins!';
		if (this.winner == 2) text = 'Blue Wins!';
		var dialog = new WinnerDialog(this.canvas, text);
		dialog.draw();
		context.restore();
	}
}

