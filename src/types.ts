export type Card = {
  id: string;
  card: string;
  suit: Suits;
  points: number;
  suitPoints: number;
  color: "cardRed" | "black";
};
export type Deck = Card[];
export type Suits = "Clubs" | "Spades" | "Diamonds" | "Hearts";
export type Positions =
  | "President"
  | "Vice President"
  | "Upper Class"
  | "Middle Class"
  | "Lower Class"
  | "Poor"
  | "Scum"
  | "Scummy Scum"
  | "Undecided";
