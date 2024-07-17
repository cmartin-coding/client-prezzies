export type Card = {
  card: string;
  points: number;
  suitPoints: number;
  color: "cardRed" | "black";
};
export type Deck = Card[];
