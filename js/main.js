let cartStorage = JSON.parse(localStorage.getItem("produit")); 
//****************Calculation of the total cart quantity****************/
let nbItem = [];
//Loop to get the quantity in the basket
for (let j = 0; j < cartStorage.length; j++) {
    //Sends prices in the cartPrice variable
    nbItem.push(cartStorage[j].quantity);    
}
//Addition of cart quantity (Reduce method)
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalItem = nbItem.reduce(reducer, 0);
console.log(totalItem);
//Variable to display HTML
let itemCart = `
    <p> ${totalItem} </p>`;
//HTML display
document.getElementById("nbItems").innerHTML = itemCart;

