import {fetchData, createCardElement } from "../pages/photographer.js";
import {openLightboxPopularity, openLightboxName, openLightboxDate } from "../utils/lightbox.js";
import {incrementLikes} from "../utils/likes.js";
const buttonSortByPopularity = document.querySelector("#sort-by-popularity");
const buttonSortByTitle = document.querySelector("#sort-by-title");
const buttonSortByDate = document.querySelector("#sort-by-date");

//GESTION DES FILTRES
const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
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
		chevronUp.classList.add("rotate");
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

/* On ferme les filtres quand le bouton "Contactez-moi" est focuse */

buttonHeader.addEventListener("focus", function() {   
	dropDownFilters.style.display = "none";
	chevronUp.classList.remove("rotate");
	dropDownFilters.setAttribute("aria-hidden", "true");
});


export function changingCurrentFilter() {
	let selectedFilter = allFilters.find(filter => filter.textContent === currentFilter.textContent);
	selectedFilter.style.display = "none";
	allFilters.forEach(filter => {
		filter.addEventListener("click", function () {
			currentFilter.textContent = filter.textContent;

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

buttonFilters.addEventListener("click", clickOnFilterButton);

function clickOnFilterButton () {
	openFilters();
	changingCurrentFilter();
}

export async function sortByPopularity() {
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
  
export async function sortByTitle() {
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
  
export async function sortByDate() {
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


buttonSortByPopularity.addEventListener("click", sortByPopularity);
buttonSortByTitle.addEventListener("click", sortByTitle);
buttonSortByDate.addEventListener("click", sortByDate);
