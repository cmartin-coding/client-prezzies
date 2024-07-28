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
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useDispatch } from "react-redux";
import { playerActions } from "../slices/player";
import { useState } from "react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

type PlayerHandType = {
  hand: Deck;
  useDefaultCursorOnCards?: boolean;
  selectedCards?: Card[];
  onClickCard?: (card: Card) => void;
  isFirstTurn?: boolean;
};
export function PlayerHand(props: PlayerHandType) {
  // const [hand, setHand] = useState(props.hand);
  // const initialWindowWidth = window.innerWidth;
  // const [windowWidth, setWindowWidth] = useState(initialWindowWidth);
  // const isMediumWidth = windowWidth > 1000;
  // const isTablet = windowWidth > 600 && windowWidth < 1000;

  const [activeId, setActiveId] = useState<null | string>(null);

  // useEffect(() => {
  //   const updateWindowSize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };
  //   window.addEventListener("resize", updateWindowSize);
  //   return () => window.removeEventListener("resize", updateWindowSize);
  // }, []);

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
  const { setNodeRef: setFirstDroppableRef } = useDroppable({
    id: "droppable-1",
  });
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
    >
      <SortableContext
        items={props.hand}
        strategy={horizontalListSortingStrategy}
      >
        <div
          ref={setFirstDroppableRef}
          className={`flex   flex-row gap-1 justify-center flex-1 flex-nowrap `}
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
                ref={setFirstDroppableRef}
                key={card.id}
                className={`w-[17%] tablet:w-[25%]  md:w-full md:max-w-[10%]
                  ${ix > 0 && "-ml-12"}  
                  ${activeId === card.id ? "z-[9999]" : "z-[10]"} `}
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
