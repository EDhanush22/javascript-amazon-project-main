import {formatCurrency} from '../scripts/utils/money.js'

// The following creates a test suite
describe('test suite: fromatCurrency', ()=> {
  it('converts cents into dollars', () => {                //A function provided by jasmine which creates a test
    expect(formatCurrency(2095)).toEqual('20.95');
  }); 
  
  it('works with 0',() => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent',() => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});

// Expect allows us to compare value to another,expect gives us an object