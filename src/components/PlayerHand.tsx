import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Card, Deck } from "../types";
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

import { useDispatch } from "react-redux";
import { playerActions } from "../slices/player";
import { useEffect, useLayoutEffect, useState } from "react";

type PlayerHandType = {
  hand: Deck;
  useDefaultCursorOnCards?: boolean;
  selectedCards?: Card[];
  onClickCard?: (card: Card) => void;
  isFirstTurn?: boolean;
};
export function PlayerHand(props: PlayerHandType) {
  // const [hand, setHand] = useState(props.hand);
  const initialWindowWidth = window.innerWidth;
  const [windowWidth, setWindowWidth] = useState(initialWindowWidth);
  const isTabletWidth = windowWidth >= 768 && windowWidth <= 950;
  const isMediumWidth = windowWidth > 1000;

  useLayoutEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  const dispatch = useDispatch();
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
      const oldIndex = props.hand.findIndex((x) => x.id === active.id);
      const newIndex = props.hand.findIndex((x) => x.id === over?.id);

      const alteredHand = arrayMove(props.hand, oldIndex, newIndex);

      dispatch(playerActions.updateHand(alteredHand));
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={props.hand}
        strategy={horizontalListSortingStrategy}
      >
        <div
          className={`flex flex-row gap-1  justify-center   ${
            isMediumWidth ? "flex-nowrap" : "flex-wrap"
          }`}
        >
          {props.hand.map((card) => {
            let isSelected = false;
            let canBeSelected = true;
            if (props.selectedCards) {
              isSelected =
                props.selectedCards.findIndex((c) => c.id === card.id) >= 0;
              if (props.selectedCards.length > 0) {
                canBeSelected = props.selectedCards[0]?.points === card.points;
              }

              if (props.isFirstTurn) {
                canBeSelected = card.points + card.suitPoints === 0;
              }
            }

            return (
              <PlayingCard
                isSelected={isSelected}
                canBeSelected={canBeSelected}
                onClickCard={props.onClickCard}
                card={card}
                className={`
                w-[12%]`}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
