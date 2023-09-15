  function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

     function getUserCardDOM() {

       
        const clickableCard = document.createElement('a');
        clickableCard.classList.add("clickableCard")
        clickableCard.setAttribute("href", "photographer.html?id="+ id)
        clickableCard.setAttribute("id", id)

        const article = document.createElement( 'article' );
        article.setAttribute("aria-label", "Brève description du photographe " + name)
        

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de profil de " + name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;              

        const location = document.createElement( 'p' );  // AJOUT DES ELEMENTS POUR COMPLETER LES CARDS SUR LA PAGE D'ACCUEIL
        location.textContent = city + ", " + country;
        location.classList.add("location");


        const taglineText = document.createElement('p');
        taglineText.textContent = tagline;
        taglineText.classList.add("tagline");


        const pricePerDay = document.createElement('span');
        pricePerDay.textContent = price + "€/jour";


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

