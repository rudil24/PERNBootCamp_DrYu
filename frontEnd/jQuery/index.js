/* rudil24 jQuery practice exercise Section 19 */
/* first make sure my index.js is properly linked by loading the following line then going to my index.html and refresh, should get a "Working" pop-up */
// alert("Working"); //WORKED
/* now let's practice some jQuery style manipulation */
/* first make sure jQuery is loaded with the ready callback function */
  /* the ready chunk is actually redundant since i've made sure the jQuery script tag is at the very end of the index.html body, so i'm commenting out for now.
  $(document).ready(function() {
    console.log("jQuery is ready!");
});
*/
$('h1').css('color', 'red');
$('h1').css('font-size', '50px');
$('h1').css('background-color', 'black');
$('h1').css('text-align', 'center');
$('h1').css('border', '5px solid cyan');
$('h1').removeAttr('style'); /*removing all inline styles, otherwise they will override the external class styles held in styles.css and referenced below */

/* now let's add a class to the h1 element that points to a style class in our styles.css file, which was already linked in the index.html head */
$('h1').addClass('big-title');
$('h1').removeClass('big-title'); /* removing the class ooh boy it was ugly */
$('h1').addClass('big-title margin-50'); /* adding two classes at once with a simple space in between them */
/* on the console, we can see the class list of the h1 element */
/* console.log($('h1').attr('class')); */
/* we can also find out if the h1 element has a specific class */
/* console.log($('h1').hasClass('big-title')); // should return true

/* now let's manipulate the text of the h1 element */
$('h1').text('Hello, jQuery!'); // changing the text of the h1 element


/* now let's play with the button element */
$('button').text("Don't click me!"); // changing the text of the button element, which automatically changes all buttons
$('button').html("<em>PLEASE Don't click me!</em>"); // changing the HTML of the button element, which automatically changes all buttons

/* now let's play with attributes of the img and a elements in our index.html */
/* first, find out what's the img src pointed to? (without looking at the index.html) */
/* console.log($('img').attr('src')); // logging the src attribute of the img element
/* now let's change the src attribute of the a href element to point to a different URL */
$('a').attr('href', 'https://www.yahoo.com'); // changing the href attribute

/* now let's do some jQuery event handling */
$('h1').click(function() { // adding a click event handler to the h1 element
    $('h1').css('color', 'green'); // changing the color of the h1 when clicked
});

/* EASY! now let's compare jQuery with vanilla JavaScript */
/* JavaScript */
/* for (let i = 0; i < 5; i++) {
    document.querySelectorAll('button')[i].addEventListener('click', function() { // adding a click event handler to all button elements
        document.querySelector('h1').style.color = 'orange';
    });
}
 */
/* VS jQuery */
  $('button').click(function() { // adding a click event handler to all button elements
  $('h1').css('color', 'orange'); // changing the color of the h1 when any button is clicked
}); 

/* now let's detect a keypress event in jQuery */
$("input").keypress(function(event) { // adding a keypress event handler to the input element
    console.log(event.key); // logging the key pressed
    $('h1').text(event.key); // changing the text of the h1 to the key pressed
});

/* let's replace with the even friendlier / more flexible on() method */
$('h1').on('mouseover', function() { // we chose mouseover but there is a whole host of "on" events we can use (click, keypress, etc.)
  $('h1').css('color', 'aquamarine'); // changing the color of the h1 when the mouse is over it
});

/* let's manipulate elements with the before and after methods */
$('h1').before('<button>New Button</button>'); // adding a new button
$('h1').after('<button>New Button</button>'); // adding a new button
$('h1').prepend('<button>New Button</button>'); // adding a new button within the h1 tag, just before the text
$('h1').append('<button>New Button</button>'); // adding a new button within the h1 tag, just after the text and before the closing h1 tag
/* $('button').remove(); // removing all buttons we just added, but has side effect of removing ALL BUTTONS, even those added in the stock index.html file */ 

/* working with animations in jQuery */
/* $('p').on('mouseover', function() {
    $('p').hide(); // hiding the paragraph when the mouse is over it
});
$('p').on('click', function() {
    $('p').show(); // hidden paragraph shows back up when clicked --NOPE-- you can't use click to show after it's been hidden with mouseover, you have to use toggle instead to toggle visibility
}); */
$('p').on('dblclick', function() { // double click to toggle the paragraph visibility
    $('p').toggle(); // toggling the visibility of the paragraph -- NOPE -- you can't use toggle to show the actual element after it's been hidden with mouseover, you have to use fadeIn instead to fade it back in
    //OR you could dblclick on something ELSE like $('button').on('dblclick', function () { $('p').toggle();}); to show the true toggle effect of the paragraph visibility
    $('p').fadeIn(2000); // fading in the paragraph after a 2000ms = 2 second delay.   ALSO SEE: fadeOut, fadeToggle, slideUp, slideDown, slideToggle, where slide is a lot like collapsing an accordion, and slideToggle is a lot like toggling the visibility of an accordion section
});
$('p').on('click', function() { // clicking on the paragraph will manipulate the opacity of the paragraph
    $('p').fadeTo(500, 0.5); // fading the paragraph to 50% opacity over 500ms
/*    $('p').animate({opacity: 0.5}) //can also address animation elements directly. here we immediately change opacity to 50%, but we could also add a 2nd parameter to specify duration as the line above */
// NOTE: can only do numerical values with animate, so you can't animate text color or font size, but you can animate things like width, height, opacity, etc.
});
/* can also chain animations together like this: */
$('.2ndparagraph').on('click', function() {
    $('.2ndparagraph').slideUp().slideDown().animate({opacity: 0.5}, 1000); // sliding up, then down, then fading to 50% opacity over 1000ms
});