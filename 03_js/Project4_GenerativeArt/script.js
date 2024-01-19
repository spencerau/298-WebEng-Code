var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// Set maximum canvas size
var maxSize = 400;

// Get the viewport dimensions
var width = Math.min(window.innerWidth, maxSize);
var height = Math.min(window.innerHeight, maxSize);

// Set size to the smaller of width or height for square drawing
var size = Math.min(width, height);

// Adjust for device pixel ratio
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 2;

var step = 10;
var lines = [];

function randomColor() {
	// generate a random RGB color value by generating 3 numbers between
	// range of 0 - 255
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	// use backticks for a template string in JS
	let colorValue = `rgb(${r} ${g} ${b})`;
	return colorValue;
  }

// Create the lines
for(var i = step; i <= size - step; i += step) {
    
  var line = [];
  for(var j = step; j <= size - step; j+= step) {
    var distanceToCenter = Math.abs(j - size / 2);
    var variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
    var random = Math.random() * variance / 2 * -1;
    var point = {x: j, y: i + random};
    line.push(point);
  } 

  lines.push(line);

}

// Do the drawing
for(var i = 5; i < lines.length; i++) {
	var lineColor = randomColor(); // Generate a random color for each line

	context.beginPath();
	context.moveTo(lines[i][0].x, lines[i][0].y);
	context.strokeStyle = lineColor; // Set the line color

	for(var j = 0; j < lines[i].length - 2; j++) {
		var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
		var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
		context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
	}

	context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
	context.save();
	context.globalCompositeOperation = 'destination-out';
	context.fill();
	context.restore();
	context.stroke();
}
