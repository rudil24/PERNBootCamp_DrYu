//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

/* standard React 18+ imports and constants */
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root'); // Or your target DOM element
const root = createRoot(container);

/* project declarations */
//const hourOfDay = new Date(2025, 8, 11, 3).getHours(); //morning test 3:00 am on aug 11 2025
//const hourOfDay = new Date(2025, 8, 11, 13, 10, 55).getHours(); //afternoon test 13:10:55 on aug 11 2025
//const hourOfDay = new Date(1969, 3, 6, 22, 24, 55, 99).getHours(); //evening test march 06 1969 10:24:55.099 pm
const hourOfDay = new Date().getHours(); //gets hour of 24hr clock in current date/timestamp
let timeGreeting = "";
let timeColor = "";

/* logic */
if (hourOfDay < 12) {
  timeGreeting = "morning";
  timeColor = "red";
} else if (hourOfDay < 18) {
  timeGreeting = "Afternoon";
  timeColor = "green";
} else {
  //hour of day between 18 and 24
  timeGreeting = "evening";
  timeColor = "blue";
}

/* rendering */
root.render(  //this React 18+ call and the const root dec differs from ReactDOM.render block of React 17 or older, 
              // but the info in the <div> inside the render method should be transferrable
  <div>
    <h1 className="heading" style={{ color: timeColor }}>
      Good {timeGreeting}
    </h1>
  </div>
);
