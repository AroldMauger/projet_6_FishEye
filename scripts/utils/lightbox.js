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

// FERMETURE DE LA LIGHTBOX
closeButtonInLightbox.addEventListener("click", closeLightbox);

function closeLightbox() {
    lightBoxContainer.style.display = "none";
}

// OUVERTURE DE LA LIGHTBOX
export function openLightbox() {
    const mediaProvider = Array.from(document.querySelectorAll('.card-container'));

    mediaProvider.forEach(mediaCard => {
        mediaCard.addEventListener('click', function() {
            lightBoxContainer.style.display = "flex";
            const mediaId = mediaCard.id;
            currentIndex = filteredMedias.findIndex(media => media.id == mediaId);
            displayCurrentMedia();
        });
    });

}

// AFFICHER L'IMAGE ACTUELLE
function displayCurrentMedia() {

    const currentMedia = filteredMedias[currentIndex];  // currentMedia est l'objet du JSON qui est affiché
	console.log(currentMedia)

    const lightboxMedia = document.querySelector(".lightbox_media");
    lightboxMedia.innerHTML = "";

    const picture = document.createElement("img");
    picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
    picture.classList.add("lightbox_media_picture");

    lightboxMedia.appendChild(picture);

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
            displayCurrentMediaPopularity();
        });
    });

}

// AFFICHER L'IMAGE ACTUELLE
function displayCurrentMediaPopularity() {
    const filteredMediasByPopularity = filteredMedias.sort(function (a, b) {
        return a.likes - b.likes;
    });
    const currentMedia = filteredMediasByPopularity[currentIndex];  // currentMedia est l'objet du JSON qui est affiché

    const lightboxMedia = document.querySelector(".lightbox_media");
    lightboxMedia.innerHTML = "";

    const picture = document.createElement("img");
    picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
    picture.classList.add("lightbox_media_picture");

    lightboxMedia.appendChild(picture);

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
            displayCurrentMediaByDate();
        });
    });


}



// AFFICHER L'IMAGE ACTUELLE
function displayCurrentMediaByDate() {
    
    const filteredMediasByDate = filteredMedias.sort(function (a, b) { 
        return new Date(b.date) - new Date(a.date)
    });
    const currentMedia = filteredMediasByDate[currentIndex];  // currentMedia est l'objet du JSON qui est affiché

    const lightboxMedia = document.querySelector(".lightbox_media");
    lightboxMedia.innerHTML = "";

    const picture = document.createElement("img");
    picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
    picture.classList.add("lightbox_media_picture");

    lightboxMedia.appendChild(picture);

    console.log(filteredMediasByDate)
}

