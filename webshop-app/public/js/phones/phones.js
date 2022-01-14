// phone store exercise

// get items from cart
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

// EVENT LISTENERS

let form = document.getElementById("filter-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let searchInput = document.getElementById("search-input").value;
    let sortSelected = document.getElementById("sort").value;
    let rating = document.getElementById("minimum_rating");
    if (searchInput !== "") {
        document.getElementById("hidden-search").value = searchInput;
    } else {
        document.getElementById("hidden-search").disabled = true;
    }
    if (sortSelected !== "none") {
        document.getElementById("hidden-sort").value = sortSelected;
    } else {
        document.getElementById("hidden-sort").disabled = true;
    }
    if (Number(rating.value) < 1) {
        rating.disabled = true;
    }
    form.submit();
});

// Init a timeout variable to be used below
let timeout = null;
document.getElementById("search-input").addEventListener('keyup', function () {
    clearTimeout(timeout);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(function () {
        let url = new URL(location.href);
        if (document.getElementById("search-input").value !== "") {
            if (window.location.origin + "/phones" === window.location.href) {
                window.location.href += "?search=" + document.getElementById("search-input").value;
            } else {
                url.searchParams.delete('search');
                if (window.location.origin + "/phones" === url.href) {
                    window.location.href += "?search=" + document.getElementById("search-input").value;
                } else {
                    window.location.href += "&search=" + document.getElementById("search-input").value;
                }
            }
        } else {
            url.searchParams.delete('search');
            window.location.href = url.href;
        }
    }, 1000);
    

});

document.getElementById("sort").addEventListener('change', function () {
    let url = new URL(location.href);
    if (document.getElementById("sort").value !== "none") {
        if (window.location.origin + "/phones" === window.location.href) {
            window.location.href += "?sort=" + document.getElementById("sort").value;
        } else {
            url.searchParams.delete('sort');
            if (window.location.origin + "/phones" === url.href) {
                window.location.href = url.href + "?sort=" + document.getElementById("sort").value;
            } else {
                window.location.href = url.href + "&sort=" + document.getElementById("sort").value;
            }
        }
    } else {
        url.searchParams.delete('sort');
        window.location.href = url.href;
    }

});

// hide/show the filter form
document.getElementById('toggle-filters').addEventListener('click', function () {
    if (document.getElementById('filter-form').classList.contains('hide-form')) {
        document.getElementById('filter-form').classList.remove('hide-form');
    } else {
        document.getElementById('filter-form').classList.add('hide-form');
    }
});

// hide the filter form
document.getElementById('close-form').addEventListener('click', function () {
    document.getElementById('filter-form').classList.add('hide-form');
});

// reset the filters in the form
document.getElementById('reset').addEventListener('click', function () {
    let url = window.location.origin + "/phones";
    let count = 1;
    if (document.getElementById("search-input").value !== "") {
        url += "?search=" + document.getElementById("search-input").value;
        count += 1;
    }
    if (document.getElementById("sort").value !== "none") {
        if (count === 1) {
            url += "?sort=" + document.getElementById("sort").value;
        } else {
            url += "&sort=" + document.getElementById("sort").value;
        }

    }
    window.location.href = url;
});

// ADD TO CART
const addCartBtn = document.querySelectorAll(".add-to-cart");

addCartBtn.forEach(item => {
    item.addEventListener("click", () => {
        let name = item.parentElement.querySelector(".title").textContent + " " + item.parentElement.querySelector(".subtitle").textContent;
        let price = item.parentElement.querySelector(".price").textContent;
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
});

// actions for DELETE phone
let deleteBtn = document.querySelectorAll(".delete-btn")
if (deleteBtn.length > 0) {
    deleteBtn.forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById("delete-phone").addEventListener('click', function (e) {
                fetch(`/phones/${item.parentElement.id}`, {
                    method: 'DELETE',
                }).then(data => {
                    window.location.reload();
                });
            });
        })
    })
}


// FUNCTIONS

// filter by available date (change availability_date to see effects)
function getProductsByDate(item) {
    let today = new Date();
    return new Date(item.availability_date) <= today;
}

// ADMIN ACTIONS

// show all phones with less than N items available in stock
function getProductsWithStock(num) {
    let filtered = productObj.products.filter(product => product.quantity < num);
    return filtered
}

// show average rating by brand - for all brands
function getAverageRatingByBrand() {

    let brands = new Set();
    productObj.products.forEach(product => brands.add(product.brand));

    let ratingArr = [];

    brands.forEach(brand => {
        let average = parseFloat(productObj.products.filter(product => product.brand === brand && product.rating > 0).reduce((previous, current, index, array) => {
            let calcSum = previous + current.rating;
            if (index === array.length - 1) {
                return calcSum / array.length;
            }
            return calcSum;
        }, 0).toFixed(1));
        ratingArr.push([brand, average]);
    });
    return ratingArr;

}

// show average rating by brand - for selected brands
function getAverageRatingBySelectedBrand(...brands) {

    let ratingArr = [];

    brands.forEach(brand => {
        let average = parseFloat(productObj.products.filter(product => product.brand === brand && product.rating > 0).reduce((previous, current, index, array) => {
            let calcSum = previous + current.rating;
            if (index === array.length - 1) {
                return calcSum / array.length;
            }
            return calcSum;
        }, 0).toFixed(1));
        ratingArr.push([brand, average]);
    });
    return ratingArr;

}

// show average discount by brand - for all brands
function getAverageDiscountByBrand() {

    let brands = new Set();
    productObj.products.forEach(product => brands.add(product.brand));

    let discountArr = [];

    brands.forEach(brand => {
        let average = parseFloat(productObj.products.filter(product => product.brand === brand).reduce((previous, current, index, array) => {
            let calcSum = previous + current.discount;
            if (index === array.length - 1) {
                return calcSum / array.length;
            }
            return calcSum;
        }, 0).toFixed());
        discountArr.push([brand, average]);
    });
    return discountArr;

}

// show average discount by brand - for selected brands
function getAverageDiscountBySelectedBrand(...brands) {

    let discountArr = [];

    brands.forEach(brand => {
        let average = parseFloat(productObj.products.filter(product => product.brand === brand).reduce((previous, current, index, array) => {
            let calcSum = previous + current.discount;
            if (index === array.length - 1) {
                return calcSum / array.length;
            }
            return calcSum;
        }, 0).toFixed());
        discountArr.push([brand, average]);
    });
    return discountArr;

}

// show max discount by brand
function getMaxDiscountByBrand() {

    let brands = new Set();
    productObj.products.forEach(product => brands.add(product.brand));

    let discountArr = [];

    brands.forEach(brand => {
        let max = productObj.products.filter(product => product.brand === brand).map(product => product.discount).reduce((previous, current) => Math.max(previous, current));
        discountArr.push([brand, max]);
    });
    return discountArr;
}


// sort by brand
function getSortedByBrand() {
    return (a, b) => {
        return a.brand.localeCompare(b.brand);
    };
}
