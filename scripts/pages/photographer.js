import { openLightbox  } from "../utils/lightbox.js";
import { clickOnFilterButton, sortByPopularity, sortByTitle, sortByDate } from "../utils/filters.js";



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

// FONCTION QUI GENERE LES MEDIAS AU CHARGEMENT DE LA PAGE EN FONCTION DE L'ID DU PHOTOGRAPHE
async function displayPhotographerMedias(id) {
    const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const photographers = photographersData.photographers;
    const medias = photographersData.media;

    const photographer = photographers.find(photographer => photographer.id === parseInt(id));
    
    for (let i = 0; i < medias.length; i++) {  // On parcourt les medias du JSON
        const media = medias[i];

        if(photographer.id === media.photographerId) {
        
        const divCardContainer = document.createElement("div");
        divCardContainer.classList.add("div-card-container");
       
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
        
        const likesButton = document.createElement("button")
        likesButton.setAttribute("id", media.id); 
        likesButton.classList.add("likes-button");
        likesButton.setAttribute("liked", "false");    // cette ligne va permettre de gérer la resctriction de l'incrémentation des likes

        const heartIcone = document.createElement("i");
        heartIcone.className ="fa-solid fa-heart";

        const likesPhotographer = document.createElement("span");
        likesPhotographer.textContent = media.likes;
        likesPhotographer.classList.add("number-of-likes");
        likesPhotographer.setAttribute("id", media.id); 


        likesContainer.appendChild(likesPhotographer);

        titleContainer.appendChild(likesContainer);
        titleContainer.appendChild(titleMedia);
        likesButton.appendChild(heartIcone)
        likesContainer.appendChild(likesButton);

        divCardContainer.appendChild(titleContainer);
        cardContainer.appendChild(mediaFromPhotographer);

        divCardContainer.appendChild(cardContainer);
        mediasContainer.appendChild(divCardContainer);
        
     }
    }

const likesButtons = document.querySelectorAll(".likes-button");

likesButtons.forEach(likesButton => {
    likesButton.addEventListener("click", async function() {
        const response = await fetch('/data/photographers.json'); 
        const photographersData = await response.json();
        const medias = photographersData.media;

        const mediaId = likesButton.id;                          // On veut que l'id du media corresponde à celui de son bouton    
        const media = medias.find(media => media.id == mediaId);


        if (likesButton.getAttribute("liked") === "false") {    // Si l'attribut du bouton est toujours sur false
            media.likes++;                                      // On incrémente
            likesButton.setAttribute("liked", "true");          // On actualise l'attribut du bouton sur true

        const likesPhotographer = document.querySelectorAll(".number-of-likes");

        likesPhotographer.forEach(likePhotographer => {

        if(likePhotographer.id === mediaId) {
            const likesCount = parseInt(likePhotographer.textContent, 10); // On convertit la chaîne de caractères en nombre avec parseInt
            likePhotographer.textContent = (likesCount + 1).toString();  // On ajoute 1 et on reconvertit en chaîne de caractères

        }
        const heartIcone = likesButton.querySelector(".fa-heart");
            heartIcone.style.color = "#901C1C";

    });
}});

})

    openLightbox()  // appel de la fonction pour ouvrir la Lightbox
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




