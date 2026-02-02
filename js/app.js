const productList = document.getElementById("product-list");
const categorySelect = document.getElementById("categorySelect");

let compareItems = JSON.parse(localStorage.getItem("compare")) || [];
let selectedCategory = localStorage.getItem("category") || "";

categorySelect.value = selectedCategory;

categorySelect.addEventListener("change", () => {
  selectedCategory = categorySelect.value;
  localStorage.setItem("category", selectedCategory);

  compareItems = [];
  localStorage.setItem("compare", JSON.stringify(compareItems));

  renderProducts();
});

function renderProducts() {
  productList.innerHTML = "";

  if (!selectedCategory) return;

  const filtered = products.filter(p => p.category === selectedCategory);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" onerror="this.src='assets/placeholder.png'">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>⭐ ${product.rating}</p>
      <button onclick="addToCompare(${product.id})">Add to Compare</button>
    `;

    productList.appendChild(card);
  });
}

function addToCompare(id) {
  if (compareItems.includes(id)) {
    alert("Already added");
    return;
  }

  if (compareItems.length >= 4) {
    alert("Maximum 4 products allowed");
    return;
  }

  compareItems.push(id);
  localStorage.setItem("compare", JSON.stringify(compareItems));
  alert("Added for comparison");
}

if (selectedCategory) renderProducts();
