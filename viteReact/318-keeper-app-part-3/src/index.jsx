import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./../public/styles.css";
const container = document.getElementById('root'); // Or your target DOM element
const root = createRoot(container);

/* v17 rendering */ 
// ReactDOM.render(<App />, document.getElementById("root"));
/* v18+ rendering */
root.render(  //this React 18+ call and the const root dec differs from ReactDOM.render block of React 17 or older, but the info inside the render method should be transferrable
 <App />
);
//to run from local: npm run dev 

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

//CHALLENGE:
//1. Implement the add note functionality.
//- Create a constant that keeps track of the title and content.
/* rudil notes:
    a. in CreateArea.jsx, create a note/setNote const to hold the useState 
        function, and prefill it with 2 empty text attributes: title and content. 
        (be sure to import { useState }) to top of CreateArea.jsx.
    b. install the note attrs as value attrs inside the CreateArea <form inputs (<input and <textarea) 
        (value = {note.title} / {note.content}, respectively)  
    c. now that the CreateArea inputs are controlled, need to update them when they get changed.
        add onChange= attributes to both form inputs, and point them both to a new internal func {handleChange}.
    d. build function handleChange in CreateArea to handle an event when it gets triggered.
        the function destructures the event.target into its name and value, 
        then it calls setNote with prevNote, and spreads that object to keep prevNote and re-pack it 
        with the new note's value inserted into the object. when assigning, [note] needs square braces 
        to set what's inside of note gathered from event.target to the value of note, 
        not just the string "note". (an ES6 feature)
    e. quick test to make sure you've wired up everything to this point, run it with Chrome Dev Tools 
        plus React Tools), drill into the CreateArea component, and you should see the State updating 
        on the console as you type.
*/
//- Pass the new note back to the App.
/* rudil notes:
    a. the <button>Add</button> in the CreateArea form is the correct place to initiate this.
        add an onClick attr to the button, point it to a new internal function submitNote.
        IMPORTANT: default html button behavior for onClick is to reload the entire page, so turn that off by 
        passing the (event) into submitNote, then setting event.preventDefault in the submitNote function.
    b. to trigger a function that can pass this note back to App, first from App.jsx we create a sub-function addNote
        within our top App function (in step d we'll pass that function into CreateArea as a prop.)
    c. This App sub-function addNote for now just receives a newNote (or any name you want) object. We'll add more guts to it later.
        so for now you can just one-line it: function addNote(newNote) {}
    d. still in App.jsx, add {addNote} as an attribute to the <CreateArea /> component so it can be passed in. 
        you can name that attribute anything you want, we chose onAdd={addNote}.
    e. in CreateArea.jsx, receive props into the main function, then from CreateArea's submitNote function,
        call props.onAdd and pass the current created (note). This will be the equivalent to 
        calling the addNote from the App.jsx, because in d. we passed addNote in as the prop onAdd.
    f. you should be able to test at this point with a quick console.log(note) in App sub-function addNote if you wish.
*/
//- Add new note to an array.
/* rudil notes:
    a. a flexible array is going to need state, so in App.jsx we add const [notes, setNotes] = useState([]).
        REMEMBER to add { useState} to your App.jsx react imports.
    b. within the App addNote sub-function, call setNotes (our 2nd var function from useState) and 
        pass it prevNotes. Spread prevNotes and insert any newNote. return that updated array from 
        the func so that setNotes receives that updated array as a return.
*/
//- Take array and render separate Note components for each item.
/* rudil notes:
    a. in App.jsx beneath the CreateArea component, map the notes variable (that you get back from useState)
        into separate notes. we used a local var that we call noteItem and we return noteItem.title and noteItem.content
        You can use an arrow function to do this & no matter how you do it, enclose the whole mapping/return chunk in {}
        so that jsx will treat as code. (hint: if your arrow function isn't seen as an arrow, probably due to 
        not surrounding the map plus return block in squigglies.)
    b. now delete the placeholder <Note component in App.jsx, you just replaced it with the real <Note above.
*/

//2. Implement the delete note functionality.
//- Callback from the Note component to trigger a delete function.
/* rudil notes:
    a. in Note.jsx, we'll need to rely on props to pass state around. so update Note() to Note(props)
    b. add an onClick to the <button in Note.jsx, to an internal handleClick function.
    c. setup handleClick just as empty sub-function of function Note, we'll come back to add stuff.
    d. in App.jsx, add subfunction deleteNote that takes the note id as its only parameter
    e. in App.jsx notes.map return block, add attr onDelete={deleteNote} so that when we pass these
        attrs over as props to Note.jsx, it will know to trigger {deleteNote} when it encounters an onDelete.
    f. in Note.jsx's handleClick, add a props.onDelete which, when triggered by Note's button onClick, 
        will trigger handleClick, which will trigger the deleteNote function back in App.jsx.
    g. in App.jsx, you can check that you are getting the trigger by console.log("Delete was triggered") inside of deleteNote.
*/
//- Use the filter function to filter out the item that needs deletion.
/* rudil notes:
    a. in App.jsx deleteNote, call our state function setNotes, and pass it prevNotes
    b. run prevNotes through a filter where you keep aka return any noteItems where index !== id.
        then return the updated array from deleteNote.

*/
//- Pass a id over to the Note component, pass it back to the App when deleting.
/* rudil notes:
    a. in App.jsx's <Note block within <CreateArea block, add a key and id attribute.
    b. capture the ignored (up until now) index variable from App.jsx's notes.map call (found in the <CreateArea block)
        by adding a 2nd var named index
    c. set the key and id of <Note to that value of {index}
    d. in Note.jsx, pass the id you get in via the prop we just set up, back to App's delete block 
        by specifying props.id as a parameter to props.onDelete within Note.jsx's handleClick function.
*/
//- Angela adds a last usability enhancer, to clear our new note input field after note is added.
/* rudil notes:
    a. in CreateArea.jsx, when we submitNote, below props.onAdd(note) we can setNote back to "" title & content.
*/
//- Students complain that the note disappears once added.
/* rudil notes:
    a. TA answered that the <form default in CreateArea.jsx is to refresh on submit, so you need to prevent that default.
        <form onSubmit={(event) => {event.preventDefault();}}>
*/

//This is the end result you're aiming for:
//https://pogqj.csb.app/


