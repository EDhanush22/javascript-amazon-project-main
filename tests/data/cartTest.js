import {addToCart,cart,loadFromStorage} from '../../data/cart.js'

describe('test suite: addToCart',()=> {
  it('adds an existing product to the cart', ()=> {
    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]); 
    });
    loadFromStorage(); 
    //Adding a product again
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
    expect(cart.length).toEqual(1);   
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);  
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
    expect(cart[0].quantity).toEqual(2); 
  });
  
  it('add a new product to the cart', () => {
    //mock localstorage,we don't want to save testcases effect localstorage so we mock it
    spyOn(localStorage,'setItem');

    //Our satrting cart is depends upon localStorage,if a empty cart is in localStroage 
    //our test will pass,otherwise the test will fail that is called flaky test so we create a mock
    //Creating a fake version of getItem
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([]);   //return an empty array
    });
    loadFromStorage();   //we reload the cart,the cart will be empty

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');  //we add a product and the cart length will be one
    expect(cart.length).toEqual(1);   //Checking cart length when we add a product the cart.length should be equal to one
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);  //shows how many times setItem is called in the code above we expect to be called once
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); //checking the item in the cart
    expect(cart[0].quantity).toEqual(1); //checking cart quantity
  });
});

// Flaky test = test that sometimes passes and sometimes fails
// Mocks = lets us replace a method with a fake version,we can create it with spyon(),it takes two parameters,
// first one is object and second one is method we want to mock
// spyOn records everytime a method is used
// a mock only lasts for 1 test