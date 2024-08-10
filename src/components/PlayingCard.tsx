import { Card } from "../types";

import { CSS, Transform } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
// import { suitIcons } from "../const";
import { PlayingCardSVG } from "./SVG/PlayingCardSVG";

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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.card.id });

  const style = {
    transform: CSS.Transform.toString({
      ...(transform as Transform),

      scaleX: isDragging ? 0.8 : 1,
      scaleY: isDragging ? 0.8 : 1,
    }),
    transition,
    zIndex: isDragging ? 1000 : "auto",
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
        className={`transition-all  duration-300 ease-in-out  ${
          !canBeSelected ? "bg-gray-400" : "bg-white"
        } ${props.isSelected && "-translate-y-3 "}`}
        suitname={props.card.suit}
      />
    </div>
  );
}
