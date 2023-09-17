const closeButtonInLightbox = document.querySelector(".icon-close-lightbox");
const lightBoxContainer = document.querySelector(".lightbox_container");
const lightbox = document.querySelector(".lightbox");



//FERMETURE DE LA LIGHTBOX
closeButtonInLightbox.addEventListener("click", closeLightbox);

function closeLightbox () {
	lightBoxContainer.style.display = "none";
}


	

	

  //OUVERTURE DE LA LIGHTBOX

  export async function openLightbox() {

	const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const photographers = photographersData.photographers;
    const medias = photographersData.media;
	const mediaProvider = Array.from(document.querySelectorAll('.card-container'));
	const media = medias;
	  let currentIndex = 0; 
  
	  mediaProvider.forEach(mediaCard => {
		  mediaCard.addEventListener('click', () => {
			  const mediaId = mediaCard.dataset.media;
			  const mediaIndex = media.findIndex(media => media.id == mediaId);
			  currentIndex = mediaIndex;
		  
			  lightBoxContainer.style.display = "flex";
  
			  lightboxPicture();
		  });
	  });
  
  }

  function lightboxPicture () {
	  const lightboxMedia = document.querySelector(".lightbox_media")
	  lightboxMedia.innerHTML = "";
	  const figure = document.createElement("img");
	  figure.setAttribute("src", `assets/Photographers_ID_Photos/Animals_Rainbow.jpg`);

	  lightboxMedia.appendChild(figure);
  };
