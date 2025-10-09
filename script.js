let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let newUrl = "https://pokeapi.co/api/v2/type/?limit=21"
let finalData = [];
let offset = 0;
let search = [];
// console.log(search);
let select = document.querySelector("#types")
let input = document.querySelector("#searchbyname")
let main = document.querySelector("main")
let button = document.querySelector(".button")
let options = [];

async function fatchUrl(fatchtourl) {
    let reserve = await fetch(fatchtourl)
    let result = await reserve.json()
    // console.log(result);

    return result
}

window.addEventListener("load", async () => {
    let data = await fatchUrl(url)
    displayData(await fatchnew(data))

    newApi()


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
        let type = urldata[i].types[0].type.name
        let para = document.createElement("p")
        para.append(type)

        // console.log(type);
        // let type = document.createElement("p");
        // type.classList.add("type");


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

// function filterPokemons(e) {
//     console.log(pokemonsOnScreen);
//     clearScreen();
//     if (e.target.value = "all") populatePokemonsOnScreen(pokemonsOnScreen);
//     else {
//         populatePokemonsOnScreen(
//             pokemonsOnScreen.filter((obj) => {
//                 return obj.types.find((object) => object.type.name === e.target.value);
//             })
//         );
//     }
// }
// filterPokemons()





async function newApi() {
    let newpokimon = await fetch(newUrl)
    let namematch = await newpokimon.json()
    // console.log(namematch);

    for (let i = 0; i < namematch.results.length; i++) {
        let last = namematch.results[i].name;
        search.push(last)
        // console.log(search);
        // console.log(last);
        // let all = document.createElement("option")
        // all.textContent = "All";
        // all.value = "All";
        // select.append(all)

        let option = document.createElement("option")
        option.textContent = last;
        option.value = last;
        // console.log(option);
        options.push(option.value)
        // console.log(options);

        select.append(option)
        // all.addEventListener("change", () => {
        //     displayData()
        // })
    }
}


select.addEventListener("change", (e) => {
    if (e.target.value === "All") {
        displayData(finalData);
    }
    else {
        let pokemonname = finalData.filter((last) => {
            const category = last.types[0].type.name;

            return category.includes(e.target.value)
        })
        displayData(pokemonname)
    }
})



