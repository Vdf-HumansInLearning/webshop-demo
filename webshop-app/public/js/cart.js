let cartItems = JSON.parse(localStorage.getItem("items"));
let deliveryFormControls = [];
let billingFormControls = [];
let deliveryStreet = "";
let deliveryCity = "";
let deliverySuite = "";
let deliveryZipcode = "";
let billingStreet = "";
let billingCity = "";
let billingSuite = "";
let billingZipcode = "";

if (cartItems && cartItems.length > 0) {
  
  let sum = 0;
  for(let i=0; i<cartItems.length; i++){
      sum += cartItems[i].quantity;
  }
  document.getElementById("cart-items").textContent = sum;
  let orderTitleDiv = document.createElement("div");
  orderTitleDiv.setAttribute("class", "section-title");
  let sectionNumber = document.createElement("span");
  sectionNumber.setAttribute("class", "section-number");
  sectionNumber.textContent = "1";
  let orderTitleH3 = document.createElement("h3");
  orderTitleH3.textContent = "Order Summary";
  orderTitleDiv.appendChild(sectionNumber);
  orderTitleDiv.appendChild(orderTitleH3);
  document.getElementById("container").appendChild(orderTitleDiv);

  let orderDiv = document.createElement("div");
  orderDiv.setAttribute("class", "order");
  orderDiv.setAttribute("id", "order");
  document.getElementById("container").appendChild(orderDiv);
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "p-2 item-container");
    let h4 = document.createElement("h4");
    h4.setAttribute("class", "item-container-product");
    h4.textContent = cartItems[i].name;
    let quantityDiv = document.createElement("div");
    quantityDiv.setAttribute("class", "quantity-div");
    let quantityTitle = document.createElement("p");
    quantityTitle.textContent = "Quantity";
    let qtySpanDiv = document.createElement("div");
    qtySpanDiv.setAttribute("class", "select-quantity");
    let spanMinus = document.createElement("span");
    let buttonMinus = document.createElement("button");
    buttonMinus.setAttribute("class", "quantity-btn minus-btn");
    if (cartItems[i].quantity < 2) {
      buttonMinus.disabled = true;
    }
    let iconMinus = document.createElement("i");
    iconMinus.setAttribute("class", "fas fa-minus-circle mx-2");
    buttonMinus.appendChild(iconMinus);
    spanMinus.appendChild(buttonMinus);
    let quantity = document.createElement("p");
    quantity.setAttribute("class", "quantity");
    quantity.textContent = cartItems[i].quantity;
    let spanPlus = document.createElement("span");
    let buttonPlus = document.createElement("button");
    buttonPlus.setAttribute("class", "quantity-btn plus-btn");
    if (cartItems[i].quantity > 4) {
      buttonPlus.disabled = true;
    }
    let iconPlus = document.createElement("i");
    iconPlus.setAttribute("class", "fas fa-plus-circle mx-2");
    spanPlus.appendChild(buttonPlus);
    buttonPlus.appendChild(iconPlus);
    qtySpanDiv.appendChild(spanMinus);
    qtySpanDiv.appendChild(quantity);
    qtySpanDiv.appendChild(spanPlus);

    quantityDiv.appendChild(quantityTitle);
    quantityDiv.appendChild(qtySpanDiv);

    let priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "price-div");
    let priceTitle = document.createElement("p");
    priceTitle.textContent = "Price";
    let price = document.createElement("p");
    price.setAttribute("class", "price");
    price.textContent =
      `${cartItems[i].quantity} x ${cartItems[i].price} = ` +
      Number(cartItems[i].price) * cartItems[i].quantity +
      " RON";
    totalPrice += Number(cartItems[i].price) * cartItems[i].quantity;
    priceDiv.appendChild(priceTitle);
    priceDiv.appendChild(price);

    let removeDiv = document.createElement("div");
    removeDiv.setAttribute("class", "remove-div");
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "delete-item");
    removeBtn.setAttribute("data-bs-toggle", "modal");
    removeBtn.setAttribute("data-bs-target", "#confirm-delete");
    let removeIcon = document.createElement("i");
    removeIcon.setAttribute("class", "far fa-trash-alt");
    removeBtn.appendChild(removeIcon);
    removeDiv.appendChild(removeBtn);

    itemDiv.appendChild(h4);
    itemDiv.appendChild(quantityDiv);
    itemDiv.appendChild(priceDiv);
    itemDiv.appendChild(removeDiv);

    orderDiv.appendChild(itemDiv);
  }

  let totalTitle = document.createElement("h4");
  totalTitle.textContent = "Total:";
  let totalDiv = document.createElement("div");
  totalDiv.setAttribute(
    "class",
    "order-total d-flex justify-content-between p-2"
  );
  totalDiv.setAttribute("id", "order-total");
  totalDiv.appendChild(totalTitle);

  var totalPriceH4 = document.createElement("h4");
  totalPriceH4.textContent = totalPrice + " RON";
  totalDiv.appendChild(totalPriceH4);
  orderDiv.appendChild(totalDiv);

  if (
    document.getElementById("delivery-address") &&
    document.getElementById("billing-address")
  ) {
    deliveryFormControls = document
      .getElementById("delivery-address")
      .querySelectorAll(".form-control");
    deliveryStreet = deliveryFormControls[0].value;
    deliveryCity = deliveryFormControls[1].value;
    deliverySuite = deliveryFormControls[2].value;
    deliveryZipcode = deliveryFormControls[3].value;
    billingFormControls = document
      .getElementById("billing-address")
      .querySelectorAll(".form-control");
    billingStreet = billingFormControls[0].value;
    billingCity = billingFormControls[1].value;
    billingSuite = billingFormControls[2].value;
    billingZipcode = billingFormControls[3].value;

    handleAddressChange("delivery-address");
    handleAddressChange("billing-address");
  }
  function handleAddressChange(id) {
    let dropdown = document.getElementById(id + "-dropdown");
    let formControls = document
      .getElementById(id)
      .querySelectorAll(".form-control");
    if (dropdown) {
      dropdown.addEventListener("change", (event) => {
        if (event.target.value === "new") {
          formControls.forEach((element) => (element.value = ""));
        }
        if (event.target.value === "existing") {
          if (id === "delivery-address") {
            formControls[0].value = deliveryStreet;
            formControls[1].value = deliveryCity;
            formControls[2].value = deliverySuite;
            formControls[3].value = deliveryZipcode;
          }
          if (id === "billing-address") {
            formControls[0].value = billingStreet;
            formControls[1].value = billingCity;
            formControls[2].value = billingSuite;
            formControls[3].value = billingZipcode;
          }
        }
      });
    }
  }

  let orderBtnDiv = document.createElement("div");
  orderBtnDiv.setAttribute("class", "d-flex justify-content-end mt-3");
  let orderBtn = document.createElement("button");
  orderBtn.setAttribute("id", "order-btn");
  orderBtn.setAttribute("class", "order-btn btn btn-outline-dark");
  if (document.cookie == false) {
    orderBtn.disabled = true;
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    orderBtnDiv.setAttribute("data-bs-toggle", "tooltip");
    orderBtnDiv.setAttribute("data-bs-placement", "bottom");
    orderBtnDiv.setAttribute("title", "You need to log in before ordering");
  } else {
    let containerHeight = document.getElementById("container");
    containerHeight.style.minHeight = "0vh";
    orderBtn.setAttribute("type","submit");
    orderBtn.textContent = "Place Order";
    orderBtnDiv.appendChild(orderBtn);
    document.getElementById("address-form").appendChild(orderBtnDiv);
  }

  let modalDiv = document.createElement("div");
  modalDiv.setAttribute("class", "modal");
  modalDiv.setAttribute("id", "confirm-delete");
  modalDiv.setAttribute("role", "dialog");
  let modalDialogDiv = document.createElement("div");
  modalDialogDiv.setAttribute("class", "modal-dialog modal-dialog-centered");

  let modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");
  let modalHeader = document.createElement("div");
  modalHeader.setAttribute("class", "modal-header");
  let modalHeaderH5 = document.createElement("h5");
  modalHeaderH5.setAttribute("class", "modal-title");
  modalHeaderH5.textContent = "Are you sure you want to delete this item?";
  let modalHeaderBtn = document.createElement("button");
  modalHeaderBtn.setAttribute("class", "btn-close");
  modalHeaderBtn.setAttribute("type", "button");
  modalHeaderBtn.setAttribute("data-bs-dismiss", "modal");
  modalHeaderBtn.setAttribute("aria-label", "Close");
  modalHeader.appendChild(modalHeaderH5);
  modalHeader.appendChild(modalHeaderBtn);
  let modalBody = document.createElement("div");
  modalBody.setAttribute("class", "modal-body");
  let modalFooter = document.createElement("div");
  modalFooter.setAttribute(
    "class",
    "modal-footer d-flex justify-content-between"
  );
  let modalFooterCancelBtn = document.createElement("button");
  modalFooterCancelBtn.setAttribute("class", "btn btn-secondary");
  modalFooterCancelBtn.setAttribute("type", "button");
  modalFooterCancelBtn.setAttribute("data-bs-dismiss", "modal");
  modalFooterCancelBtn.textContent = "Close";
  let modalFooterDeleteBtn = document.createElement("button");
  modalFooterDeleteBtn.setAttribute("id", "delete-item");
  modalFooterDeleteBtn.setAttribute("type", "button");
  modalFooterDeleteBtn.setAttribute("class", "btn btn-danger");
  modalFooterDeleteBtn.textContent = "Delete item";
  modalFooter.appendChild(modalFooterCancelBtn);
  modalFooter.appendChild(modalFooterDeleteBtn);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialogDiv.appendChild(modalContent);
  modalDiv.appendChild(modalDialogDiv);
  document.getElementById("container").appendChild(modalDiv);

  const minusBtns = document.querySelectorAll(".minus-btn");
  const plusBtns = document.querySelectorAll(".plus-btn");
  minusBtns.forEach((item) => {
    item.addEventListener("click", () => {
      console.log(
        item.parentElement.parentElement.parentElement.parentElement.firstChild
          .textContent
      );
      console.log(item.parentElement.nextSibling.textContent);
      if (Number(item.parentElement.nextSibling.textContent) > 0) {
        item.parentElement.nextSibling.textContent =
          Number(item.parentElement.nextSibling.textContent) - 1;
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
          if (
            cartItems[i].name ===
            item.parentElement.parentElement.parentElement.parentElement
              .firstChild.textContent
          ) {
            console.log(cartItems[i].quantity);
            cartItems[i].quantity -= 1;
            console.log(cartItems[i].quantity);
            item.parentElement.parentElement.parentElement.nextSibling.lastChild.textContent =
              `${cartItems[i].quantity} x ${cartItems[i].price} = ` +
              Number(cartItems[i].price) * cartItems[i].quantity +
              " RON";
            if (cartItems[i].quantity < 5) {
              item.parentElement.nextSibling.nextSibling.firstChild.disabled = false;
            }
            if (cartItems[i].quantity < 2) {
              item.disabled = true;
            }
          }
          if (cartItems[i].quantity === 0) {
            cartItems.splice(i, 1);
            i = i - 1;
            localStorage.setItem("items", JSON.stringify(cartItems));
            item.parentElement.parentElement.parentElement.parentElement.remove();
            document.getElementById("cart-items").textContent =
              cartItems.length;
          } else {
            localStorage.setItem("items", JSON.stringify(cartItems));
            total += Number(cartItems[i].price) * cartItems[i].quantity;
          }
        }
        document.getElementById("cart-items").textContent = Number(document.getElementById("cart-items").textContent) - 1;
        if (cartItems.length > 0) {
          totalPriceH4.textContent = total + " RON";
        } else {
          window.location.reload();
        }
      }
    });
  });
  plusBtns.forEach((item) => {
    item.addEventListener("click", () => {
      item.parentElement.previousSibling.textContent =
        Number(item.parentElement.previousSibling.textContent) + 1;
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        if (
          cartItems[i].name ===
          item.parentElement.parentElement.parentElement.parentElement
            .firstChild.textContent
        ) {
          cartItems[i].quantity += 1;
          item.parentElement.parentElement.parentElement.nextSibling.lastChild.textContent =
            `${cartItems[i].quantity} x ${cartItems[i].price} = ` +
            Number(cartItems[i].price) * cartItems[i].quantity +
            " RON";
          if (cartItems[i].quantity > 4) {
            item.disabled = true;
          }
          if (cartItems[i].quantity > 1) {
            item.parentElement.parentElement.firstChild.firstChild.disabled = false;
          }
        }
        localStorage.setItem("items", JSON.stringify(cartItems));
        total += Number(cartItems[i].price) * cartItems[i].quantity;
      }
      totalPriceH4.textContent = total + " RON";
      document.getElementById("cart-items").textContent = Number(document.getElementById("cart-items").textContent) + 1;
    });
  });

  const deleteBtns = document.querySelectorAll(".delete-item");
  var modal = new bootstrap.Modal(
    document.getElementById("confirm-delete"),
    {}
  );
  deleteBtns.forEach((item) => {
    item.addEventListener("click", () => {
      document
        .getElementById("delete-item")
        .addEventListener("click", function (e) {
          console.log(item);
          modal.hide();
          let total = 0;
          for (let i = 0; i < cartItems.length; i++) {
            console.log(
              item.parentElement.parentElement.firstChild.textContent
            );
            if (
              cartItems[i].name ===
              item.parentElement.parentElement.firstChild.textContent
            ) {
              document.getElementById("cart-items").textContent = Number(document.getElementById("cart-items").textContent) - cartItems[i].quantity;
              cartItems.splice(i, 1);
              i = i - 1;
              localStorage.setItem("items", JSON.stringify(cartItems));
              item.parentElement.parentElement.remove();
            } else {
              total += Number(cartItems[i].price) * cartItems[i].quantity;
            }
          }
          if (cartItems.length > 0) {
            totalPriceH4.textContent = total + " RON";
          } else {
            window.location.reload();
          }
        });
    });
  });

  orderBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id="))
      .split("=")[1];
    let orderTotal = Number(
      document.getElementById("order-total").lastChild.textContent.slice(0, -4)
    );

    if(validateAddress()){
      fetch(window.location.origin + "/orders", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total: orderTotal,
          user: cookieValue,
          delivery_address: {
            street: deliveryFormControls[0].value,
            city: deliveryFormControls[1].value,
            suite: deliveryFormControls[2].value,
            zipcode: deliveryFormControls[3].value,
          },
          billing_address: {
            street: billingFormControls[0].value,
            city: billingFormControls[1].value,
            suite: billingFormControls[2].value,
            zipcode: billingFormControls[3].value,
          },
        }),
      }).then((data) => {
        if (data.status === 200) {
          localStorage.removeItem("items");
          let myModalEl = document.getElementById("order-success");
          let myModal = new bootstrap.Modal(myModalEl,{});
          myModalEl.addEventListener("hide.bs.modal", () => window.location.reload());
          setTimeout(() => { myModal.show() }, 2000);
        } else {
          document.getElementById("invalid-order").classList.remove("d-none");
        }
      });
    } else {
      let regexLetters = /(^[A-Za-z]{2,30})/;
      let regexZipCode = /^[0-9]{6}$/;
      let regexAddressSuite = /^[.0-9a-zA-Z\s,-]+$/;
      let inputDeliveryStreet = document.getElementById("inputStreetDelivery").value;
      let inputDeliveryCity = document.getElementById("inputCityDelivery").value;
      let inputDeliverySuite = document.getElementById("inputSuiteDelivery").value;
      let inputDeliveryZip = document.getElementById("inputZipDelivery").value;
      let inputBillingStreet = document.getElementById("inputStreetBilling").value;
      let inputBillingCity = document.getElementById("inputCityBilling").value;
      let inputBillingSuite = document.getElementById("inputSuiteBilling").value;
      let inputBillingZip = document.getElementById("inputZipBilling").value;

      if(inputDeliveryStreet && inputDeliveryStreet.length >= 1 && inputDeliveryStreet.length <= 30){
        document.getElementById("invalid-delivery-street").style.display = "none";
      } else {
        document.getElementById("invalid-delivery-street").style.display = "block";
      }
      if(inputDeliverySuite && inputDeliverySuite.match(regexAddressSuite)) {
        document.getElementById("invalid-delivery-suite").style.display = "none";
      } else {
        document.getElementById("invalid-delivery-suite").style.display = "block";
      }
      if(inputDeliveryCity && inputDeliveryCity.match(regexLetters) && inputDeliveryCity.length >= 1 && inputDeliveryCity.length <= 30) {
        document.getElementById("invalid-delivery-city").style.display = "none";
      } else {
        document.getElementById("invalid-delivery-city").style.display = "block";
      }
      if(inputDeliveryZip && inputDeliveryZip.match(regexZipCode) ) {
        document.getElementById("invalid-delivery-zip").style.display = "none";
      } else {
        document.getElementById("invalid-delivery-zip").style.display = "block";
      }
      if(inputBillingStreet && inputBillingStreet.length >= 1 && inputBillingStreet.length <= 30){
        document.getElementById("invalid-billing-street").style.display = "none";
      } else {
        document.getElementById("invalid-billing-street").style.display = "block";
      }
      if(inputBillingSuite && inputBillingSuite.match(regexAddressSuite)) {
        document.getElementById("invalid-billing-suite").style.display = "none";
      } else {
        document.getElementById("invalid-billing-suite").style.display = "block";
      }
      if(inputBillingCity && inputBillingCity.match(regexLetters) && inputBillingCity.length >= 1 && inputBillingCity.length <= 30) {
        document.getElementById("invalid-billing-city").style.display = "none";
      } else {
        document.getElementById("invalid-billing-city").style.display = "block";
      }
      if(inputBillingZip && inputBillingZip.match(regexZipCode) ) {
        document.getElementById("invalid-billing-zip").style.display = "none";
      } else {
        document.getElementById("invalid-billing-zip").style.display = "block";
      }
    
    }
  });
  
} else {
  localStorage.removeItem("items");
  let emptyCart = document.createElement("h4");
  emptyCart.textContent = "Your cart is empty";
  let phonePageLink = document.createElement("a");
  phonePageLink.setAttribute("href", "/phones");
  phonePageLink.textContent = "Continue shopping";
  document.getElementById("container").classList.add("text-center");
  document.getElementById("container").appendChild(emptyCart);
  document.getElementById("container").appendChild(phonePageLink);
  if (document.cookie) {
    document.getElementById("address-container").style.display = "none";
  }
}

