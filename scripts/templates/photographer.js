  export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

     function getUserCardDOM() {

       
        const clickableCard = document.createElement('a');
        clickableCard.classList.add("clickableCard")
        clickableCard.setAttribute("href", "photographer.html?id="+ id)
        clickableCard.setAttribute("id", id)
        clickableCard.setAttribute("aria-label", "Go to " + name + " profile")

        const article = document.createElement( 'article' );
        

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de profil de " + name)
        img.setAttribute("aria-label", "Picture of " + name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;  
        h2.setAttribute("aria-label", "The photographer's name is " + name)
            

        const location = document.createElement( 'p' );  // AJOUT DES ELEMENTS POUR COMPLETER LES CARDS SUR LA PAGE D'ACCUEIL
        location.textContent = city + ", " + country;
        location.classList.add("location");
        location.setAttribute("aria-label", "Location of the photographer")


        const taglineText = document.createElement('p');
        taglineText.textContent = tagline;
        taglineText.classList.add("tagline");
        taglineText.setAttribute("aria-label", "Photographer's main purpose")


        const pricePerDay = document.createElement('span');
        pricePerDay.textContent = price + "€/jour";
        pricePerDay.setAttribute("aria-label", "Photographer's price per day")


        article.appendChild(img);
        article.appendChild(h2);  
        article.appendChild(location);  
        article.appendChild(taglineText);  
        article.appendChild(pricePerDay);  
        clickableCard.appendChild(article);


        return (clickableCard);
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM }
}




