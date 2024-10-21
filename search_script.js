fetch("animeList.json").then(response=>{
    if(!response.ok){
        throw new Error(`Http error: ${response.status}`)
    }
    return response.json()
}).then(
    json => initialize(json)
).catch(err => console.error(`Fetch error: ${err.message}`))

function initialize(animeList)
{
    const category = document.querySelector("#seletCategory")
    const searchTerm = document.querySelector("#seachTerm")
    const btn =  document.querySelector("button")
    const main =  document.querySelector("main")

    let lastCategory =  category.value
    let LastSearch = " "
    
    let categoryGroup
    let finalGroup

    finalGroup = animeList
    UpdateDisplay()

    categoryGroup = []
    finalGroup = []
    
    btn.addEventListener("click", SelectCategory)

    function SelectCategory(e)
    {
        e.preventDefault()
        categoryGroup = []
        finalGroup = []

        if(category.value === lastCategory && searchTerm.value.trim()=== LastSearch ){
            return
        }
        else{
            lastCategory = category.value
            LastSearch = searchTerm.value.trim()
        

        if (category.value === "All"){
            categoryGroup = animeList
            selectAnimeList()
        }
        else{
            categoryGroup = animeList.filter(animeList => animeList.categorie.includes(category.value))
            selectAnimeList()
        }
    }
    
}
    
    function selectAnimeList(){
        if(searchTerm.value.trim() === " "){
            finalGroup = categoryGroup
        }
        else{
            const lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase()
            finalGroup = categoryGroup.filter(animeList => animeList.name.includes(lowerCaseSearchTerm))
        }
      
        UpdateDisplay()
    }

    function UpdateDisplay(){
        while(main.firstChild){
            main.removeChild(main.firstChild)
        }
        if(finalGroup.length === 0){
            const para = document.createElement("p")
            para.textContent = "nada escontrado!!!"
            main.appendChild(para)
            }
            else{
                for(const anime of finalGroup){
                    fetchbob(anime)
                }
            }
    }

    function fetchbob(anime){
        const imageMai = anime.img.replace(anime.img.charAt(0),anime.img.charAt(0).toUpperCase())
        const url = `Anime_Posters/${imageMai}`

        fetch(url).then(response=>{
            if(!response.ok){
                throw new Error(`Http error: ${response.status}`)
        }
        return response.blob()
        }).then(blob => showAnime(blob,anime))
        .catch(err=> console.error(`Fetch error: ${err.message}`))
}

    function showAnime(blob,anime){

        const objectURL = URL.createObjectURL(blob)
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const image = document.createElement('img');
        const slug =  document.createElement("h4")
        const description =  document.createElement("h5")
       

        const divImg = document.createElement("div")
        const divTxt = document.createElement("div")
        const btnView =  document.createElement("button")

        divImg.setAttribute("class", "divImg")
        divTxt.setAttribute("class", "divTxt")
        btnView.setAttribute("class", "btnView")

        description.textContent = anime.categorie
        slug.textContent = anime.description
        heading.textContent = anime.name.replace(anime.name.charAt(0),anime.name.charAt(0).toUpperCase())
        image.src = objectURL
        image.alt = anime.name
        btnView.textContent = "Watch"

        divImg.appendChild(image)
        divTxt.appendChild(heading)
        divTxt.appendChild(slug)
        divTxt.appendChild(description)
        divTxt.appendChild(btnView)
        section.appendChild(divImg)
        section.appendChild(divTxt)
        main.appendChild(section)
    }
}