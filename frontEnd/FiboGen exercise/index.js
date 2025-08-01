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
/* WELP my peer programmer had to help me with this one.
didn't use copilot b/c i was writing it in the dev tools console/snippets.
went to google gemini after i got stuck.
REFLECTION: i had all the core concepts and decisions right, i just struggle with syntax
***
help! you are my peer programmer in javascript. in javascript i keep getting illegal return statement for this snippet. how would you fix?
BEGIN MY CRAPPY CODE
function fibonacciGenerator(n) {

  let fibonacciArray = [];

  if ((n <= 0) || (n * 10 % 10 != 0)) { 

    /* if user passes us zero, a negative number, or non-integer

    do nothing just jump to return statement to return currently empty array 

  }

  else if (n = 1) {

    fibonacciArray = [0];

  }

  else

    fibonacciArray = [0,1];

    for (let i = 2; i < n; i++) {

      fibonacciArray.push(fibonacciArray[fibonacciArray.length - 1] + fibonacciArray[fibonacciArray.length - 2]);

    } 

  }

  return fibonacciArray;

}
END MY CRAPPY CODE
***
GEMINI'S RESPONSE:
Hey! You've got an "Illegal return statement" because your return is outside the function's curly braces {}. I also spotted a couple of other logic bugs.

Here’s the corrected code:

JavaScript

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
Key Issues & Fixes
Here’s a quick breakdown of the changes:

1. Illegal Return Statement
The original return fibonacciArray; was placed after the function's closing brace }. A return can only exist inside a function.

Fix: I moved the return fibonacciArray; statement inside the function.

2. Assignment vs. Comparison
In your else if condition, you used n = 1. The single equals sign (=) is for assignment, not comparison. This was assigning the value 1 to n and then evaluating to true, causing your code to always enter that block if n was greater than 0.

Fix: Changed n = 1 to n === 1. The triple equals (===) checks for both value and type without coercion and is generally the safest comparison to use in JavaScript.

3. Flawed else Logic
Your else statement didn't have curly braces {}. Without them, the else only applies to the very next line (fibonacciArray = [0,1];). This meant your for loop was running every single time, regardless of the value of n, which could lead to incorrect results.

Fix: I restructured the if/else logic to correctly handle the base cases (n=1, n=2) and then run the loop only when n > 2.

Hope this helps you out! 👍
