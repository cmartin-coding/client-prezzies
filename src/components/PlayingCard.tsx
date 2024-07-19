import { Card } from "../types";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { suitIcons } from "../const";

type PlayingCardType = {
  card: Card;
  className?: string;

  size?: number;
  onClickCard?: () => void;
};

export function PlayingCard(props: PlayingCardType) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const fillColor = props.card.color === "black" ? `black` : "red";
  const textColor =
    props.card.color === "black" ? "text-black" : "text-red-500";
  const Icon = suitIcons[props.card.suit];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {}}
      className={` border touch-none border-black min-w-14 min-h-20 md:w-24 md:h-36 bg-white rounded-md relative ${props.className}`}
    >
      <div className={`flex px-1 flex-col items-center w-min`}>
        <p className={`font-bold text-[10px] md:text-sm ${textColor}`}>
          {props.card.card}
        </p>
        <Icon className={` md:size-4 size-2`} fill={fillColor} />
      </div>
      <Icon
        className={`absolute size-3 md:size-6 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`}
        fill={fillColor}
      />
      <div
        className={`flex px-1 absolute bottom-1 right-1 flex-col-reverse items-center w-min`}
      >
        <p
          className={`font-bold text-[10px] rotate-180 md:text-sm ${textColor}`}
        >
          {props.card.card}
        </p>
        <Icon className={`md:size-4 size-2`} fill={fillColor} />
      </div>
    </div>
  );
}
