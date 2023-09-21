/*
export async function incrementLikes (totalLikes) {

    const likesButtons = document.querySelectorAll(".likes-button");

    likesButtons.forEach(likesButton => {
        likesButton.addEventListener("click", async function() {
            const response = await fetch('/data/photographers.json'); 
            const photographersData = await response.json();
            const medias = photographersData.media;
    
            const mediaId = likesButton.id;                          // On veut que l'id du media corresponde à celui de son bouton    
            const media = medias.find(media => media.id == mediaId);
    
    
            if (likesButton.getAttribute("liked") === "false") {    // Si l'attribut du bouton est toujours sur false
                media.likes++;                                      // On incrémente
                likesButton.setAttribute("liked", "true");          // On actualise l'attribut du bouton sur true
                totalLikes++;
              
           
            const numberOfTotalLikes = document.querySelector(".number-of-total-likes");
            numberOfTotalLikes.textContent = totalLikes.toString();

            console.log(numberOfTotalLikes)

            const likesPhotographer = document.querySelectorAll(".number-of-likes");
          
            likesPhotographer.forEach(likePhotographer => {
    
            if(likePhotographer.id === mediaId) {
                const likesCount = parseInt(likePhotographer.textContent, 10); // On convertit la chaîne de caractères en nombre avec parseInt
                likePhotographer.textContent = (likesCount + 1).toString();  // On ajoute 1 et on reconvertit en chaîne de caractères
            }

            const heartIcone = likesButton.querySelector(".fa-heart");
                heartIcone.style.color = "#901C1C";
        });
    }});
    
    })

}


    */    


import { fetchData } from "../pages/photographer.js";

const totalLikesAndPrice = document.querySelector("aside");
let totalLikes = 0;

export async function incrementLikes(id) {
    const photographersData = await fetchData();

  // FAIRE APPARAITRE LE NOMBRE TOTAL DE LIKES ET LE PRIX PAR JOUR
  const medias = photographersData.media;
  const photographer = photographersData.photographers.find(photographer => photographer.id === parseInt(id));
  const filteredMedias = medias.filter(media => media.photographerId === parseInt(id)); // Utilisez 'id' au lieu de 'photographerId'

  filteredMedias.forEach(media => {
    totalLikes += media.likes;
  });

  const numberOfTotalLikes = document.createElement("span");
  numberOfTotalLikes.textContent = totalLikes.toString();
  numberOfTotalLikes.classList.add("number-of-total-likes");

  const heartInAside = document.createElement("i");
  heartInAside.className = "fa-solid fa-heart";
  const price = document.createElement("span");
  price.textContent = `${photographer.price} / jour`;

  totalLikesAndPrice.innerHTML = "";
  totalLikesAndPrice.appendChild(numberOfTotalLikes);
  totalLikesAndPrice.appendChild(heartInAside);
  totalLikesAndPrice.appendChild(price);

  const likesButtons = document.querySelectorAll(".likes-button");

  likesButtons.forEach(likesButton => {
    likesButton.addEventListener("click",  function () {
      
      const medias = photographersData.media;

      const mediaId = likesButton.id;
      const media = medias.find(media => media.id == mediaId);

      if (likesButton.getAttribute("liked") === "false") {
        media.likes++;
        likesButton.setAttribute("liked", "true");
        totalLikes++;

        numberOfTotalLikes.textContent = totalLikes.toString();

        console.log(numberOfTotalLikes);

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
