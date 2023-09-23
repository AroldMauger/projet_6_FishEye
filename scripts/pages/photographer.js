import { openLightboxPopularity, openLightboxName, openLightboxDate  } from "../utils/lightbox.js";

const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
const photographerId = urlParams.get("id");
const photographerHeader = document.querySelector(".photograph-header");
const headerInfo = document.querySelector(".header-info");
const mediasContainer = document.querySelector(".medias");
const buttonSortByPopularity = document.querySelector("#sort-by-popularity");
const buttonSortByTitle = document.querySelector("#sort-by-title");
const buttonSortByDate = document.querySelector("#sort-by-date");
const buttonFilters = document.querySelector(".btn_drop");
const nameInModalContainer = document.querySelector(".name-in-contactModal");
const dropDownFilters = document.querySelector(".dropdown_content");
const dropDown = document.querySelector(".btn_drop");
const chevronUp = document.querySelector(".fa-chevron-down");
const allFilters = Array.from(document.querySelectorAll(".dropdown_content li button"));
const currentFilter = document.querySelector("#current_filter");
const buttonHeader = document.querySelector(".button-header");

export async function fetchData() {
	const response = await fetch("/data/photographers.json"); 
	return await response.json();
}

// Cette fonction va nous permettre d'économiser des lignes de code pour générer les éléments textuels du DOM
function createTextualElements(tag, textContent, className) {  // Chaque élément textuel aura un tag (balise), un contenu "textContent", et une class facultative
	const element = document.createElement(tag);
	element.textContent = textContent;
	if (className) element.classList.add(className);
	return element;
}
// Fonction pour afficher les détails du photographe
async function displayPhotographerInfo(id, photographersData) {

	const photographer = photographersData.photographers.find(photographer => photographer.id === parseInt(id));

	if (!photographer) {
		window.location.href = "index.html";
	} else {
		// On affiche les informations du photographe
		const namePhotographer = createTextualElements("p", photographer.name, "name-in-header");
		const locationPhotographer = createTextualElements("p", `${photographer.city}, ${photographer.country}`, "location-in-header");
		const taglinePhotographer = createTextualElements("p", photographer.tagline, "tagline-in-header");

		const photoPhotographer = document.createElement("img");
		photoPhotographer.setAttribute("src", `assets/photographers/${photographer.portrait}`); // Assurez-vous que le chemin est correct
		photoPhotographer.setAttribute("alt", "Photo de profil de " + photographer.name);
		photoPhotographer.classList.add("photo-in-header");

		headerInfo.appendChild(namePhotographer);
		headerInfo.appendChild(locationPhotographer);
		headerInfo.appendChild(taglinePhotographer);
		photographerHeader.appendChild(photoPhotographer);

		//Ajout du nom du photographe dans le formulaire de contact
		const photographerNameInModal = createTextualElements("span", photographer.name);
		nameInModalContainer.classList.add("nameInForm");
		nameInModalContainer.appendChild(photographerNameInModal);

        
	}
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
buttonFilters.addEventListener("click", clickOnFilterButton);

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
    
	function createMediaElement(media) {
		
		if (media.video) {
			const video = document.createElement("video");
			video.src = `assets/Photographers_ID_Photos/${media.video}`;
			video.controls = false;
			video.classList.add("photo-from-photographer");
			video.setAttribute("alt", media.title);
			return video;
		} else {
			const image = document.createElement("img");
			image.src = `assets/Photographers_ID_Photos/${media.image}`;
			image.alt = media.title;
			image.classList.add("photo-from-photographer");
			image.setAttribute("alt", media.title);
			return image;
		}
	}

	const mediaFromPhotographer = createMediaElement(media);

    
	const titleMedia = document.createElement("p");
	titleMedia.textContent = media.title;
    
	const likesButton = document.createElement("button");
	likesButton.setAttribute("id", media.id); 
	likesButton.classList.add("likes-button");
	likesButton.setAttribute("liked", "false");    // cette ligne va permettre de gérer la resctriction de l'incrémentation des likes
	likesButton.setAttribute("role", "button");   
	likesButton.setAttribute("tabindex", "0");
	
	


	const heartIcone = document.createElement("i");
	heartIcone.className ="fa-solid fa-heart";

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
	cardContainer.appendChild(mediaFromPhotographer);
	

}

