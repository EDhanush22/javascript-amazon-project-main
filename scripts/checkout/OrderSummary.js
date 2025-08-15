import {cart,removeFromCart,updateDeliveryOption} from '../../data/cart.js';  //Named export
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';  //default export   
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js'

export function renderOrderSummary(){
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;  //we need to know the image,name etc so we need to import product.js it contain all the details

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // below we are adding a special class to delete an item js-cart-item-container-${matchingProduct.id}
    cartSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}"> 
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${(formatCurrency(matchingProduct.priceCents))}  
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // 1.loop through deliveryOptions,2.For each option,generate some HTML,Combine the HTML together
  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents ===0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option" 
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  };
  //

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // When we click delete we remove the product form the cart,2.Update the HTML
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        renderPaymentSummary(); //updating page when a product is deleted,also example of using MVC
      });
    }); 
  // If radio selector has the same name we can inly select 1

  //Updating deliveryOptionId in the cart
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click',() => {
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary(); //To update the HTML after the cart changes.
      renderPaymentSummary(); //Updating payment summary when delivery is changed
    });
  }); 
}



// We are updating the data and regenerating all the HTML
/* The above technique is called MVC = Model-view-controller
   We split our code into three parts
   1.Model=saves and manages the data
   2.View=takes the data and displays it on the page
   3.Controller=runs some code when we interact with page,like evenlistners 
   They interact in a loop model->view->controller->model
   MVC is a design pattern*/