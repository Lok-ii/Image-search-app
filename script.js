let search = document.querySelector("#search");
let searchBtn = document.querySelector("form");
let showMore = document.querySelector(".show-more");
let container = document.querySelector(".image-container");

let getImages = async (page)=>{
    let images = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${search.value}&client_id=JLG2my6265GxYGDQzPO9sPhpU5uQHQq-z4_Z6QLCuM4`);
    let response = await images.json();

    if(response.results.length >= 10){
        showMore.style.display = "block";
    }

    response.results.map((e) => {
        let newElement = document.createElement('div');
        newElement.className = "image-card";
        newElement.style.backgroundImage = `url(${e.urls.regular})`;
        newElement.innerHTML = `
        <a href="${e.links.html}" class="text" target="_blank"><p class="description">${e.alt_description}</p>
        </a><a href="${e.urls.full}" target="_blank" class="download" download="image"><img src="${e.urls.full}" alt=""><i class="fa-solid fa-download"></i></a>`
        

        container.appendChild(newElement);
    });

    console.log(response);
}

let page = 1;

searchBtn.addEventListener("submit", (e)=>{
    e.preventDefault();
    container.innerHTML = "";
    getImages(page);
});

showMore.addEventListener("click", ()=>{
    page++;
    getImages(page);
})
