

let match = 0;


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

let moves = 0;
let counter = document.querySelector(".counter"); // MOVES COUNTER


// Card Flip

function flipCard() {
    // startTimer function adapted so it only runs once to stop time speeding up on every card click
    startClock();
    moveCounter();

    // if lockBoard is true the rest of the function won't get executed
    if (lockBoard) return;

    /*If the first card is clicked twice then the eventlistener is removed
    and the card will remain unflipped, as if it was correctly matched. It it's
    the first card click the this variable holds the first card but the condition
    is unset so it's going to move to false. If it is the second click then the second
    div holds the second card.*/

    if (this === firstCard) return;


    /* Access the class list of the memory card. Add here means if 
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

    /* if there are 6 matches this means the player has won. 
    a variable for match was set to zero and when this reached
    6 then the won function is activated */

    if (isMatch) {
        match++;
    }
    // The settimeout function is used here so the final card can show before the you won message appears
    setTimeout(() => {
        if (match === 6) {
            alert('You Won!');
            resetGame();

        }
    }, 1500);

}



// called if the cards match
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

// called if cards don't match
function unflipCards() {
    lockBoard = true;
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
/* The cards need to be shuffled before the player starts the game.
By wrapping the function in parentheses means it will be immediately invoked after it's definition */
(function shuffle() {
    cards.forEach(card => {
        /* Multiply by 12 as result will be a number between 0 and 1 
        Math.floor is used to return an integer*/
        let randomPos = Math.floor(Math.random() * 12);
        // this random number is then applied to the order property
        card.style.order = randomPos;
    });
})();

/*One will loop through the array of elements that are returned and
 attach an eventlistener to each that listens for a click event. Whenever 
 this click event occurs a function named cardflip will activate  */

cards.forEach(card => card.addEventListener('click', flipCard));

// js for timer 
/* Code adapted from [Iris Smok](https: //github.com/Iris-Smok/Kids-Memory-Game_PP2/blob/main/assets/js/script.js) */

var second = 0;
var timer = document.querySelector(".timer");

var interval;

/** startTimer function sets the timer html into minutes and seconds
 * if it reaches 60 seconds seconds go back to zero and minutes go up by one. If
 * the minutes reach 60 the minutes reset to zero. Getting the function to only 
 * run once was taken from Ankit Saxena
 */

function startTimer() {
    // the creation of a 'closure'
    let called = 0;
    return function () {
        /* called is true here so the code below is activated.
        however the called++ means on the next loop it's not zero 
        thus the function isn't called again */
        if (called === 0) {
            // the setInterval sets the timing interval to 1 second
            interval = setInterval(function () {
                timer.innerHTML = second;
                second++;


            }, 1000);
            called++;
        }
    };

}

const startClock = startTimer();

// moves counter
/** 1 added to counter variable each time a move is made */

function moveCounter() {
    moves++;
    counter.innerHTML = moves;

}

// reset game feature adapted from Iris Smoks Memory Game

// Store all reset elements in a reset variable. This is where the reset function will reach when looking to reset. 

/** When the reset button is clicked the reset function is activated
 * and the game is reset

*/
function resetGame() {
    window.location.reload();
}
// get reference to button
let reset = document.getElementById("reset");
// add event listener for the button, for action "click"
reset.addEventListener("click", resetGame);

// You Won Function
//This should fire when all the cards are flipped


// script code for modal adapted from WebDivSimplified
// anything with the data modal target will be inside the openModal variable
const openModalButtons = document.querySelectorAll('data-modal-target');

const closeModalButtons = document.querySelectorAll('[data-close-button]');

const overlay = document.getElementById('modal-overlay');
// for each button add an event listener

// openModalButtons.addEventListener('click', () => {
// using the dataset selector from the button get the data from the html #modal
// const modal = document.querySelector(button.dataset.modalTarget);
// once the modal is captured one wants to pass it into a function to open it


// balloonsPop();
// openModal(modal);


// });





// Adding eventlistener to overlay object so it closes when overlay is preessed
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        // gets the closest parent element with the class modal
        const modal = button.closest('.modal');
        // once the modal is captured one wants to pass it into a function to open it
        closeModal(modal);
    });
});


function openModal(modal) {
    // if (modal == null) return;
    modal.classList.add('active');
    // everytime the modal is open one also wants the overlay open    
    overlay.classList.add('active');


}



function closeModal(modal) {
    if (modal === null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}


// code for button animation adapted from GreatStack



// As there are multiple spans it will be an array
// let spans = document.getElementsByTagName("span");
let playHow = document.getElementById('howToPlay1');
let playHowChildren = document.getElementById('howToPlay1').children;



playHow.onclick = function () {
    // this will apply the css for each span
    for (let span of playHowChildren) {
        //    the class anim will be added to each span
        span.classList.add("anim");

    }
    setTimeout(function () {
        for (let span of playHowChildren) {
            //    the class anim will be removed from each span after .5s
            span.classList.remove("anim");
            // model pops up once bubbles have gone
            openModal(modal);

        }
    }, 500);
};

let anchor = document.getElementById('anchor');
let anchorChildren = anchor.children;




anchor.onclick = function () {
    // this will apply the css for each span
    // anchorChildren used so both buttons don't fire ballons at same time
    for (let span of anchorChildren) {
        //    the class anim will be added to each span
        span.classList.add("anim");

    }
    setTimeout(function () {
        for (let span of spans) {
            //    the class anim will be removed from each span after .5s
            span.classList.remove("anim");
            // model pops up once bubbles have gone

        }
    }, 500);
};



