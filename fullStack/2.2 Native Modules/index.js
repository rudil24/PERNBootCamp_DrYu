/* rudil24 exercise fullStack 2.2 */
/* get node.js file system module using "old" CJS "require" method.*/
/* next lesson we'll learn how to use ECMAScript modules and the import method */
const fs = require("fs");

/* write first line to message.txt file when summoned via >node index.js from this working dir */
/* commenting out after first run, so that it doesn't overwrite what i've added to read back with next block */
/* fs.writeFile("message.txt", "Lesson 2 using node.js", (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});  */

/* read the message.txt file and echo contents to the console */
fs.readFile('message.txt', "utf8", (err, data) => {  //passing utf8 as encoding parameter ensures we get the text, not just the default raw buffer
  if (err) throw err;
  console.log(data);
}); 
