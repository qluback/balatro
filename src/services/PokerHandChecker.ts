import { CardType } from "../types/CardType";

export function getPokerHand(cards: CardType[]): string {
  let pokerHand = "";
  if (isStraightFlush(cards)) {
    pokerHand = "Quinte flush";
  } else if (isFourOfAKind(cards)) {
    pokerHand = "Carré";
  } else if (isFullHouse(cards)) {
    pokerHand = "Main pleine";
  } else if (isFlush(cards)) {
    pokerHand = "Couleur";
  } else if (isStraightPokerHand(cards)) {
    pokerHand = "Suite";
  } else if (isThreeOfAKind(cards)) {
    pokerHand = "Brelan";
  } else if (isTwoPair(cards)) {
    pokerHand = "Double paire";
  } else if (isOnePair(cards)) {
    pokerHand = "Paire";
  } else if (isHighCard(cards)) {
    pokerHand = "Carte haute";
  }

  return pokerHand;
}

function compare(a: CardType, b: CardType) {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
}

function isStraightFlush(cards: CardType[]): boolean {
  // console.log("Checking isStraightFlush:");
  if (!hasEnoughCards(cards.length, 5)) {
    return false;
  }

  if (!areSameColor(cards)) {
    return false;
  }

  if (!isStraight(cards)) {
    return false;
  }

  console.log("It is a Straight Flush");
  return true;
}

function isFourOfAKind(cards: CardType[]): boolean {
  // console.log("Checking isFourOfAKind:");
  if (!hasEnoughCards(cards.length, 4)) {
    return false;
  }

  const groupValues = regroupCardsByValue(cards);

  for (const group in groupValues) {
    if (groupValues[group].length === 4) {
      console.log("It is a Four of a kind");
      return true;
    } 
  }
  
  return false;
}

function isFullHouse(cards: CardType[]): boolean {
  // console.log("Checking isFullHouse:");
  if (!hasEnoughCards(cards.length, 5)) {
    return false;
  }

  const groupValues = regroupCardsByValue(cards);

  let hasThreeOfAKind = false;
  let hasPair = false;
  for (const group in groupValues) {
    if (groupValues[group].length === 3) {
      hasThreeOfAKind = true;
    } else if (groupValues[group].length === 2) {
      hasPair = true;
    }
  }
  
  if (!hasThreeOfAKind || !hasPair) {
    return false;
  }
  
  console.log("It is a Full House");
  return true;
}

function isFlush(cards: CardType[]): boolean {
  // console.log("Checking isFlush:");
  if (!hasEnoughCards(cards.length, 5)) {
    return false;
  }

  if (!areSameColor(cards)) {
    return false;
  }

  console.log("It is a Flush");
  return true;
}

function isStraightPokerHand(cards: CardType[]): boolean {
  // console.log("Checking isStraight:");
  if (!hasEnoughCards(cards.length, 5)) {
    return false;
  }

  if (!isStraight(cards)) {
    return false;
  }

  console.log("It is a Straight");
  return true;
}

function isThreeOfAKind(cards: CardType[]): boolean {
  // console.log("Checking isThreeOfAKind:");
  if (!hasEnoughCards(cards.length, 3)) {
    return false;
  }

  const groupValues = regroupCardsByValue(cards);

  for (const group in groupValues) {
    if (groupValues[group].length === 3) {
      console.log("It is a Three of a kind");
      return true;
    }
  }

  return false;
}

function isTwoPair(cards: CardType[]): boolean {
  // console.log("Checking isTwoPair:");
  if (!hasEnoughCards(cards.length, 4)) {
    return false;
  }

  const groupValues = regroupCardsByValue(cards);

  let numberPairs = 0;
  for (const group in groupValues) {
    if (groupValues[group].length === 2) {
      numberPairs++;
    }
  }
  
  if (numberPairs !== 2) {
    return false;
  }
  
  console.log("It is a Two Pair");
  return numberPairs === 2;
}

function isOnePair(cards: CardType[]): boolean {
  // console.log("Checking isOnePair:");
  if (!hasEnoughCards(cards.length, 2)) {
    return false;
  }

  const groupValues = regroupCardsByValue(cards);

  for (const group in groupValues) {
    if (groupValues[group].length === 2) {
      console.log("It is a One Pair");
      return true;
    }
  }
  
  return false;
}

function isHighCard(cards: CardType[]): boolean {
  // console.log("Checking isHighCard:");
  if (!hasEnoughCards(cards.length, 1)) {
    return false;
  }

  cards.sort(compare);

  console.log(`It is a High Card ${cards[cards.length - 1].label}`);
  return true;
}

function hasEnoughCards(
  numberCards: number,
  numberCardsRequired: number
): boolean {
  if (numberCards >= numberCardsRequired) {
    return true;
  }

  // console.log(`not ${numberCardsRequired} cards`);
  return false;
}

function areSameColor(cards: CardType[]): boolean {
  if (
    cards.filter((card: CardType) => card.suit !== cards[0].suit).length === 0
  ) {
    return true;
  }

  // console.log("not same color");
  return false;
}

function areSameLabels(cards: CardType[]): boolean {
  if (
    cards.filter((card: CardType) => card.label !== cards[0].label).length === 0
  ) {
    return true;
  }

  // console.log("not same labels");
  return false;
}

function isStraight(cards: CardType[]): boolean {
  cards.sort(compare);
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i + 1].order - cards[i].order !== 1) {
      // console.log("not a straight");
      return false;
    }
  }

  return true;
}

function regroupCardsByValue(cards:CardType[]): Record<string, CardType[]> {
  return cards.reduce((result: any, currentValue: CardType) => {
    (result[currentValue["label"]] = result[currentValue["label"]] || []).push(
      currentValue
    );
    return result;
  }, {});
}
