//Récupération des données produits
let cartStorage = JSON.parse(localStorage.getItem("produit"));
//Récupération des données contact
let contact = JSON.parse(localStorage.getItem("contact"));
//Récupération du prix total
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));
//Récupération du numéro de commande
let paramsUrl = new URL(window.location).searchParams;
let orderId = paramsUrl.get("orderId");
//Information concernant la commande
//Variable pour afficher les informations de commande
let information = `
    <p>
        Merci  <span>${contact.firstName } ${contact.lastName}</span> 
    </p>
    <p>Nous avons bien reçu votre commande N° ${orderId} </br>
        D'un montant de : <span>${prixTotal} €</span>
    </p>
    <p>
    Un email vous sera envoyer à l'adresse : <span>${contact.email}</span></br> a l'envoi de votre commande. 
    </p> 
    `
//Affichage des informations de commande    
document.getElementById("info").innerHTML = information;


//supression des éléménts du localstorage aprè la confirmation de la commande
let clear;
//Fonction "setTimeout" au chargement de la page
window.onload = function() {
  clear = setTimeout(clearCart, 1000);}
//Suppression du localstorage
function clearCart() {
  localStorage.removeItem("produit")
  localStorage.removeItem("prixTotal")
  localStorage.removeItem("contact")
}

