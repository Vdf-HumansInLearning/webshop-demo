
if (document.querySelector("#navbar .nav-item .active")) {
    document.querySelector("#navbar .nav-item .active").classList = "nav-link";
}
document.getElementById("home-link").classList = "nav-link active";

let localStorageItems = localStorage.getItem('items');
if (localStorageItems) {
    let localStorageObject = JSON.parse(localStorageItems);
    let sum = 0;
    for(let i=0; i<localStorageObject.length; i++){
        sum += localStorageObject[i].quantity;
    }
    
    document.getElementById("cart-items").textContent = sum;
}
