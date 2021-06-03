//Declaration of the localstorage variable
let cartStorage = JSON.parse(localStorage.getItem("produit"));
console.log(cartStorage)

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
}else{
    //If there are products in the cart
    let fullCart = [];

    //loop to retrieve all the products in the basket
    for(i = 0; i < cartStorage.length; i++){
        fullCart += 
        `
            <div clas="fullCart">
            <p>${cartStorage[i].name}</p>
            <p>Prix unitaire : ${cartStorage[i].price}</p>
            <p>Quanité : ${cartStorage[i].quantity}</p>
            <p>Prix total : ${cartStorage[i].totalPrice}</p>
            </div>
        `;
    }   
    //display products 
    if(i ==  cartStorage.length){
        cartPage.innerHTML = fullCart;
    }
    
}


