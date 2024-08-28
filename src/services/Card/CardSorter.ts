import { CardSortingEnum } from "../../enums/CardSortingEnum";
import { CardType } from "../../types/CardType";

function sortCards(cards: CardType[], type: string): CardType[] {
    if (type === CardSortingEnum.SORTING_ORDER) {
        return cards.sort(compareCardsByOrder);
    }

    return cards.sort(compareCardsBySuit);
}

function compareCardsByOrder(a: CardType, b: CardType) {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
}

function compareCardsBySuit(a: CardType, b: CardType) {
  if (a.suit < b.suit) {
    return -1;
  }
  if (a.suit > b.suit) {
    return 1;
  }
  return 0;
}

export { sortCards };
