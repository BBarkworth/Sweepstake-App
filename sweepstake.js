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
  England: "GB",
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
  Scotland: "GB-SCT",
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
const container = document.querySelector(".container");
const potContainer = document.querySelector(".row");
const lists = {};
let completeList = []

function potCreation() {
  let teamsCopy = [...teams];
  let count = 1;
  while (teamsCopy.length > 0) {
    let potTeams = teamsCopy.splice(0, 8);
    let columnIdentifier = document.getElementById(count.toString());
    potTeams.forEach((team) => {
      const element = document.createElement("div");
      const img = document.createElement("img");
      img.src = flags[team];
      img.alt = `${team} Flag`;
      img.className = "flag-image";
      element.id = team;
      element.innerHTML = `${team}<br>`;
      element.appendChild(img);
      element.style.height = "9%";
      columnIdentifier.appendChild(element);
    });
    count += 1;
  }
}

function listCreation() {
  names.forEach((name) => {
    lists[name] = [];
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function process (teams, names) {
    drawButton.disabled = true;
    let count = 0
    let potSize = 8
    while (teams.length > 0) {
        let namesCopy = [...names];
        let potStart = teams.length - potSize
        let pot = teams.splice(potStart,8)
        // await sleep(3000);
        for (let index = 0; index < 8; index++) {
            let randomIndex = Math.floor(Math.random() * pot.length);
            let choice = pot[randomIndex];
            let randomI = Math.floor(Math.random() * namesCopy.length);
            let n = namesCopy[randomI];
            namesCopy = namesCopy.filter(name => name !== n);
            pot = pot.filter(p => p !== choice);
            let teamChosen = {[n]: choice};
            lists[n].push(choice);
            // await sleep(3000);
            console.log(teamChosen)  
            completeList.push(teamChosen)
            // container.innerHTML += `${n}: ${choice}<br>`
            container.innerHTML = `${n}: ${choice}`;
            let removeTeam = document.getElementById(choice);
            removeTeam.remove();
            count += 1;
            if (count % names.length == 0) {
                namesCopy = [...names];
            }
        }
    }
    // potContainer.innerHTML = ""
    await sleep(2000);
}

function restructurePage(fullTeamsList) {
    container.innerHTML = ""
    drawButton.disabled = false;
    console.log(lists)
    console.log(lists.Ben)
    console.log(typeof lists.Ben)
    const element = document.createElement('div');
    potContainer.appendChild(element)
    element.id = "4"
    element.className = "column"
    const newHeading = document.createElement('h2');
    newHeading.className = "h2"
    element.appendChild(newHeading);
    const columnList = potContainer.querySelectorAll('.column')
    console.log(columnList)
    for (let index = 0; index < columnList.length; index++) {
        const headings = document.getElementsByClassName('h2');
        headings[index].textContent = `${names[index]}`;
        let listIterator = names[index]
        console.log(columnList[index].textContent)
        console.log(listIterator)
        console.log(columnList[index].textContent.length)
        if (columnList[index].textContent.trim() == listIterator) {
            console.log("test")
            for (let i = 0; i < lists[names[index]].length; i++) {
                columnList[index].innerHTML += `${lists[listIterator][i]}<br>`
            }
        }
    }
    return fullTeamsList;
}

drawButton.addEventListener("click", async () => {
    await process([...teams], [...names]); 
    restructurePage(completeList)
});

document.addEventListener('DOMContentLoaded', () => {
    potCreation()
    listCreation()
});
