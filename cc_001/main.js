
// DEFINITIONS
var canvas = document.getElementById('mainCanvas');
var app = {
  canvas: canvas,
  context: canvas.getContext('2d'),
  canvasWidth: canvas.width,
  canvasHeight: canvas.height,
  currentFrame: 0,
  mouseX: -1,
  mouseY: -1,
  isMousePressed: false,
};

// LIFECYCLE
function update(timestamp) {
	// update state
	app.currentFrame ++;
  demoApp.update(timestamp);
  demoApp.draw();
	requestAnimationFrame(update);
}


function onMouseMove(evt) {
  var rect = canvas.getBoundingClientRect();
	app.mouseX = evt.clientX - rect.left;
	app.mouseY = evt.clientY - rect.top;
}

function onMouseDown(evt) {
	app.isMousePressed = true;
}

function onMouseUp(evt) {
	app.isMousePressed = false;
}

// Create Our Demo
demoApp = new DemoApp(app)
demoApp.start();

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
requestAnimationFrame(update);