// GESTION DES FILTRES
function openFilters() {
	if(dropDownFilters.style.display === "none") {
		dropDownFilters.style.display = "block";
		chevronUp.classList.add("rotate");
		dropDownFilters.setAttribute("aria-hidden", "false");

	} else {
		dropDownFilters.style.display = "none";
		chevronUp.classList.remove("rotate");
		dropDownFilters.setAttribute("aria-hidden", "true");
	}
}



/* On ferme les filtres si on clique en dehors des filtres */
window.addEventListener("click", function(e) {
	if (e.target !== dropDown && e.target !== dropDownFilters && e.target !== currentFilter && e.target !== chevronUp) {
		dropDownFilters.style.display = "none";
		chevronUp.classList.remove("rotate");
		dropDownFilters.setAttribute("aria-hidden", "true");
	}
});

/* On ferme les filtres quand le bouton "Contactez-moi" est focuse */

buttonHeader.addEventListener("focus", function() {   
	dropDownFilters.style.display = "none";
	chevronUp.classList.remove("rotate");
	dropDownFilters.setAttribute("aria-hidden", "true");
});


function changingCurrentFilter() {
	let selectedFilter = allFilters.find(filter => filter.textContent === currentFilter.textContent);
	selectedFilter.style.display = "none";
  
	allFilters.forEach(filter => {
		filter.addEventListener("click", function () {
			currentFilter.textContent = filter.textContent;
			if (selectedFilter) selectedFilter.style.display = "block";
			selectedFilter = filter;
			selectedFilter.style.display = "none";
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
	incrementLikes(photographerId, photographersData);

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
	incrementLikes(photographerId, photographersData);

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
	incrementLikes(photographerId, photographersData);
}



  

const totalLikesAndPrice = document.querySelector("aside");
let totalLikes = 0;

function incrementLikes(id, photographersData) {

	// FAIRE APPARAITRE LE NOMBRE TOTAL DE LIKES ET LE PRIX PAR JOUR
	const medias = photographersData.media;
	const photographer = photographersData.photographers.find(photographer => photographer.id === parseInt(id));
	const filteredMedias = medias.filter(media => media.photographerId === parseInt(id)); // Utilisez 'id' au lieu de 'photographerId'

	totalLikes = filteredMedias.reduce((total, media) => total + media.likes, 0);

	const divInAside = document.createElement("div");
	divInAside.classList.add("div-in-aside");

	const numberOfTotalLikes = document.createElement("span");
	numberOfTotalLikes.textContent = totalLikes.toString();
	numberOfTotalLikes.classList.add("number-of-total-likes");

	const heartInAside = document.createElement("i");
	heartInAside.className = "fa-solid fa-heart";

	const price = document.createElement("span");
	price.textContent = `${photographer.price} / jour`;

	totalLikesAndPrice.innerHTML = "";
	divInAside.appendChild(numberOfTotalLikes);
	divInAside.appendChild(heartInAside);
	totalLikesAndPrice.appendChild(divInAside);

	totalLikesAndPrice.appendChild(price);

	const likesButtons = document.querySelectorAll(".likes-button");

	
  
	likesButtons.forEach(likesButton => {
		likesButton.addEventListener("click",  function () {
      

			const mediaId = likesButton.id;
			const media = medias.find(media => media.id == mediaId);

			if (likesButton.getAttribute("liked") === "false") {
				media.likes++;
				likesButton.setAttribute("liked", "true");
				totalLikes++;
				numberOfTotalLikes.textContent = totalLikes.toString();


				const likesPhotographer = document.querySelectorAll(".number-of-likes");

				likesPhotographer.forEach(likePhotographer => {
					if (likePhotographer.id === mediaId) {
						const likesCount = parseInt(likePhotographer.textContent, 10);
						likePhotographer.textContent = (likesCount + 1).toString();
					}

					const heartIcone = likesButton.querySelector(".fa-heart");
					heartIcone.style.color = "#901C1C";
				});
			}
		});
	});
}
