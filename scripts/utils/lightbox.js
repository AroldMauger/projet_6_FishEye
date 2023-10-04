import {fetchData} from"../pages/photographer.js";

const logo = document.querySelector(".logo-container");
const closeButtonInLightbox = document.querySelector(".button_close_lightbox");
const lightBoxContainer = document.querySelector(".lightbox_container");
const previousButton = document.querySelector(".button_previous_lightbox");
const nextButton = document.querySelector(".button_next_lightbox");
const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
const photographerId = parseInt(urlParams.get('id')); // Convertir en nombre
let currentIndex = 0;
const photographersData = await fetchData();
const medias = photographersData.media
const filteredMedias = medias.filter(media => media.photographerId === photographerId); // Filtrer medias qui correspondent à l'id du photographe selectionné

// FONCTION QUI PERMET L'AFFICHAGE DE L'IMAGE/VIDEO ET DE SON TITRE
function displayCurrentMedia() {
    const currentMedia = filteredMedias[currentIndex];                       // currentMedia = objet du JSON qui est affiché parmi les medias filtrés
    const lightboxMedia = document.querySelector(".lightbox_media");
    lightboxMedia.innerHTML = "";                                           // on supprime le contenu de lightboxMedia avec innerHTML 
    const mediaElementInLightbox = createMediaElementLightbox(currentMedia) // Affichage de <video> ou <img> avec la media FACTORY
    const titleMediaInLightbox = document.createElement("h3");
    titleMediaInLightbox.textContent = currentMedia.title;                  // Affichage du titre du media
    titleMediaInLightbox.classList.add("title-in-lightbox");
    lightboxMedia.appendChild(mediaElementInLightbox);
    lightboxMedia.appendChild(titleMediaInLightbox);
}
// LIGHTBOX AVEC MEDIAS TRIÉS PAR POPULARITÉ
export function openLightboxPopularity() {
  const filteredMediasByPopularity = filteredMedias.sort(function (a, b) {      // On trie les medias par popularité pour la lightbox
    return a.likes - b.likes;
  });

  function mediasInLightbox(mediaCard) {
    lightBoxContainer.style.display = "flex";
    lightBoxContainer.setAttribute("aria-hidden", "false");
    lightBoxContainer.setAttribute("aria-modal", "true");
    lightBoxContainer.setAttribute("aria-label", "image closeup view");

    const mediaId = mediaCard.id;                                                           
    currentIndex = filteredMediasByPopularity.findIndex(media => media.id == mediaId); // On cherche l'index du media affiché 

    const currentMedia = filteredMediasByPopularity[currentIndex];                      // currentMedia prend l'index du media parmi les medias triés par popularité

    displayCurrentMedia(currentMedia);                                                  // On appelle la fonction qui génère les medias
    closeButtonInLightbox.focus();                                                      // On met le focus sur la croix
  }

  const mediaProvider = Array.from(document.querySelectorAll('.card-container'));       // Pour chaque card, on affiche le media dans la lightbox
  mediaProvider.forEach(mediaCard => {
    mediaCard.addEventListener('click', function () {
      mediasInLightbox(mediaCard);
    });
    mediaCard.addEventListener('keydown', function (event) {
      if (event.key === "Enter") {
        mediasInLightbox(mediaCard);
        event.preventDefault();
        closeButtonInLightbox.focus();
      }}
    );
  });
}

// LIGHTBOX AVEC MEDIAS TRIÉS PAR DATE
export function openLightboxDate() {
    const filteredMediasByDate = filteredMedias.sort(function (a, b) {   // On trie les medias par date pour la lightbox
        return new Date(b.date) - new Date(a.date)
    });
    function mediasInLightbox(mediaCard){
        lightBoxContainer.style.display = "flex";
        lightBoxContainer.setAttribute("aria-hidden", "false");
        lightBoxContainer.setAttribute("aria-label", "image closeup view");

        const mediaId = mediaCard.id;
        currentIndex = filteredMediasByDate.findIndex(media => media.id == mediaId);  // On cherche l'index du media affiché
        const currentMedia = filteredMediasByDate[currentIndex];                      // currentMedia prend l'index du media parmi les medias triés par date

        displayCurrentMedia(currentMedia);                                            // On appelle la fonction qui génère les medias
        closeButtonInLightbox.focus();                                                // On met le focus sur la croix
    }
        const mediaProvider = Array.from(document.querySelectorAll('.card-container'));

        mediaProvider.forEach(mediaCard => {                                        // Pour chaque card, on affiche le media dans la lightbox
            mediaCard.addEventListener('click', function () {
            mediasInLightbox(mediaCard);
            });
            mediaCard.addEventListener('keydown', function (event) {
            if (event.key === "Enter") {
            mediasInLightbox(mediaCard);
            event.preventDefault()
            closeButtonInLightbox.focus();
                }
            });
        })
}
    
