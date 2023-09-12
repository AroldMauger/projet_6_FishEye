     async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

        const response = await fetch('/data/photographers.json');
        const photographers = await response.json();
/*
        let photographers = [
            {
                "name": "Mimi Keel",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Photographe freelance",
                "price": 400,
                "portrait": "MimiKeel.jpg"
            },
            {
                "name": "Marcel Nikolic",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Photographe spécialiste",
                "price": 500,
                "portrait": "MarcelNikolic.jpg"
            }
        ] 
        // et bien retourner le tableau photographers seulement une fois récupéré */
        return photographers
    }


    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
