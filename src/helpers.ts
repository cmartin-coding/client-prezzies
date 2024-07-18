import { Card } from "./types";

export function getCardSuit(
  card: Card
): "Clubs" | "Hearts" | "Diamonds" | "Spades" {
  if (card.suitPoints === 0) {
    return "Clubs";
  }
  if (card.suitPoints > 0 && card.suitPoints < 0.2) {
    return "Spades";
  }
  if (card.suitPoints > 0.2 && card.suitPoints < 0.3) {
    return "Diamonds";
  }
  return "Hearts";
}
