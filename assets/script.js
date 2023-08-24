// Card Flip

/* Store all memory card elements in a cards variable. This is where the function will reach to when looking for cards to flip. The 
querySelectorAll function returns all the elements from the memory-card document. Memory card is the class that contains all the
card elements here*/

const cards = document.querySelectorAll('.memory-card');

/*Storing cards: when a card is flipped one needs to know if it's the back or 
front of the card, so the matching logic can then be activated  */

let hasFlippedCard = false;
// variables below store whether card has been flipped or not
let firstCard, secondCard;

/* The this keyword in the flipCard function represents the memory-card class. Memory card 
is stored in this. Thats because this represents the element that activated it.
*/

function flipCard() {
    /* Access the class list of the memory card and toggle it. Add here means if 
    the class is not there add it. */
    this.classList.add('flip');

    if (!hasFlippedCard) {
        /*if hasFlippedCard is false this means its the first time this card has been clicked
        so then one can proceed to put has flippedcard to true, as the card had bo be
        false first before one can state it's now true*/
        hasFlippedCard = true;
        //   The element that has activated the event is the memory-card(this)
        firstCard = this;
        /*A test with  console.log({ hasFlippedCard, firstCard }); now gives 
        {hasFlippedCard: true, firstCard: div.memory-card.flip} this shows when card
        is clicked hasFlippedCard is now true & the element that the card has flipped is stored in firstCard.
        By accessing the variable firstCard now; one knows if the card has been flipped. When
        another card is now flipped, as hasFlippedCard is now true, the if statement with !hasFlippedCard
        is no longer activated */


    }
    /* if hasFlipped Card is set to true it means that the player is clicking on the second card.
        Using this the element here is now stored in the secondCard variable. When the second card
        is now clicked the following is returned: {hasFlippedCard: false, secondCard: div.memory-card.flip
     */
    else {
        hasFlippedCard = false;
        secondCard = this;

        /*One now needs to check if the first and second cards match? 
        The data attribute will be used which allows one to add any information
        to an element. In order to access the data attribute defined in html (data-framework)
        one uses the dataset object. console.log(firstCard.dataset.framework); logs the name
        of the first card now selected. The same goes for the second card.

        If the first and second cards are the same then the eventListener will be removed
        from these cards to prevent them from being clicked again. If they're not the same
        then the cards will be unflipped back to their original state.
          */
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            // event listener removed
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        }

        else {

            /*If the cards don't match then they need to be unflipped. To do this the 
            flip class is removed. As this occurs so quickly a setTimeout function is used
            so one can see the second card before it flips back */
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1500);
        }

    }
}

/*One will loop through the array of elements that are returned and
 attach an eventlistener to each that listens for a click event. Whenever 
 this click event occurs a function named cardflip will activate  */

cards.forEach(card => card.addEventListener('click', flipCard));

