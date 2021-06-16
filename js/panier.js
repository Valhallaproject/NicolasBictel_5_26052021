//Declaration of the localstorage variable
let cartStorage = JSON.parse(localStorage.getItem("produit"));
//Shopping cart display
const cartPage = document.querySelector("#main");
//If the cart is empty
if(cartStorage === null){
    let emptyCart = " ";
    emptyCart+= `
        <div class="emptyCart">
            <p>Le panier est vide</p>
        </div>`;
    //display "le panier est vide"
    cartPage.innerHTML = emptyCart;
}else if(cartStorage){     
    //If there are products in the cart
    let fullCart = [];
    
    //loop to retrieve all the products in the basket
    for(i = 0; i < cartStorage.length; i++){
        fullCart += 
        `
            <div class="fullCart">
            <p>${cartStorage[i].name}</p>
            <p>Prix : ${(cartStorage[i].price).toFixed(2)} €</p>
            <p>Quanité : ${cartStorage[i].quantity}</p>
            <p class="price">Prix total : ${(cartStorage[i].totalPrice).toFixed(2)} €</p>
            <button onclick="history.go(0)" class="supProduct"><i class="far fa-trash-alt"></i></button>
            </div>
        `;
    } 
    let sup = "";
    sup += `
    <div>
        <button id="supprCart">Vider le panier</button>
    </div>`
    
    //display products
     if(i ==  cartStorage.length){
        cartPage.innerHTML = fullCart + sup;
    }
    
    //****************Cart deletion****************/
    document.getElementById("supprCart").onclick=function sup(){
        let supCart = " ";
        supCart+= `
        <div class="emptyCart">
            <p>Le panier est vide</p>
        </div>`;  
        localStorage.clear();
        cartPage.innerHTML = supCart;
    }

    //****************Deletion of a product in the cart****************/
    const supItem = document.querySelectorAll(".supProduct");
    for(let i =0; i < supItem.length; i ++){  //I create a loop to identify all the buttons
        supItem[i].addEventListener('click', event => {
            cartStorage = cartStorage.filter(item => item !== cartStorage[i])     //On click, I compare the elements of the localstorage with the filter method to remove it
            localStorage.setItem("produit", JSON.stringify(cartStorage))     //I update the Localstorage
            cartPage.innerHTML = fullCart + sup;     //I display my new array
            //If I delete the last product
            if(cartStorage.length == 0){
                localStorage.removeItem("produit") //I delete the array from localstorage
                cartPage.innerHTML = supCart;
                
            }
        })
    }

    //****************Calculation of the total cart price****************/
    let cartPrice = [];
    //Loop to get the prices in the basket
    for (let j = 0; j < cartStorage.length; j++) {
        //Sends prices in the cartPrice variable
        cartPrice.push(cartStorage[j].totalPrice);    
    }
    //Addition of cart prices (Reduce method)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalCartPrice = cartPrice.reduce(reducer, 0);
    //Variable to display HTML
    let total = `
        <div class="total">
            <p> Prix total du panier : ${(totalCartPrice).toFixed(2)} €</p>
        </div>`;
        //HTML display
        cartPage.insertAdjacentHTML("beforeend", total);       
}
    
        
    
    
   


         
    
       



    
