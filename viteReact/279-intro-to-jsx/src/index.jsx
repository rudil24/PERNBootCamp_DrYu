// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

//old way to import modules before JS6
// var React = require("react");
// var ReactDOM = require("react-dom");

//modern way to import modules
import React from "react";
import ReactDOM from "react-dom";

// now we can write in jsx, for a single element
// ReactDOM.render(<h1>Hello World!</h1>, document.getElementById("root"));

//or for multiple elements, modern method, just wrap all elements in a div
//this method deprecated in React 18+
/* ReactDOM.render(
  <div>
    <h1>Hello World!</h1>
    <p>This is a paragraph</p>
  </div>,
  document.getElementById("root")
); */

//React 18+
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root'); // Or your target DOM element
const root = createRoot(container);
root.render(
    <div>
    <h1>Hello World!</h1>
    <p>This is a paragraph</p>
    </div>); // Replaced template <App /> with my main React component: <div> to </div>

//equivalent to the pure JS of:
var h1 = document.createElement("h1");
h1.innerHTML = "Hello World 2!";
document.getElementById("root").appendChild(h1);
var p = document.createElement("p");
p.innerHTML = "This is an old school paragraph";
document.getElementById("root").appendChild(p);
