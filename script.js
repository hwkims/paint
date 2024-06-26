// script.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');
const clearButton = document.getElementById('clear-button');
let drawingData = [];

colorPicker.addEventListener('input', (e) => {
  const newColor = e.target.value;
  updateURL(newColor);
});

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(lastX, lastY, 10, 10);
    drawingData.push({ x: lastX, y: lastY, color: colorPicker.value });
    updateURL();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

saveButton.addEventListener('click', () => {
  const url = new URL(window.location.href);
  url.hash = JSON.stringify(drawingData);
  window.location.href = url.href;
});

loadButton.addEventListener('click', () => {
  const url = new URL(window.location.href);
  const hash = url.hash.substring(1); // Remove the "#" symbol
  if (hash) {
    drawingData = JSON.parse(hash);
    redrawCanvas();
  }
});

clearButton.addEventListener('click', () => {
  drawingData = [];
  updateURL();
  redrawCanvas();
});

function updateURL(newColor) {
  // Do nothing for now, we'll use the save button to update the URL
}

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawingData.forEach((data) => {
    ctx.fillStyle = data.color;
    ctx.fillRect(data.x, data.y, 10, 10);
  });
}

// Load the drawing data from the URL hash when the page loads
const url = new URL(window.location.href);
const hash = url.hash.substring(1); // Remove the "#" symbol
if (hash) {
  drawingData = JSON.parse(hash);
  redrawCanvas();
}