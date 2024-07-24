import { Card } from "../types";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
// import { suitIcons } from "../const";
import { PlayingCardSVG } from "./PlayingCardSVG";

type PlayingCardType = {
  card: Card;
  className?: string;
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
  console.log(props.className);
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
      className={` ${!canBeSelected && "cursor-default"}
      touch-none   relative ${props.className}`}
    >
      <PlayingCardSVG
        cardName={props.card.card}
        suitName={props.card.suit}
        fillstyle={` 
        ${props.isSelected ? "fill-teal-100" : "fill-white"} 
        ${!canBeSelected && "fill-slate-300"}`}
      />
    </div>
  );
}
