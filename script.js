function createNewCard() {
  var cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>
  `;
  return cardElement;
}
createNewCardTest();

function appendNewCard(parentElement) {
  var cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}
appendNewCardTest();

function shuffleCardImageClasses() {
  var cardClasses = [
    "image-1",
    "image-1",
    "image-2",
    "image-2",
    "image-3",
    "image-3",
    "image-4",
    "image-4",
    "image-5",
    "image-5",
    "image-6",
    "image-6",
  ];
  cardClasses = _.shuffle(cardClasses);
  return cardClasses;
}
shuffleCardImageClassesTest();

function createCards(parentElement, shuffledImageClasses) {
  var array = [];
  for (let i = 0; i < 12; i++) {
    let card = appendNewCard(parentElement);
    card.classList.add(shuffledImageClasses[i]);
    array.push({
      index: i,
      element: card,
      imageClass: shuffledImageClasses[i],
    });
  }
  return array;
}
createCardsTest();

function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass === cardObject2.imageClass;
}
doCardsMatchTest();

let counters = {};

function incrementCounter(counterName, parentElement) {
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName];
}
incrementCounterTest();

let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  incrementCounter("flips", document.getElementById("flip-count"));

  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  if (!doCardsMatch(newlyFlippedCard, lastCardFlipped)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  incrementCounter("matches", document.getElementById("match-count"));
  lastCardFlipped.element.classList.add("glow");
  newlyFlippedCard.element.classList.add("glow");

  if (counters["matches"] === 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }

  lastCardFlipped = null;
}

function resetGame() {
  var cardContainer = document.getElementById("card-container");

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  document.getElementById("flip-count").innerText = 0;
  document.getElementById("match-count").innerText = 0;

  counters = {};
  lastCardFlipped = null;
  setUpGame();
}

setUpGame();
