import {formatCurrency} from '../scripts/utils/money.js'

//Testing fromatCurrency,This coms under automated testing = using code to test code
//test suite = group of related tests

console.log('tests suite: fromatCurrency');

console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95'){   //basic test case
  console.log('passed');
} else{
  console.log('failed');
}

console.log('works with 0');

if (formatCurrency(0) === '0.00'){ //edge case
  console.log('passed');
} else{
  console.log('failed');
}

console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01'){ //edge case
  console.log('passed');
} else{
  console.log('failed');
}

/* Disadvantages of manual testing
   1.Hard to test every situation
   2.Hard to re-test
*/

/* 2Types of Test Cases
   1.Basic test cases = tests if the code is working or not
   2.Edge cases = test with values that are tricky
*/
