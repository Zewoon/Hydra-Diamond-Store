// Store for selected items
let selectedItems = [];

// Select all item boxes
const itemBoxes = document.querySelectorAll('.item-box');
const selectedItemsList = document.getElementById('selected-items-list');

// Handle item selection/deselection
itemBoxes.forEach(itemBox => {
  const tick = itemBox.querySelector('.tick');
  const item = itemBox.dataset.item;
  const price = itemBox.dataset.price;

  // Handle item click to toggle selection
  itemBox.addEventListener('click', () => {
    if (tick.classList.contains('hidden')) {
      // Item is being selected
      tick.classList.remove('hidden');
      selectedItems.push({ item, price });
      renderSelectedItems();
    } else {
      // Item is being deselected
      tick.classList.add('hidden');
      selectedItems = selectedItems.filter(selected => selected.item !== item);
      renderSelectedItems();
    }
  });
});

// Render selected items in the list
function renderSelectedItems() {
  // Clear the current list
  selectedItemsList.innerHTML = '';

  // Render each selected item
  selectedItems.forEach(selected => {
    const listItem = document.createElement('li');
    listItem.textContent = `${selected.item} 💎 - ${selected.price} GEL`;

    // Allow deselection from the list
    listItem.addEventListener('click', () => {
      // Remove the item from selected items
      selectedItems = selectedItems.filter(selectedItem => selectedItem !== selected);
      renderSelectedItems();
      // Deselect the item in the grid
      const itemBox = document.querySelector(`[data-item="${selected.item}"]`);
      const tick = itemBox.querySelector('.tick');
      tick.classList.add('hidden');
    });

    selectedItemsList.appendChild(listItem);
  });
}
