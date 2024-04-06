import {openLightboxPopularity } from "../utils/lightbox.js";
import {incrementLikes} from"../utils/likes.js";


const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
const photographerId = urlParams.get("id");					   // On met l'id dans une variable photographerId
const photographerHeader = document.querySelector(".photograph-header");
const headerInfo = document.querySelector(".header-info");
const mediasContainer = document.querySelector(".medias");
const nameInModalContainer = document.querySelector(".name-in-contactModal");
const dropDownFilters = document.querySelector(".dropdown_content");
const chevronUp = document.querySelector(".fa-chevron-down");

// LA FONCTION RESPONSABLE DE LA RÉCUPÉRATION DES DONNÉES DEPUIS LE FICHIER JSON
export async function fetchData() {						
	const response = await fetch("./data/photographers.json"); 
	return await response.json();
}

// Ici on définit les paramètres des fonctions qui dépendent de fetchData()
fetchData().then(photographersData => {
	displayPhotographerInfo(photographerId, photographersData);
	displayPhotographerMedias(photographerId, photographersData);
	incrementLikes(photographerId, photographersData);
});

/*FONCTION QUI GENERE LES ELEMENTS TEXTUELS (h1, h2, p)
Chaque élément textuel aura un tag (balise), un contenu "textContent", et une class facultative*/
function createTextualElements(tag, textContent, className) {  
	const element = document.createElement(tag);
	element.textContent = textContent;
	if (className) element.classList.add(className);
	return element;
}

// FONCTION POUR AFFICHER LES DONNÉES DU PHOTOGRAPHE
async function displayPhotographerInfo(id, photographersData) {

	// On cherche dans le fichier JSON le photographe dont l'id correspond à l'id dans l'URL 
	const photographer = photographersData.photographers.find(photographer => photographer.id === parseInt(id));  
	if (!photographer) {
		window.location.href = "index.html";				// Si le photographe n'existe pas, alors retour à la page d'accueil
	} else {
		// On affiche les informations du photographe
		const namePhotographer = createTextualElements("h1", photographer.name, "name-in-header");
		const locationPhotographer = createTextualElements("h2", `${photographer.city}, ${photographer.country}`, "location-in-header");
		const taglinePhotographer = createTextualElements("p", photographer.tagline, "tagline-in-header");

		const photoPhotographer = document.createElement("img");
		photoPhotographer.setAttribute("src", `assets/photographers/${photographer.portrait}`); // Assurez-vous que le chemin est correct
		photoPhotographer.setAttribute("alt", "Profile picture of " + photographer.name);
		photoPhotographer.setAttribute("aria-label", photographer.name);
		photoPhotographer.classList.add("photo-in-header");

		headerInfo.appendChild(namePhotographer);
		headerInfo.appendChild(locationPhotographer);
		headerInfo.appendChild(taglinePhotographer);
		photographerHeader.appendChild(photoPhotographer);

		//Ajout du nom du photographe dans le formulaire de contact
		const photographerNameInModal = createTextualElements("span", photographer.name);
		nameInModalContainer.classList.add("nameInForm");
		nameInModalContainer.appendChild(photographerNameInModal);

		const modal = document.getElementById("contact_modal");
		modal.setAttribute("aria-label", "Contact me " + photographer.name);  // Ajout de l'aria-label pour le formulaire de contact
	}
}
// FONCTION QUI GENERE LES MEDIAS AU CHARGEMENT DE LA PAGE EN FONCTION DE L'ID DU PHOTOGRAPHE
export async function displayPhotographerMedias(id, photographersData) {
	const medias = photographersData.media;

	const mediasByPopularity = [...medias].sort((a, b) => a.likes - b.likes);
	mediasContainer.innerHTML = "";
	mediasByPopularity.forEach(media => {
		if (media.photographerId === parseInt(photographerId)) {   // parseInt permet de comparer des numbers
			createCardElement(media);
		}
	});
	openLightboxPopularity(); 
}

// FONCTION QUI GENERE CHACUN DES MEDIAS SOUS LA FORME DE CARD
export function createCardElement(media) {

	const divCardContainer = document.createElement("div");
	divCardContainer.classList.add("div-card-container");

	const cardContainer = document.createElement("a");
	cardContainer.classList.add("card-container");
	cardContainer.setAttribute("id", media.id); 	
	cardContainer.setAttribute("tabindex", "0"); 

	cardContainer.addEventListener("focus", function() {   		// On masque les filtres lorsque le focus est sur un likesButton
		dropDownFilters.style.display = "none";
		chevronUp.classList.remove("rotate");
		dropDownFilters.setAttribute("aria-hidden", "true");
	});

	const likesContainer = document.createElement("div");
	likesContainer.classList.add("likes-container");
	const titleContainer = document.createElement("div");
	titleContainer.classList.add("title-container");
	
	const image = document.createElement("img");
	image.src = `assets/Photographers_ID_Photos/${media.image}`;
	image.alt = media.title;
	image.classList.add("photo-from-photographer");
	image.setAttribute("alt", media.title + ", closeup view");
    
	const titleMedia = document.createElement("h3");
	titleMedia.textContent = media.title;
	titleMedia.classList.add("title-media");
    
	const likesButton = document.createElement("button");
	likesButton.setAttribute("id", media.id); 
	likesButton.classList.add("likes-button");
	likesButton.setAttribute("liked", "false");    // cette ligne va permettre de gérer la resctriction de l'incrémentation des likes dans likes.js
	likesButton.setAttribute("role", "button");   
	likesButton.setAttribute("tabindex", "0");    // likesButton pourra être focus avec les tabulations du clavier grâce à tabindex
	
	const heartIcone = document.createElement("i");
	heartIcone.className ="fa-solid fa-heart";
	heartIcone.setAttribute("aria-label", "likes");


	const likesPhotographer = document.createElement("span");
	likesPhotographer.textContent = media.likes;
	likesPhotographer.classList.add("number-of-likes");
	likesPhotographer.setAttribute("id", media.id); 

	divCardContainer.appendChild(cardContainer);
	mediasContainer.appendChild(divCardContainer);
	likesContainer.appendChild(likesPhotographer);
	titleContainer.appendChild(likesContainer);
	titleContainer.appendChild(titleMedia);
	likesButton.appendChild(heartIcone);
	likesContainer.appendChild(likesButton);
	divCardContainer.appendChild(titleContainer);
	cardContainer.appendChild(image);
	

}


  