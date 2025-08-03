/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
// var qr = require('qr-image');
import fs from 'fs';


inquirer //this is the user prompting package with directions at https://www.npmjs.com/package/inquirer
  .prompt([
    {
    /* Pass your questions in here */
    message: "To get a QR Code, type in a valid URL:",
    name: "URL"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    var qr_svg = qr.image(url);
    // old way qr_svg.pipe(require('fs').createWriteStream('qr_img.png'));
    qr_svg.pipe(fs.createWriteStream('qr_img.png')); // new way with import declared at top
 
    fs.writeFile("URL.txt", url, (err) => {  //changed data to url var. had to add the fs. so it knew to use the imported fs from top
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });