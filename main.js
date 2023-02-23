const starWarCharInp = document.querySelector("#starWarCharacter");
const searchByNameBtn = document.querySelector("#search");
const charactersCardsArea = document.querySelector('.charachters-cards-area')
const backPageBtn = document.querySelector('#backPageBtn');
const nextPageBtn = document.querySelector('#nextPageBtn');
const showDetailsBtn = document.querySelector('#showDetails');
var pageNum = 1;

async function getData(i) {
    let response = await fetch(`https://swapi.dev/api/people/?page=${i}`)
    let data = await response.json()
    return data;
}

getData().then(data => {
    console.log(data.results);
});


function renderCharacters() {
    if (pageNum == 9) {
        for (let i = 0; i < 2; i++) {
            getData(pageNum).then(data => {
                charactersCardsArea.innerHTML += getCharacterCard(data.results[i]);
            });
        }
    } else {
        for (let i = 0; i < 10; i++) {
            getData(pageNum).then(data => {
                charactersCardsArea.innerHTML += getCharacterCard(data.results[i]);
            });
        }
    }
   
}

function getCharacterCard(characterItem) {
    return  `<ul class="list-group" style="width: 370px; margin-bottom: 40px">
                <li class="list-group-item">Name: ${characterItem.name}</li>
                <li class="list-group-item">Height: ${characterItem.height}</li>
                <li class="list-group-item">Mass: ${characterItem.mass}</li>
                <li class="list-group-item">Hair Color: ${characterItem.hair_color}</li>
                <li class="list-group-item">Skin Color: ${characterItem.skin_color}</li>
                <li class="list-group-item">Eye Color: ${characterItem.eye_color}</li>
                <li class="list-group-item">Birth Year: ${characterItem.birth_year}</li>
                <li class="list-group-item">
                    <button class="btn btn-success d-block col-md-12" id="showDetails">show details</button>
                </li>
            </ul>`;
}

renderCharacters();

backPageBtn.addEventListener("click", function() {
    if (pageNum != 1) {
        pageNum--;
        charactersCardsArea.innerHTML = '';
        renderCharacters();
    } else {
        window.alert("You're on the first page");
    }
});

nextPageBtn.addEventListener("click", function() {
    if (pageNum != 9) {
        pageNum++;
        charactersCardsArea.innerHTML = '';
        renderCharacters();
    } else {
        window.alert("You're on the last page");
    }
});


searchByNameBtn.addEventListener("click", function() {
    var charUrl = '';
    var charName = starWarCharInp.value;
    for (let j = 1 ; j < 10; j++) {
        for (let i = 0; i < 10; i++) {
            getData(j).then(data => {
                if (data.results[i].name == charName) {
                    charactersCardsArea.innerHTML = '';
                    charUrl = data.results[i].url;
                    getCharacterByName(charUrl);
                    return;
                }
            });
        }
    }
   
});


async function getCharacterByName(charUrl) {
    let response = await fetch(`${charUrl}`)
    let data = await response.json()
    charactersCardsArea.innerHTML += getCharacterCard(data);
    return data;
}
