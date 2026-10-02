document.addEventListener('DOMContentLoaded', () => {

const input = document.getElementById('orderIdInput');
const button = document.getElementById('lookupBtn');
const result = document.getElementById('lookupResult');

button.addEventListener('click', async () => {

```
const id = input.value;

// Check if the input is empty
if (!id) {
  result.textContent = 'Enter an order ID first.';
  return;
}

result.textContent = 'Looking up...';

try {

  // Call the Lab 5 API
  const response = await fetch(`/api/orders/${id}`);

  // Convert response to JSON
  const data = await response.json();

  // Check for API errors
  if (!response.ok) {
    result.textContent = data.error;
    return;
  }

  // Calculate total price
  const total = (
    data.price_at_order * data.quantity
  ).toFixed(2);

  // Display order information
  result.textContent =
    `${data.item_name} × ${data.quantity} — Nu. ${total} (${data.status})`;

} catch (err) {

  result.textContent =
    'Something went wrong. Try again.';

}
```

});

});

