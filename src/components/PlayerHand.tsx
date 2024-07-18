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
  const [hand, setHand] = useState(props.hand);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Allows making them clickable as well
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = hand.findIndex((x) => x.id === active.id);
      const newIndex = hand.findIndex((x) => x.id === over?.id);

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
        <div className="flex flex-row  overflow-x-scroll md:overflow-x-auto">
          {hand.map((card) => (
            <PlayingCard card={card} key={card.id} className={``} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
