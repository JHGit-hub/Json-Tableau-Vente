// creation des varaibles

let donnees = JSON.parse(localStorage.getItem('articles')) || [];
let trash = JSON.parse(localStorage.getItem("trash")) || [];
let tbody = document.getElementById('tableauDetail');
let tblTrash = document.getElementById("tblTrash");
let form = document.getElementById('formArticles');

// creation des functions

function resetLocalStorage(){
    localStorage.clear();
    donnees = []
    location.reload();
};

// function afficher les articles

function afficherListe(){
    tbody.innerHTML = "";
    let compteur = 1
    for(let i=0; i<donnees.length; i++){
        donnees[i] = {rowNumber:compteur, ...donnees[i]};
        compteur++;

        let tr = document.createElement('tr');
        let rowNumber = document.createElement('td');
        let reference = document.createElement('td');
        let categorie =document.createElement('td');
        let libelle =document.createElement('td');
        let prix = document.createElement('td');
        let stock = document.createElement('td');
        let btnDetails = document.createElement('td');
        let btnModifier = document.createElement('td');
        let btnSupprimer = document.createElement('td');


        // lien json et html

        rowNumber.textContent = donnees[i].rowNumber;
        reference.textContent = donnees[i].reference;
        categorie.textContent = donnees[i].categorie;
        libelle.textContent = donnees[i].libelle;
        prix.textContent = donnees[i].prix;
        if(donnees[i].stock > 0){
            stock.innerHTML = "<img src='assets/icons/green-circle.png'>";
        } else {
            stock.innerHTML = "<img src='assets/icons/red-circle.png'>";
        };
        btnDetails.innerHTML = `<button onclick="viewDetails('${donnees[i].reference}')"><img src='assets/icons/eye.png'></button>`;
        btnModifier.innerHTML = `<button onclick="modifier('${donnees[i].reference}')"><img src='assets/icons/edit.png'></button>`;
        btnSupprimer.innerHTML = `<button onclick="supprimer('${donnees[i].reference}')"><img src="assets/icons/trash.png"></button>`;

        btnDetails.id = "btnDetails";
        btnModifier.id = "btnModifier";
        btnSupprimer.id = "btnSupprimer";

        //integration lien dans td


        tr.appendChild(reference);
        tr.appendChild(categorie);
        tr.appendChild(libelle);
        tr.appendChild(prix);
        tr.appendChild(stock);
        tr.appendChild(btnDetails);
        tr.appendChild(btnModifier);
        tr.appendChild(btnSupprimer);

        tbody.appendChild(tr);
        
    };
};

// function afficher la poubelle

function showTrash(){
    tblTrash.innerHTML = "";
    let compteur = 1
    for(let i=0; i<trash.length; i++){
        trash[i] = {rowNumber:compteur, ...trash[i]};
        compteur++;

        let tr = document.createElement('tr');
        let rowNumber = document.createElement('td');
        let reference = document.createElement('td');
        let categorie =document.createElement('td');
        let libelle =document.createElement('td');
        let prix = document.createElement('td');
        let stock = document.createElement('td');
        let btnDetails = document.createElement('td');
        let btnModifier = document.createElement('td');
        let btnSupprimer = document.createElement('td');


        // lien json et html

        rowNumber.textContent = trash[i].rowNumber;
        reference.textContent = trash[i].reference;
        categorie.textContent = trash[i].categorie;
        libelle.textContent = trash[i].libelle;
        prix.textContent = trash[i].prix;
        if(trash[i].stock > 0){
            stock.innerHTML = "<img src='assets/icons/green-circle.png'>";
        } else {
            stock.innerHTML = "<img src='assets/icons/red-circle.png'>";
        };
        btnDetails.innerHTML = `<button onclick="viewDetails('${trash[i].reference}')"><img src='assets/icons/eye.png'></button>`;
        btnModifier.innerHTML = `<button onclick="modifier('${trash[i].reference}')"><img src='assets/icons/edit.png'></button>`;
        btnSupprimer.innerHTML = `<button onclick="supprimer('${trash[i].reference}')"><img src="assets/icons/trash.png"></button>`;

        btnDetails.id = "btnDetails";
        btnModifier.id = "btnModifier";
        btnSupprimer.id = "btnSupprimer";

        //integration lien dans td


        tr.appendChild(reference);
        tr.appendChild(categorie);
        tr.appendChild(libelle);
        tr.appendChild(prix);
        tr.appendChild(stock);
        tr.appendChild(btnDetails);
        tr.appendChild(btnModifier);
        tr.appendChild(btnSupprimer);

        tblTrash.appendChild(tr);
        
    };
};











