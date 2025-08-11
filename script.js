const productContainer = document.getElementById("products");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cartCount");

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartCount.textContent = cart.length;

// Fetch Products
async function fetchProducts() {
  let res = await fetch("https://fakestoreapi.com/products");
  let products = await res.json();
  allProducts = products;
  displayProducts(products);
  populateCategories(products);
}

// Display Products
function displayProducts(products) {
  productContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="card-body">
        <div class="card-title">${product.title.slice(0, 30)}...</div>
        <div class="price">$${product.price}</div>
        <p>${product.description.slice(0, 80)}...</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

    card.querySelector(".add-to-cart").addEventListener("click", () => addToCart(product));
    productContainer.appendChild(card);
  });
}

// Populate Categories
function populateCategories(products) {
  let categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

// Filter by Category
categorySelect.addEventListener("change", () => {
  let selected = categorySelect.value;
  let filtered = selected === "all" ? allProducts : allProducts.filter(p => p.category === selected);
  displayProducts(filtered);
});

// Search Products
searchInput.addEventListener("input", () => {
  let query = searchInput.value.toLowerCase();
  let filtered = allProducts.filter(p => p.title.toLowerCase().includes(query));
  displayProducts(filtered);
});

// Add to Cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
}

// Initial Load
fetchProducts();
