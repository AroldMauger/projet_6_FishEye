 function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

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




        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}