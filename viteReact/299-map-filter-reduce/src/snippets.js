var numbers = [3, 56, 2, 48, 5];

//map - Create a new array by doing something with each item in an array.

/* 
  function double(x) {
    return x * 2;
  }

  const newNumbers = numbers.map(double);
  console.log(newNumbers); 
*/

//map - as above but even simpler, utilizing anonymous function
const doubleNumbers = numbers.map(function (x) {
  return x * 2;
});
console.log(doubleNumbers);

//so map is just like a pre-formulated forEach, specifically for arrays (and objects?)
var doubleNumbersFE = [];
numbers.forEach(function (x) {
  doubleNumbersFE.push(x * 2);
});
console.log(doubleNumbersFE);

//filter - Create a new array by keeping the items that return true.
const filterNumbers = numbers.filter(function (num) {
  return num > 10;
});
console.log(filterNumbers);

//so filter can be represented by a forEach as well:
var filterNumbersFE = [];
numbers.forEach(function (num) {
  if (num > 10) {
    filterNumbersFE.push(num);
  }
});
console.log(filterNumbersFE);

//reduce - Accumulate a value by doing something to each item in an array.
var reduceNumbers = numbers.reduce(function (accumulator, currentNumber) {
  console.log("accumulator = " + accumulator);
  console.log("currentNumber = " + currentNumber);
  return accumulator + currentNumber;
});
//reduce - replicated with a ForEach
var reduceNumbersFE = 0;
numbers.forEach(function (currentNumber) {
  reduceNumbersFE += currentNumber;
});
console.log(reduceNumbersFE);

//***CAUTION: ES6 compatible browsers required for Find and FindIndex! ***

//find - find the first item that matches from an array.
const findFirstNumber = numbers.find(function (num) {
  return num > 10;
});
console.log(findFirstNumber);

//findIndex - find the index of the first item that matches.
const findFirstIndex = numbers.findIndex(function (num) {
  return num > 10;
});
console.log(findFirstIndex);
