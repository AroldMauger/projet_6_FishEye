import {fetchData, createCardElement } from "../pages/photographer.js";
import {openLightboxPopularity, openLightboxName, openLightboxDate } from "../utils/lightbox.js";
import {incrementLikes} from "../utils/likes.js";
const buttonSortByPopularity = document.querySelector("#sort-by-popularity");
const buttonSortByTitle = document.querySelector("#sort-by-title");
const buttonSortByDate = document.querySelector("#sort-by-date");

//GESTION DES FILTRES
const urlParams = new URLSearchParams(window.location.search); 
const photographerId = urlParams.get('id');
const currentFilter = document.querySelector("#current_filter");
const allFilters = Array.from(document.querySelectorAll(".dropdown_content li button"));
const dropDownFilters = document.querySelector(".dropdown_content");
const chevronUp = document.querySelector(".fa-chevron-down");
const mediasContainer = document.querySelector(".medias");
const buttonHeader = document.querySelector(".button-header");
const buttonFilters = document.querySelector(".btn_drop");

// GESTION DES FILTRES
export function openFilters() {
	if(dropDownFilters.style.display === "none") {
		dropDownFilters.style.display = "block";
		chevronUp.classList.add("rotate");                        // la class "rotate" permet de faire "transform: rotate(180deg);" sur le chevron
		dropDownFilters.setAttribute("aria-hidden", "false");
		buttonFilters.setAttribute("aria-expanded", "true");
		dropDownFilters.setAttribute("aria-activedescendant", "true");
	} else {
		dropDownFilters.style.display = "none";
		chevronUp.classList.remove("rotate");
		dropDownFilters.setAttribute("aria-hidden", "true");
		buttonFilters.setAttribute("aria-expanded", "false");
		dropDownFilters.removeAttribute("aria-activedescendant");
	}
}


/* On ferme les filtres si on clique en dehors des filtres */
window.addEventListener("click", function(e) {
	if (e.target !== buttonFilters && e.target !== dropDownFilters && e.target !== currentFilter && e.target !== chevronUp) {
		dropDownFilters.style.display = "none";
		chevronUp.classList.remove("rotate");
		dropDownFilters.setAttribute("aria-hidden", "true");
	}
});

/* On ferme les filtres quand le bouton "Contactez-moi" est focus */

buttonHeader.addEventListener("focus", function() {   
	dropDownFilters.style.display = "none";
	chevronUp.classList.remove("rotate");
	dropDownFilters.setAttribute("aria-hidden", "true");
});

// FONCTION QUI GERE LE CHANGEMENT DE FILTRE
export function changingCurrentFilter() {
  // On cherche le filtre dont le nom correspond avec le filtre actuellement selectionné
	let selectedFilter = allFilters.find(filter => filter.textContent === currentFilter.textContent);
  // Ce filtre ne doit pas être visible
	selectedFilter.style.display = "none";

	allFilters.forEach(filter => {
		filter.addEventListener("click", function () {

      // Quand on clique sur un filtre, le nom du filtre actuel change et prend le nom du filtre cliqué
			currentFilter.textContent = filter.textContent;

      // Ce filtre cliqué doit passer en display:none pour être masqué
			if (selectedFilter) selectedFilter.style.display = "block";
			selectedFilter = filter;
			selectedFilter.style.display = "none";
		});
		filter.addEventListener("focus", function(){
			filter.setAttribute("aria-activedescendant", "true");
		});
		selectedFilter.addEventListener("focus", function(){
			filter.setAttribute("aria-selected", "true");
		});
	});
	
}

// L'EVENEMENT QUI APPELLE LES FONCTIONS D'OUVERTURE ET DE CHANGEMENT DE FILTRE
buttonFilters.addEventListener("click", clickOnFilterButton);

function clickOnFilterButton () {
	openFilters();
	changingCurrentFilter();
}

// LE TRIE PAR POPULARITÉ
export async function sortByPopularity() {
	const photographersData = await fetchData();
	const medias = photographersData.media;
	const mediasByPopularity = [...medias].sort((a, b) => a.likes - b.likes);   // On trie par ordre croissant en fonction des likes
  
	mediasContainer.innerHTML = "";                                             // On efface tous les medias avec innerHTML
	mediasByPopularity.forEach(media => {
		if (media.photographerId === parseInt(photographerId)) {              // On affiche les medias triés par likes si leur id = l'id du photographe
			createCardElement(media);                                           // Appelle de la fonction qui génère les medias
		}
	});
	openLightboxPopularity();
	incrementLikes(photographerId, photographersData);
}
  
export async function sortByTitle() {
	const photographersData = await fetchData();
	const medias = photographersData.media;
	const mediasByTitle = [...medias].sort((a, b) => a.title.localeCompare(b.title)); // On trie par ordre alphabétique à partir d'un tableau des medias
  
	mediasContainer.innerHTML = "";                                            // On efface tous les medias avec innerHTML
	mediasByTitle.forEach(media => {
		if (media.photographerId === parseInt(photographerId)) {                 // On affiche les medias triés par likes si leur id = l'id du photographe
			createCardElement(media);
		}
	});
	openLightboxName();
	incrementLikes(photographerId, photographersData);

}
  
export async function sortByDate() {
	const photographersData = await fetchData();
	const medias = photographersData.media;
	const mediasByDate = [...medias].sort((a, b) => new Date(b.date) - new Date(a.date)); // On trie par date à partir d'un tableau des medias
  
	mediasContainer.innerHTML = "";                                            // On efface tous les medias avec innerHTML
	mediasByDate.forEach(media => {
		if (media.photographerId === parseInt(photographerId)) {                // On affiche les medias triés par likes si leur id = l'id du photographe
			createCardElement(media);
        
		}
	});
	openLightboxDate();
	incrementLikes(photographerId, photographersData);
}

// LES EVENEMENTS QUI DÉCLENCHENT LES FONCTIONS DE TRIE
buttonSortByPopularity.addEventListener("click", sortByPopularity);
buttonSortByTitle.addEventListener("click", sortByTitle);
buttonSortByDate.addEventListener("click", sortByDate);

buttonSortByPopularity.addEventListener("keydown", function(e){
	if(e.key === "Enter") {
		sortByPopularity();
	}
});
buttonSortByTitle.addEventListener("keydown", function(e){
	if(e.key === "Enter") {
		sortByTitle();
	}
});
buttonSortByDate.addEventListener("keydown", function(e){
	if(e.key === "Enter") {
		sortByDate();
	}
});