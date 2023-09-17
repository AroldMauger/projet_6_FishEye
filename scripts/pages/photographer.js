import { clickOnFilterButton, sortByPopularity, sortByTitle, sortByDate  } from "../utils/filters.js";
import { openLightbox  } from "../utils/lightbox.js";



const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
const photographerId = urlParams.get('id');
const photographerHeader = document.querySelector(".photograph-header")
const headerInfo = document.querySelector(".header-info")
const mediasContainer = document.querySelector(".medias")
const buttonSortByPopularity = document.querySelector("#sort-by-popularity");
const buttonSortByTitle = document.querySelector("#sort-by-title");
const buttonSortByDate = document.querySelector("#sort-by-date");

const buttonFilters = document.querySelector(".btn_drop");

const nameInModalContainer = document.querySelector(".name-in-contactModal");


// Fonction pour afficher les détails du photographe
async function displayPhotographerInfo(id) {
    const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const photographers = photographersData.photographers;

    const photographer = photographers.find(photographer => photographer.id === parseInt(id));

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

        //Ajout du nom du photographe dans le formulaire de contact
        const photographerNameInModal = document.createElement("span");
        photographerNameInModal.textContent = photographer.name

        nameInModalContainer.classList.add("nameInForm")

        nameInModalContainer.appendChild(photographerNameInModal);

    
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

        const cardContainer = document.createElement("a");
        cardContainer.classList.add("card-container");
        cardContainer.setAttribute("id", media.id); 


        const likesContainer = document.createElement("div");
        likesContainer.classList.add("likes-container");
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title-container");

        const mediaFromPhotographer= document.createElement("img");
        mediaFromPhotographer.setAttribute("src", `assets/Photographers_ID_Photos/${media.image}`); 
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
    openLightbox() // appel de la fonction pour ouvrir la Lightbox
}

// On appelle la fonction pour afficher les détails du photographe avec l'ID récupéré de l'URL
displayPhotographerMedias(photographerId);

// Evenement au clic sur le bouton des filtres
buttonFilters.addEventListener("click", clickOnFilterButton)

// Evenement au clic sur le bouton filtre "Popularité"
buttonSortByPopularity.addEventListener("click", sortByPopularity)

// Evenement au clic sur le bouton filtre "Titre"
buttonSortByTitle.addEventListener("click", sortByTitle)

// Evenement au clic sur le bouton filtre "Titre"
buttonSortByDate.addEventListener("click", sortByDate)