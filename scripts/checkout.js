import {renderOrderSummary} from './checkout/OrderSummary.js';  
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import {loadProducts, loadProductsFetch} from '../data/products.js'
import {loadCart} from '../data/cart.js'
// import '../data/cart-class.js'     //Runs all the code inside file without importing
// import '../data/backend-practice.js';

Promise.all([ 
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values) // display the values given to resolve in the form of array
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => { // loadProducts is an asynchronous code
    resolve('value1'); // takes to the next step
  }); // resolve takes a value

}).then((value) => {  // next step
  console.log(value) // whatever value we give to resolve it is saved inside parameter we give in then(value)

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

// we run multiple promises at the same time,to do thar we use the feature Promise.all()
// let us run multiple promises at the same time
// and wait for all of them to finidh

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();  // we have code inside code inside code,there is nesting at the beginning
    renderPaymentSummary(); // multiple callbacks causes nesting
  });
});
*/

//To display cart items when the page first loads.

// Promise is a buit in class,it runs the funciton immediately,it takes function as parameter
// resolve is a function,works similar to done() function
// resolve lets us control when to got to the next step
// promise creats seperate thread of code,mean run simultaneously while other steps run
// promise does the same thing as callback
// multiple callbacks cause a lot of nesting so we use callbacks
// promise is used to run asynchronous code