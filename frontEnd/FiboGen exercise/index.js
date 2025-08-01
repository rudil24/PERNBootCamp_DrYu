function fibonacciGenerator(n) {
  let fibonacciArray = [];

  // Handle non-positive numbers or non-integers
  if (n <= 0 || !Number.isInteger(n)) {
    return []; // Return an empty array immediately
  }

  // Handle the first case
  if (n === 1) {
    return [0];
  }
  
  // Initialize for n >= 2
  fibonacciArray = [0, 1];
  
  // Build the rest of the sequence
  for (let i = 2; i < n; i++) {
    const nextFib = fibonacciArray[i - 1] + fibonacciArray[i - 2];
    fibonacciArray.push(nextFib);
  }
  
  return fibonacciArray;
}