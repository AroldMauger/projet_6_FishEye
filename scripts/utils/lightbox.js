const closeButtonInLightbox = document.querySelector(".icon-close-lightbox");
const lightBoxContainer = document.querySelector(".lightbox_container");
const lightbox = document.querySelector(".lightbox");

//FERMETURE DE LA LIGHTBOX
closeButtonInLightbox.addEventListener("click", closeLightbox);

function closeLightbox () {
	lightBoxContainer.style.display = "none";
}


	/*
    
    const closeLightbox = () => {
        lightboxWrapper.style.display = 'none';
        lightboxMedia.innerHTML = '';
    };

    const nextMedia = () => {
        currentIndex++;
        if (currentIndex > mediasList.length - 1) currentIndex = 0;
        lightboxTemplate();
        showActiveBtn(btnNext);
    };

    const previousMedia = () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = mediasList.length - 1;
        lightboxTemplate();
        showActiveBtn(btnPrevious);
    };
*/


	

  //OUVERTURE DE LA LIGHTBOX
  export async function openLightbox() {
    const mediaProvider = Array.from(document.querySelectorAll('.card-container'));
    let currentIndex = 0;
    
    // Charger les données JSON une seule fois au début
    const response = await fetch('/data/photographers.json');
    const photographersData = await response.json();
    const medias = photographersData.media;
	const media = medias;

    mediaProvider.forEach(mediaCard => {
        mediaCard.addEventListener('click', function() {
            lightBoxContainer.style.display = "flex";
            
            const mediaId = mediaCard.id;
            const mediaIndex = media.findIndex(media => media.id == mediaId);
            currentIndex = mediaIndex;

            const currentMedia = media[currentIndex];

            const lightboxMedia = document.querySelector(".lightbox_media")
            lightboxMedia.innerHTML = "";
            const picture = document.createElement("img");
            picture.setAttribute("src", `assets/Photographers_ID_Photos/${currentMedia.image}`);
            picture.classList.add("lightbox_media_picture")
            
            lightboxMedia.appendChild(picture);
        });
    });
}





  
