// Drawing variables
let currentTool = 'pen';
let drawing = false;
let context;
let color = '#000000';
let size = 5;

// Initialize canvas
window.onload = function() {
  const canvas = document.getElementById('drawing-canvas');
  context = canvas.getContext('2d');

  adjustCanvasSize(canvas);

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  // Touch events
  canvas.addEventListener('touchstart', handleTouchStart);
  canvas.addEventListener('touchmove', handleTouchMove);
  canvas.addEventListener('touchend', stopDrawing);

  // Tool buttons
  document.getElementById('pen').addEventListener('click', () => setTool('pen'));
  document.getElementById('marker').addEventListener('click', () => setTool('marker'));
  document.getElementById('eraser').addEventListener('click', () => setTool('eraser'));
  document.getElementById('reset').addEventListener('click', resetCanvas);

  // Tool options
  document.getElementById('color-picker').addEventListener('input', (e) => color = e.target.value);
  document.getElementById('size-picker').addEventListener('input', (e) => size = e.target.value);
}

function adjustCanvasSize(canvas) {
  canvas.width = window.innerWidth - document.querySelector('.sidebar').offsetWidth;
  canvas.height = window.innerHeight - document.querySelector('.navbar').offsetHeight;
}

function setTool(tool) {
  currentTool = tool;
}

function startDrawing(e) {
  drawing = true;
  context.beginPath();
  context.moveTo(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
}

function draw(e) {
  if (!drawing) return;
  context.lineTo(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
  context.strokeStyle = currentTool === 'eraser' ? '#ffffff' : color;
  context.lineWidth = currentTool === 'marker' ? size * 2 : size; // Marker is thicker
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.stroke();
}

function stopDrawing() {
  drawing = false;
  context.closePath();
}

function resetCanvas() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  draw({ clientX: touch.clientX, clientY: touch.clientY });
}

document.getElementById('export-pdf').addEventListener('click', function() {
  html2canvas(document.body, {
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      var pdf = new jsPDF('p', 'mm', 'a4');
      var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('planner.pdf');
    }
  });
});
