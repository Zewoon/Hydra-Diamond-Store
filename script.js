// Store for selected items
let selectedItems = [];

// Select all item boxes
const itemBoxes = document.querySelectorAll('.item-box');
const selectedItemsList = document.getElementById('selected-items-list');
const totalPriceElement = document.createElement('li'); // For total price display
totalPriceElement.style.fontWeight = 'bold'; // Highlight the total price

// Handle item selection/deselection
itemBoxes.forEach(itemBox => {
  const tick = itemBox.querySelector('.tick');
  const item = itemBox.dataset.item;
  const price = parseFloat(itemBox.dataset.price);

  // Handle item click to toggle selection
  itemBox.addEventListener('click', () => {
    if (tick.classList.contains('hidden')) {
      // Item is being selected
      tick.classList.remove('hidden');
      selectedItems.push({ item, price });
      updateSelectedItems();
    } else {
      // Item is being deselected
      tick.classList.add('hidden');
      selectedItems = selectedItems.filter(selected => selected.item !== item);
      updateSelectedItems();
    }
  });
});

// Update selected items list and total price
function updateSelectedItems() {
  // Clear the selected items list
  selectedItemsList.innerHTML = '';

  // Render each selected item
  selectedItems.forEach(selected => {
    const listItem = document.createElement('li');
    listItem.textContent = `${selected.item} 💎 - ${selected.price} GEL`;

    // Allow deselection from the list
    listItem.addEventListener('click', () => {
      // Remove the item from selected items
      selectedItems = selectedItems.filter(selectedItem => selectedItem !== selected);
      updateSelectedItems();
      // Deselect the item in the grid
      const itemBox = document.querySelector(`[data-item="${selected.item}"]`);
      const tick = itemBox.querySelector('.tick');
      tick.classList.add('hidden');
    });

    selectedItemsList.appendChild(listItem);
  });

  // Calculate total price
  const totalPrice = selectedItems.reduce((sum, selected) => sum + selected.price, 0);
  totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)} GEL`;

  // Append total price to the list
  selectedItemsList.appendChild(totalPriceElement);
}
