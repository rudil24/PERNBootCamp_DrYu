/* rudil24 getting to know Node Package Manager (npm) */
/* all packages found at npmjs.com */
/* we searched "silly", found sillyname pkg, it tells us how to install (did an npm i sillyname at the terminal) */
/* it copies a dependency into our package.json in this dir, and copies its needed code into ./node_modules subdir */
/* now reading the documentation it tells us how to use it: https://www.npmjs.com/package/sillyname */ 


/* commenting this older CJS "require" method out after adding  "type": "module" to our package.json to allow ECMAScript modules */
/* var generateName = require('sillyname'); */
/*now use proper import method using ESM */
import generateName from "sillyname";
/* now can execute the rest of the example code */
var sillyName = generateName();
console.log(`My name is ${sillyName}.`); //note use of weird quote (it's the one that shares the ~ key on mac) that allows us to call ${vars} in text
/* now just run index.js by using "node index.js" at the terminal. */

/* CHALLENGE: install superheroes package and generate name to console. */
import { randomSuperhero } from "superheroes";
const superName = randomSuperhero();
console.log(`My superhero alter-ego is ${superName}.`);
