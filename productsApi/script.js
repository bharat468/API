let url = "https://fakestoreapi.com/products"
let main = document.querySelector(".main")

async function feachUrl() {
    let x = await fetch(url)
    let result = await x.json()

    for (let i = 0; i < result.length; i++) {
        let card = document.createElement("div")
        card.classList.add("card")
        main.append(card)
        let img = document.createElement("img")
        img.src=result[i].image
        img.classList.add("image")
        card.append(img)
    }
}

feachUrl()