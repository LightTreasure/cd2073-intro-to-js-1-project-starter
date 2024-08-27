/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [];

/* Create 3 or more product objects using object literal notation
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/
const cherryCarton = {
  name: "Carton of Cherries",
  price: 4.0,
  quantity: 0,
  productId: 421,
  image: "images/cherry.jpg"
};
const strawberryCarton = {
  name: "Carton of Strawberries",
  price: 5.0,
  quantity: 0,
  productId: 422,
  image: "images/strawberry.jpg"
};
const orangeBag = {
  name: "Bag of Oranges",
  price: 10.0,
  quantity: 0,
  productId: 423,
  image: "images/orange.jpg"
};
products.push(cherryCarton);
products.push(strawberryCarton);
products.push(orangeBag);

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
const addProductToCart = function (productId) {
  products.forEach(function (product) {
    if (product.productId === productId) {
      product.quantity++;
      //Add productId to the cart if it's not already there
      if (cart.indexOf(product) === -1) {
        cart.push(product);
      }
    }
  });
};

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
const increaseQuantity = function (productId) {
  products.forEach(function (product) {
    if (product.productId === productId) {
      product.quantity++;
    }
  });
};

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
const decreaseQuantity = function (productId) {
  products.forEach(function (product) {
    if (product.productId === productId) {
      // If this is the last quantity of the product, remove it from the cart
      // altogether (this also changes the quantity to 0)
      if (product.quantity === 1) {
        removeProductFromCart(productId);
      } else {
        product.quantity--;
      }
    }
  });
};

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
const removeProductFromCart = function (productId) {
  products.forEach(function (product) {
    if (product.productId === productId) {
      product.quantity = 0;
      let prodInx = cart.indexOf(product);
      // Make sure the product is actually in the cart before removing it
      if (prodInx !== -1) {
        cart.splice(prodInx, 1);
      }
    }
  });
};

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
const cartTotal = function () {
  let totalCost = 0;
  cart.forEach(function (prod) {
    totalCost += prod.quantity * prod.price;
  });
  return totalCost;
};

/* Create a function called emptyCart that empties the products from the cart */

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart
*/

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


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
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
