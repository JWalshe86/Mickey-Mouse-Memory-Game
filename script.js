/*jshint esversion: 6 */

let cardsMatched = [];
let cardsMatched2 = [];
let tryCounter = 0;
let moveCounter = 0;
let starCounter = 0;

let moves = document.getElementsByClassName('moves');

let stars1Counter = document.querySelector('span.starCounter');

let stars = document.getElementsByClassName('fa-star');

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

// front of cards after a match
let firstCardFrontAfterMatch, secondCardFrontAfterMatch;

/* The this keyword in the flipCard function represents the memory-card class. Memory card 
is stored in this. Thats because this represents the element that activated it.
*/

moves = 0;
let counter = document.querySelector(".counter"); // MOVES COUNTER

// Card Flip

function flipCard() {
	// startTimer function adapted so it only runs once to stop time speeding up on every card click
	startClock();


	// if the same card is clicked twice the moves counter doesn't increase
	if (this != firstCard) {
		moveC();
	}

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
		it is true it will move on to the hasFlippedCard = false clause */
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

	/* if there are 6 matches this means the player has won. 
	a variable for match was set to zero and when this reached
	6 then the won function is activated */

	if (isMatch) {
		disableCards();
		animateCards();
		firstCardFrontAfterMatch = firstCard.getElementsByTagName('img');
		secondCardFrontAfterMatch = secondCard.getElementsByTagName('img');
		//push 1st & 2nd matched card into an array so they can be manipulated
		cardsMatched.push(firstCardFrontAfterMatch, secondCardFrontAfterMatch);
		//    cards now remain flipped after animation
		firstCardFrontAfterMatch[1].classList.add('front1');
		secondCardFrontAfterMatch[1].classList.add('front1');

		match++;

		// Reset the failed match count back to 0
		tryCounter = 0;
	} else {
		unflipCards();
		// count no. of clicks that don't result in a match

		tryCounter++;


		incrementCounter();
	}

	// The settimeout function is used here so the final card can show before the you won message appears
	setTimeout(() => {
		if (match === 6) {
			document.querySelector('div.congratsCounter').textContent = "Took you " + counter.innerHTML + ' moves';
			// document.querySelector('div.congratsStars').textContent = `You got ${stars1Counter.innerHTML}`; 
			document.querySelector('div.congratsTimer').textContent = " " + timer.textContent + ' seconds';
			openCongratsModalPopup();
		}
	}, 1500);

	// if you guess 2 matches in less than 10 moves you get a star

	if (match === 2 && moves <= 20 && timer.textContent <= 30) {
		stars[0].classList.remove('dimmed');
		increaseStars();
		oneStarGo();
	}

	// if you guess 4 matches in less than 25 moves you get another star

	if (match === 4 && moves <= 25 && timer.textContent <= 45 && starCounter >= 1) {
		stars[1].classList.remove('dimmed');
		increaseStars();
		secondStarGo();
	}

	// if you guess 6 matches in less than 30 moves you get 3 stars: max score

	if (match === 6 && starCounter >= 2) {
		stars[2].classList.remove('dimmed');
		increaseStars();
		thirdStarGo();
	}
}

// called if the cards match
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	firstCard.children[1].classList.add('horizontal-shake');
	secondCard.children[1].classList.add('horizontal-shake');
	firstCard.classList.remove('flip');
	secondCard.classList.remove('flip');
}

function animateCards() {
	
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
	return function() {
		/* called is true here so the code below is activated.
		however the called++ means on the next loop it's not zero 
		thus the function isn't called again */
		if (called === 0) {
			// the setInterval sets the timing interval to 1 second
			interval = setInterval(function() {
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

function moveC() {

	moves++;

	counter.innerHTML = moves;
}

function increaseStars() {
	starCounter++;
	stars1Counter.innerHTML = starCounter;
}

// reset game feature adapted from Iris Smoks Memory Game

// Store all reset elements in a reset variable. This is where the reset function will reach when looking to reset. 

/** When the reset button is clicked the reset function is activated
 * and the game is reset
 */
function resetGame() {

	window.location.reload();

}
// get reference to repeat icon
let reset = document.querySelector(".fa-repeat");
// add event listener for the button, for action "click"
reset.addEventListener("click", resetGame);

// script code for modal adapted from WebDivSimplified
// anything with the data modal target will be inside the openModal variable

const closeModalButtons = document.querySelectorAll('[data-close-button]');

const overlay = document.getElementById('modal-overlay');

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
		let modal = button.closest('.modal');
		// once the modal is captured one wants to pass it into a function to open it
		closeModal(modal);
	});
});

function openModal(modal) {
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
let spans = document.getElementsByTagName("span");
let playHow = document.getElementById('howToPlay1');
let playHowChildren = document.getElementById('howToPlay1').children;

playHow.onclick = function() {
	// this will apply the css for each span
	for (let span of playHowChildren) {
		//    the class anim will be added to each span
		span.classList.add("anim");
	}
	setTimeout(function() {
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

anchor.onclick = function() {
	// this will apply the css for each span
	// anchorChildren used so both buttons don't fire ballons at same time
	for (let span of anchorChildren) {
		//    the class anim will be added to each span
		span.classList.add("anim");
	}
	setTimeout(function() {
		for (let span of spans) {
			//    the class anim will be removed from each span after .5s
			span.classList.remove("anim");
		}
	}, 500);
};

// get rubberBand to activate after start button & onto page

let playButton = document.querySelector('a');
playButton.addEventListener('click', rubberBand);


function rubberBand() {
	setTimeout(() => {
		let titleClick = document.getElementsByTagName('h3');

		titleClick[0].classList.add('animate__animated', 'animate__rubberBand');
	}, 1000);
}
anchor.addEventListener('click', rubberBand, false);

// script for congratulations you won

let congratsPopup = document.getElementById("congratsModal-popup");
let cardsShowBackground = document.querySelector('info-game-container');

function openCongratsModalPopup() {
	congratsPopup.classList.add("opencongratsModal-popup");
	overlay.classList.add('active1');
	cardsShowBackground.classList.add('info-game-container-hideCards');
}

let ok = document.querySelector('.congratsButton');
ok.addEventListener("click", closeCongratsModalPopup);

function closeCongratsModalPopup() {

	congratsPopup.classList.remove("opencongratsModal-popup");
	resetGame();

}

// Increase the click(move) count by 1 and update the HTML text to the current value
function incrementCounter() {
	moveCounter++;
	moves[0].innerHTML = moveCounter;
}

/**Creating an element containing the class fa-star each time a star is won. This allows 3 stars to be
 * presented in the congrats modal
 */

function thirdStarGo() {
	let starDisplay3 = document.createElement('div');
	starDisplay3.className = "fa fa-star";
	let starDisplay31 = document.createElement('div');
	starDisplay31.className = "fa fa-star";
	let congratsModal = document.querySelector('.congratsStars');
	congratsModal.appendChild(starDisplay3);
	// congratsModal.appendChild(starDisplay31)
}

function secondStarGo() {
	let starDisplay2 = document.createElement('div');
	starDisplay2.className = "fa fa-star";
	let congratsModal = document.querySelector('.congratsStars');
	congratsModal.appendChild(starDisplay2);
}

function oneStarGo() {
	let starDisplay1 = document.createElement('div');
	starDisplay1.className = "fa fa-star";
	let congratsModal = document.querySelector('.congratsStars');
	congratsModal.appendChild(starDisplay1);
}