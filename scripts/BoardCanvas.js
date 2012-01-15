console.log("BoardCanvas.js: loaded");

var _board = null;

/**
 * Called when the user mouse-downs the canvas.
 */
function boardMouseDown (event) {
	_board.handleMouseDown(event);
}

/**
 * Called when the user drags their mouse on the canvas.
 */
function boardMouseMove (event) {
	_board.handleMouseMove(event);
}

/**
 * Called when the user lifts their mouse from the canvas.
 */
function boardMouseUp (event) {
	_board.handleMouseUp(event);
}

/**
 * Links up board events
 */
function configureCanvas () {
	var canvas = getGameCanvas();
	canvas.addEventListener('mousedown', boardMouseDown, false);
	canvas.addEventListener('mousemove', boardMouseMove, false);
	canvas.addEventListener('mouseup', boardMouseUp, false);
}

/**
 * Returns the canvas element object.
 */
function getGameCanvas () {
	return document.getElementById('boardcanvas');
}
