const tilesContainer = $(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
	const element = $("<div/>");

	element.addClass("tile");
	element.attr("data-color", color);
	element.attr("data-revealed", "false");

	element.on("click", () => {
		const revealed = element.attr("data-revealed");

		if (
			awaitingEndOfMove
			|| revealed === "true"
			|| element == activeTile
		) {
			return;
		}

		// Reveal this color
		element.css('background-color', color);

		if (!activeTile) {
			activeTile = element;

			return;
		}

		const colorToMatch = activeTile.attr("data-color");

		if (colorToMatch === color) {
			element.attr("data-revealed", "true");
			activeTile.attr("data-revealed", "true");

			activeTile = null;
			awaitingEndOfMove = false;
			revealedCount += 2;

			if (revealedCount === tileCount) {
				alert("You win! Refresh to start again.");
			}

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			activeTile.css('background-color', "");
			element.css('background-color', "");

			awaitingEndOfMove = false;
			activeTile = null;
		}, 1000);
	});

	return element;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const tile = buildTile(color);

	colorsPicklist.splice(randomIndex, 1);
	tilesContainer.append(tile);
}