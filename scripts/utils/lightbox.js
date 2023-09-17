const closeButtonInLightbox = document.querySelector(".icon-close-lightbox");
const lightBoxContainer = document.querySelector(".lightbox_container");



// CA MARCHE AVEC .MEDIA PARCE QUIL EST EN HTML ALORS QUE CARD-CONTAINER SONT INJECTEES EN JS

//OUVERTURE DE LA LIGHTBOX




function openLightbox() {
	lightBoxContainer.style.display = "flex";
}

//FERMETURE DE LA LIGHTBOX
closeButtonInLightbox.addEventListener("click", closeLightbox);

function closeLightbox () {
	lightBoxContainer.style.display = "none";
}


