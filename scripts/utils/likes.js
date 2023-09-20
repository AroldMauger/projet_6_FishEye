
export async function incrementLikes () {

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


        