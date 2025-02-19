let totalPaid = 0; //
let currencyFormatter = Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' });
/* Create an array named products which you will use to add all of
your product object literals that you create in the next step. */
const products = [];

/* Create 3 or more product objects using object literal notation
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
const cherry = {
  name: 'Carton of Cherry',
  price: 4,
  quantity: 0,
  productId: 101,
  image: 'images/cherry.jpg',
};

const orange = {
  name: 'Bag of Orange',
  price: 1000,
  quantity: 0,
  productId: 102,
  image: 'images/orange.jpg',
};

const strawberry = {
  name: 'Carton of Strawberry',
  price: 5,
  quantity: 0,
  productId: 103,
  image: 'images/strawberry.jpg',
};

products.push(cherry);
products.push(orange);
products.push(strawberry);

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];

/* helper function to get product with productID */
function getProduct(productId) {
  return products.find((product) => product.productId === productId);
}

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId) {
  const product = getProduct(productId); // find the product with productID
  product.quantity += 1;
  if (!cart.includes(product)) {
    cart.push(product);
  }
}
/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  const product = getProduct(productId);
  product.quantity += 1;
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  // remove the proudct with productID form the cart
  const product = getProduct(productId);
  product.quantity = 0;
  const productIndex = cart.findIndex((item) => item.productId === productId);
  cart.splice(productIndex, 1);
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  const product = getProduct(productId);
  product.quantity -= 1;
  if (product.quantity === 0) {
    removeProductFromCart(productId);
  }
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/
function cartTotal() {
  let sum = 0;
  cart.forEach((product) => {
    sum += (product.quantity * product.price); // get cost of product and add it to the sum
  });

  return sum;
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  cart.forEach((product) => {
    product.quantity = 0;
  });
  cart.length = 0;
}

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/
function pay(amount) {
  const remainder = totalPaid + amount - cartTotal();
  if (remainder >= 0) {
    totalPaid = 0;
  } else {
    totalPaid += amount;
  }

  return remainder; // subtract the cart's total from the ammount paied
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom
of the project rubric.) */
function currency(currencyType) {
  switch (currencyType) {
    case 'YEN':
      currencyFormatter = Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
      break;
    case 'EUR':
      currencyFormatter = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
      break;
    default:
      currencyFormatter = Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' });
  }
}

function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

/* The following is for running unit tests.
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  currency,
  formatCurrency,
};
