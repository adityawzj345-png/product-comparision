const table = document.getElementById("compare-table");
const insights = document.getElementById("insights");
const toggleBox = document.getElementById("feature-toggle");

let compareIds = JSON.parse(localStorage.getItem("compare")) || [];
let history = JSON.parse(localStorage.getItem("history")) || {};

const allFeatures = ["price", "rating", "brand", "storage", "battery"];
let activeFeatures = [...allFeatures];

// FEATURE TOGGLE UI
toggleBox.innerHTML = allFeatures.map(f =>
  `<label><input type="checkbox" checked onchange="toggleFeature('${f}')"> ${f}</label>`
).join(" ");

function toggleFeature(feature) {
  activeFeatures = activeFeatures.includes(feature)
    ? activeFeatures.filter(f => f !== feature)
    : [...activeFeatures, feature];
  render();
}

function render() {
  if (compareIds.length < 2) {
    table.innerHTML = "<tr><td>Select at least 2 products</td></tr>";
    return;
  }

  const selected = products.filter(p => compareIds.includes(p.id));

  const minPrice = Math.min(...selected.map(p => p.price));
  const maxRating = Math.max(...selected.map(p => p.rating));
  const maxBattery = Math.max(...selected.map(p => parseInt(p.battery)));

  // INSIGHTS
  insights.innerHTML = `
    Cheapest: ${selected.find(p => p.price === minPrice).name} |
    Best Rated: ${selected.find(p => p.rating === maxRating).name} |
    Best Battery: ${selected.find(p => parseInt(p.battery) === maxBattery).name}
  `;

  // WEIGHTS
  const wPrice = +document.getElementById("wPrice").value;
  const wRating = +document.getElementById("wRating").value;
  const wBattery = +document.getElementById("wBattery").value;

  let score = {};
  selected.forEach(p => score[p.id] = 0);

  let html = `<tr>
    <th>Feature</th>
    ${selected.map(p =>
      `<th>${p.name}<br><button onclick="removeItem(${p.id})">Remove</button></th>`
    ).join("")}
  </tr>`;

  activeFeatures.forEach(feature => {
    html += `<tr><td>${feature.toUpperCase()}</td>`;

    selected.forEach(p => {
      let cls = "";

      if (feature === "price" && p.price === minPrice) {
        cls = "best"; score[p.id] += wPrice;
      }
      if (feature === "rating" && p.rating === maxRating) {
        cls = "best"; score[p.id] += wRating;
      }
      if (feature === "battery" && parseInt(p.battery) === maxBattery) {
        cls = "best"; score[p.id] += wBattery;
      }

      html += `<td class="${cls}">${p[feature]}</td>`;
    });

    html += "</tr>";
  });

  table.innerHTML = html;

  // WINNER
  const winnerId = Object.keys(score).reduce((a,b)=>score[a]>score[b]?a:b);
  history[winnerId] = (history[winnerId] || 0) + 1;
  localStorage.setItem("history", JSON.stringify(history));
}

function removeItem(id) {
  compareIds = compareIds.filter(pid => pid !== id);
  localStorage.setItem("compare", JSON.stringify(compareIds));
  render();
}

function clearCompare() {
  localStorage.removeItem("compare");
  location.reload();
}

render();