function validateAddress() {
  let regexLetters = /(^[A-Za-z]{2,30})/;
  let regexZipCode = /^[0-9]{6}$/;
  let regexAddressSuite = /^[.0-9a-zA-Z\s,-]+$/;
  let inputDeliveryStreet = document.getElementById("inputStreetDelivery").value;
  let inputDeliveryCity = document.getElementById("inputCityDelivery").value;
  let inputDeliverySuite = document.getElementById("inputSuiteDelivery").value;
  let inputDeliveryZip = document.getElementById("inputZipDelivery").value;
  let inputBillingStreet = document.getElementById("inputStreetBilling").value;
  let inputBillingCity = document.getElementById("inputCityBilling").value;
  let inputBillingSuite = document.getElementById("inputSuiteBilling").value;
  let inputBillingZip = document.getElementById("inputZipBilling").value;

  return inputDeliveryStreet &&
    inputDeliverySuite &&
    inputDeliveryCity &&
    inputDeliveryZip &&
    inputBillingStreet &&
    inputBillingSuite &&
    inputBillingCity &&
    inputBillingZip &&
    inputDeliveryStreet.length >= 1 &&
    inputDeliveryStreet.length <= 30 &&
    inputBillingStreet.length >= 1 &&
    inputBillingStreet.length <= 30 &&
    inputDeliveryCity.match(regexLetters) &&
    inputDeliveryCity.length >= 1 &&
    inputDeliveryCity.length <= 30 &&
    inputBillingCity.match(regexLetters) &&
    inputBillingCity.length >= 1 &&
    inputBillingCity.length <= 30 &&
    inputDeliverySuite.match(regexAddressSuite) &&
    inputBillingSuite.match(regexAddressSuite) &&
    inputDeliveryZip.match(regexZipCode) &&
    inputBillingZip.match(regexZipCode);
}
