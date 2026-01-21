const productList = document.getElementById("product-list");
let compareItems = JSON.parse(localStorage.getItem("compare")) || [];

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">₹${product.price}</p>
    <p class="rating">⭐ ${product.rating}</p>
    <button onclick="addToCompare(${product.id})">Add to Compare</button>
  `;

  productList.appendChild(card);
});

function addToCompare(id) {
  if (compareItems.includes(id)) {
    alert("Already added");
    return;
  }
  if (compareItems.length >= 3) {
    alert("Maximum 3 products allowed");
    return;
  }
  compareItems.push(id);
  localStorage.setItem("compare", JSON.stringify(compareItems));
  alert("Added to comparison");
}
