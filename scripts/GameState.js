console.log("GameState.js: loaded");

function GameState (width, height) {
	this.width = width;
	this.height = height;
	this.pieces = new Array();
	for (var i = 0; i < width*height; i++) {
		this.pieces[i] = 0;
	}
	this.turn = 1;
}

GameState.prototype.getPiece = function (x, y) {
	return this.pieces[(y * this.width) + x];
}

GameState.prototype.setPiece = function (val, x, y) {
	this.pieces[(y * this.width) + x] = val;
}

GameState.prototype.addPieceToColumn = function (x) {
	for (var y = this.height - 1; y >= 0; y--) {
		if (this.getPiece(x, y) == 0) {
			this.setPiece(this.turn, x, y);
			return true;
		}
	}
	return false;
}

GameState.prototype.checkWinner = function () {
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var piece = this.getPiece(x, y);
			if (piece != 0) {
				if (this.checkGoingDown(x, y)) {
					return piece;
				}
				if (this.checkGoingRight(x, y)) {
					return piece;
				}
				if (this.checkGoingDownRight(x, y)) {
					return piece;
				}
				if (this.checkGoingDownLeft(x, y)) {
					return piece;
				}
			}
		}
	}
	return 0;
}

GameState.prototype.checkGoingDown = function (x, y) {
	if (y + 3 >= this.height) return false;
	var piece = this.getPiece(x, y);
	for (var testY = y + 1; testY < y + 4; testY++) {
		if (this.getPiece(x, testY) != piece) return false;
	}
	return true;
}

GameState.prototype.checkGoingRight = function (x, y) {
	if (x + 3 >= this.width) return false;
	var piece = this.getPiece(x, y);
	for (var testX = x + 1; testX < x + 4; testX++) {
		if (this.getPiece(testX, y) != piece) return false;
	}
	return true;
}

GameState.prototype.checkGoingDownRight = function (x, y) {
	if (x + 3 >= this.width || y + 3 >= this.height) return false;
	var piece = this.getPiece(x, y);
	for (var addInc = 1; addInc < 4; addInc++) {
		if (this.getPiece(x + addInc, y + addInc) != piece) return false;
	}
	return true;
}

GameState.prototype.checkGoingDownLeft = function (x, y) {
	if (x - 3 < 0 || y + 3 >= this.height) return false;
	var piece = this.getPiece(x, y);
	for (var addInc = 1; addInc < 4; addInc++) {
		if (this.getPiece(x - addInc, y + addInc) != piece) return false;
	}
	return true;
}
