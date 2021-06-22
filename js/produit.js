//retrieving the product id
const idProduct = window.location.search.substr(1);
//product data recovery with id
fetch("http://localhost:3000/api/cameras/"+idProduct)
    .then((reponse) => reponse.json())
    .then((reponse) => { 


    //Variable to add my product in HTML
    let html = ""; 
    //Html to display the product
    html +=
            `<div class="card">
                <img src="${reponse.imageUrl}" alt="Images camera">
            </div>
            <div class="cameraDescription">
                <h2>${reponse.name}</h2>
                <p class="text">${reponse.description}</p>
                <p class="price">${(reponse.price/100).toFixed(2)}€</p>
                <div class="select">
                    <div class="choice">
                        <label for="focale-select">Focale</label>
                        <select name="focale" id="focale-select" class="focales_select" >
                        </select>
                    </div>
                    <div class="quantity">
                        <p>Quantité</p>
                        <input type="number" value="1"  id="quantity" class="quantity" min="1" name="quantity" placeholder="1" >
                    </div>
                </div>   
                <div class="add">
                    <button  onclick="history.go(0)"  id="add_cart"><i class="fas fa-shopping-cart"></i>AJOUTER AU PANIER</button>
                </div>
            </div>`;
                
                
           
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
            //Variable for add to localstorage
            let cartStorage = JSON.parse(localStorage.getItem("produit")); 
            //Add product to cart
            document.getElementById("add_cart").addEventListener('click', event => {     //.onclick=function addCart(){
                myNumber = parseInt(quantity.value);
                //Retrieving the option value
                let t = false;
                let oSelect = document.getElementById("focale-select");
                    if( t == false && oSelect .selectedIndex != -1 ){
                        t = true;
                    }
                //Variable in json format for localstorage
                let cart = {
                    _id: reponse._id,
                    name: reponse.name,
                    imageUrl:reponse.imageUrl,
                    description: reponse.description,
                    price: (reponse.price/100),
                    totalPrice: (reponse.price/100)*myNumber,
                    quantity: myNumber,
                    option: oSelect.value,
                }
                console.log(cart);
            //If th cart is empty
             if (cartStorage == null){
                //it is necessary to create an empty table which receives the products
                cartStorage = []; 
                //I send the object (name, option, price, quantity, total price) produced in the empty table
                cartStorage.push(cart)
                localStorage.setItem("produit", JSON.stringify(cartStorage))
            }
            //If the cart already has items
            else if (cartStorage) {
                //I create a loop to check if the product I am sending is already in the cart
                for(let i = 0; i < cartStorage.length; i++){  
                    //I add the object (name, option, price, quantity, total price) produced in the table which receives the products   
                    cartStorage.push(cart);
                    localStorage.setItem("produit", JSON.stringify( cartStorage));
                    cartStorage.pop();
                    //If there is already (id + option)
                    if (cart._id === cartStorage[i]._id && cart.option === cartStorage[i].option){ 
                        //I modify the quantity of the product object which is in the cart
                        cartStorage[i].quantity = myNumber +  cartStorage[i].quantity;
                        cartStorage[i].totalPrice = cartStorage[i].quantity * cartStorage[i].price;
                        localStorage.setItem("produit", JSON.stringify(cartStorage));
                        //I stop the loop
                        break;
                    }
                }
            }
                
        }
      )               
        
    
        } 
          
)   
