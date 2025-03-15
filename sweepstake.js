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
    Monaco: "MC"
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
const columnList = potContainer.querySelectorAll('.column');
const potNumber = drivers.length / columnList.length;

function potCreation() {
    let driversCopy = [...drivers]
    let driverCounter = 1
    let count = 1;
    driversCopy.forEach((driver) => {
        let columnIdentifier = document.getElementById(count.toString());
        let driverContainer = driverCreation(driver);
        columnIdentifier.appendChild(driverContainer);
        if (driverCounter % potNumber == 0) {
            count += 1
        }
        driverCounter += 1
    });
}

function driverCreation(driver) {
    const driverContainer = document.createElement("div");
    const element = document.createElement("div");
    driverContainer.className = "driver-container";
    driverContainer.id = driver.name
    let imageElement = imageCreation(driver);
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

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function process (ds, names) {
    drawButton.disabled = true;
    let loopCounter = 0;
    // await sleep(7000);
    let namesCopy = [...names];
    while (ds.length > 0) {
        let driverRandomIndex = Math.floor(Math.random() * ds.length);
        let choice = ds[driverRandomIndex];
        let driverChoice = choice.name;
        let nameRandomIndex = Math.floor(Math.random() * namesCopy.length);
        let nameChoice = namesCopy[nameRandomIndex];
        namesCopy = removeOneOccurrence(namesCopy, nameChoice);
        ds = ds.filter(d => d !== choice);
        lists[nameChoice].push(driverChoice);
        let img = imageCreation(choice)
        container.appendChild(img)
        let div = document.createElement("div");
        div.innerHTML = `${driverChoice}: ${nameChoice}`;
        container.appendChild(div)
        let removeDriver = document.getElementById(driverChoice);
        removeDriver.remove();
        loopCounter += 1;
        if (loopCounter % names.length == 0) {
            namesCopy = [...names];
        }
        // await sleep(7000);
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
 // loop
function restructurePage() {
    container.remove();
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
        console.log(driver);
        console.log(lists);
        let listName = Object.keys(lists).filter(listName => lists[listName].includes(driver.name));
        console.log(listName);
        const nameColumn = document.getElementById(listName[0]);
        console.log(nameColumn);
        let container = driverCreation(driver)
        console.log(container);
        nameColumn.appendChild(container);
    });
}

function refreshPage() {
    window.location.reload();
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

drawButton.addEventListener('click', async () => {
    await process([...drivers], [...names]); 
    restructurePage()
});

document.addEventListener("DOMContentLoaded", () => {
    exportButton.disabled = true;
    potCreation();
    names.forEach((name) => {
    lists[name] = [];
  });
});

refreshButton.addEventListener("click", refreshPage);

exportButton.addEventListener("click", () => {
  exportResults();
});