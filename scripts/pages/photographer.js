import { openLightbox, openLightboxPopularity, openLightboxName, openLightboxDate  } from "../utils/lightbox.js";
import { incrementLikes  } from "../utils/likes.js";


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
const dropDownFilters = document.querySelector(".dropdown_content");
const chevronUp = document.querySelector(".fa-chevron-up")
const allFilters = Array.from(document.querySelectorAll(".dropdown_content li button"));
const currentFilter = document.querySelector("#current_filter");

export async function fetchData() {
    const response = await fetch('/data/photographers.json'); 
    return await response.json();
}
// Fonction pour afficher les détails du photographe
async function displayPhotographerInfo(id, photographersData) {

    const photographer = photographersData.photographers.find(photographer => photographer.id === parseInt(id));

// Cette fonction va nous permettre d'économiser des lignes de code pour générer les éléments textuels du DOM
    function createTextualElements(tag, textContent, className) {  // Chaque élément textuel aura un tag (balise), un contenu "textContent", et une class facultative
        const element = document.createElement(tag);
        element.textContent = textContent;
        if (className) element.classList.add(className);
        return element;
      }
      
        // On affiche les informations du photographe
        const namePhotographer = createTextualElements("p", photographer.name, "name-in-header");
        const locationPhotographer = createTextualElements("p", `${photographer.city}, ${photographer.country}`, "location-in-header");
        const taglinePhotographer = createTextualElements("p", photographer.tagline, "tagline-in-header");

        const photoPhotographer = document.createElement("img");
        photoPhotographer.setAttribute("src", `assets/photographers/${photographer.portrait}`); // Assurez-vous que le chemin est correct
        photoPhotographer.setAttribute("alt", "Photo de profil de " + photographer.name);
        photoPhotographer.classList.add("photo-in-header")

        headerInfo.appendChild(namePhotographer);
        headerInfo.appendChild(locationPhotographer);
        headerInfo.appendChild(taglinePhotographer);
        photographerHeader.appendChild(photoPhotographer);

        //Ajout du nom du photographe dans le formulaire de contact
        const photographerNameInModal = createTextualElements("span", photographer.name);
        nameInModalContainer.classList.add("nameInForm")
        nameInModalContainer.appendChild(photographerNameInModal);

        
    }


// FONCTION QUI GENERE LES MEDIAS AU CHARGEMENT DE LA PAGE EN FONCTION DE L'ID DU PHOTOGRAPHE
export async function displayPhotographerMedias(id, photographersData) {
    const medias = photographersData.media;

     const mediasByPopularity = [...medias].sort((a, b) => a.likes - b.likes);
     mediasContainer.innerHTML = "";
     mediasByPopularity.forEach(media => {
       if (media.photographerId === parseInt(photographerId)) {
        createCardElement(media);
       }
     });
   
     openLightboxPopularity();
 
}

// Appels aux fonctions
fetchData().then(photographersData => {
    displayPhotographerInfo(photographerId, photographersData);
    displayPhotographerMedias(photographerId, photographersData);
    incrementLikes(photographerId, photographersData);
  });


// Evenement au clic sur le bouton des filtres
buttonFilters.addEventListener("click", clickOnFilterButton)

buttonSortByPopularity.addEventListener("click", sortByPopularity);
buttonSortByTitle.addEventListener("click", sortByTitle);
buttonSortByDate.addEventListener("click", sortByDate);




function clickOnFilterButton () {
    openFilters();
    changingCurrentFilter();
}



  function createCardElement(media) {
        
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


 // GESTION DES FILTRES
function openFilters() {
    if(dropDownFilters.style.display === "none") {
        dropDownFilters.style.display = "block";
        chevronUp.classList.add("rotate");

    } else {
        dropDownFilters.style.display = "none";
        chevronUp.classList.remove("rotate");

    }
}


function changingCurrentFilter() {
    let selectedFilter = allFilters.find(filter => filter.textContent === currentFilter.textContent);
    selectedFilter.style.display = 'none';
  
    allFilters.forEach(filter => {
      filter.addEventListener('click', function () {
        currentFilter.textContent = filter.textContent;
        if (selectedFilter) selectedFilter.style.display = 'block';
        selectedFilter = filter;
        selectedFilter.style.display = 'none';
      });
    });
  }


  async function sortByPopularity() {
    const photographersData = await fetchData();
    const medias = photographersData.media;
    const mediasByPopularity = [...medias].sort((a, b) => a.likes - b.likes);
  
    mediasContainer.innerHTML = "";
    mediasByPopularity.forEach(media => {
      if (media.photographerId === parseInt(photographerId)) {
        createCardElement(media);
      }
    });
    openLightboxPopularity();
  }
  
  async function sortByTitle() {
    const photographersData = await fetchData();
    const medias = photographersData.media;
    const mediasByTitle = [...medias].sort((a, b) => a.title.localeCompare(b.title));
  
    mediasContainer.innerHTML = "";
    mediasByTitle.forEach(media => {
      if (media.photographerId === parseInt(photographerId)) {
        createCardElement(media);
      }
    });
    openLightboxName();
  }
  
  async function sortByDate() {
    const photographersData = await fetchData();
    const medias = photographersData.media;
    const mediasByDate = [...medias].sort((a, b) => new Date(b.date) - new Date(a.date));
  
    mediasContainer.innerHTML = "";
    mediasByDate.forEach(media => {
      if (media.photographerId === parseInt(photographerId)) {
        createCardElement(media);
      }
    });
    openLightboxDate();
  }