
const closeButtonInLightbox = document.querySelector(".icon-close-lightbox");
const lightBoxContainer = document.querySelector(".lightbox_container");
const previousButton = document.querySelector(".button_previous_lightbox");
const nextButton = document.querySelector(".button_next_lightbox");

const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
const photographerId = parseInt(urlParams.get('id')); // Convertir en nombre
let currentIndex = 0;
const response = await fetch('/data/photographers.json');
const photographersData = await response.json();
const medias = photographersData.media
const filteredMedias = medias.filter(media => media.photographerId === photographerId); 
const id = photographerId

const photographer = photographersData.photographers.find(photographer => photographer.id === parseInt(id));

// FERMETURE DE LA LIGHTBOX
closeButtonInLightbox.addEventListener("click", closeLightbox);

function closeLightbox() {
    lightBoxContainer.style.display = "none";
}

// AFFICHER L'IMAGE ACTUELLE
function displayCurrentMedia() {

    const currentMedia = filteredMedias[currentIndex];  // currentMedia est l'objet du JSON qui est affiché

    const lightboxMedia = document.querySelector(".lightbox_media");
    lightboxMedia.innerHTML = "";

    const picture = document.createElement("img");
    picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
    picture.classList.add("lightbox_media_picture");

    const titleMediaInLightbox = document.createElement("p");
    titleMediaInLightbox.textContent = currentMedia.title;

    lightboxMedia.appendChild(picture);
    lightboxMedia.appendChild(titleMediaInLightbox);

}

previousButton.addEventListener("click", previousMedia);
nextButton.addEventListener("click", nextMedia);

// AFFICHER L'IMAGE PRÉCÉDENTE
function previousMedia() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = filteredMedias.length - 1;
    }
    displayCurrentMedia();
}

function nextMedia() {
    currentIndex++;
    if (currentIndex >= filteredMedias.length) {
        currentIndex = 0;
    }
    displayCurrentMedia();
}





// LIGHTBOX POPULARITY
// OUVERTURE DE LA LIGHTBOX
export function openLightboxPopularity() {

    const filteredMediasByPopularity = filteredMedias.sort(function (a, b) {
        return a.likes - b.likes;
    });

    const mediaProvider = Array.from(document.querySelectorAll('.card-container'));

    mediaProvider.forEach(mediaCard => {
        mediaCard.addEventListener('click', function() {
            lightBoxContainer.style.display = "flex";
           
            const mediaId = mediaCard.id;
            currentIndex = filteredMediasByPopularity.findIndex(media => media.id == mediaId);

            const currentMedia = filteredMediasByPopularity[currentIndex];  // currentMedia est l'objet du JSON qui est affiché

            const lightboxMedia = document.querySelector(".lightbox_media");
            lightboxMedia.innerHTML = "";
        
            const picture = document.createElement("img");
            picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
            picture.classList.add("lightbox_media_picture");
        
            const titleMediaInLightbox = document.createElement("p");
            titleMediaInLightbox.textContent = currentMedia.title;
        
            lightboxMedia.appendChild(picture);
            lightboxMedia.appendChild(titleMediaInLightbox);
        });
    });

}



// LIGHTBOX DATE
// OUVERTURE DE LA LIGHTBOX
export function openLightboxDate() {


    const filteredMediasByDate = filteredMedias.sort(function (a, b) { 
        return new Date(b.date) - new Date(a.date)
    });
    const mediaProvider = Array.from(document.querySelectorAll('.card-container'));

    mediaProvider.forEach(mediaCard => {
        mediaCard.addEventListener('click', function() {
            lightBoxContainer.style.display = "flex";
           
            const mediaId = mediaCard.id;
            currentIndex = filteredMediasByDate.findIndex(media => media.id == mediaId);

            const currentMedia = filteredMediasByDate[currentIndex];  // currentMedia est l'objet du JSON qui est affiché

            const lightboxMedia = document.querySelector(".lightbox_media");
            lightboxMedia.innerHTML = "";

            const picture = document.createElement("img");
            picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
            picture.classList.add("lightbox_media_picture");

            const titleMediaInLightbox = document.createElement("p");
            titleMediaInLightbox.textContent = currentMedia.title;

            lightboxMedia.appendChild(picture);
            lightboxMedia.appendChild(titleMediaInLightbox);
        });
    });
}



// LIGHTBOX NOM
// OUVERTURE DE LA LIGHTBOX
export function openLightboxName() {


    const filteredMediasByTitle = filteredMedias.sort(function (a, b) { 
        return a.title.localeCompare(b.title); //filtrer par ordre alphabétique
    });
    const mediaProvider = Array.from(document.querySelectorAll('.card-container'));

    mediaProvider.forEach(mediaCard => {
        mediaCard.addEventListener('click', function() {
            lightBoxContainer.style.display = "flex";
           
            const mediaId = mediaCard.id;
            currentIndex = filteredMediasByTitle.findIndex(media => media.id == mediaId);

            const currentMedia = filteredMediasByTitle[currentIndex];  // currentMedia est l'objet du JSON qui est affiché
            const lightboxMedia = document.querySelector(".lightbox_media");
            lightboxMedia.innerHTML = "";
        
            const picture = document.createElement("img");
            picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
            picture.classList.add("lightbox_media_picture");
        
            const titleMediaInLightbox = document.createElement("p");
            titleMediaInLightbox.textContent = currentMedia.title;
        
            lightboxMedia.appendChild(picture);
            lightboxMedia.appendChild(titleMediaInLightbox);
        });
    });
}




