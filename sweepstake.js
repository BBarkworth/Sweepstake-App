const teams = [
    "England",
    "France",
    "Germany",
    "Portugal",
    "Spain",
    "Italy",
    "Netherlands",
    "Belgium",
    "Croatia",
    "Denmark",
    "Turkey",
    "Hungary",
    "Switzerland",
    "Austria",
    "Czech Republic",
    "Poland",
    "Scotland",
    "Serbia",
    "Ukraine",
    "Romania",
    "Slovenia",
    "Albania",
    "Georgia",
    "Slovakia",
  ];
  
  const countryCodes = {
    England: "EN",
    France: "FR",
    Germany: "DE",
    Portugal: "PT",
    Spain: "ES",
    Italy: "IT",
    Netherlands: "NL",
    Belgium: "BE",
    Croatia: "HR",
    Denmark: "DK",
    Turkey: "TR",
    Hungary: "HU",
    Switzerland: "CH",
    Austria: "AT",
    "Czech Republic": "CZ",
    Poland: "PL",
    Scotland: "SCT",
    Serbia: "RS",
    Ukraine: "UA",
    Romania: "RO",
    Slovenia: "SI",
    Albania: "AL",
    Georgia: "GE",
    Slovakia: "SK",
  };

const flags = {};
for (const country in countryCodes) {
const code = countryCodes[country];
flags[country] = `flags/${code}.svg`;
}

const names = ["Ben", "Bridgette", "Lily", "Robert"];
const drawButton = document.querySelector(".draw");
const refreshButton = document.querySelector(".refresh");
const exportButton = document.querySelector(".export");
const container = document.querySelector(".container");
const potContainer = document.querySelector(".row");
const lists = {};
const numberOfTeams = teams.length / names.length;
const columnList = potContainer.querySelectorAll('.column')
const potNumber = teams.length / columnList.length

function potCreation(potNumber) {
    let teamsCopy = [...teams];
    let teamCounter = 1
    let count = 1;
    teamsCopy.forEach((team) => {
        let columnIdentifier = document.getElementById(count.toString());
        let teamContainer = teamCreation(team);
        columnIdentifier.appendChild(teamContainer);
        if (teamCounter % potNumber == 0) {
            count += 1
        }
        teamCounter += 1
    });
}

function teamCreation(team) {
    const teamContainer = document.createElement("div");
    const element = document.createElement("div");
    teamContainer.className = "team-container";
    teamContainer.id = team
    let imageElement = imageCreation(team);
    element.className = "team-name"
    element.textContent = team;
    teamContainer.appendChild(imageElement);
    teamContainer.appendChild(element);
    return teamContainer;
}

function imageCreation(team) {
    const img = document.createElement("img");
    img.src = flags[team];
    img.alt = `${team} Flag`;
    img.className = "flag-image";
    return img;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function process (teams, names, potSize) {
    drawButton.disabled = true;
    let loopCounter = 0;
    // await sleep(3000);
    while (teams.length > 0) {
        let namesCopy = [...names];
        let potStart = teams.length - potSize
        let pot = teams.splice(potStart,8);
        for (let index = 0; index < 8; index++) {
            let teamRandomIndex = Math.floor(Math.random() * pot.length);
            let teamChoice = pot[teamRandomIndex];
            let nameRandomIndex = Math.floor(Math.random() * namesCopy.length);
            let nameChoice = namesCopy[nameRandomIndex];
            namesCopy = namesCopy.filter(name => name !== nameChoice);
            pot = pot.filter(p => p !== teamChoice);
            lists[nameChoice].push(teamChoice);
            let img = imageCreation(teamChoice)
            container.appendChild(img)
            let div = document.createElement("div");
            div.innerHTML = `${teamChoice}: ${nameChoice}`;
            container.appendChild(div)
            let removeTeam = document.getElementById(teamChoice);
            removeTeam.remove();
            loopCounter += 1;
            if (loopCounter % names.length == 0) {
                namesCopy = [...names];
            }
            // await sleep(5000);
            img.remove();
            div.remove();
        }
    }
}

function restructurePage() {
    container.remove();
    drawButton.disabled = false;
    const fourthColumn = document.createElement('div');
    potContainer.appendChild(fourthColumn)
    fourthColumn.className = "column"
    const columnList = potContainer.querySelectorAll('.column')
    const newHeading = document.createElement('h2');
    newHeading.className = "h2"
    fourthColumn.appendChild(newHeading);
    for (let index = 0; index < columnList.length; index++) {
        const headings = document.getElementsByClassName('h2');
        headings[index].textContent = `${names[index]}`;
        columnList[index].id = names[index]
    }
    nameAppender(teams);
}

function nameAppender(potTeams) {
    potTeams.forEach((team) => {
        let listName = Object.keys(lists).filter(listName => lists[listName].includes(team));
        const nameColumn = document.getElementById(listName[0]);
        let container = teamCreation(team)
        nameColumn.appendChild(container);
    });
}

drawButton.addEventListener('click', async () => {
    await process([...teams], [...names], potNumber); 
    restructurePage()
});

document.addEventListener("DOMContentLoaded", () => {
  potCreation(potNumber);
  names.forEach((name) => {
    lists[name] = [];
  });
});

function refreshPage() {
    window.location.reload();
}

refreshButton.addEventListener("click", refreshPage);


function exportResults() {
  let resultText = "";
  for (const name in lists) {
    resultText += `${name}: ${lists[name].join(", ")}\n`;
  }
  const blob = new Blob([resultText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "euro_2024_sweepstake_results.txt";
  a.click();
}

exportButton.addEventListener("click", () => {
  exportResults();
});