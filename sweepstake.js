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
const container = document.querySelector(".container");
const potContainer = document.querySelector(".row");
const lists = {};
// let completeList = []

function potCreation() {
    let teamsCopy = [...teams];
    let teamCounter = 1
    let count = 1;
    teamsCopy.forEach((team) => {
        let columnIdentifier = document.getElementById(count.toString());
        const element = document.createElement("div");
        const img = document.createElement("img");
        img.src = flags[team];
        img.alt = `${team} Flag`;
        img.className = "flag-image";
        element.className = "team-name"
        element.id = team;
        element.innerHTML = `${team}<br>`;
        // img.appendChild(element);
        element.style.height = "2%";
        columnIdentifier.appendChild(img);
        columnIdentifier.appendChild(element);
        if (teamCounter % 8 == 0) {
            count += 1
        }
        teamCounter += 1
    });
    // while (teamsCopy.length > 0) {
    //     // let potTeams = teamsCopy.splice(0, 8);
    //     // let columnIdentifier = document.getElementById(count.toString());
    //     imageCreation(potTeams, columnIdentifier);
    //     // count += 1;
    // }
}

function imageCreation(potTeams, columnNum) {
    potTeams.forEach((team) => {
        const element = document.createElement("div");
        const img = document.createElement("img");
        img.src = flags[team];
        img.alt = `${team} Flag`;
        img.className = "flag-image";
        element.className = "team-name"
        element.id = team;
        element.innerHTML = `${team}<br>`;
        // img.appendChild(element);
        element.style.height = "2%";
        columnNum.appendChild(img);
        columnNum.appendChild(element);
    });
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
    let count = 0;
    let potSize = 8;
    while (teams.length > 0) {
        let namesCopy = [...names];
        let potStart = teams.length - potSize
        let pot = teams.splice(potStart,8);
        // await sleep(3000);
        for (let index = 0; index < 8; index++) {
            let randomIndex = Math.floor(Math.random() * pot.length);
            let choice = pot[randomIndex];
            let randomI = Math.floor(Math.random() * namesCopy.length);
            let n = namesCopy[randomI];
            namesCopy = namesCopy.filter(name => name !== n);
            pot = pot.filter(p => p !== choice);
            // let teamChosen = {[n]: choice};
            lists[n].push(choice);
            // await sleep(3000);
            // completeList.push(teamChosen)
            container.innerHTML = `${n}: ${choice}`;
            let removeTeam = document.getElementById(choice);
            removeTeam.remove();
            // img needs to be removed as well - container could have team name as class name and then that could be targeted for removal
            count += 1;
            if (count % names.length == 0) {
                namesCopy = [...names];
            }
        }
    }
    // potContainer.innerHTML = ""
    // await sleep(2000);
}

function restructurePage() {
    container.innerHTML = ""
    drawButton.disabled = false;
    const element = document.createElement('div');
    potContainer.appendChild(element)
    element.id = "4"
    element.className = "column"
    const newHeading = document.createElement('h2');
    newHeading.className = "h2"
    element.appendChild(newHeading);
    const columnList = potContainer.querySelectorAll('.column')
    // refactor below to be a loop - then change imageCreation function for multi uses
    for (let index = 0; index < columnList.length; index++) {
        const headings = document.getElementsByClassName('h2');
        headings[index].textContent = `${names[index]}`;
        let listIterator = names[index]
        if (columnList[index].textContent.trim() == listIterator) {
            imageCreation(lists[listIterator], columnList[index]);
        }
    }
}

drawButton.addEventListener('click', async () => {
    await process([...teams], [...names]); 
    restructurePage()
});

document.addEventListener('DOMContentLoaded', () => {
    potCreation()
    listCreation()
});
