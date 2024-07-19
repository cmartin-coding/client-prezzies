import { Deck } from "./types";

export function getSortedHandByPoints(hand: Deck) {
  const sortedHand = [...hand].sort((a, b) => {
    if (a.suitPoints !== b.suitPoints) {
      return a.suitPoints - b.suitPoints;
    } else {
      return a.points - b.points;
    }
  });
  return sortedHand;
}
