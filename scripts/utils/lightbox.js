const logo = document.querySelector(".logo-container");
const closeButtonInLightbox = document.querySelector(".button_close_lightbox");
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

closeButtonInLightbox.addEventListener("keydown", function(e){
    if(e.key === "Enter") {
        closeLightbox(e);
       
    } if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault(); 
      previousButton.focus();
    } if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault(); 
        nextButton.focus();
    }
})

previousButton.addEventListener("keydown", function(event){
    if(event.key === "Tab" && event.shiftKey){
        event.preventDefault(); 
        closeButtonInLightbox.focus();
    }
})

function closeLightbox(e) {
    e.preventDefault();
    lightBoxContainer.style.display = "none";
    lightBoxContainer.setAttribute("aria-hidden", "true");
    lightBoxContainer.removeAttribute('aria-modal');
    logo.focus();
}

// On ferme la lightbox quand on appuie sur la touche Escape
window.addEventListener('keydown', function(e){ 
    if (e.key === "Escape" || e.key === "Esc") {
        closeLightbox(e)
    }
}) 


// AFFICHER L'IMAGE ACTUELLE
function displayCurrentMedia() {

    const currentMedia = filteredMedias[currentIndex];  // currentMedia est l'objet du JSON qui est affiché

    const lightboxMedia = document.querySelector(".lightbox_media");
    lightboxMedia.innerHTML = "";

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
    const mediaElementInLightbox = createMediaElementLightbox(currentMedia)


    const titleMediaInLightbox = document.createElement("h3");
    titleMediaInLightbox.textContent = currentMedia.title;
    titleMediaInLightbox.classList.add("title-in-lightbox");

    lightboxMedia.appendChild(mediaElementInLightbox);
    lightboxMedia.appendChild(titleMediaInLightbox);
}

previousButton.addEventListener("click", previousMedia);
lightBoxContainer.addEventListener("keydown", function(e){   // Permet la navigation dans la lightbox avec la flèche de gauche
    if(e.key === "ArrowLeft"){
        previousMedia();
    }
})

nextButton.addEventListener("click", nextMedia);
lightBoxContainer.addEventListener("keydown", function(e){  // Permet la navigation dans la lightbox avec la flèche de droite
    if(e.key === "ArrowRight"){
        nextMedia();
    }
})

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

  function mediasInLightbox(mediaCard) {
    lightBoxContainer.style.display = "flex";
    lightBoxContainer.setAttribute("aria-hidden", "false");
    lightBoxContainer.setAttribute("aria-modal", "true");
    lightBoxContainer.setAttribute("aria-label", "image closeup view");

    const mediaId = mediaCard.id;
    currentIndex = filteredMediasByPopularity.findIndex(media => media.id == mediaId);

    const currentMedia = filteredMediasByPopularity[currentIndex];

    const lightboxMedia = document.querySelector(".lightbox_media");
    lightboxMedia.innerHTML = "";
    closeButtonInLightbox.focus();

    function createMediaElementLightbox(currentMedia) {
      if (currentMedia.video) {
       
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

    const mediaElementInLightbox = createMediaElementLightbox(currentMedia);
    const titleMediaInLightbox = document.createElement("h3");
    titleMediaInLightbox.textContent = currentMedia.title;
    titleMediaInLightbox.classList.add("title-in-lightbox");

    lightboxMedia.appendChild(mediaElementInLightbox);
    lightboxMedia.appendChild(titleMediaInLightbox);
    
  }

  const mediaProvider = Array.from(document.querySelectorAll('.card-container'));

  mediaProvider.forEach(mediaCard => {
    mediaCard.addEventListener('click', function () {
      mediasInLightbox(mediaCard);

    });

    mediaCard.addEventListener('keydown', function (event) {
      if (event.key === "Enter") {
        mediasInLightbox(mediaCard);
        event.preventDefault();
        closeButtonInLightbox.focus();
      }
    }
    );
  });

}


// LIGHTBOX DATE
// OUVERTURE DE LA LIGHTBOX
export function openLightboxDate() {

    const filteredMediasByDate = filteredMedias.sort(function (a, b) { 
        return new Date(b.date) - new Date(a.date)
    });

    function mediasInLightbox(mediaCard){
        lightBoxContainer.style.display = "flex";
        lightBoxContainer.setAttribute("aria-hidden", "false");
        lightBoxContainer.setAttribute("aria-label", "image closeup view");

        const mediaId = mediaCard.id;
        currentIndex = filteredMediasByDate.findIndex(media => media.id == mediaId);

        const currentMedia = filteredMediasByDate[currentIndex];  // currentMedia est l'objet du JSON qui est affiché

        const lightboxMedia = document.querySelector(".lightbox_media");
        lightboxMedia.innerHTML = "";

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
        const mediaElementInLightbox = createMediaElementLightbox(currentMedia)
    
    
        const titleMediaInLightbox = document.createElement("h3");
        titleMediaInLightbox.textContent = currentMedia.title;
        titleMediaInLightbox.classList.add("title-in-lightbox");

        lightboxMedia.appendChild(mediaElementInLightbox);
        lightboxMedia.appendChild(titleMediaInLightbox);
    }
        const mediaProvider = Array.from(document.querySelectorAll('.card-container'));

        mediaProvider.forEach(mediaCard => {
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
    


// LIGHTBOX NOM
// OUVERTURE DE LA LIGHTBOX
export function openLightboxName() {


    const filteredMediasByTitle = filteredMedias.sort(function (a, b) { 
        return a.title.localeCompare(b.title); //filtrer par ordre alphabétique
    });
    function mediasInLightbox(mediaCard) {
        lightBoxContainer.style.display = "flex";
        lightBoxContainer.setAttribute("aria-hidden", "false");
        lightBoxContainer.setAttribute("aria-label", "image closeup view");

        const mediaId = mediaCard.id;
        currentIndex = filteredMediasByTitle.findIndex(media => media.id == mediaId);

        const currentMedia = filteredMediasByTitle[currentIndex];  // currentMedia est l'objet du JSON qui est affiché
        const lightboxMedia = document.querySelector(".lightbox_media");
        lightboxMedia.innerHTML = "";
    
        function createMediaElementLightbox(currentMedia) {
            if(currentMedia.video) {
               
            const video = document.createElement("video");
			video.classList.add("lightbox_media_picture");
			video.setAttribute("controls", "true");
            video.setAttribute("tabindex", "0");
            video.setAttribute("aria-label", currentMedia.title + ", closeup view");

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
        const mediaElementInLightbox = createMediaElementLightbox(currentMedia)
    
    
        const titleMediaInLightbox = document.createElement("h3");
        titleMediaInLightbox.textContent = currentMedia.title;
        titleMediaInLightbox.classList.add("title-in-lightbox");

        lightboxMedia.appendChild(mediaElementInLightbox);
        lightboxMedia.appendChild(titleMediaInLightbox);
    }
    
    const mediaProvider = Array.from(document.querySelectorAll('.card-container'));

    mediaProvider.forEach(mediaCard => {
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


