//1. Create a new React app.
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root'); // Or your target DOM element
const root = createRoot(container);

//2. Create a App.jsx component.
import App from "./components/App";

//3. Create a Header.jsx component that renders a <header> element
//to show the Keeper App name in an <h1>.
//DONE.

//4. Create a Footer.jsx component that renders a <footer> element
//to show a copyright message in a <p> with a dynamically updated year.
//DONE.

//5. Create a Note.jsx component to show a <div> element with a
//<h1> for a title and a <p> for the content.
//6. Make sure that the final website is styled like the example shown here:
//https://l1pp6.csb.app/
//DONE made a className="note" for the <div> container in Note.jsx. All notes will get that styling.

//HINT: You will need to study the classes in the styles.css file to apply styling.
//Now let's display it for React v < 18. I'll do a v18+ in my local project folder.
// v17 ReactDOM.render(<App />, document.getElementById("root"));
/* v18+ rendering */
root.render(  //this React 18+ call and the const root dec differs from ReactDOM.render block of React 17 or older, but the info inside the render method should be transferrable
 <App />
);
//to run from local: npm run dev 
