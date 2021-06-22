//Declaration of the localstorage variable
let cartStorage = JSON.parse(localStorage.getItem("produit"));
//Shopping cart display
const cartPage = document.querySelector("#main");
//If the cart is empty
if(cartStorage === null){
    let emptyCart = " ";
    emptyCart+= `
        <div class="emptyCart">
            <h1>Votre panier est vide ...</h1>
            <div class="info">
                <div class="logoinfo">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="textInfo">
                    <h2>Vous souhaitez faire une commande ?</h2>
                    <p>C"est très simple, retournez sur la page produits<br>et choisissez votre produit préféré.</p>
                </div>
            </div>
            <a href="index.html">Retour à la page produit</a>
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
            <p>${cartStorage[i].option}</p>
            <p>${(cartStorage[i].price).toFixed(2)} €</p>
            <p>${cartStorage[i].quantity}</p>
            <p class="price">${(cartStorage[i].totalPrice).toFixed(2)} €</p>
            <button onclick="history.go(0)" class="supProduct"><i class="far fa-trash-alt"></i></button>
        </div>`;
    }
    let topCart = `
        <h1>MON PANIER</h1>
        <div class="detail">
            <p></p>
            <p></p>
            <p>PRIX UNITAIRE</p>
            <p>QUANTITE</p>
            <p>TOTAL</p>
        </div>` ;
    let supValid = "";
    supValid += `
    <div>
        <button id="commande">Passer la commande</button>
        <button id="supprCart">Vider le panier</button>
    </div>`;

    //display products
     if(i ==  cartStorage.length){
        cartPage.innerHTML = topCart + fullCart + supValid;
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
    cartPage.insertAdjacentHTML("beforeEnd", total);       
    
    //****************Cart deletion****************/
    document.getElementById("supprCart").onclick=function sup(){
        let supCart = " ";
        supCart+= `
        <div class="emptyCart">
            <h1>Votre panier est vide ...</h1>
            <div class="info">
                <div class="logoinfo">
                    <i class="fas fa-shopping-cart">
                <div>
                <div class="textInfo">
                    <h2>Vous souhaitez faire une commande ?</h2>
                    <p>C"est très simple, retournez sur la page produits<br>et choisissez votre produit préféré.</p>
                    <a href="index.html">Retour à la page produit</a>
                </div>
            </div>    
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

    //****************Formulaire****************/
    //Variables pour styliser à l'ouverture de la modale
    let form = document.getElementById("formulaire");
    let main = document.getElementById("main");
    let header = document.getElementById("header");
    let footer = document.getElementById("footer");
    //Affichage de la modale formulaire
    let open = document.querySelector("#commande");
    open.addEventListener("click", event =>{
        form.style.display = "block";
        main.style.filter = "blur(3px)";
        header.style.filter = "blur(3px)";
        footer.style.filter = "blur(3px)";
    })
    //Fermeture de la modale formulaire
    let close = document.querySelector("#close");
    close.addEventListener("click", event =>{
    let formClose = document.getElementById("formulaire");
        formClose.style.display = "none";
        main.style.filter = "none";
        header.style.filter = "none";
        footer.style.filter = "none";
    })


    //Form management
    function sendOrder() {
    let form = document.getElementById("form");
    //If the form fields are filled in correctly
    if (form.reportValidity() == true) {
        //Creation of the contact variable
        let contact = {
            firstName : document.getElementById("firstName").value,
            lastName : document.getElementById("lastName").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
            email : document.getElementById("email").value
        };
      //Creation of the products variable
      let products = [];
      for (let i = 0; i < cartStorage.length; i++) {
          products.push(cartStorage[i]._id)
      }
      let formulaireClient = JSON.stringify({ 
          contact,
          products,
      });
      console.log(formulaireClient); 
      //Appel API with Fetch et send data whith post
      fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'content-type': "application/json"
        },
        mode: "cors",
        body: formulaireClient
        
        })
        
        .then((response) => response.json())
        .then((response => {
            console.log(response);
            localStorage.setItem("contact", JSON.stringify(response.contact));
            window.location.assign("confirmation.html?orderId=" + response.orderId);
        }))
        //If there is a problem with the API
        .catch(function (err) {
          console.log("fetch Error");
        })
        //If the form fields are incorrectly filled
    }else{
      alert("Le formulaire n'a pas été correctement rempli!")
    };
    }
    //Send form
    let envoiFormulaire = document.getElementById("btn-submit");
    envoiFormulaire.addEventListener('click', event => {
        event.preventDefault();
        sendOrder();
    });
}   

