const cartContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<img src="/new_empty_cart.jpg" alt="">';
    totalPriceEl.textContent = "Total: $0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-details">
        <h4>${item.title}</h4>
        <p>Price: $${item.price}</p>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    cartItem.querySelector(".remove-btn").addEventListener("click", () => removeItem(index));
    cartContainer.appendChild(cartItem);
  });

  totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();
