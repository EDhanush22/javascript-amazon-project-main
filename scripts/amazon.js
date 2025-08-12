// Put all import at top of file and should always use live server
import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js'


//Accumulator pattern
let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
          Add to Cart
        </button>
      </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) =>{
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {  //to loop through each of the buttton
    button.addEventListener('click', ()=> {
      const productId = button.dataset.productId;  // dataset property gives all data attributes attached to the button
      addToCart(productId); //add product to our cart,inserting in cart.js file because they are related
      updateCartQuantity(); //update cart quantity
    });
  });
// It's better to use productID instead ot product name other products might also have the same name
/*Steps to update the cart
  1.Check if the product is already in the cart
  2.If it is the cart,increase the quantity
  3.If it's not in the cart,add it to the cart
*/
/*Update the cart quantity on page
  1.Calculate the quantity
  2.Put the quantity on the page (using DOM)
*/ 
// Group related code together into its own file