if(donnees.length ===0){
    fetch('produits.json')
        .then(function(reponse){
            return reponse.json();
        })
        .then(function(data){
            donnees = data;

            var savedRef = localStorage.getItem("reference");
            var savedCat = localStorage.getItem("categorie");
            var savedLib = localStorage.getItem("libelle");
            var savedPri = localStorage.getItem("prix");
            var savedSto = localStorage.getItem("stock");
            var savedDes = localStorage.getItem("description");
            console.log(savedRef, savedCat, savedLib, savedPri, savedSto, savedDes);

            if(savedRef || savedCat || savedDes || savedLib || savedPri || savedSto){
                let savedProduit = {
                    rowNumber: donnees.length+1,
                    reference: savedRef,
                    categorie: savedCat,
                    libelle: savedLib,
                    prix: savedPri,
                    stock: savedSto,
                    description: savedDes,
                };
                donnees.push(savedProduit);
            };
            afficherListe();
        })
        .catch(function(error){
            console.error("Erreur lors du chargement du fichier Json: ", error)
        })

}  else {
    console.log("Données chargées depuis localStorage :", donnees);
    afficherListe();
};

////////// gestion des articles


// ajouter article

form.addEventListener('submit',function(e){
    e.preventDefault();
    

    var newReference = document.getElementById('reference').value.trim();
    var newCategorie = document.getElementById('categorie').value.trim();
    var newLibelle = document.getElementById('libelle').value.trim();
    var newPrix = document.getElementById('prix').value.trim();
    var newStock = document.getElementById('stock').value.trim();
    var newDescription = document.getElementById('description').value.trim();

/**
    document.getElementById("saved-data").innerHTML = `Référence: ${newReference} <br>
    Catégorie: ${newCategorie} <br>
    Libéllé: ${newLibelle} <br>
    Prix: ${newPrix}€ <br>
    Stock: ${newStock} <br>
    Description: ${newDescription}`;
    alert("données enregistrées!");
**/

    let articleExiste = false;


    for(let i=0; i<donnees.length; i++){
        if(donnees[i].reference === newReference){
            donnees[i].categorie = newCategorie;
            donnees[i].libelle = newLibelle;
            donnees[i].prix = newPrix;
            donnees[i].stock = newStock;
            donnees[i].description = newDescription;
            articleExiste = true;
            break;
        };
    };

    if(!articleExiste){
        let nouveauProduit = {
            rowNumber: donnees.length+1,
            reference: newReference,
            categorie: newCategorie,
            libelle: newLibelle,
            prix: newPrix,
            stock: newStock,
            description: newDescription,
        };
        donnees.push(nouveauProduit);
    };


    localStorage.setItem("articles", JSON.stringify(donnees));
    afficherListe();
    form.reset();
    modalForm.classList.add("hidden");
    
});

// modification d'un article

function modifier(reference){
    modalForm.classList.remove("hidden");
    for(let i = 0; i< donnees.length; i++){
        if(donnees[i].reference === reference){
        document.getElementById('reference').value = donnees[i].reference;
        document.getElementById('categorie').value = donnees[i].categorie;
        document.getElementById('libelle').value = donnees[i].libelle;
        document.getElementById('prix').value = donnees[i].prix;
        document.getElementById('stock').value = donnees[i].stock;
        document.getElementById('description').value = donnees[i].description;
        break;
        }
    }
}



// supression d'un article

