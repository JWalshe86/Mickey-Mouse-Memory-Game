const tilesContainer = $(".tiles");
const colors = ["img-1.png", "img-2.png", "img-3.png", "img-4.png", "img-5.png", "img-6.png", "img-7.png", "img-8.png"];
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
        element.prepend(`<img class="w-100 h-100" src="/assets/images/card-images/${color}" />`)

        if (!activeTile) {
            activeTile = element;
            return;
        }
        awaitingEndOfMove = true;
        const colorToMatch = activeTile.attr("src");


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
            console.log(activeTile)
            activeTile.children().remove('img');
            element.children().remove('img');

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