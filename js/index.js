// camera data recovery 
fetch("http://localhost:3000/api/cameras")
    .then((reponse) => reponse.json())
    .then((reponse) =>{
      console.log(reponse);
         //Variable to add my elements
         let html = "";
         // Loop to retrieve all camera variables
         for(let i = 0; i < reponse.length; i++) {
           //Html to display the products
           html += `<li class="item">
           <h2 class="row">${reponse[i].name}</h2>
           <img class="row" src="${reponse[i].imageUrl}" alt="Images camera">
           <p class="row">${reponse[i].description}</p>
           <p class="row price">${(reponse[i].price/100).toFixed(2)}€</p>
           <a class="row" href="./produit.html?${reponse[i]._id}">Voir l'article</a>
           </li>`
         }
          //Add products to the DOM
         document.getElementById("cameras").innerHTML = html
    })
    
       
   