function supprimer(reference){
    let nouvelleListe = [];
    for(let i=0; i<donnees.length; i++){
        if(donnees[i].reference === reference){
            trash.push(donnees[i]);
        } else {
            nouvelleListe.push(donnees[i]);
        }
    }
    localStorage.setItem("trash", JSON.stringify(trash))
    localStorage.setItem("articles", JSON.stringify(nouvelleListe));

    donnees = nouvelleListe;
    afficherListe();
}


// modal//

let primaryBtn = document.getElementById('primaryBtn');
let trashBtn = document.getElementById('trashBtn');
let backBtnTrash = document.getElementById("backBtnTrash");
let backBtn = document.getElementById('backBtn');
let modalForm = document.getElementById('modalForm');
let modalView = document.getElementById('modalView');
let modalTrash = document.getElementById("modalTrash");
let backBtnDetails = document.getElementById('backBtnDetails');


// modalView

let divImageArticle = document.getElementById('imageArticle');
let divLibelleArticle = document.getElementById('libelleArticle');
let divStockArticle = document.getElementById('stockArticle');
let divReferenceArticle = document.getElementById('referenceArticle');
let divCategorieArticle = document.getElementById('categorieArticle');
let divPrixArticle = document.getElementById('prixArticle');
let divDescriptionArticle = document.getElementById('descriptionArticle');


function viewDetails(inputId){
    if(modalView.classList.contains("hidden")){
        modalView.classList.remove("hidden");
        remove();

        for(let i = 0; i< donnees.length; i++){
            if(donnees[i].reference === inputId){

                // image article
                let imageArticle = document.createElement("div");
                imageArticle.innerHTML = `<img src="assets/images/${donnees[i].photo}">`;
                divImageArticle.appendChild(imageArticle);

                // reference article
                let referenceArticle = document.createElement("h4"); 
                referenceArticle.innerHTML = "<span>reference: </span>" + donnees[i].reference;
                divReferenceArticle.appendChild(referenceArticle);

                // categorie article
                let categorieArticle = document.createElement("p");
                categorieArticle.textContent = donnees[i].categorie;
                divCategorieArticle.appendChild(categorieArticle);

                // libelle article
                let libelleArticle = document.createElement("h3");
                libelleArticle.textContent = donnees[i].libelle;
                divLibelleArticle.appendChild(libelleArticle);

                // prix article
                let prixArticle = document.createElement("h2");
                prixArticle.textContent = donnees[i].prix + "€";
                divPrixArticle.appendChild(prixArticle);

                // stock article
                let stockArticle = document.createElement("p");
                if(donnees[i].stock > 0){
                    stockArticle.innerHTML = "<img src='assets/icons/green-circle.png'>En stock";
                    } else {wifi.innerHTML = "<img src='assets/images/red-circle.png'>En rupture";
                    };
                divStockArticle.appendChild(stockArticle);

                // description article
                let descriptionArticle = document.createElement("p");
                descriptionArticle.textContent = donnees[i].description;
                divDescriptionArticle.appendChild(descriptionArticle);
            }
        }

        backBtnDetails.addEventListener('click', function(){
            if(!modalView.classList.contains("hidden")){
                modalView.classList.add("hidden");
                remove();
            };
        });
    }
}

// vider le modal view

function remove(){
    divImageArticle.innerHTML ="";
    divReferenceArticle.innerHTML ="";
    divCategorieArticle.innerHTML ="";
    divLibelleArticle.innerHTML ="";
    divPrixArticle.innerHTML ="";
    divStockArticle.innerHTML ="";
    divDescriptionArticle.innerHTML ="";
};

// modalForm


primaryBtn.addEventListener('click',function(){
    if(modalForm.classList.contains("hidden")){
        modalForm.classList.remove("hidden");
        form.reset();
        document.getElementById('reference').value = "";
    };
});


backBtn.addEventListener('click', function(){
    if(!modalForm.classList.contains('hidden')){
        modalForm.classList.add("hidden")
    };
});

//modalTrash

trashBtn.addEventListener('click',function(){
    if(modalTrash.classList.contains("hidden")){
        modalTrash.classList.remove("hidden");
        showTrash();
    };
});


backBtnTrash.addEventListener('click', function(){
    if(!modalTrash.classList.contains('hidden')){
        modalTrash.classList.add("hidden")
    };
});
