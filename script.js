// const visCount = document.getElementById('visCount');
// updateSiteCounter();

// function updateSiteCounter() {
//     fetch('https://api.countapi.xyz/hit/regularwave_pokemon-AvailableDex')
//         .then(response => response.json())
//         .then(response => {
//             visCount.innerHTML = response.value;
//         })
// }

const gameNames = ["Red", "Green", "Blue", "Yellow", "Gold", "Silver", "Crystal", "Ruby", "Sapphire", "FireRed", "LeafGreen", "Emerald", "Colosseum", "XD", "Diamond", "Pearl", "Platinum", "HeartGold", "SoulSilver", "Black", "White", "Black2", "White2", "X", "Y", "Omega Ruby", "Alpha Sapphire", "Sun", "Moon", "Ultra Sun", "Ultra Moon", "Let's Go Pikachu", "Let's Go Eevee", "Sword", "Shield", "Brilliant Diamond", "Shining Pearl", "Legends Arceus"];

function genGameCheckboxes() {
    gamediv = document.getElementById('games');
    for (const game of gameNames) {
        var div = document.createElement('div');
        div.id = 'gamecard';

        checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('gamecheckbox');
        checkbox.id = "chk" + game.replace(/\s/g, '');
        checkbox.checked = true;

        var label = document.createElement('label');
        label.htmlFor = "chk" + game;

        var span = document.createElement('span');
        span.appendChild(document.createTextNode(game));

        gamediv.appendChild(div);
        div.appendChild(label);
        label.appendChild(checkbox);
        label.appendChild(span);

    }
}

genGameCheckboxes();

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('change', () => renderPoke())
});

async function getPokemon() {
    let res = await fetch("./pokedata.json");
    return await res.json();
}

async function renderPoke() {
    const dex = document.getElementById('dexnumber').value;
    const catchcard = document.getElementById('catch');
    let pokeData = await getPokemon();
    catchcard.replaceChildren("");

    Object.keys(pokeData).forEach(poke => {
        if (pokeData[poke].Num == dex) {

            var p = document.createElement('p');
            p.innerHTML = pokeData[poke].Num + " " + pokeData[poke].Name;
            catchcard.appendChild(p);

            Object.keys(pokeData[poke]).forEach(loc => {
                if (loc !== "Num" && loc !== "Name" && document.getElementById("chk" + loc.replace(/\s/g, '')).checked == true) {

                    var span = document.createElement('span');
                    var a = document.createElement('a');
                    switch (pokeData[poke][loc]) {
                        case "B":
                        case "C":
                        case "CD":
                        case "CCR":
                        case "D":
                        case "DA":
                        case "E":
                        case "ED":
                        case "EvB":
                        case "R":
                        case "RD":
                        case "S":

                            span.innerHTML = loc + " ";
                            a.href = 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_availability#Key';
                            a.innerHTML = pokeData[poke][loc];
                            a.target = '_blank';

                            catchcard.appendChild(span);
                            catchcard.appendChild(a);
                            catchcard.appendChild(document.createElement('br'));
                            break;

                        case "DR":
                        case "DW":
                        case "ET":
                        case "Ev":
                        case "EV":
                        case "EvE":
                        case "T":
                        case "PW":
                        case "x":
                        case "—":
                            break;

                        default:

                            span.innerHTML = "NOPE " + loc + " " + pokeData[poke][loc];
                            catchcard.appendChild(span);
                            catchcard.appendChild(document.createElement('br'));
                            break;
                    }

                    // catchcard.appendChild(span);
                    // catchcard.appendChild(document.createElement('br'));
                }

            })

        }

    })
}

