const urlParams = new URLSearchParams(window.location.search); // On récupère l'id de l'URL
const photographerId = urlParams.get('id');
const infoPhotographer = document.querySelector(".info-photographer");
const photographerHeader = document.querySelector(".photograph-header")
const headerInfo = document.querySelector(".header-info")

// Fonction pour afficher les détails du photographe
async function displayPhotographerInfo(id) {
    const response = await fetch('/data/photographers.json'); 
    const photographersData = await response.json();
    const photographers = photographersData.photographers;

    const photographer = photographers.find(photographer => photographer.id === parseInt(id));

        //infoPhotographer.innerHTML = '';  

        // On affiche les informations du photographe
        const namePhotographer = document.createElement("p");
        namePhotographer.textContent = "My name is " + photographer.name;

        const photoPhotographer = document.createElement("img");
        photoPhotographer.setAttribute("src", `assets/photographers/${photographer.portrait}`); // Assurez-vous que le chemin est correct
        photoPhotographer.setAttribute("alt", "Photo de profil de " + photographer.name);
        photoPhotographer.classList.add("photo-in-header")

        headerInfo.appendChild(namePhotographer);
        photographerHeader.appendChild(photoPhotographer);
    
}

// On appelle la fonction pour afficher les détails du photographe avec l'ID récupéré de l'URL
displayPhotographerInfo(photographerId);

