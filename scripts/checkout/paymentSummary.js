import {cart} from '../../data/cart.js'
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js'
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js'

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity   //Calculating the cost of the product
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary 
     js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const respose = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type:': 'application/json'
          },
          body: JSON.stringify({
            cart: cart 
          })
        });

      const order = await respose.json()
      addOrder(order);

      } catch (error) {
        console.log('Unexpected error. Try again later')
      }

      window.location.href = 'orders.html';
    });
}

/* Main idea of Javascript
  1.Save the data(Model)
  2.Generate the HTML(View)
  3.Make it interactive(Controller)
*/

/* Steps to cost of product
   1.Loop through the cart
   2.For each product, price * quantity
   3.Add everything together
   so import cart
*/

/* Steps to shipping cost
   1.Loop through the cart
   2.Add all shipping costs together
*/
