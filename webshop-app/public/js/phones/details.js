const addCartBtn = document.getElementById("add-to-cart");

let localStorageItems = localStorage.getItem('items');
if (localStorageItems) {
    let localStorageObject = JSON.parse(localStorageItems);
    let sum = 0;
    for(let i=0; i<localStorageObject.length; i++){
        sum += localStorageObject[i].quantity;
    }
    
    document.getElementById("cart-items").textContent = sum;
}

addCartBtn.addEventListener("click", () => {
    let name = document.getElementById("brand").textContent;
    let price = document.getElementById("price").textContent;
    var existing = localStorage.getItem('items');
    if (existing) {
        let count = 0;
        const parsedObject = JSON.parse(existing);
        for (let i = 0; i < parsedObject.length; i++) {
            if (parsedObject[i].name === name) {
                parsedObject[i].quantity += 1;
                count += 1;

            }
        }
        if (count < 1) {
            parsedObject.push({ name: name, price: price, quantity: 1 });
        }
        document.getElementById("cart-items").textContent = Number(document.getElementById("cart-items").textContent) + 1;
        localStorage.setItem("items", JSON.stringify(parsedObject));

    } else {
        const items = [{ name: name, price: price, quantity: 1 }];
        localStorage.setItem("items", JSON.stringify(items));
        document.getElementById("cart-items").textContent = Number(document.getElementById("cart-items").textContent) + 1;
    }
    let liveToast = document.getElementById("liveToast");
    let toast = new bootstrap.Toast(liveToast);
    toast.show();


});