/* List of products offered by the store */
const products = [];

/* addProduct(prodName, prodPrice, prodId, prodImage)
  - Creates a new product and adds it to the store's offerings
  - Each product is represented by an object. These objects serve three purposes:
    1. Encapsulating the properties of the products (name, price, productId, and image)
    2. Storing the quantity of each product in the customer's cart (initalized to 0)
    2. Tracking a product as it goes through store workflows (addition to cart, removal, price calculation, checkout)
*/
function addProductToStore(prodName, prodPrice, prodId, prodImage) {
  const newProduct = {
    name: prodName,
    price: prodPrice,
    quantity: 0,
    productId: prodId,
    image: prodImage
  };
  products.push(newProduct);
}

addProductToStore("Carton of Cherries", 4.0, 421, "images/cherry.jpg");
addProductToStore("Carton of Strawberries", 5.0, 422, "images/strawberry.jpg");
addProductToStore("Bag of Oranges", 10.0, 423, "images/orange.jpg");
addProductToStore("Ea-nasir's Quality Copper Ingot", 150.0, 424, "images/copperingot.jpg");

/* List of products the customer wants to purchase
  - Only represents if a certain product is in the customer's cart or not
  - It DOES NOT track product quantities - that is done by the product's object literal itself
*/
const cart = [];

/* Returns the product object corresponding to productId. Returns undefined if no such product exists. */
function getProductFromId(productId) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].productId === productId) {
      return products[i];
    }
  }
  return undefined;
}

/* Does the store offer a product with this productId? */
function isProductIdOffered(productId) {
  return (getProductFromId(productId) !== undefined);
}

/* Is this product object in the cart? */
function isProductInCart(product) {
  return (cart.indexOf(product) !== -1);
}

/* addProductToCart(productId)
  - Finds the product corresponding to productId in the list of products offered by the store
  - If the product is offered, adds the product to the cart if not already present
  - Increments the product's quantity
*/
function addProductToCart(productId) {
  if (isProductIdOffered(productId)) {
    const product = getProductFromId(productId);
    product.quantity++;
    if (!isProductInCart(product)) {
      cart.push(product);
    }
  }
}

/* increaseQuantity(productId)
  - Increments the quantity of the product corresponding to productId
*/
function increaseQuantity(productId) {
  if (isProductIdOffered(productId)) {
    const product = getProductFromId(productId);
    product.quantity++;
  }
}

/* decreaseQuantity(productId)
  - Decrements the quantity of the product corresponding to productId
  - If the quantity goes down to 0, removes the product from the cart
*/
function decreaseQuantity(productId) {
  if (isProductIdOffered(productId)) {
    const product = getProductFromId(productId);

    // If this is the last quantity of the product, remove it from the cart
    // altogether (this also changes the quantity to 0)
    if (product.quantity === 1) {
      removeProductFromCart(productId);
    } else {
      product.quantity--;
    }
  }
}

/* removeProductFromCart(productId)
  - Removes the product corresponding to productId from the cart
  - Also decrements the quantity of the product to 0
*/
function removeProductFromCart(productId) {
  if (isProductIdOffered(productId)) {
    const product = getProductFromId(productId);

    // Make sure the product is actually in the cart before removing it
    const prodInx = cart.indexOf(product);
    if (prodInx !== -1) {
      product.quantity = 0;
      cart.splice(prodInx, 1);
    }
  }
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
   // Uncomment the following line if completing the currency converter bonus
   // currency
}
