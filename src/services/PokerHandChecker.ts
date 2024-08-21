import { PokerHandEnum } from "../enums/PokerHandEnum";
import useGameStore from "../stores/GameStore";
import { CardType } from "../types/CardType";
import { ForecastPokerHandType } from "../types/ForecastPokerHandType";
import { PokerHandType } from "../types/PokerHandType";

interface PokerHandFunctionRecord {
  [key: string]: (cards: CardType[]) => null | PokerHandFoundData;
}

interface PokerHandFoundData {
  pokerHandName: string;
  cardsScorable: CardType[];
}

export function getPokerHand(cards: CardType[]): ForecastPokerHandType | null {
  if (cards.length === 0) return null;

  const functionNames = Object.keys(pokerHandFunctions);
  let pokerHandFoundData: null | PokerHandFoundData = null;
  for (let i in Object.keys(pokerHandFunctions)) {
    pokerHandFoundData = pokerHandFunctions[functionNames[i]](cards);

    if (pokerHandFoundData !== null) break;
  }


  // if (isStraightFlush(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.STRAIGHT_FLUSH_ID, cardsScorable: cards };
  // } else if (isFourOfAKind(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.FOUR_OF_A_KIND_ID, cardsScorable: cards };
  // } else if (isFullHouse(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.FULL_HOUSE_ID, cardsScorable: cards };
  // } else if (isFlush(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.FLUSH_ID, cardsScorable: cards };
  // } else if (isStraightPokerHand(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.STRAIGHT_ID, cardsScorable: cards };
  // } else if (isThreeOfAKind(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.THREE_OF_A_KIND_ID, cardsScorable: cards };
  // } else if (isTwoPair(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.TWO_PAIRS_ID, cardsScorable: cards };
  // } else if (isOnePair(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.PAIR_ID, cardsScorable: cards };
  // } else if (isHighCard(cards)) {
  //   pokerHandFound = { pokerHandName: PokerHandEnum.HIGH_CARD_ID, cardsScorable: cards };
  // }
  // const isHighCardResult = isHighCard(cards);

  if (pokerHandFoundData === null) return null;

  const gamePokerHand: PokerHandType | undefined = useGameStore
    .getState()
    .game?.pokerHands.find(
      (pokerHand: PokerHandType) =>
        pokerHand.id === pokerHandFoundData!.pokerHandName
    );

  if (gamePokerHand === undefined) return null;

  return {
    pokerHand: gamePokerHand,
    cardsScorable: pokerHandFoundData.cardsScorable,
  };
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

function regroupCardsByValue(cards: CardType[]): Record<string, CardType[]> {
  return cards.reduce((result: any, currentValue: CardType) => {
    (result[currentValue["label"]] = result[currentValue["label"]] || []).push(
      currentValue
    );
    return result;
  }, {});
}

const pokerHandFunctions: PokerHandFunctionRecord = {
  isStraightPokerHand: (cards: CardType[]) => {
    // console.log("Checking isStraight:");
    if (!hasEnoughCards(cards.length, 5)) {
      return null;
    }
  
    if (!isStraight(cards)) {
      return null;
    }
  
    console.log("It is a Straight");
    return true;
  },
  isThreeOfAKind: (cards: CardType[]) => {
    // console.log("Checking isThreeOfAKind:");
    if (!hasEnoughCards(cards.length, 3)) {
      return null;
    }
  
    const groupValues = regroupCardsByValue(cards);
  
    for (const group in groupValues) {
      if (groupValues[group].length === 3) {
        console.log("It is a Three of a kind");
        
        return buildPokerHandFoundData(
          PokerHandEnum.THREE_OF_A_KIND_ID,
          groupValues[group]
        );
      }
    }
  
    return null;
  },
  isTwoPair: (cards: CardType[]) => {
    console.log("Checking two pairs");
    if (!hasEnoughCards(cards.length, 4)) {
      return null;
    }
  
    const groupValues = regroupCardsByValue(cards);
  
    let pairs = [];
    for (const group in groupValues) {
      if (groupValues[group].length === 2) {
        pairs.push(groupValues[group]);
      }
    }
  
    if (pairs.length !== 2) {
      return null;
    }
  
    console.log("It is a Two Pair");

    return buildPokerHandFoundData(PokerHandEnum.TWO_PAIRS_ID, pairs[0].concat(pairs[1]));
  },
  isOnePair: (cards: CardType[]) => {
    console.log("checking pair");
    if (!hasEnoughCards(cards.length, 2)) {
      return null;
    }

    const groupValues = regroupCardsByValue(cards);

    for (const group in groupValues) {
      if (groupValues[group].length === 2) {
        console.log("It is a One Pair", groupValues[group]);

        return buildPokerHandFoundData(
          PokerHandEnum.PAIR_ID,
          groupValues[group]
        );
      }
    }

    return null;
  },
  isHighCard: (cards: CardType[]) => {
    console.log("checking high card");
    if (!hasEnoughCards(cards.length, 1)) {
      return null;
    }

    cards.sort(compare);

    console.log(`It is a High Card ${cards[cards.length - 1].label}`);

    return buildPokerHandFoundData(PokerHandEnum.HIGH_CARD_ID, [
      cards[cards.length - 1],
    ]);
  },
};

function buildPokerHandFoundData(
  pokerHandName: string,
  cards: CardType[]
): PokerHandFoundData {
  return {
    pokerHandName: pokerHandName,
    cardsScorable: cards,
  };
}
