let currencySymbol = '$';

// Draws product list
function drawProducts() {
    let productList = document.querySelector('.products');
    let productItems = '';
    products.forEach((element) => {
        productItems += `
            <div data-productId='${element.productId}'>
                <img src='${element.image}'>
                <h3>${element.name}</h3>
                <p>price: ${formatCurrency(element.price)}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    });
    // use innerHTML so that products only drawn once
    productList.innerHTML = productItems;
}

// Draws cart
function drawCart() {
    let cartList = document.querySelector('.cart');
    // clear cart before drawing
    let cartItems = '';
    cart.forEach((element) => {
        let itemTotal = element.price * element.quantity;

        cartItems += `
            <div data-productId='${element.productId}'>
                <h3>${element.name}</h3>
                <p>price: ${formatCurrency(element.price)}</p>
                <p>quantity: ${element.quantity}</p>
                <p>total: ${formatCurrency(itemTotal)}</p>
                <button class="qup">+</button>
                <button class="qdown">-</button>
                <button class="remove">remove</button>
            </div>
        `;
    });
    // use innerHTML so that cart products only drawn once
    cart.length
        ? (cartList.innerHTML = cartItems)
        : (cartList.innerHTML = 'Cart Empty');
}

// Draws checkout
function drawCheckout() {
    let checkout = document.querySelector('.cart-total');
    checkout.innerHTML = '';

    // run cartTotal() from script.js
    let cartSum = cartTotal();

    let div = document.createElement('div');
    div.innerHTML = `<p>Cart Total: ${formatCurrency(cartSum)}`;
    checkout.append(div);
}

// Initialize store with products, cart, and checkout
drawProducts();
drawCart();
drawCheckout();

document.querySelector('.products').addEventListener('click', (e) => {
    let productId = e.target.parentNode.getAttribute('data-productId');
    productId *= 1;
    addProductToCart(productId);
    drawCart();
    drawCheckout();
});

// Event delegation used to support dynamically added cart items
document.querySelector('.cart').addEventListener('click', (e) => {
    // Helper nested higher order function to use below
    // Must be nested to have access to the event target
    // Takes in a cart function as an agrument
    function runCartFunction(fn) {
        let productId = e.target.parentNode.getAttribute('data-productId');
        productId *= 1;
        for (let i = cart.length - 1; i > -1; i--) {
            if (cart[i].productId === productId) {
                let productId = cart[i].productId;
                fn(productId);
            }
        }
        // force cart and checkout redraw after cart function completes
        drawCart();
        drawCheckout();
    }

    // check the target's class and run function based on class
    if (e.target.classList.contains('remove')) {
        // run removeProductFromCart() from script.js
        runCartFunction(removeProductFromCart);
    } else if (e.target.classList.contains('qup')) {
        // run increaseQuantity() from script.js
        runCartFunction(increaseQuantity);
    } else if (e.target.classList.contains('qdown')) {
        // run decreaseQuantity() from script.js
        runCartFunction(decreaseQuantity);
    }
});

document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault();

    // Get input cash received field value, set to number
    let amount = document.querySelector('.received').value;
    amount *= 1;

    // Set cashReturn to return value of pay()
    let cashReturn = pay(amount);

    let paymentSummary = document.querySelector('.pay-summary');
    let div = document.createElement('div');

    // If total cash received is greater than cart total thank customer
    // Else request additional funds
    if (cashReturn >= 0) {
        div.innerHTML = `
            <p>Cash Received: ${formatCurrency(amount)}</p>
            <p>Cash Returned: ${formatCurrency(cashReturn)}</p>
            <p>Thank you!</p>
        `;
    } else {
        // reset cash field for next entry
        document.querySelector('.received').value = '';
        div.innerHTML = `
            <p>Cash Received: ${formatCurrency(amount)}</p>
            <p>Remaining Balance: ${formatCurrency(cashReturn)}</p>
            <p>Please pay additional amount.</p>
            <hr/>
        `;
    }

    paymentSummary.append(div);
});

/* Standout suggestions */
/* Begin remove all items from cart */
function dropCart() {
    let shoppingCart = document.querySelector('.empty-btn');
    let div = document.createElement("button");
    div.classList.add("empty");
    div.innerHTML =`Empty Cart`;
    shoppingCart.append(div);
}
dropCart();

document.querySelector('.empty-btn').addEventListener('click', (e) => {
    if (e.target.classList.contains('empty')){
        emptyCart();
        drawCart();
        drawCheckout();
    }
});
/* End all items from cart */

/* Begin currency converter */
function currencyBuilder(){
    let currencyPicker = document.querySelector('.currency-selector');
    let select = document.createElement("select");
    select.classList.add("currency-select");
    select.innerHTML = `<option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="YEN">YEN</option>`;
    currencyPicker.append(select);
}
currencyBuilder();

document.querySelector('.currency-select').addEventListener('change', function handleChange(event) {
    switch(event.target.value){
        case 'EUR':
            currencySymbol = '€';
            break;
        case 'YEN':
            currencySymbol = '¥';
            break;
        default:
            currencySymbol = '$';
            break;
     }

    currency(event.target.value);
    drawProducts();
    drawCart();
    drawCheckout();
});
/* End currency converter */
/* End standout suggestions */


/**
 * Extra Credit
 */
function drawCrediCardForm() {
    const checkout = document.querySelector('.checkout-container');
    const creditCardDiv = document.createElement('form');
    creditCardDiv.setAttribute('novalidate', '');
    creditCardDiv.style.cssText = 'max-width: 250px; display: flex; flex-flow: row wrap; gap: 0.5rem; padding: 1rem; background: #DDD; border-radius: 0.5rem; box-shadow: 3px 3px 4px 1px';
    
    const cardNumber = document.createElement('input');
    cardNumber.setAttribute('type', 'text');
    cardNumber.setAttribute('placeholder', 'Card Number');
    cardNumber.setAttribute('required', '');
    cardNumber.setAttribute('pattern', '^(\\d{4}-){3}\\d{4}$'); //eslint-disable-line
    cardNumber.style.cssText = 'width: 100%; padding: 0.25rem; border: none; border-radius: 0.25rem';
    
    const cardName = document.createElement('input');
    cardName.setAttribute('type', 'text');
    cardName.setAttribute('placeholder', 'Name on Card');
    cardName.setAttribute('required', '');
    cardName.setAttribute('pattern', '^[a-zA-Z ]+$');
    cardName.style.cssText = 'width: 100%; padding: 0.25rem; border: none; border-radius: 0.25rem';
    
    const cardExpiration = document.createElement('input');
    cardExpiration.setAttribute('placeholder', 'MM/YY');
    cardExpiration.setAttribute('required', '');
    cardExpiration.setAttribute('pattern', '^(0[1-9]|1[0-2])/[0-9]{2}$');
    cardExpiration.style.cssText = 'width: 68%; padding: 0.25rem; border: none; border-radius: 0.25rem';
    
    const cardCVV = document.createElement('input');
    cardCVV.setAttribute('type', 'text');
    cardCVV.setAttribute('placeholder', 'CVV');
    cardCVV.setAttribute('required', '');
    cardCVV.setAttribute('pattern', '^[0-9]{3,4}$');
    cardCVV.setAttribute('id', 'cardcvv');
    cardCVV.style.cssText = 'width: 20%; padding: 0.25rem; border: none; border-radius: 0.25rem';
    
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Pay');
    submitButton.style.cssText = 'width: 100%; padding: 0.5rem; margin: 1rem 0; border: none; border-radius: 0.25rem; background: #3333FF; color: white; font: bold 1rem Arial;';

    const errorSpan = document.createElement('span');
    errorSpan.setAttribute('aria-live', 'polite');
    errorSpan.classList.add('errorspan');                      

    creditCardDiv.appendChild(cardNumber);
    creditCardDiv.appendChild(cardName);
    creditCardDiv.appendChild(cardExpiration);
    creditCardDiv.appendChild(cardCVV);
    creditCardDiv.appendChild(submitButton);
    creditCardDiv.appendChild(errorSpan);
    checkout.appendChild(creditCardDiv);

    // inorder to make the credicard number entry presentable with XXXX-XXXX-XXXX-XXXX formatt
    cardNumber.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/-/g, '').replace(/(\d{4}(?!$))/g, '$1-').slice(0, 19);
})
    cardExpiration.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/\//g, '').replace(/(\d{2}(?!$))/g, '$1/').slice(0,5);
    })

   

    creditCardDiv.addEventListener('submit', (event) => {

        event.preventDefault();

    // Clearing the previous custom validity
    cardNumber.setCustomValidity('');
    cardName.setCustomValidity('');
    cardExpiration.setCustomValidity('');
    cardCVV.setCustomValidity('');

    
    if(!cardNumber.checkValidity()) {
        if (cardNumber.validity.patternMismatch) {
            cardNumber.setCustomValidity('Please enter a valid Credit Card number.');
        }
    }

    if(!cardName.checkValidity()) {
        if (cardName.validity.patternMismatch) {
            cardName.setCustomValidity('Please enter a valid name.');
        }
    }

    if(!cardExpiration.checkValidity()) {
        if (cardExpiration.validity.patternMismatch) {
            cardExpiration.setCustomValidity('Please enter valid expiration data in MM/YY format.');
        }
    }

    if(!cardCVV.checkValidity()) {
        if (cardCVV.validity.patternMismatch) {
            cardCVV.setCustomValidity('Please enter a valid CVV number.');
        }
    }

    if(creditCardDiv.checkValidity()) {
        errorSpan.textContent = `Thank you. Processed ${formatCurrency(cartTotal())} on your card ending in ${cardNumber.value.slice(-4)}.`;
        console.log('Valid form: if we had backend, we would send submit to the backend.');
    } else {
        cardNumber.reportValidity();
        cardName.reportValidity();
        cardExpiration.reportValidity();
        cardCVV.reportValidity();
    }
        
    });

}

drawCrediCardForm();


/**
 * Add product
 */
function drawAddProductForm() {
    const productContainer = document.querySelector('.products-container');
    
    const addProductForm = document.createElement('form');
    addProductForm.setAttribute('novalidate', '');
    addProductForm.style.cssText = 'max-width: 250px; display: flex; flex-flow: row wrap; gap: 0.5rem; padding: 1rem; background: #DDD; border-radius: 0.5rem; box-shadow: 3px 3px 4px 1px';
    

    const formTitle = document.createElement('h3');
    formTitle.textContent = 'Add a product of your own';

    const productName = document.createElement('input');
    productName.setAttribute('type', 'text');
    productName.setAttribute('placeholder', 'Name of product');
    productName.setAttribute('required', '');
    productName.setAttribute('pattern', '^[a-zA-Z ]+$');
    productName.style.cssText = 'width: 100%; padding: 0.25rem; border: none; border-radius: 0.25rem';

    const productPrice = document.createElement('input');
    productPrice.setAttribute('type', 'text');
    productPrice.setAttribute('placeholder', 'Price');
    productPrice.setAttribute('required', '');
    productPrice.setAttribute('pattern', '^[0-9]*$');
    productPrice.style.cssText = 'width: 100%; padding: 0.25rem; border: none; border-radius: 0.25rem';
    // const productQuantity = document.createElement('input');
    // const productID = document.createElement('input');
    const productImgUrl = document.createElement('input');
    productImgUrl.setAttribute('type', 'text');
    productImgUrl.setAttribute('placeholder', 'Product image Url/file path');
    productImgUrl.setAttribute('required', '');
    //productImgUrl.setAttribute('pattern', 'https://.*$'); //also want to grab local image files
    productImgUrl.style.cssText = 'width: 100%; padding: 0.25rem; border: none; border-radius: 0.25rem';

    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Add Product');
    submitButton.style.cssText = 'width: 100%; padding: 0.5rem; margin: 1rem 0; border: none; border-radius: 0.25rem; background: #3333FF; color: white; font: bold 1rem Arial;';


    addProductForm.appendChild(formTitle);
    addProductForm.appendChild(productName);
    addProductForm.appendChild(productPrice);
    addProductForm.appendChild(productImgUrl);
    addProductForm.appendChild(submitButton);
    productContainer.appendChild(addProductForm);

    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if(addProductForm.checkValidity()) {

            const productIds = products.map((product) => product.productId);

            const userProduct = {
                name: productName.value,
                price: productPrice.value,
                quantity: 0,
                productId: Math.max(...productIds) + 1, //generate unique id
                image: productImgUrl.value,
              };


            products.push(userProduct);
            drawProducts();
            addProductForm.reset();
            

        } else {
        event.preventDefault();
        productName.setCustomValidity('');
        productPrice.setCustomValidity('');
        productImgUrl.setCustomValidity('');
      

        if ( productName.validity.patternMismatch) {
            productName.setCustomValidity('Pleade enter valid product name');
        }

        if ( productPrice.validity.patternMismatch) {
            productPrice.setCustomValidity('Pleade enter valid price');
        }

        if ( productImgUrl.validity.patternMismatch) {
            productImgUrl.setCustomValidity('Pleade enter valid url for image');
        }

        productName.reportValidity();
        productPrice.reportValidity();
        productImgUrl.reportValidity();
    }
})
}
drawAddProductForm();
