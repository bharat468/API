let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let finalData = []

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

async function displayData(){

}


