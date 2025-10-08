let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let finalData = []
let offset = 0
let input = document.querySelector("#searchbyname")
let main = document.querySelector("main")
let button = document.querySelector(".button")

async function fatchUrl(fatchtourl) {
    let reserve = await fetch(fatchtourl)
    let result = await reserve.json()
    return result
}

window.addEventListener("load", async () => {
    let data = await fatchUrl(url)
    displayData(await fatchnew(data))
})

async function fatchnew(data) {
    let promises = [];
    for (let i = 0; i < data.results.length; i++) {
        promises.push(fatchUrl(data.results[i].url))
    }

    finalData.push(...(await Promise.all(promises)))
    return finalData
}

async function displayData(urldata) {
    main.innerHTML = ""
    for (let i = 0; i < urldata.length; i++) {
        let div = document.createElement("div")
        div.classList.add("div")
        let name = urldata[i].name
        let image = document.createElement("img")
        image.classList.add("image")
        image.src = urldata[i].sprites.other.dream_world.front_default;
        // console.log(image);
        main.append(div)
        div.append(image)
        div.append(name)
    }
}

button.addEventListener("click", async () => {
    offset = offset + 20;
    let data = await fatchUrl(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + offset
    );
    console.log(data);
    displayData(await fatchnew(data));
})

input.addEventListener("keyup", async (e) => {
    let lastwork = finalData.filter((last) => {
        return last.name.includes(e.target.value)
    })
    displayData(lastwork)
})

