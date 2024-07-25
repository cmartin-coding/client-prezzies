import { Card } from "../types";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
// import { suitIcons } from "../const";
import { PlayingCardSVG } from "./PlayingCardSVG";

type PlayingCardType = {
  card: Card;
  className?: string;
  cardclass?: string;
  isSelected?: boolean;
  canBeSelected?: boolean;
  size?: number;
  onClickCard?: (card: Card) => void;
};

export function PlayingCard(props: PlayingCardType) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // const fillColor = props.card.color === "black" ? `black` : "red";
  // const textColor =
  //   props.card.color === "black" ? "text-black" : "text-red-500";
  // const Icon = suitIcons[props.card.suit];

  let canBeSelected = true;
  if (props.canBeSelected !== undefined) {
    canBeSelected = props.canBeSelected;
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (props.canBeSelected) {
          props.onClickCard && props.onClickCard(props.card);
        }
      }}
      className={` ${!canBeSelected && "cursor-default "}
      touch-none    ${props.className}`}
    >
      <PlayingCardSVG
        cardname={props.card.card}
        className={` bg-white ${props.isSelected && "-translate-y-4"}`}
        suitname={props.card.suit}
        fillstyle={` ${props.isSelected ? "fill-teal-300" : "fill-white"} 
        ${!canBeSelected && "fill-gray-400"}`}
      />
    </div>
  );
}
