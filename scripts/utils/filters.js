/*
import { fetchData } from "../pages/photographer.js";

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


// TRIER LES MEDIAS EN FONCTION DE LEUR NOM

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
  openLightbox();
}

// TRIER LES MEDIAS EN FONCTION DE LEUR DATE

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
  
  openLightboxDate()
}

*/