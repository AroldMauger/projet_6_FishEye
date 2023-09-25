const totalLikesAndPrice = document.querySelector("aside");
let totalLikes = 0;

export function incrementLikes(id, photographersData) {

	// FAIRE APPARAITRE LE NOMBRE TOTAL DE LIKES ET LE PRIX PAR JOUR
	const medias = photographersData.media;
	const photographer = photographersData.photographers.find(photographer => photographer.id === parseInt(id));
	const filteredMedias = medias.filter(media => media.photographerId === parseInt(id)); // Utilisez 'id' au lieu de 'photographerId'

	totalLikes = filteredMedias.reduce((total, media) => total + media.likes, 0);

	const divInAside = document.createElement("div");
	divInAside.classList.add("div-in-aside");

	const numberOfTotalLikes = document.createElement("span");
	numberOfTotalLikes.textContent = totalLikes.toString();
	numberOfTotalLikes.classList.add("number-of-total-likes");

	const heartInAside = document.createElement("i");
	heartInAside.className = "fa-solid fa-heart";

	const price = document.createElement("span");
	price.textContent = `${photographer.price} / jour`;

	totalLikesAndPrice.innerHTML = "";
	divInAside.appendChild(numberOfTotalLikes);
	divInAside.appendChild(heartInAside);
	totalLikesAndPrice.appendChild(divInAside);

	totalLikesAndPrice.appendChild(price);

	const likesButtons = document.querySelectorAll(".likes-button");

	
  
	likesButtons.forEach(likesButton => {
		likesButton.addEventListener("click",  function () {
      

			const mediaId = likesButton.id;
			const media = medias.find(media => media.id == mediaId);

			if (likesButton.getAttribute("liked") === "false") {
				media.likes++;
				likesButton.setAttribute("liked", "true");
				totalLikes++;
				numberOfTotalLikes.textContent = totalLikes.toString();


				const likesPhotographer = document.querySelectorAll(".number-of-likes");

				likesPhotographer.forEach(likePhotographer => {
					if (likePhotographer.id === mediaId) {
						const likesCount = parseInt(likePhotographer.textContent, 10);
						likePhotographer.textContent = (likesCount + 1).toString();
					}

					const heartIcone = likesButton.querySelector(".fa-heart");
					heartIcone.style.color = "#901C1C";
				});
			}
		});
	});
}
