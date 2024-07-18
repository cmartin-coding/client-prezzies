import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Deck } from "../types";
import { PlayingCard } from "./PlayingCard";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

type PlayerHandType = {
  hand: Deck;
};
export function PlayerHand(props: PlayerHandType) {
  const [hand, setHand] = useState(
    props.hand.map((card) => ({ id: card.card, ...card }))
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = hand.findIndex((x) => x.card === active.id);
      const newIndex = hand.findIndex((x) => x.card === over?.id);

      const alteredHand = arrayMove(hand, oldIndex, newIndex);
      setHand(alteredHand);
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext items={hand} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-row ">
          {hand.map((card) => (
            <PlayingCard
              card={card}
              key={card.card}
              size={100}
              className={` w-min `}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
