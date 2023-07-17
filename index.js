// const public_key='0ad0b6aa0192cbc99a640505bd499a3c';
// const privateKey='99036a5773fc130c88572d94fe97308f34a613dd';
// const hash="8173cb23cffa6bed6052fc8fd77ca504";
//const ts=1;

// const url=`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`;



let listOfHeroInDom = document.getElementById("heroList");
let errorMessage = document.getElementById("errorMessage");
let inputBar = document.getElementById("inputBar");

//array to store list of hero from the api
let listOfHeros = [];

//array to store the hero Id which has to be added in the favourite list
let favList = [];

console.log('favList',favList);

//addHerosToDom(hero)-this function is used to add each hero from the listOfheros array fetched from api into the dom individually and display some specific info of each super hero
function addHerosToDOM(hero) {
  let li = document.createElement("li");

  li.innerHTML = `
    <img src="${
      hero.thumbnail.path + "." + hero.thumbnail.extension
    }" id = "poster"  >
    <h2 id="heroTitle"  data-id=${hero.id}>${hero.name}</h2>
    <button id="details" data-id="${hero.id}"> details </button>
    <button id="favBtn" data-id="${hero.id}" data-title="${
    hero.name
  }" >Add to Favourites</button>
    `;

  //append the li element to the listOfHeroInHtml tag inside index.html file
  listOfHeroInDom.append(li);
}


//renderHeroList(text)-this function is used to show heros fetched from the api into the dom by passing items of listofhero array  as argument to addHerosInDom function
function renderHeroList(text) {
  listOfHeroInDom.innerHTML = "";
  if (listOfHeros.length === 0 && text.length != 0) {
    //if no hero found we need to display in error message as below
    errorMessage.innerHTML = `No superhero found `;

    return;
  }
  listOfHeroInDom.innerHTML = "";
  errorMessage.innerHTML = "";
  for (let i = 0; i < listOfHeros.length; i++) {
    addHerosToDOM(listOfHeros[i]);
  }
}


//function to fetch the searched  text  from the api
async function searchInput(text) {
  if (text.length ===0) {
    listOfHeroInDom.innerHTML = "";
    return;
  }

  if (text.length != 0) {
    let url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${text}&apikey=0ad0b6aa0192cbc99a640505bd499a3c&hash=e235375203b8872f529f07a8b4f37ee8&ts=1`;
    let response = await fetch(url);
    const data1 = await response.json();
    //store the data  from  api in listOfheros array
    listOfHeros = data1.data.results;
    console.log(listOfHeros);
    if (listOfHeros.length === 0) {
      //calling renderHeroList(text) function to render the html dom
      renderHeroList(text);
    } else {
      renderHeroList(text);
    }
  }
}
//addToFav-this function is used to add heros to favourite list by passing their id &  title as parameter to this function
function addToFav(heroId, heroTitle) {
  for (i of favList) {
    //check if heroId already exist
    if (i === heroId) {
      errorMessage.innerHTML = "This hero is already in the Favourite List";
      //clearing out the message in 4 seconds
      setTimeout(() => {
        errorMessage.innerHTML = "";
      }, 4000);

      return;
    }
  }
  //add heroId to favourite list
  favList.push(heroId);
 // localStorage.setItem("favHeros", JSON.stringify(favList));
  console.log(localStorage.favHeros);
  errorMessage.innerHTML = `${heroTitle} added in the favourite List`;
  //clearing out the message in 4 seconds
  setTimeout(() => {
    errorMessage.innerHTML = "";
  }, 4000);
}
//call seacrhText() function if any input is made in search bar
function handleInput(input) {
  let text = input.value;
  console.log("text", text);

  searchInput(text);
}
//clear the search bar input text
function clearInput() {
  inputBar.value = "";
  searchInput("");
  // listOfHeroInDom.innerHTML ="";
  renderHeroList("");
}

//handle the events 
function handleKeyAndClick(e) {
  if (e.target.id === "inputBar") {
    handleInput(e.target);
  }

  if (e.target.id === "details") {
    let heroId = e.target.dataset.id;
    //set heroId to be rendered  in localstorage
    localStorage.setItem("heroId", JSON.stringify(heroId));
    
  //if targeted event id is 'details' than redirect to info.html page
    window.open("./HerosInfoSection/info.html");
  }

  if (e.target.id === "favBtn") {
    //if addToFav button having id 'favBtn' is clicked than call addToFav method to add hero in the favourite list
    addToFav(e.target.dataset.id, e.target.dataset.title);
    //store favList in localStorage
    localStorage.setItem("favHeros", JSON.stringify(favList));
  }

  if (e.target.id === "favourite") {
     //if favourite button is clicked redirect to favourite.html page
    window.open("./favouriteSection/favourite.html");
  }
  if (e.target.id === "clear") {
    clearInput();
  }
}
document.addEventListener("keyup", handleKeyAndClick);
document.addEventListener("click", handleKeyAndClick);