// LIGHTBOX AVEC MEDIAS TRIÉS PAR TITRE
export function openLightboxName() {

    const filteredMediasByTitle = filteredMedias.sort(function (a, b) {   // On trie les medias par ordre alphabétique
        return a.title.localeCompare(b.title); 
    });
    function mediasInLightbox(mediaCard) {
        lightBoxContainer.style.display = "flex";
        lightBoxContainer.setAttribute("aria-hidden", "false");
        lightBoxContainer.setAttribute("aria-label", "image closeup view");

        const mediaId = mediaCard.id;
        currentIndex = filteredMediasByTitle.findIndex(media => media.id == mediaId);   // On cherche l'index du media affiché 
        const currentMedia = filteredMediasByTitle[currentIndex];                       // currentMedia prend l'index du media parmi les medias triés par titre

        displayCurrentMedia(currentMedia);                                              // On appelle la fonction qui génère les medias
        closeButtonInLightbox.focus();                                                  // On met le focus sur la croix
    }
    
    const mediaProvider = Array.from(document.querySelectorAll('.card-container'));
    mediaProvider.forEach(mediaCard => {                                                // Pour chaque card, on affiche le media dans la lightbox
        mediaCard.addEventListener('click', function () {
        mediasInLightbox(mediaCard);
        });
        mediaCard.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            mediasInLightbox(mediaCard);
            event.preventDefault()
            closeButtonInLightbox.focus();
            }
        });
    });
}

// MEDIA FACTORY QUI RENVOIE UNE BALISE <video> ou <img> EN FONCTION DU TYPE DE MEDIA
function createMediaElementLightbox(currentMedia) {
    if(currentMedia.video) {
        const video = document.createElement("video");
        video.classList.add("lightbox_media_picture");
        video.setAttribute("controls", "true");
        video.setAttribute("tabindex", "0");
        const sourceVideo = document.createElement("source");
        sourceVideo.src = `assets/Photographers_ID_Photos/${currentMedia.video}`;
        sourceVideo.setAttribute("type", "video/mp4");
        video.appendChild(sourceVideo);
        return video;
    } else {
        const picture = document.createElement("img");
        picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
        picture.classList.add("lightbox_media_picture");
        picture.setAttribute("alt", currentMedia.title + ", closeup view");
        return picture;
    }
}

// --- GESTION DE LA NAVIGATION DANS LA LIGHTBOX AVEC LES BOUTONS PREVIOUS ET NEXT  ----

//PREVIOUS BUTTON
previousButton.addEventListener("click", previousMedia);
lightBoxContainer.addEventListener("keydown", function(e){   // Permet la navigation dans la lightbox avec la flèche de gauche
    if(e.key === "ArrowLeft"){
        previousMedia();
    }
})
function previousMedia() {
    currentIndex--;                                 // on revient à l'index précédent
    if (currentIndex < 0) {                         // si l'index du media devient négatif et sort du tableau des index des medias
        currentIndex = filteredMedias.length - 1;   // Alors on revient au dernier index du tableau des index des medias
    }
    displayCurrentMedia();
}

//NEXT BUTTON
nextButton.addEventListener("click", nextMedia);
lightBoxContainer.addEventListener("keydown", function(e){  // Permet la navigation dans la lightbox avec la flèche de droite
    if(e.key === "ArrowRight"){
        nextMedia();
    }
})
function nextMedia() {
    currentIndex++;                                 // on passe à l'index suivant
    if (currentIndex >= filteredMedias.length) {   // si l'index du media dépasse le tableau des index des medias
        currentIndex = 0;                          // alors l'index prend une valeur de 0. Autrement dit, on revient au début du tableau
    }
    displayCurrentMedia();
}

// FONCTION DE FERMETURE DE LA LIGHTBOX
function closeLightbox(e) {
    e.preventDefault();
    lightBoxContainer.style.display = "none";
    lightBoxContainer.setAttribute("aria-hidden", "true");
    lightBoxContainer.removeAttribute('aria-modal');
    logo.focus();
}

// GESTION DES COMPORTEMENTS AU CLAVIER AVEC LE BOUTON "Close" DE LA LIGHTBOX
closeButtonInLightbox.addEventListener("click", closeLightbox);

closeButtonInLightbox.addEventListener("keydown", function(e){  // Si on appuie sur "Enter", la lightbox se ferme
    if(e.key === "Enter") {
        closeLightbox(e);
    } if (e.key === "Tab" && !e.shiftKey) {                     // Si on appuie sur "tab" sans "shift", le previousButton est focus
        e.preventDefault(); 
      previousButton.focus();
    } if (e.key === "Tab" && e.shiftKey) {                      // Si on appuie sur "tab" avec "shift", le nextButton est focus
        e.preventDefault(); 
        nextButton.focus();
    }
});
// On ferme la lightbox quand on appuie sur la touche Escape
window.addEventListener('keydown', function(e){ 
    if (e.key === "Escape" || e.key === "Esc") {
        closeLightbox(e)
    }
});

// GESTION DU COMPORTEMENT AU CLAVIER DU BOUTON PREVIOUS
previousButton.addEventListener("keydown", function(event){   // Si on appuie sur "tab" avec "shift", le closeButton est focus
    if(event.key === "Tab" && event.shiftKey){
        event.preventDefault(); 
        closeButtonInLightbox.focus();
    }
})
