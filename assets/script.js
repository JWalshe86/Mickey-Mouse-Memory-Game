// Card Flip

/* Store all memory card elements in a cards variable. This is where the function will reach to when looking for cards to flip. The 
querySelectorAll function returns all the elements from the memory-card document. Memory card is the class that contains all the
card elements here*/

const cards = document.querySelectorAll('.memory-card');

/*Storing cards: when a card is flipped one needs to know if it's the back or 
front of the card, so the matching logic can then be activated  */

let hasFlippedCard = false;

/*If one tries to flip a second set of cards before the first set 
has finished unflipping, then the logic doesn't work. The board needs
 to be 'locked' or to 'wait' until the cards finish unflipping */

let lockBoard = false;

// variables below store whether card has been flipped or not
let firstCard, secondCard;

/* The this keyword in the flipCard function represents the memory-card class. Memory card 
is stored in this. Thats because this represents the element that activated it.
*/

function flipCard() {
    // if lockBoard is true the rest of the function won't get executed
    if (lockBoard) return;

    /*If the first card is clicked twice then the eventlistener is removed
    and the card will remain unflipped, as if it was correctly matched. It it's
    the first card click the this variable holds the first card but the condition
    is unset so it's going to move to false. If it is the second click then the second
    div holds the second card.*/

    if (this === firstCard) return;

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

        /* if the hasFlippedCard is true the return statement stops the function here. If
        it is true it will move on to teh hasFlippedCard = false clause */
        return;

    }
    /* if hasFlipped Card is set to true it means that the player is clicking on the second card.
        Using this the element here is now stored in the secondCard variable. When the second card
        is now clicked the following is returned: {hasFlippedCard: false, secondCard: div.memory-card.flip
     */
    {
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();

    }
}

/**
 * A function for the matching logic. 
 * One now needs to check if the first and second cards match? 
        The data attribute will be used which allows one to add any information
        to an element. In order to access the data attribute defined in html (data-framework)
        one uses the dataset object. console.log(firstCard.dataset.framework); logs the name
        of the first card now selected. The same goes for the second card.
 */
function checkForMatch() {
    /*  If the first and second cards are the same then the eventListener will be removed
  from these cards to prevent them from being clicked again. If they're not the same
  then the cards will be unflipped back to their original state.  /*If the cards don't match then they need to be unflipped. To do this the 
        flip class is removed. As this occurs so quickly a setTimeout function is used
        so one can see the second card before it flips back */

    // ternary operator used here for simplicity
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

// called if the cards match
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

// called if cards don't match
function unflipCards() {
    /* If the cards don't match they will be locked 
    and will only be unlocked once they've been flipped */
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        // lockBoard turns false once the cards have been flipped
        lockBoard = false;

        resetBoard();
    }, 1500);
}


/**  In order for the function to work after each round the first card and second card 
need to be reset to null. The destructuring assignment is used. */

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false],
        [firstCard, secondCard] = [null, null];
}

/** The flexbox property order will be used to shuffle the cards. 
This puts every flex item into the same group. Then they're grouped by
source order. A random number will be assigned to each card, so the order of the cards is random. 
To start the cards are iterated through. The Math.random function will be used.
 */
function shuffle() {
    cards.forEach(card => {
        /* Multiply by 12 as result will be a number between 0 and 1 
        Math.floor is used to return an integer*/
        let randomPos = Math.floor(Math.random() * 12);
        // this random number is then applied to the order property
        card.style.order = randomPos;
    });
}

/*One will loop through the array of elements that are returned and
 attach an eventlistener to each that listens for a click event. Whenever 
 this click event occurs a function named cardflip will activate  */

cards.forEach(card => card.addEventListener('click', flipCard));

