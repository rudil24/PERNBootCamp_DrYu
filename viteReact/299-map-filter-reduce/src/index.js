// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

import emojipedia from "./emojipedia.js";

const newEmojipedia = emojipedia.map(function (emojiEntry) {
  // If .meaning exists, get its substring. If not, use a default string.
  return emojiEntry.meaning?.substring(0, 100) ?? "No meaning available";
});
console.log(newEmojipedia);
//for more info on substring method:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
