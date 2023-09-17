const closeButtonInLightbox = document.querySelector(".icon-close-lightbox");
const lightBoxContainer = document.querySelector(".lightbox_container");


closeButtonInLightbox.addEventListener("click", closeLightbox);

function closeLightbox () {

	lightBoxContainer.style.display = "none";

}