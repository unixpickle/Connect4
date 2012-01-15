console.log("GameEngine.js: loaded");

function configureGame () {
	configureCanvas();
	_board = new GameBoard(getGameCanvas());
	_board.draw();
}
