//retrieving the product id
const idProduct = window.location.search.substr(1);
console.log(idProduct)

//product data recovery with id
fetch("http://localhost:3000/api/cameras/"+idProduct)
    .then((reponse) => reponse.json())
    .then((reponse) => {         
   
    console.log(reponse);
    

    //Variable to add my product in HTML
    let html = ""; 

    //Html to display the product
    html +=
            `<div class="camera_name">
                <h2>${reponse.name}</h2>
                <p class="price">${(reponse.price/100).toFixed(2)}€</p>
            </div>
            <div class="card">
                <img src="${reponse.imageUrl}" alt="Images camera">
                <div class="text_card">
                    <p class="text">${reponse.description}</p>
                    <p class="text">${reponse.description}</p>
                </div>
            </div>
            <div class="select">
                <div class="choice">
                    <label for="focale-select">Choix de la focale</label>
                    <select name="focale" id="focale-select" class="focales_select">
                    </select>
                </div>
                <div class="quantity">
                    <p>Quantité</p>
                    <input type="number" value="1"  id="quantity" class="quantity" min="1" name="quantity" placeholder="1" >
                </div>
                <div class="add">
                    <button id="add_cart" >Ajouter au panier</button>
                </div>
            </div>`

    //Add product to the DOM    
    document.getElementById("produit").innerHTML = (html);

        //variable to add the choice of focal length
        let choice = document.querySelector(".focales_select")
        
        reponse.lenses.forEach (function (lenses){
            let option = document.createElement("option");
            option.className = "choix ";
            option.value = lenses;
            option.textContent = lenses;
            choice.appendChild(option);
            })
        
        
            //Variable to retrieve the value of the input quantity
           let myNumber = document.querySelector(".quantity").value;

           //Add product to cart
            document.getElementById("add_cart").onclick=function addCart(){
                
             
                myNumber = parseInt(quantity.value);
                console.log(reponse.name + " " +((reponse.price/100).toFixed(2)*myNumber) + " " + myNumber);
                //Variable in json format for localstorage
                let cart = {
                    _id: reponse._id,
                    name: reponse.name,
                    imageUrl:reponse.imageUrl,
                    description: reponse.description,
                    price: reponse.price/100,
                    totalPrice: (reponse.price/100)*myNumber,
                    quantity: myNumber,
                }

                //pop up confirmation sending to cart
                const confirmation = () => {
                    if(window.confirm(`${cart.name} a bien été ajouté au panier.
                Cliquez sur OK pour voir votre panier,
                Ou cliquez sur ANNULER pour continuer vos achats`)){
                    window.location.href = "panier.html";
                    }else{
                        window.location.href = "index.html";    

                    }
                }
                //Add to localstorage
                let cartStorage = JSON.parse(localStorage.getItem("produit")); 
                
                // if there are already products 
                if(cartStorage){
                    cartStorage.push(cart)
                    localStorage.setItem("produit", JSON.stringify(cartStorage));
                    confirmation();

                //if there are no products
                }else{
                    cartStorage = [];
                    cartStorage.push(cart)
                    localStorage.setItem("produit", JSON.stringify(cartStorage));
                    confirmation();
                }
            
        }
    })