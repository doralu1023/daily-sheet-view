const sheetCSV =
  "https://docs.google.com/spreadsheets/d/1VZEosU4ZuzxpmZFlvr9oHJoUuOWNVo2fcgBXtTv5GtA/export?format=csv";

const allowedLocations = ["彭俊豪", "魏筠", "黃崇真", "張曉筠"]; // ← only show these

// Define colors for dates (will auto-loop if more dates)
const colors = ["#FFFAE6", "#E6F7FF", "#F0FFF0", "#FFF0F5", "#F9F9F9"];

function loadSheetData() {
  const url = `${sheetCSV}&t=${new Date().getTime()}`;

  fetch(url, { cache: "no-store" })
    .then((response) => response.text())
    .then((csvText) => {
      const rows = csvText.split("\n").slice(1); // skip header row
      const table = document.getElementById("data-table");
      table.innerHTML = ""; // Clear old data

      const dateColorMap = {};
      let colorIndex = 0;

      rows.forEach((row) => {
        const cols = row.split(",");
        if (cols.length < 5) return;

        const 日期 = cols[1];
        const 地點 = cols[2];
        const 地點2 = cols[3];
        const 數量 = cols[4];

        if (!allowedLocations.includes(地點)) return;

        // Assign color for each date
        if (!dateColorMap[日期]) {
          dateColorMap[日期] = colors[colorIndex % colors.length];
          colorIndex++;
        }

        const tr = document.createElement("tr");
        tr.style.backgroundColor = dateColorMap[日期]; // Apply color
        tr.innerHTML = `
          <td>${日期}</td>
          <td>${地點}</td>
          <td>${地點2}</td>
          <td>${數量}</td>
        `;
        table.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("讀取 Google Sheet 失敗:", error);
    });
}

loadSheetData();
