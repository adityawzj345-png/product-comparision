const table = document.getElementById("compare-table");
const insights = document.getElementById("insights");

let compareIds = JSON.parse(localStorage.getItem("compare")) || [];
let category = localStorage.getItem("category");

function render() {
  if (compareIds.length < 2) {
    table.innerHTML = "<tr><td>Select at least 2 products</td></tr>";
    insights.innerHTML = "";
    return;
  }

  const selected = products.filter(
    p => compareIds.includes(p.id) && p.category === category
  );

  if (selected.length < 2) {
    table.innerHTML = "<tr><td>Invalid comparison</td></tr>";
    return;
  }

  const minPrice = Math.min(...selected.map(p => p.price));
  const maxRating = Math.max(...selected.map(p => p.rating));

  insights.innerHTML = `
    <b>Cheapest:</b> ${selected.find(p => p.price === minPrice).name} |
    <b>Best Rated:</b> ${selected.find(p => p.rating === maxRating).name}
  `;

  let html = `<tr>
    <th>Feature</th>
    ${selected.map(p => `
      <th>
        ${p.name}<br>
        <button onclick="removeItem(${p.id})">Remove</button>
      </th>
    `).join("")}
  </tr>`;

  const features = ["price", "rating", "battery", "storage"];

  features.forEach(f => {
    html += `<tr><td>${f.toUpperCase()}</td>`;
    selected.forEach(p => {
      let cls = "";
      if (f === "price" && p.price === minPrice) cls = "best";
      if (f === "rating" && p.rating === maxRating) cls = "best";
      html += `<td class="${cls}">${p[f] || "-"}</td>`;
    });
    html += "</tr>";
  });

  table.innerHTML = html;
}

function removeItem(id) {
  compareIds = compareIds.filter(pid => pid !== id);
  localStorage.setItem("compare", JSON.stringify(compareIds));
  render();
}

function clearCompare() {
  localStorage.clear();
  location.href = "index.html";
}

render();
