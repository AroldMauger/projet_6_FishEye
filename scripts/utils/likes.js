const totalLikesAndPrice = document.querySelector("aside");
let totalLikes = 0;


// FONCTION POUR FAIRE APPARAITRE LE NOMBRE TOTAL DE LIKES ET LE PRIX PAR JOUR
export function incrementLikes(id, photographersData) {

	const medias = photographersData.media;

	// On cherche dans le fichier JSON le photographe dont l'id correspond à l'id dans l'URL 
	const photographer = photographersData.photographers.find(photographer => photographer.id === parseInt(id)); 
		
	// On filtre les medias qui correspondent à l'id du photographe selectionné
	const filteredMedias = medias.filter(media => media.photographerId === parseInt(id)); 

	// La fonction reduce() permet de calculer la somme des likes. Total a une valeur initiale de 0.
	totalLikes = filteredMedias.reduce((total, media) => total + media.likes, 0);

	// GESTION DE L'AFFICHAGE DU TOTAL DES LIKES
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

	// GESTION DE L'AJOUT DE LIKES AU CLIC SUR L'ICONE COEUR 
	const likesButtons = document.querySelectorAll(".likes-button");

	likesButtons.forEach(likesButton => {
		likesButton.addEventListener("click",  function () {
			const mediaId = likesButton.id;
			// On cherche les boutons likes qui correspondent à chacun des medias
			const media = medias.find(media => media.id == mediaId);

			// Par défaut chaque bouton a un attribut "liked" sur "false". Ici, on met en place la restriction pour ajouter 1 seul like.
			if (likesButton.getAttribute("liked") === "false") {
				media.likes++;																// On ajoute un like aux likes du media liké
				likesButton.setAttribute("liked", "true");									// L'attribut "liked" passe à "true". Il ne peut plus être liké.
				totalLikes++;																// Le totalLikes augmente de 1
				numberOfTotalLikes.textContent = totalLikes.toString();  					// toString() pour afficher un string et non un number.

				// GESTION DE LA MISE A JOUR DU NOMBRE DE LIKE DDU MEDIA LIKÉ
				const likesPhotographer = document.querySelectorAll(".number-of-likes");
				likesPhotographer.forEach(likePhotographer => {								// Pour chaque nombre total de likes de chacun des medias
					if (likePhotographer.id === mediaId) {									// Si l'id du nombre total de likes correspond à l'id du bouton pour liker
						const likesCount = parseInt(likePhotographer.textContent);			// On transforme le total de likes en number, pour ensuite ajouter 1
						likePhotographer.textContent = (likesCount + 1).toString();			// Puis on le renvoie en chaîne de caractères avec toString()
					}

					const heartIcone = likesButton.querySelector(".fa-heart"); 				// La couleur de l'icône coeur change pour faire dire "liké"
					heartIcone.style.color = "#901C1C";
				});
			}
		});
	});
}
