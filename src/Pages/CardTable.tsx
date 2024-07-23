import { Container } from "../components/Container";
import { PlayerHand } from "../components/PlayerHand";
import { useAppSelector } from "../hooks";

import { PlayingCard } from "../components/PlayingCard";
import { PrezziesButton } from "../components/PrezziesButton";
import { useState } from "react";
import { Card } from "../types";
import { updateSelectedCards } from "../helpers";
import { socket } from "../socket";

export function CardTable() {
  const room = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);

  // const opponents = room.players.filter((p) => p.id !== player.id);
  const isPlayersTurn = player.id === room.currentTurnPlayerId;

  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const handleSelectionOfCards = (card: Card) => {
    const updatedSelectedCards = updateSelectedCards(selectedCards, card);

    setSelectedCards(updatedSelectedCards);
  };

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

  return (
    <Container containerStyle="flex  flex-col">
      <div className={`flex-1 p-2 flex flex-col md:gap-4 gap-2`}>
        <div
          className={`grid grid-flow-col gap-2 md:gap-4 overflow-x-scroll md:overflow-x-auto`}
        >
          {opponents
            .filter((opp) => opp.id !== player.id)
            .map((opponent) => {
              const isPlayersTurn = opponent.id === room.currentTurnPlayerId;
              return (
                <div
                  key={opponent.id}
                  className={`flex flex-col border ${
                    isPlayersTurn ? "border-green-400 border-2" : "border-black"
                  } bg-white p-2 rounded-lg`}
                >
                  {!room.isFirstGame && <p>{opponent.position}</p>}
                  <p>{opponent.name}</p>
                  <p>Total Wins: {opponent.wins}</p>
                </div>
              );
            })}
        </div>
        {/* The card table */}
        <div
          className={`flex-1 flex overflow-hidden flex-col items-center justify-center`}
        >
          <div
            className={`flex flex-col relative w-[15rem] h-[15rem]  justify-center border-2 border-black  rounded-[100%]  bg-gradient-to-br from-[#562B00] via-[#884400] to-[#562B00] md:w-[26rem] md:h-[26rem]`}
          >
            <div
              className={`flex flex-row  -rotate-[20deg] justify-center items-center`}
            >
              {room.cardsPlayed.map((card, ix) => {
                const rotate = `rotate-[${10 * ix}deg]`;
                return (
                  <div key={card.id} className={`absolute ${rotate} `}>
                    <PlayingCard card={card} className={`cursor-default`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* The current user */}
        <div className={`flex self-center  flex-col gap-2 `}>
          <div className={`flex md:flex-row justify-between  `}>
            <div>
              <p className={`font-bold text-lg text-green-500`}>
                {player.name}
              </p>
              <p>Total wins: {player.wins}</p>
              {!room.isFirstGame && <p>Current position: {player.position}</p>}
            </div>

            <div className={`self-center`}>
              {isPlayersTurn && (
                <p className={`font-bold text-lg `}>It is your turn!</p>
              )}
            </div>
          </div>
          <div className={`flex flex-col-reverse gap-1 md:flex-row`}>
            <PlayerHand
              hand={player.hand}
              isFirstTurn={isPlayersTurn && room.turnCounter === 0}
              selectedCards={selectedCards}
              onClickCard={handleSelectionOfCards}
            />
            <div className={`flex flex-row md:flex-col self-center gap-1`}>
              <PrezziesButton
                className={`p-1 rounded-md bg-white`}
                onClick={() => {
                  socket.emit("playHand", {
                    hand: selectedCards,
                    player: player,
                    room: room,
                  });
                  setSelectedCards([]);
                }}
              >
                Play hand
              </PrezziesButton>
              <PrezziesButton className={`bg-white rounded-md`}>
                Completed It
              </PrezziesButton>
              <PrezziesButton className={`bg-white rounded-md`}>
                Pass
              </PrezziesButton>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

// This is some avatar heads we can put around table. Need to work it out
{
  /**
  
   <div
            className={`skew-x-4   absolute top-[6.2rem] left-[5%] -skew-y-12`}
          >
            <IoPersonSharp size={150} className={``} />
            {/* <div className={`absolute bottom-4 left-[40%]    translate-x-8`}>
              <div className={`relative flex flex-row gap-2 -skew-x-12 `}>
                {[1, 2, 3].map((x) => (
                  <div
                    className={` w-[20px] h-[40px] justify-self-center self-center border bg-red-300`}
                  />
                ))}
              </div>
            </div> 
            </div>
            <div
              className={`skew-x-4 absolute top-[4rem] left-[18%] -skew-y-[10deg]`}
            >
              <IoPersonSharp size={150} className={` `} />
              <div className={`absolute bottom-4 left-[40%]    translate-x-2`}>
                <div className={`relative flex flex-row gap-2 -skew-x-12 `}>
                  {[1, 2, 3].map((x) => (
                    <div
                      className={` w-[20px] h-[40px] justify-self-center self-center border bg-red-300`}
                    />
                  ))}
                </div>
              </div>
            </div>
  
            <IoPersonSharp
              size={150}
              className={` skew-x-4 absolute top-[2rem] left-[31%] -skew-y-[10deg]`}
            />
            <IoPersonSharp
              size={150}
              className={` skew-x-4 absolute left-[44%] top-0 -skew-y-[10deg]`}
            />
  
            <IoPersonSharp
              size={150}
              className={` skew-x-4 absolute -top-2 left-[57%] skew-y-[10deg]`}
            />
            <IoPersonSharp
              size={150}
              className={` skew-x-4 absolute top-[2rem] left-[70%] skew-y-[10deg]`}
            />
            
            */
}
