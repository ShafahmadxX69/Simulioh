const canvas = document.getElementById("viewer");
const ctx = canvas.getContext("2d");

function simulate() {
  const containerType = document.getElementById("containerSelect").value;
  const container = containers[containerType];

  const carton = {
    L: parseInt(document.getElementById("cartonL").value),
    W: parseInt(document.getElementById("cartonW").value),
    H: parseInt(document.getElementById("cartonH").value)
  };

  // Hitung orientasi normal & rotasi
  function stacking(containerH, cartonH) {
    let layers = Math.floor(containerH / cartonH);
    let gap = containerH % cartonH;
    return { layers, gap };
  }

  let normal = stacking(container.H, carton.H);
  let rotated = stacking(container.H, carton.W);

  let best = normal.gap < rotated.gap ? { ...normal, orient: "Normal", h: carton.H }
                                      : { ...rotated, orient: "Rotated", h: carton.W };

  // Hitung jumlah carton total
  let perLayer = Math.floor(container.L / carton.L) * Math.floor(container.W / carton.W);
  let total = perLayer * best.layers;

  // Render Info
  document.getElementById("info").innerText =
    `Best Orientation: ${best.orient}
Layers: ${best.layers}
Gap: ${best.gap} cm
Per Layer: ${perLayer} pcs
Total: ${total} pcs`;

  // Visualisasi sederhana (2D top view)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(50, 50, 600, 300);

  let xCount = Math.floor(container.L / carton.L);
  let yCount = Math.floor(container.W / carton.W);

  let cellW = 600 / xCount;
  let cellH = 300 / yCount;

  for (let i = 0; i < xCount; i++) {
    for (let j = 0; j < yCount; j++) {
      ctx.strokeRect(50 + i * cellW, 50 + j * cellH, cellW, cellH);
    }
  }
}
