function WinnerDialog (canvas, title) {
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.title = title;
}

WinnerDialog.prototype.draw = function () {
	var context = this.canvas.getContext('2d');
	context.globalAlpha = 0.5;
	context.fillStyle = '#000';
	context.fillRect(0,0, this.width, this.height);
	context.globalAlpha = 1;
	// create a nice gradient for our dialog box
	var gradient = context.createLinearGradient(0, 0, 0, this.height);
	gradient.addColorStop(0, '#FFF');
	gradient.addColorStop(1, '#000');

	// set the parameters for our dialog box
	var minX = this.width / 2 - 150;
	var minY = this.height / 2 - 60;
	var maxX = minX + 300;
	var maxY = minY + 120;
	var cornerRadius = 10;

	// drawing options
	context.fillStyle = '#222';
	context.strokeStyle = '#FFF';
	context.lineWidth = 2;
	context.shadowColor = 'rgba(0, 0, 0, 1)';
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 20;

	// create a rounded rectangle
	context.beginPath();
	context.moveTo(maxX - cornerRadius, minY);
	context.arcTo(minX, minY, minX, maxY - cornerRadius, cornerRadius);
	context.arcTo(minX, maxY, maxX - cornerRadius, maxY, cornerRadius);
	context.arcTo(maxX, maxY, maxX, minY + cornerRadius, cornerRadius);
	context.arcTo(maxX, minY, minX + cornerRadius, minY, cornerRadius);
	context.closePath();

	context.globalAlpha = 0.9;
	context.fill();
	context.shadowColor = 'rgba(0, 0, 0, 0)';
	context.stroke();
	
	// draw dialog text
	context.fillStyle = '#FFF';
	context.strokeStyle = '#FFF';
	context.textAlign = 'center';
	context.font = 'bold 25px arial,sans-serif';
	context.fillText(this.title, minX + (maxX - minX) / 2, minY + 60);
	context.font = '12px arial,sans-serif';
	context.fillText('Tap to close', minX + (maxX - minX) / 2, minY + 80);
}
