// classic fizzBuzz exercise
// build a snippet (in dev tools but copied here)
// this snippet should create a function. every time the function is called,
// it adds the next sequential number from 1 to 100 to an (initially empty) array, 
// then echo the full array to the console.
// but for multiples of 3 add & print "Fizz" instead of the number 
// and for multiples of 5 add & print "Buzz". 
// For numbers which are multiples of both three and five add & print "FizzBuzz". 
let output = [];
function fizzBuzz() {
    if ((output.length + 1) % 3 === 0) {
        if ((output.length + 1) % 5 === 0) {
            output.push("FizzBuzz");
        }
        else
        {
            output.push("Fizz");
        }    
    }
    else if ((output.length + 1) % 5 === 0) {
        output.push("Buzz");
    }
    else {        
        output.push(output.length + 1);
    }
    console.log(output);
}