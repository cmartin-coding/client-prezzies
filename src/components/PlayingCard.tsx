import {
  GiCard10Clubs,
  GiCard10Diamonds,
  GiCard10Hearts,
  GiCard10Spades,
  GiCard2Clubs,
  GiCard2Diamonds,
  GiCard2Hearts,
  GiCard2Spades,
  GiCard3Clubs,
  GiCard3Diamonds,
  GiCard3Hearts,
  GiCard3Spades,
  GiCard4Clubs,
  GiCard4Diamonds,
  GiCard4Hearts,
  GiCard4Spades,
  GiCard5Clubs,
  GiCard5Diamonds,
  GiCard5Hearts,
  GiCard5Spades,
  GiCard6Clubs,
  GiCard6Diamonds,
  GiCard6Hearts,
  GiCard6Spades,
  GiCard7Clubs,
  GiCard7Diamonds,
  GiCard7Hearts,
  GiCard7Spades,
  GiCard8Clubs,
  GiCard8Diamonds,
  GiCard8Hearts,
  GiCard8Spades,
  GiCard9Clubs,
  GiCard9Diamonds,
  GiCard9Hearts,
  GiCard9Spades,
  GiCardAceClubs,
  GiCardAceDiamonds,
  GiCardAceHearts,
  GiCardAceSpades,
  GiCardJackClubs,
  GiCardJackDiamonds,
  GiCardJackHearts,
  GiCardJackSpades,
  GiCardKingClubs,
  GiCardKingDiamonds,
  GiCardKingHearts,
  GiCardKingSpades,
  GiCardQueenClubs,
  GiCardQueenDiamonds,
  GiCardQueenHearts,
  GiCardQueenSpades,
} from "react-icons/gi";
import { Card } from "../types";
import { IconType } from "react-icons";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type PlayingCardType = {
  card: Card;
  className?: string;
  size?: number;
};

export function PlayingCard(props: PlayingCardType) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.card.card });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const fillColor =
    props.card.color === "black" ? `text-black` : "text-red-600";
  const CardIcon = playingCardIcons[props.card.card];

  return (
    <div
      className={`cursor-move`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardIcon
        className={`${fillColor} ${props.className} `}
        size={props.size ? props.size : 80}
      />
    </div>
  );
}

const playingCardIcons: { [key: string]: IconType } = {
  "2C": GiCard2Clubs,
  "3C": GiCard3Clubs,
  "4C": GiCard4Clubs,
  "5C": GiCard5Clubs,
  "6C": GiCard6Clubs,
  "7C": GiCard7Clubs,
  "8C": GiCard8Clubs,
  "9C": GiCard9Clubs,
  "10C": GiCard10Clubs,
  JC: GiCardJackClubs,
  QC: GiCardQueenClubs,
  KC: GiCardKingClubs,
  AC: GiCardAceClubs,
  "2D": GiCard2Diamonds,
  "3D": GiCard3Diamonds,
  "4D": GiCard4Diamonds,
  "5D": GiCard5Diamonds,
  "6D": GiCard6Diamonds,
  "7D": GiCard7Diamonds,
  "8D": GiCard8Diamonds,
  "9D": GiCard9Diamonds,
  "10D": GiCard10Diamonds,
  JD: GiCardJackDiamonds,
  QD: GiCardQueenDiamonds,
  KD: GiCardKingDiamonds,
  AD: GiCardAceDiamonds,
  "2H": GiCard2Hearts,
  "3H": GiCard3Hearts,
  "4H": GiCard4Hearts,
  "5H": GiCard5Hearts,
  "6H": GiCard6Hearts,
  "7H": GiCard7Hearts,
  "8H": GiCard8Hearts,
  "9H": GiCard9Hearts,
  "10H": GiCard10Hearts,
  JH: GiCardJackHearts,
  QH: GiCardQueenHearts,
  KH: GiCardKingHearts,
  AH: GiCardAceHearts,
  "2S": GiCard2Spades,
  "3S": GiCard3Spades,
  "4S": GiCard4Spades,
  "5S": GiCard5Spades,
  "6S": GiCard6Spades,
  "7S": GiCard7Spades,
  "8S": GiCard8Spades,
  "9S": GiCard9Spades,
  "10S": GiCard10Spades,
  JS: GiCardJackSpades,
  QS: GiCardQueenSpades,
  KS: GiCardKingSpades,
  AS: GiCardAceSpades,
};
