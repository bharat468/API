let main = document.querySelector(".main")
// let url = "https://pokeapi.co/api/v2/pokemon/1/"
let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
async function fetchurl() {
    let x = await fetch(url)
    let result = await x.json()
    console.log(result);
    console.log(result.results);
    let arr = result.results

    for (let i = 0; i < arr.length; i++) {


        let name = document.createElement("div")
        name.innerText = arr[i].name
        let newurl = arr[i].url
        console.log(newurl);
        let y = await fetch(newurl)
        let newresult = await y.json()
        console.log(newresult);

        let image = newresult.sprites.other.dream_world.front_default
        // console.log(image);

        let div = document.createElement("div")
        div.classList.add("div")
        main.append(div)
        div.append(name)
        let img = document.createElement("img")
        img.src = image
        div.prepend(img)
    }
}
fetchurl()

// async function newfeachurl(newurl) {

// }


