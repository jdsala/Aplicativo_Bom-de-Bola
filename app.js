let players = [];

function addPlayer() {
  const name = document.getElementById("playerName").value;
  const sector = document.getElementById("playerSector").value;
  const level = parseInt(document.getElementById("playerLevel").value);

  if (name && sector && level >= 1 && level <= 10) {
    players.push({ name, sector, level });
    displayPlayers();
    clearInputs();
  } else {
    alert("Preencher os campos corretamente.");
  }
}

function displayPlayers() {
  const playerList = document.getElementById("playerList");
  playerList.innerHTML = "";
  players.forEach((player, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${player.name} - ${player.sector} - Nivel: ${player.level}`;
    playerList.appendChild(li);
  });
}

function clearInputs() {
  document.getElementById("playerName").value = "";
  document.getElementById("playerSector").value = "";
  document.getElementById("playerLevel").value = "";
}

function clearPlayers() {
  players = [];
  displayPlayers();
  clearTables();
  clearChart();
}

function formTeams() {
  if (players.length < 2) {
    alert("Adiciona pelo menos 2 jogadores.");
    return;
  }

  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
  const mid = Math.floor(shuffledPlayers.length / 2);
  const team1 = shuffledPlayers.slice(0, mid);
  const team2 = shuffledPlayers.slice(mid);

  displayTeam(team1, "team1Table");
  displayTeam(team2, "team2Table");

  const level1 = calculateLevel(team1);
  const level2 = calculateLevel(team2);

  displayChart(level1, level2);
}

function displayTeam(team, tableId) {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = "";

  team.forEach(player => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.sector}</td>
      <td>${player.level}</td>
    `;
    tableBody.appendChild(row);
  });
}

function calculateLevel(team) {
  return team.reduce((sum, player) => sum + player.level, 0);
}

function displayChart(level1, level2) {
  const total = level1 + level2;
  const prob1 = (level1 / total) * 100;
  const prob2 = (level2 / total) * 100;

  const ctx = document.getElementById("resultChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Time 1", "Time 2"],
      datasets: [
        {
          label: "Probabilidade de Vitoria (%)",
          data: [prob1, prob2],
          backgroundColor: ["#3498db", "#2ecc71"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
}

function clearTables() {
  document.querySelector("#team1Table tbody").innerHTML = "";
  document.querySelector("#team2Table tbody").innerHTML = "";
}

function clearChart() {
  const canvas = document.getElementById("resultChart");
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}