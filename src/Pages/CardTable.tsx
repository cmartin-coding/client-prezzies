import { Container } from "../components/Container";

import { useAppSelector } from "../hooks";

import { useEffect, useState } from "react";
import { Card } from "../types";
import { updateSelectedCards } from "../helpers";
import { socket } from "../socket";
import { AshTraySVG } from "../components/AshTraySVG";
import { CardTablePlayerHand } from "../components/CardTablePlayerHand";
import { PlayingCard } from "../components/PlayingCard";

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
  const initialWindowWidth = window.innerWidth;
  const [windowWidth, setWindowWidth] = useState(initialWindowWidth);
  const isMediumWidth = windowWidth > 500;
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  const numberOfCardsInLastMove = 3;
  // room.lastHand.length;
  const cardsPlayed = player.hand;
  // [
  //   ...room.cardsPlayed.slice(0, -numberOfCardsInLastMove),
  //   ...room.lastHand,
  // ];
  return (
    <Container containerStyle="flex relative rounded-md  flex-col ">
      <div className={`flex flex-col  flex-1 md:m-10`}>
        <div
          className={`md:rounded-[100%]  bg-[#412a13] absolute top-10 left-9 right-9 bottom-4`}
        />

        <div
          className={`relative flex flex-col gap-3  flex-1  justify-center  md:rounded-[100%] bg-gradient-to-r from-[#562B00] via-[#884400] to-[#562B00]`}
        >
          <AshTraySVG
            className={`absolute size-24 md:size-40 bottom-[40%] md:left-[5%]`}
          />

          <div
            className={` flex absolute w-full  top-[45%] -translate-y-1/2 flex-row justify-center items-center `}
          >
            {player.hand.map((card, ix) => {
              const rotate = ix * 34;
              const isLastPlayed =
                ix > cardsPlayed.length - numberOfCardsInLastMove;
              return (
                <div
                  key={card.id}
                  id={card.id}
                  className={`${
                    isLastPlayed ? "inline-flex -mx-10" : "absolute"
                  } ${isMediumWidth ? "w-[120px]" : " w-[100px]"} `}
                  style={{
                    transform: !isLastPlayed ? `rotate(${rotate}deg)` : "",
                  }}
                >
                  <PlayingCard card={card} className={`cursor-default`} />
                </div>
              );
            })}
          </div>
          <div className={`w-full absolute md:-bottom-8 bottom-5 rounded-md  `}>
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
    </Container>
  );
}
