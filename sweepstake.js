const teams = ["England", "France", "Germany", "Portugal", "Spain", "Italy", "Netherlands", "Belgium", "Croatia", "Denmark", "Turkey", "Hungary", "Switzerland", "Austria", "Czech Republic", "Poland", "Scotland", "Serbia", "Ukraine", "Romania", "Slovenia", "Albania", "Georgia", "Slovakia"]
const names = ["Ben", "Bridgette", "Lily", "Robert"];
const drawButton = document.querySelector('.draw');
const container = document.querySelector('.container');
const potContainer = document.querySelector('.row');
const firstColumn = document.getElementById('1');
const secondColumn = document.getElementById('2');
const thirdColumn = document.getElementById('3');
const lists = {};


function potCreation() {
    let teamsCopy = [...teams];
    let count = 1
    while (teamsCopy.length > 0) {
        let potTeams = teamsCopy.splice(0,8);
        let countConversion = String(count)
        let columnIdentifier = document.getElementById(countConversion)
        for (let index = 0; index < potTeams.length; index++) {
            const element = document.createElement('div');
            element.id = potTeams[index]
            element.innerHTML = `${potTeams[index]}<br>`;
            element.style.height = '9%';
            // columnIdentifier.innerHTML += `${potTeams[index]}<br>`;
            columnIdentifier.appendChild(element)
        }
        count += 1
    }
}

function listCreation() {
    for (let index = 0; index < names.length; index++) {
        lists[names[index]] = [];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function process (teams, names) {
    drawButton.disabled = true;
    let completeList = []
    let count = 0
    let potSize = 8
    while (teams.length > 0) {
        let namesCopy = [...names];
        let potStart = teams.length - potSize
        let pot = teams.splice(potStart,8)
        // await sleep(3000);
        console.log(pot)
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
            completeList.push(teamChosen)
            container.innerHTML = `${n}: ${choice}`;
            let removeTeam = document.getElementById(choice);
            removeTeam.textContent = "";
            count += 1;
            if (count % names.length == 0) {
                namesCopy = [...names];
            }
        }
    }
    await sleep(2000);
    container.innerHTML = ""
    drawButton.disabled = false;
    const element = document.createElement('div');
    potContainer.appendChild(element)
    element.id = "4"
    element.className = "column"
    const columnList = potContainer.querySelectorAll('.column')
    for (let index = 0; index < columnList.length; index++) {
        columnList[index].innerHTML = `${names[index]}<br>`
        let listIterator = names[index]
        columnList[index].className = names[index]
        if (columnList[index].className == listIterator) {
            for (let i = 0; i < lists[names[index]].length; i++) {
                columnList[index].innerHTML += `${lists[listIterator][i]}<br>`
            }
        }
        
    }
    return completeList
}

drawButton.addEventListener("click", async () => {
    await process([...teams], [...names]); 
});

document.addEventListener('DOMContentLoaded', (event) => {
    potCreation()
    listCreation()
});
// selections.forEach(item => {
//     fs.appendFile('output/sweepstake.txt', item + '\n', (err) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log(`${item} has been appended to the file`);
//     });
// });