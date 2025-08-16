import {renderOrderSummary} from '../../scripts/checkout/OrderSummary.js'
import {cart,loadFromStorage} from '../../data/cart.js'


describe('test suite: renderOrderSummary', () => {
  //runs everytime before the setup its like sharing the code between two tests it always executes first
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeEach(() => {
    //This follows scope,so productsId1 and productId2 should move outside
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage(); 

    renderOrderSummary();
  })

  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
    document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');   //check if it contains the string Quantity: 2
    expect(
    document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    document.querySelector('.js-test-container').innerHTML ='';

  });

  it('removes a product', () => {
    //When we click delete is uses a function called removeFromCart and it saves to local storage and calls localStorage.setItem so mock it

    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    //Cleanup to make test cases visible at top,we can keep it in afterEach() class
    document.querySelector('.js-test-container').innerHTML ='';
  });
});

// It comes under Integration test
// renderOrderSummary creates a part of the page 
/* 2 things to test
   1.How the page looks
   2.How the page behaves
*/

//Integration test = tests many units/pieces of code working together

//Hooks lets us run sum code for each test,we can share the code between two tests
/* There are several hooks jasmine provides
   1.beforeEach() = runs code before each test
   2.afterEach() = runs code after each test
   3.beforeAll() = runs code before all tests
   4.afterAll() =rus code after all tests
*/