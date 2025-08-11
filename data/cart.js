export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];
// we use productId to search for the products like name and image etc

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