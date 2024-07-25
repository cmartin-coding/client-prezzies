import { Card, Deck } from "./types";

export function getSortedHandByPoints(hand: Deck) {
  const sortedHand = [...hand].sort((a, b) => {
    if (a.points !== b.points) {
      return a.points - b.points;
    } else {
      return a.suitPoints - b.suitPoints;
    }
  });
  return sortedHand;
}

export function updateSelectedCards(selectedCards: Card[], card: Card) {
  // If the new card is already selected then unselect it
  const selectedCardsHasClickedCard =
    selectedCards.findIndex((c) => c.id === card.id) >= 0;

  if (selectedCardsHasClickedCard) {
    return selectedCards.filter((c) => c.id !== card.id);
  } else {
    return [...selectedCards, card];
  }
}
