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
