let heroId = JSON.parse(localStorage.getItem("heroId"));

let heroDetails = null;
let titleEle = document.getElementById("name");
let imgEle = document.getElementsByTagName("img")[0];
let description = document.getElementById("description");
let comics = document.getElementById("comics");
let series = document.getElementById("series");
let releaseDate = document.getElementById("release-data");
let seriesNumber = document.getElementById("seriesNumber");
let comicNumber = document.getElementById("comicNumber");

//function to fetch a particular hero complete info from api
async function fetchHeroDetails(id){
    
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=0ad0b6aa0192cbc99a640505bd499a3c&hash=e235375203b8872f529f07a8b4f37ee8&ts=1`);

    //store the api result in heroDetails identifier
    heroDetails =(await response.json()).data.results[0];
    console.log(heroDetails);

     //render the heroDetails data on dom 
    if(heroDetails.description.length != 0)
    description.innerHTML += `<h2>${heroDetails.description}</h2>`;
    else
    description.innerHTML += `<h2>Description Not available</h2>`;
    titleEle.innerHTML +=`<h2> ${heroDetails.name} </h2>`;
    let date = `${heroDetails.modified}`
    let parsedDate = "";
    for(i of date){
        if(('0'  <= i && i <= '9') || i == '-')
            parsedDate += i;
        else break;
    }
    releaseDate.innerHTML +=  `<h2>${parsedDate}</h2>`;
    imgEle.setAttribute("src", `${heroDetails.thumbnail.path}.${heroDetails.thumbnail.extension}`);
    seriesNumber.innerHTML += `${heroDetails.series.available}`;
    let seriesNum = 1;
    for(i of heroDetails.series.items){
        series.innerHTML += `<h2>Series Number ${seriesNum}: ${i.name}</h2>`;
        seriesNum++;
    }
    comicNumber.innerHTML += `${heroDetails.comics.available}`;
    let comicsNum = 1;
    for(i of heroDetails.comics.items){
        comics.innerHTML += `<h2>Comic Number ${comicsNum}: ${i.name}</h2>`;
        comicsNum++;
    }

}
//handle and call the fetchHeroDetail function by passing  heroId as argument
function heroLoad(){
    
    fetchHeroDetails(heroId);
    
}
heroLoad();