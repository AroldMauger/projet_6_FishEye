const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
const photographerId = urlParams.get('id');
const infoPhotographer = document.querySelector(".info-photographer");
const photographerHeader = document.querySelector(".photograph-header")
const headerInfo = document.querySelector(".header-info")
const mediasContainer = document.querySelector(".medias")

const currentFilter = document.querySelector("#current_filter");
const allFilters = Array.from(document.querySelectorAll(".dropdown_content li button"));
const buttonSortByTitle = document.querySelector("#sort-by-title");
const buttonSortByPopularity = document.querySelector("#sort-by-popularity");
const buttonSortByDate = document.querySelector("#sort-by-date");

// Fonction pour afficher les détails du photographe
async function displayPhotographerInfo(id) {
    const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const photographers = photographersData.photographers;

    const photographer = photographers.find(photographer => photographer.id === parseInt(id));

        //infoPhotographer.innerHTML = '';  

        // On affiche les informations du photographe
        const namePhotographer = document.createElement("p");
        namePhotographer.textContent = photographer.name;
        namePhotographer.classList.add("name-in-header");


        const locationPhotographer = document.createElement("p")
        locationPhotographer.textContent = photographer.city + " , " + photographer.country;
        locationPhotographer.classList.add("location-in-header");


        const taglinePhotographer = document.createElement('p');
        taglinePhotographer.textContent = photographer.tagline;
        taglinePhotographer.classList.add("tagline-in-header");


        const photoPhotographer = document.createElement("img");
        photoPhotographer.setAttribute("src", `assets/photographers/${photographer.portrait}`); // Assurez-vous que le chemin est correct
        photoPhotographer.setAttribute("alt", "Photo de profil de " + photographer.name);
        photoPhotographer.classList.add("photo-in-header")

        headerInfo.appendChild(namePhotographer);
        headerInfo.appendChild(locationPhotographer);
        headerInfo.appendChild(taglinePhotographer);

        photographerHeader.appendChild(photoPhotographer);
    
}

// On appelle la fonction pour afficher les détails du photographe avec l'ID récupéré de l'URL
displayPhotographerInfo(photographerId);


// Fonction pour afficher les détails du photographe
async function displayPhotographerMedias(id) {
    const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const photographers = photographersData.photographers;
    const medias = photographersData.media;

    const photographer = photographers.find(photographer => photographer.id === parseInt(id));


    // On affiche les informations du photographe
    for (let i = 0; i < medias.length; i++) {
        const media = medias[i];

        if(photographer.id === media.photographerId) {

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        const likesContainer = document.createElement("div");
        likesContainer.classList.add("likes-container");
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title-container");

        const mediaFromPhotographer= document.createElement("img");
        mediaFromPhotographer.setAttribute("src", `assets/Photographers_ID_Photos/${media.image}`); // Assurez-vous que le chemin est correct
        mediaFromPhotographer.classList.add("photo-from-photographer");

        const titleMedia = document.createElement("p");
        titleMedia.textContent = media.title;

        const heartIcone = document.createElement("i");
        heartIcone.className ="fa-solid fa-heart";

        const likesPhotographer = document.createElement("span");
        likesPhotographer.textContent = media.likes;


        likesContainer.appendChild(likesPhotographer);

        titleContainer.appendChild(likesContainer);
        titleContainer.appendChild(titleMedia);
        likesContainer.appendChild(heartIcone);

        cardContainer.appendChild(titleContainer);
        cardContainer.appendChild(mediaFromPhotographer);

        mediasContainer.appendChild(cardContainer);
      
     }
    }
}

// On appelle la fonction pour afficher les détails du photographe avec l'ID récupéré de l'URL
displayPhotographerMedias(photographerId);



//GESTION DE L'OUVERTURE ET FERMETURE DES FILTRES

const dropDownFilters = document.querySelector(".dropdown_content");
const buttonFilters = document.querySelector(".btn_drop");
const chevronUp = document.querySelector(".fa-chevron-up")

buttonFilters.addEventListener("click", clickOnFilterButton)


function clickOnFilterButton () {
    openFilters();
    changingCurrentFilter();
}

function openFilters() {
    if(dropDownFilters.style.display === "none") {
        dropDownFilters.style.display = "block";
        chevronUp.classList.add("rotate");

    } else {
        dropDownFilters.style.display = "none";
        chevronUp.classList.remove("rotate");

    }
}

function changingCurrentFilter () {
    let selectedFilter = allFilters.find(filter => filter.textContent == currentFilter.textContent) // on cherche le filtre qui a le même nom que celui selectionné
    
        selectedFilter.style.display = 'none';  //On met le filtre sélectionné dans les 3 options du dropdown en display:none par défaut.


        allFilters.forEach(filter => {
            filter.addEventListener('click', function() {         // quand on cliquera sur chacun des filtres
    
                currentFilter.textContent = filter.textContent;   // le texte du currentFilter est mis à jour et correspond à celui du filtre cliqué
                if (selectedFilter) selectedFilter.style.display = 'block'; // si c'est le filtre dont le contenu correspond au current, on l'affiche
    
                selectedFilter = filter;                    // selectedFilter contient le filtre cliqué
                selectedFilter.style.display = 'none';      // le filtre actuellement selectionné est caché
    
            })
        }); 

    }

// TRIER LES MEDIAS EN FONCTION DU NOMBRE DE LIKES

buttonSortByPopularity.addEventListener("click", async function () {   
    const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const medias = photographersData.media;
    const mediasByPopularity = Array.from(medias);

    mediasByPopularity.sort(function (a, b) {
        return a.likes - b.likes;
    });

    mediasContainer.innerHTML = "";

    for (let i = 0; i < mediasByPopularity.length; i++) {
        const media = mediasByPopularity[i];

        if (media.photographerId === parseInt(photographerId)) {


        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        const likesContainer = document.createElement("div");
        likesContainer.classList.add("likes-container");
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title-container");

        const mediaFromPhotographer = document.createElement("img");
        mediaFromPhotographer.setAttribute("src", `assets/Photographers_ID_Photos/${media.image}`);
        mediaFromPhotographer.classList.add("photo-from-photographer");

        const titleMedia = document.createElement("p");
        titleMedia.textContent = media.title;

        const heartIcone = document.createElement("i");
        heartIcone.className = "fa-solid fa-heart";

        const likesPhotographer = document.createElement("span");
        likesPhotographer.textContent = media.likes;

        likesContainer.appendChild(likesPhotographer);
        titleContainer.appendChild(likesContainer);
        titleContainer.appendChild(titleMedia);
        likesContainer.appendChild(heartIcone);
        cardContainer.appendChild(titleContainer);
        cardContainer.appendChild(mediaFromPhotographer);
        mediasContainer.appendChild(cardContainer);
    }
}
});

