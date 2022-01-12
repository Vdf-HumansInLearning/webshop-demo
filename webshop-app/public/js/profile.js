let localStorageItems = localStorage.getItem('items');
if (localStorageItems) {
    let localStorageObject = JSON.parse(localStorageItems);
    let sum = 0;
    for(let i=0; i<localStorageObject.length; i++){
        sum += localStorageObject[i].quantity;
    }
    
    document.getElementById("cart-items").textContent = sum;
}


// actions for EDIT phone
let form = document.getElementById("edit-user-form")
if (form) {
    let updateModal = new bootstrap.Modal(document.getElementById("user-updated"), {});

    document.querySelectorAll("#edit-user-form .input-group .form-control").forEach(item => {
        item.addEventListener("blur", function () {
            let street = document.getElementById("edit-street").value;
            let suite = document.getElementById("edit-suite").value;
            let city = document.getElementById("edit-city").value;
            let zip = document.getElementById("edit-zip").value;
            let phone = document.getElementById("edit-phone").value;
            let regexLetters = /(^[A-Za-z]{2,30})([ ]{0,1})([A-Za-z]{2,30})/;
            let regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
            let regexZipCode = /(\d{6})/;
            let regexAddressSuite = /^[.0-9a-zA-Z\s,-]+$/;

            if (item.id === "edit-street") {
                if (street.match(regexLetters)) {
                    document.getElementById("invalid-street-edit").style.display = "none";
                } else {
                    document.getElementById("invalid-street-edit").style.display = "block";
                }
            }

            if (item.id === "edit-suite") {
                if (suite.match(regexAddressSuite) && suite.length >= 1 && suite.length <= 30) {
                    document.getElementById("invalid-suite-edit").style.display = "none";
                } else {
                    document.getElementById("invalid-suite-edit").style.display = "block";
                }
            }

            if (item.id === "edit-city") {
                if (city.match(regexLetters)) {
                    document.getElementById("invalid-city-edit").style.display = "none";
                } else {
                    document.getElementById("invalid-city-edit").style.display = "block";
                }
            }

            if (item.id === "edit-zip") {
                if (zip.match(regexZipCode)) {
                    document.getElementById("invalid-zip-edit").style.display = "none";
                } else {
                    document.getElementById("invalid-zip-edit").style.display = "block";
                }
            }

            if (item.id === "edit-phone") {
                if (phone.match(regexPhone)) {
                    document.getElementById("invalid-phone-edit").style.display = "none";
                } else {
                    document.getElementById("invalid-phone-edit").style.display = "block";
                }
            }
        })
    })

    document.getElementById("edit-user-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let street = document.getElementById("edit-street").value;
        let suite = document.getElementById("edit-suite").value;
        let city = document.getElementById("edit-city").value;
        let zip = document.getElementById("edit-zip").value;
        let phone = document.getElementById("edit-phone").value;

        let updatedUser = {
            "street": street,
            "suite": suite,
            "city": city,
            "zipcode": zip,
            "phone": phone
        };
        if (validateUser(updatedUser)) {

            fetch(document.getElementById("edit-user-form").action, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ street: street, suite: suite, city: city, zipcode: zip, phone: phone })
            })
                .then(data => {
                    if (data.status === 200) {
                        setTimeout(() => { updateModal.show() }, 2000);
                    } else {
                        document.getElementById("invalid-edit").classList.remove("d-none");
                    }
                })
            document.getElementById('user-updated').addEventListener('hide.bs.modal', function (event) {
                window.location.href = window.location.origin + "/profile";
            });
        } else {
            let regexLetters = /(^[A-Za-z]{2,30})([ ]{0,1})([A-Za-z]{2,30})/;
            let regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
            let regexZipCode = /^[0-9]{6}$/;
            let regexAddressSuite = /^[.0-9a-zA-Z\s,-]+$/;
            if (street.match(regexLetters)) {
                document.getElementById("invalid-street-edit").style.display = "none";
            } else {
                document.getElementById("invalid-street-edit").style.display = "block";
            }
            if (suite.match(regexAddressSuite) && suite.length >= 1 && suite.length <= 30) {
                document.getElementById("invalid-suite-edit").style.display = "none";
            } else {
                document.getElementById("invalid-suite-edit").style.display = "block";
            }
            if (city.match(regexLetters)) {
                document.getElementById("invalid-city-edit").style.display = "none";
            } else {
                document.getElementById("invalid-city-edit").style.display = "block";
            }
            if (zip.match(regexZipCode)) {
                document.getElementById("invalid-zip-edit").style.display = "none";
            } else {
                document.getElementById("invalid-zip-edit").style.display = "block";
            }
            if (phone.match(regexPhone)) {
                document.getElementById("invalid-phone-edit").style.display = "none";
            } else {
                document.getElementById("invalid-phone-edit").style.display = "block";
            }
        }


    });
}

function validateUser(user) {
    let regexLetters = /(^[A-Za-z]{2,30})([ ]{0,1})([A-Za-z]{2,30})/;
    let regexPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    let regexZipCode = /^[0-9]{6}$/;
    let regexAddressSuite = /^[.0-9a-zA-Z\s,-]+$/;

    return (
        user.street &&
        user.suite &&
        user.city &&
        user.zipcode &&
        user.phone &&
        user.street.match(regexLetters) &&
        user.city.match(regexLetters) &&
        user.suite.match(regexAddressSuite) &&
        user.zipcode.match(regexZipCode) &&
        user.phone.match(regexPhone)
    );
}