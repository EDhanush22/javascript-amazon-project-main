export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    //save the id of the product we want and search for it in product.js this technique is called is normalizing the data
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}
// Variables are reset when we go to the different page or reset the page
// we use productId to search for the products like name and image etc
// We use local storaage to save our cart
// setItem take two things name whatever we want to save,data we want to save

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
  //Checking if the item is in the cart or not
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += 1;  //if it is inside increasing the quantity
  } else{
    cart.push({          //if it is not inside insert the item in cart
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'   //for new products we are giving default deliveryOptionId as 1
    });
  }

  // Whenever we are updating the cart we are saving to local storage
  saveToStorage();
}

export function removeFromCart(productID) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId != productID){
      newCart.push(cartItem);
    }
  });

  cart = newCart; //updating the cart
  
  saveToStorage();
}
/* How to remove product from cart
  1.Create a new array
  2.Loop through the cart
  3.Add each product to the new array,except for this productId 
*/
//To remove product from page
// Use DOM to get the element to remove
// Use .remove() method