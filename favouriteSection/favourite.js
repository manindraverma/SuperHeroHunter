let listOfHeroInDom = document.getElementById("heroList");
console.log("Working");

//get heros from favourite list stored as favHeros in localStorage
let listOfHeros = JSON.parse(localStorage.getItem("favHeros")); //convert json string to json object
console.log(listOfHeros);

//display each Hero present in favourite list on dom
function addHerosToDOM(hero) {
  let li = document.createElement("li");
  li.setAttribute("id", `${hero.id}`);
  li.innerHTML = `
    <img src="${
      hero.thumbnail.path + "." + hero.thumbnail.extension
    }" id = "poster"  >
    <h2 id="heroTitle"  data-id=${hero.id}>${hero.name}</h2>
    <button id="details" data-id="${hero.id}"> details </button>
    <button id="delete" data-id="${hero.id}"> Remove </button>
    `;
  listOfHeroInDom.append(li);
}
//fetch the heros detail from the api by passing the heroId from listofHeros array
async function renderHeroList() {
  listOfHeroInDom.innerHTML = "";

  for (let i = 0; i < listOfHeros.length; i++) {
    id = listOfHeros[i];
    console.log(id);
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${id}?apikey=0ad0b6aa0192cbc99a640505bd499a3c&hash=e235375203b8872f529f07a8b4f37ee8&ts=1`
    );
    heroDetails = (await response.json()).data.results[0];
    //pass heroDetails from api as parameter to addHerosToDom function
    addHerosToDOM(heroDetails);
  }
}

//handle the event
function handleKeyAndClick(e) {
  //redirect to info.html on clicking on the detail button
  if (e.target.id === "details") {
    let heroId = e.target.dataset.id;
    localStorage.setItem("heroId", JSON.stringify(heroId));

    window.open("../HerosInfoSection/info.html");
  }
  //delete the heroId present in the favourite list and update it in the local Storage
  if (e.target.id === "delete") {
    let heroId = e.target.dataset.id;
    const newFav = listOfHeros.filter(function (id) {
      return heroId !== id;
    });
    listOfHeros = [...newFav];
    //updating the favList array present in the localStorage
    localStorage.setItem("favHeros", JSON.stringify(newFav));

    let ele = document.getElementById(heroId);
    ele.style.display = "none";
  }
}

document.addEventListener("click", handleKeyAndClick);
renderHeroList();
