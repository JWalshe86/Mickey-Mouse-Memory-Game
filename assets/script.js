// Card Flip

/* Store all memory card elements in a cards variable. This is where the function will reach to when looking for cards to flip. The 
querySelectorAll function returns all the elements from the memory-card document. Memory card is the class that contains all the
card elements here*/

const cards = document.querySelectorAll('.memory-card');

/* The this keyword in the flipCard function represents the memory-card class. Memory card 
is stored in this. Thats because this represents the element that activated it.
*/

function flipCard() {
    /* Access the class list of the memory card and to toggle it. Toggle here means if 
    the class is there remove it, if it's not there add it. */
    this.classList.toggle('flip');
}

/*One will loop through the array of elements that are returned and
 attach an eventlistener to each that listens for a click event. Whenever 
 this click event occurs a function named cardflip will activate  */

cards.forEach(card => card.addEventListener('click', flipCard));

