import { Container } from "../components/Container";

import { useAppSelector } from "../hooks";

import { useState } from "react";
import { Card } from "../types";
import { updateSelectedCards } from "../helpers";
import { socket } from "../socket";
import { AshTraySVG } from "../components/AshTraySVG";
import { CardTablePlayerHand } from "../components/CardTablePlayerHand";

// import { useDispatch } from "react-redux";

export function CardTable() {
  // const containerRef = useRef(null);
  // const dispatch = useDispatch();

  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);

  // const opponents = room.players.filter((p) => p.id !== player.id);
  const isPlayersTurn = player.id === room.currentTurnPlayerId;

  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const handleSelectionOfCards = (card: Card) => {
    const updatedSelectedCards = updateSelectedCards(selectedCards, card);

    setSelectedCards(updatedSelectedCards);
  };

  // Create the display array that will show who is before and after the user correctly
  const playerIndexInRoom = room.players.findIndex((p) => p.id === player.id);
  let opponents = [...room.players];
  if (playerIndexInRoom !== room.players.length - 1) {
    const numberOfPlayersAheadOfPlayer =
      room.players.length - playerIndexInRoom - 1;
    const rearrangementArr = opponents.splice(
      playerIndexInRoom + 1,
      numberOfPlayersAheadOfPlayer
    );
    opponents = [...rearrangementArr, ...opponents];
  }

  const currentTurnPlayer = room.players.find(
    (p) => p.id === room.currentTurnPlayerId
  );

  return (
    <Container containerStyle="flex relative rounded-md  flex-col ">
      <div className={`flex flex-col  flex-1 md:p-10`}>
        <div
          className={`md:rounded-[100%]  bg-[#412a13] absolute top-10 left-9 right-9 bottom-4`}
        />

        <div
          className={`relative flex flex-col gap-3 justify-end flex-1 bg-red-300   md:rounded-[100%] bg-gradient-to-r from-[#562B00] via-[#884400] to-[#562B00]`}
        >
          <AshTraySVG
            className={`absolute size-24 md:size-40 bottom-[40%] md:left-[5%]`}
          />

          <div className={` absolute md:-bottom-8 bottom-5 rounded-md  `}>
            <CardTablePlayerHand
              isGoingFirst={isPlayersTurn && room.turnCounter === 0}
              onCompletedIt={() => {}}
              onPass={() => {}}
              onClickCard={(card) => {
                handleSelectionOfCards(card);
              }}
              playerHand={player.hand}
              selectedCards={selectedCards}
              onPlayHand={() => {
                socket.emit("playHand", {
                  hand: selectedCards,
                  player: player,
                  room: room,
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* The current user */}
    </Container>
  );
}
