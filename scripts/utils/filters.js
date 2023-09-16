//GESTION DES FILTRES
const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
const photographerId = urlParams.get('id');
const currentFilter = document.querySelector("#current_filter");
const allFilters = Array.from(document.querySelectorAll(".dropdown_content li button"));
const dropDownFilters = document.querySelector(".dropdown_content");
const chevronUp = document.querySelector(".fa-chevron-up")
const mediasContainer = document.querySelector(".medias")


//GESTION DE L'OUVERTURE ET CHANGEMENT DE NOM DES FILTRES

 export function clickOnFilterButton () {
    openFilters();
    changingCurrentFilter();
}

export function openFilters() {
    if(dropDownFilters.style.display === "none") {
        dropDownFilters.style.display = "block";
        chevronUp.classList.add("rotate");

    } else {
        dropDownFilters.style.display = "none";
        chevronUp.classList.remove("rotate");

    }
}

export function changingCurrentFilter () {
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

 export async function sortByPopularity() {   
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
}


// TRIER LES MEDIAS EN FONCTION DE LEUR NOM

export async function sortByTitle() {   
    const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const medias = photographersData.media;
    const mediasByTitle = Array.from(medias);

    mediasByTitle.sort(function (a, b) { 
        return a.title.localeCompare(b.title); //filtrer par ordre alphabétique
    });

    mediasContainer.innerHTML = "";

    for (let i = 0; i < mediasByTitle.length; i++) {
        const media = mediasByTitle[i];

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
}

// TRIER LES MEDIAS EN FONCTION DE LEUR DATE

export async function sortByDate() {   
    const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const medias = photographersData.media;
    const mediasByDate = Array.from(medias);

    mediasByDate.sort(function (a, b) { 
        return b.date - a.date
    });

    mediasContainer.innerHTML = "";

    for (let i = 0; i < mediasByDate.length; i++) {
        const media = mediasByDate[i];

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
}
