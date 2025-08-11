export const cart = [];

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
      quantity: 1
    });
  }
}