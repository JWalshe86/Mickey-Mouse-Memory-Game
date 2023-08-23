// Card Flip

/* Store all memory card elements in a cards variable. This is where the function will reach to when looking for cards to flip. The 
querySelectorAll function returns all the elements from the memory-card document. Memory card is the class that contains all the
card elements here*/

const cards = document.querySelectorAll('.memory-card');

/* The this keyword in the flipCard function represents the memory-card class. Thats because memory card here is the 'owner'.
*/

function flipCard() {
    alert("working");
    console.log(this);
}

/*One will loop through the array of elements that are returned and
 attach an eventlistener to each that listens for a click event. Whenever 
 this click event occurs a function named cardflip will activate  */

cards.forEach(card => card.addEventListener('click', flipCard));



