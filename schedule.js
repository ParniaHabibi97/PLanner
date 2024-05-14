// Get all stickers and activity cells
const stickers = document.querySelectorAll('.sticker');
const activityCells = document.querySelectorAll('.activity');

let draggedSticker = null;

stickers.forEach(sticker => {
  sticker.addEventListener('dragstart', () => {
    draggedSticker = sticker;
  });

  sticker.addEventListener('dragend', () => {
    draggedSticker = null;
  });
});

activityCells.forEach(cell => {
  cell.addEventListener('dragover', e => {
    e.preventDefault();
  });

  cell.addEventListener('drop', () => {
    if (draggedSticker) {
      cell.innerText = draggedSticker.innerText;
    }
  });
});
