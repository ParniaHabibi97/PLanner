// Get all activity cells
const activityCells = document.querySelectorAll('.activity');

// Add event listeners for activity cells
activityCells.forEach(cell => {
  cell.addEventListener('dragover', e => {
    e.preventDefault();
  });

  cell.addEventListener('drop', e => {
    e.preventDefault();
    const imageSrc = e.dataTransfer.getData('text/plain');
    const image = new Image();
    image.src = imageSrc;
    image.classList.add('dragged-image');
    cell.innerHTML = ''; // Clear the cell before adding the image
    cell.appendChild(image); // Append the dragged image to the activity cell
  });

  // Prevent dropping into other columns
  cell.addEventListener('dragenter', e => {
    const targetColumnId = e.target.parentElement.id;
    if (targetColumnId !== 'activity-column') {
      e.preventDefault();
    }
  });
});


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
