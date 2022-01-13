let localStorageItems = localStorage.getItem('items');
if (localStorageItems) {
    let localStorageObject = JSON.parse(localStorageItems);
    let sum = 0;
    for(let i=0; i<localStorageObject.length; i++){
        sum += localStorageObject[i].quantity;
    }
    
    document.getElementById("cart-items").textContent = sum;
}

if (document.querySelector("#navbar .nav-item .active")) {
    document.querySelector("#navbar .nav-item .active").classList = "nav-link";
}
document.getElementById("phones-link").classList = "nav-link active";

// actions for EDIT phone

let updateModal = new bootstrap.Modal(document.getElementById("phone-updated"), {});

document.querySelectorAll("#edit-phone-form .input-group .form-control").forEach(item => {
    item.addEventListener("blur", function () {
        let brand = document.getElementById("edit-brand").value;
        let name = document.getElementById("edit-name").value;
        let os = document.getElementById("edit-os").value;
        let price = Number(document.getElementById("edit-price").value);
        let discount = document.getElementById("edit-discount").value;
        let quantity = Number(document.getElementById("edit-quantity").value);
        let date = document.getElementById("edit-date").value;
        let rating = document.getElementById("edit-rating").value;
        let regexProductName = /(^[A-Za-z0-9]{1,16})([ ]{0,1})([A-Za-z0-9]{1,16})?([ ]{0,1})?([A-Za-z0-9]{1,16})/
        let regexLetters = /^[a-zA-Z]+$/;

        if (discount) {
            discount = Number(discount);
        } else {
            discount = 0;
        }
        if (rating) {
            rating = Number(rating);
        } else {
            rating = -1;
        }

        if (item.id === "edit-brand") {
            if (brand.match(regexLetters) && brand.length >= 1 && brand.length <= 30) {
                document.getElementById("invalid-brand-edit").style.display = "none";
            } else {
                document.getElementById("invalid-brand-edit").style.display = "block";
            }
        }

        if (item.id === "edit-name") {
            if (name.match(regexProductName) && name.length >= 1 && name.length <= 30) {
                document.getElementById("invalid-name-edit").style.display = "none";
            } else {
                document.getElementById("invalid-name-edit").style.display = "block";
            }
        }

        if (item.id === "edit-os") {
            if (os.match(regexLetters) && os.length >= 1 && os.length <= 30) {
                document.getElementById("invalid-os-edit").style.display = "none";
            } else {
                document.getElementById("invalid-os-edit").style.display = "block";
            }
        }

        if (item.id === "edit-price") {
            if (price > 0) {
                document.getElementById("invalid-price-edit").style.display = "none";
            } else {
                document.getElementById("invalid-price-edit").style.display = "block";
            }
        }

        if (item.id === "edit-discount") {
            if (discount >= 0) {
                document.getElementById("invalid-discount-edit").style.display = "none";
            } else {
                document.getElementById("invalid-discount-edit").style.display = "block";
            }
        }

        if (item.id === "edit-quantity") {
            if (quantity > 0) {
                document.getElementById("invalid-quantity-edit").style.display = "none";
            } else {
                document.getElementById("invalid-quantity-edit").style.display = "block";
            }
        }

        if (item.id === "edit-rating") {
            if (rating >= -1 && rating <= 5) {
                document.getElementById("invalid-rating-edit").style.display = "none";
            } else {
                document.getElementById("invalid-rating-edit").style.display = "block";
            }
        }

        if (item.id === "edit-date") {
            if (date.length > 0) {
                document.getElementById("invalid-date-edit").style.display = "none";
            } else {
                document.getElementById("invalid-date-edit").style.display = "block";
            }
        }
    })
})

document.getElementById("edit-phone-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let id = document.getElementById("edit-id").value;
    let brand = document.getElementById("edit-brand").value;
    let name = document.getElementById("edit-name").value;
    let os = document.getElementById("edit-os").value;
    let price = Number(document.getElementById("edit-price").value);
    let discount = document.getElementById("edit-discount").value;
    let quantity = Number(document.getElementById("edit-quantity").value);
    let date = document.getElementById("edit-date").value;
    let rating = document.getElementById("edit-rating").value;
    if (discount) {
        discount = Number(discount);
    } else {
        discount = 0;
    }
    if (rating) {
        rating = Number(rating);
    } else {
        rating = -1;
    }

    let img_path = "";
    switch (brand) {
        case "Samsung":
            img_path += "toppng.com-samsung-phone-833x870.png";
            break;
        case "Apple":
            img_path += "toppng.com-iphone-550x620.png";
            break;
        case "Motorola":
            img_path += "toppng.com-motorola-moto-x-gen-2-tempered-glass-by-cellhelmet-motorola-moto-x2-310x585.png";
            break;
        case "Google":
            img_path += "toppng.com-google-pixel-1-white-600x600.png";
            break;
        case "Xiaomi":
            img_path += "toppng.com-xiaomi-smartphone-710x710.png";
            break;
        case "Huawei":
            img_path += "toppng.com-huawei-p8-1200x900.png";
            break;
        default:
                img_path = "";
    }

    let updatedProduct = {
        "name": name,
        "brand": brand,
        "operating_system": os,
        "price": Number(price),
        "discount": Number(discount),
        "quantity": Number(quantity),
        "availability_date": date,
        "rating": Number(rating),
        "image": img_path
    };
    if (validateProduct(updatedProduct)) {
        document.getElementById("edit-phone-container").classList.add("hide");

        fetch(window.location.origin + `/phones/${id}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ brand: brand, name: name, os: os, price: price, discount: discount, quantity: quantity, date: date, rating: rating, imgUrl: img_path })
        })
        .then(data => {
            if (data.status === 200) {
                setTimeout(() => { updateModal.show() }, 2000);
            } else {
                document.getElementById("invalid-edit").classList.remove("d-none");
            }
        })
        document.getElementById('phone-updated').addEventListener('hide.bs.modal', function (event) {
            window.location.href = window.location.origin + "/phones";
        });
    }


    });

// FUNCTIONS

function validateProduct(product) {
    let regexProductName = /(^[A-Za-z0-9]{1,16})([ ]{0,1})([A-Za-z0-9]{1,16})?([ ]{0,1})?([A-Za-z0-9]{1,16})/
    let regexLetters = /^[a-zA-Z]+$/;
    let isValid = false;
    if (
        product.name.match(regexProductName) &&
        product.name.length >= 1 &&
        product.name.length <= 30 &&
        product.brand.match(regexLetters) &&
        product.brand.length >= 1 &&
        product.brand.length <= 30 &&
        product.operating_system.match(regexLetters) &&
        product.price > 0 &&
        product.discount >= 0 &&
        product.quantity >= 0 &&
        product.rating >= -1 &&
        product.rating <= 5 &&
        product.availability_date.length > 0
    )
        isValid = true;
    else isValid = false;
    return isValid;
}
