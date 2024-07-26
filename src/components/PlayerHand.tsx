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
  DragStartEvent,
  // KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useDispatch } from "react-redux";
import { playerActions } from "../slices/player";
import { useEffect, useState } from "react";

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
  const isMediumWidth = windowWidth > 1000;
  const isTablet = windowWidth > 600 && windowWidth < 1000;

  const [activeId, setActiveId] = useState<null | string>(null);

  useEffect(() => {
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
    })
    // useSensor(KeyboardSensor)
  );

  const handleDragStart = (ev: DragStartEvent) => {
    const { active } = ev;
    setActiveId(active?.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = props.hand.findIndex((x) => x.id === active.id);
      const newIndex = props.hand.findIndex((x) => x.id === over?.id);

      const alteredHand = arrayMove(props.hand, oldIndex, newIndex);

      dispatch(playerActions.updateHand(alteredHand));
    }
    setActiveId(null);
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={props.hand}
        strategy={horizontalListSortingStrategy}
      >
        <div
          className={`flex  flex-row gap-1 flex-wrap justify-center   ${
            isMediumWidth && "flex-nowrap"
          }`}
        >
          {props.hand.map((card, ix) => {
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
              <div
                key={card.id}
                className={`${!isTablet && !isMediumWidth && "w-[50px]"} ${
                  isTablet && "w-[70px]"
                } ${isMediumWidth && "w-[125px]"} 
                  lg:w-[360px]
                ${activeId === card.id ? "z-[9999]" : "z-[10]"} ${
                  isMediumWidth && "-ml-12 "
                } `}
              >
                <PlayingCard
                  isSelected={isSelected}
                  canBeSelected={canBeSelected}
                  onClickCard={props.onClickCard}
                  card={card}
                />
              </div>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
