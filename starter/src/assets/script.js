/* List of products offered by the store */
const products = [];

/* Objects representing individual products
  - These objects serve three purposes:
    1. Encapsulating the properties of the products (name, price, productId, and image)
    2. Storing the quantity of each product in the customer's cart
    2. Tracking a product as it goes through store workflows (addition to cart, removal, price calculation, checkout)
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

/* Add these products to the list of products offered by the store */
products.push(cherryCarton);
products.push(strawberryCarton);
products.push(orangeBag);

/* List of products the customer wants to purchase
  - Only represents if a certain product is in the customer's cart or not
  - It DOES NOT track product quantities - that is done by the product's object literal itself
*/
const cart = [];

/* addProductToCart(productId)
  - Finds the product corresponding to productId in the list of products offered by the store
  - If the product is offered, adds the product to the cart if not already present
  - Increments the product's quantity
*/
function addProductToCart(productId) {
  products.forEach(function (product) {
    if (product.productId === productId) {
      product.quantity++;
      //Add productId to the cart if it's not already there
      if (cart.indexOf(product) === -1) {
        cart.push(product);
      }
    }
  });
}

/* increaseQuantity(productId)
  - Increments the quantity of the product corresponding to productId
*/
function increaseQuantity(productId) {
  products.forEach(function (product) {
    if (product.productId === productId) {
      product.quantity++;
    }
  });
}

/* decreaseQuantity(productId)
  - Decrements the quantity of the product corresponding to productId
  - If the quantity goes down to 0, removes the product from the cart
*/
function decreaseQuantity(productId) {
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
}

/* removeProductFromCart(productId)
  - Removes the product corresponding to productId from the cart
  - Also decrements the quantity of the product to 0
*/
function removeProductFromCart(productId) {
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
}

/* cartTotal()
  - Returns the total cost of all the quantity of products in the cart
*/
function cartTotal() {
  let totalCost = 0;
  cart.forEach(function (prod) {
    totalCost += prod.quantity * prod.price;
  });
  return totalCost;
}

/* totalPaid - global variable to keep track of the cash amount the customer has paid so far
  - Initialized to a value of 0
  - The function pay() updates this value
*/
let totalPaid = 0;

/* emptyCart()
  - Removes all products in the cart and sets their quantity to 0
*/
function emptyCart() {
  let item = cart.pop();
  while (item !== undefined) {
    item.quantity = 0;
    item = cart.pop();
  }
}

/* pay(cashReceived)
  - Conducts a transaction
    - If the customer paid more than the balance, immediately gives back cash to the customer (sets totalPaid back to 0)
    - Otherwise updates totalPaid by cashReceived
  - Returns the amount due to the customer (negative if the customer has a balance)
*/
function pay(cashReceived) {
  totalPaid += cashReceived;
  const dueToStore = cartTotal() - totalPaid;
  if (dueToStore < 0) {
    // Return the extra cash back to the customer immediately
    totalPaid = 0;
  }
  return -1 * dueToStore;
}

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
