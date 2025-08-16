import {renderOrderSummary} from './checkout/OrderSummary.js';  
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import '../data/cart-oop.js'     //Runs all the code inside file without importing

renderOrderSummary();
renderPaymentSummary();
//To display cart items when the page first loads.