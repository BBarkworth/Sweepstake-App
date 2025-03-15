const drivers = [
    {name: "Pierre Gasly", country: "France", team: "Alpine"}, 
    {name: "Jack Doohan", country: "Australia", team: "Alpine"},
    {name: "Lance Stroll", country: "Canada", team: "Aston Martin"},
    {name: "Fernando Alonso", country: "Spain", team: "Aston Martin"},
    {name: "Charles Leclerc", country: "Monaco", team: "Ferrari"},
    {name: "Lewis Hamilton", country: "United Kingdom", team: "Ferrari"},
    {name: "Esteban Ocon", country: "France", team: "Haas"},
    {name: "Oliver Bearman", country: "United Kingdom", team: "Haas"},
    {name: "Nico Hulkenberg", country: "Germany", team: "Sauber"},
    {name: "Gabriel Bortoleto", country: "Brazil", team: "Sauber"},
    {name: "Oscar Piastri", country: "Australia", team: "Mclaren"},
    {name: "Lando Norris", country: "United Kingdom", team: "Mclaren"},
    {name: "George Russell", country: "United Kingdom", team: "Mercedes"},
    {name: "Andrea Antonelli", country: "Italy", team: "Mercedes"},
    {name: "Isack Hadjar", country: "France", team: "Racing Bulls"},
    {name: "Yuki Tsunoda", country: "Japan", team: "Racing Bulls"},
    {name: "Max Verstappen", country: "Netherlands", team: "Red Bull"},
    {name: "Liam Lawson", country: "New Zealand", team: "Red Bull"},
    {name: "Alex Albon", country: "Thailand", team: "Williams"},
    {name: "Carlos Sainz", country: "Spain", team: "Williams"} 
];

const countryCodes = {
    France: "FR",
    Germany: "DE",
    Spain: "ES",
    Italy: "IT",
    Netherlands: "NL",
    Australia: "AU",
    Canada: "CA",
    Brazil: "BR",
    Japan: "JP",
    "New Zealand": "NZ",
    Thailand: "TH",
    Monaco: "MC",
    "United Kingdom": "UK"
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
const selectionContainer = document.querySelector(".container");
const potContainer = document.querySelector(".row");
const lists = {};
const columnList = potContainer.querySelectorAll('.column');

drawButton.addEventListener('click', async () => {
    await drawProcess([...drivers], [...names]); 
    restructurePage()
});

document.addEventListener("DOMContentLoaded", () => {
    exportButton.disabled = true;
    potStructureCreation();
    names.forEach((name) => {
    lists[name] = [];
  });
});

refreshButton.addEventListener("click", refreshPage);

exportButton.addEventListener("click", () => {
  exportResults();
});

function potStructureCreation() {
    const potNumber = drivers.length / columnList.length;
    const driversCopy = [...drivers]
    let driverCounter = 1
    let index = 1;
    driversCopy.forEach((driver) => {
        let columnIdentifier = document.getElementById(index.toString());
        let driverContainer = driverContainerCreation(driver);
        columnIdentifier.appendChild(driverContainer);
        if (driverCounter % potNumber == 0) {
            index += 1
        }
        driverCounter += 1
    });
}

function driverContainerCreation(driver) {
    const driverContainer = document.createElement("div");
    const element = document.createElement("div");
    driverContainer.className = "driver-container";
    driverContainer.id = driver.name
    const imageElement = imageCreation(driver);
    element.className = "driver-name"
    element.textContent = driver.name + ", " + driver.team;
    driverContainer.appendChild(imageElement);
    driverContainer.appendChild(element);
    return driverContainer;
}

function imageCreation(driver) {
    const img = document.createElement("img");
    const flag = driver.country;
    img.src = flags[flag];
    img.alt = `${flag} Flag`;
    img.className = "flag-image";
    return img;
}

async function drawProcess (driverList, names) {
    drawButton.disabled = true;
    let loopCounter = 0;
    // await sleep(5000);
    let namesCopy = [...names];
    while (driverList.length > 0) {
        let driverRandomIndex = Math.floor(Math.random() * driverList.length);
        let driverChoice = driverList[driverRandomIndex];
        let driverName = driverChoice.name;
        let nameRandomIndex = Math.floor(Math.random() * namesCopy.length);
        let nameChoice = namesCopy[nameRandomIndex];
        namesCopy = removeOneOccurrence(namesCopy, nameChoice);
        driverList = driverList.filter(d => d !== driverChoice);
        lists[nameChoice].push(driverName);
        let img = imageCreation(driverChoice)
        selectionContainer.appendChild(img)
        let div = document.createElement("div");
        div.innerHTML = `${driverName}: ${nameChoice}`;
        selectionContainer.appendChild(div)
        let removeDriver = document.getElementById(driverName);
        removeDriver.remove();
        loopCounter += 1;
        if (loopCounter % names.length == 0) {
            namesCopy = [...names];
        }
        // await sleep(5000);
        img.remove();
        div.remove();
    }
}

function removeOneOccurrence(array, value) {
    const index = array.indexOf(value);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}

function restructurePage() {
    selectionContainer.remove();
    columnList[4].remove();
    for (let index = 0; index < names.length; index++) {
        const headings = document.getElementsByClassName('h2');
        headings[index].textContent = `${names[index]}`;
        columnList[index].id = names[index]
    }
    potContainer.style.minHeight = '350px'
    nameAppender(drivers);
    exportButton.disabled = false;
}

function nameAppender(potDrivers) {
    potDrivers.forEach((driver) => {
        let listName = Object.keys(lists).filter(listName => lists[listName].includes(driver.name));
        const nameColumn = document.getElementById(listName[0]);
        let container = driverContainerCreation(driver)
        nameColumn.appendChild(container);
    });
}

function exportResults() {
    let resultText = "";
    for (const name in lists) {
      resultText += `${name}: ${lists[name].join(", ")}\n`;
    }
    const blob = new Blob([resultText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "f1_2025_sweepstake_results.txt";
    a.click();
}

function refreshPage() {
    window.location.reload();
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}