import { Container } from "../components/Container";
import { PlayerHand } from "../components/PlayerHand";
import { useAppSelector } from "../hooks";

import { PlayingCard } from "../components/PlayingCard";
import { PrezziesButton } from "../components/PrezziesButton";
import { useEffect, useRef, useState } from "react";
import { Card } from "../types";
import { updateSelectedCards } from "../helpers";
import { socket } from "../socket";
import { CardTableAndAshTray } from "../components/CardTableAndAshTray";
import BarStool from "../components/BarStoolSVG";

// import { useDispatch } from "react-redux";

export function CardTable() {
  const containerRef = useRef(null);
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
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [room.messages]);

  return (
    <Container containerStyle="flex  rounded-md p-4  flex-col ">
      {/* <div className={`grid grid-flow-col  gap-4 `}>
          {opponents
            .filter((opp) => opp.id !== player.id)
            .map((opponent) => {
              const isPlayersTurn = opponent.id === room.currentTurnPlayerId;
              return (
                <div
                  key={opponent.id}
                  className={`flex flex-col border-2 ${
                    isPlayersTurn ? "border-green-400" : "border-black"
                  }  bg-white p-2 rounded-lg`}
                >
                  {!room.isFirstGame && <p>{opponent.position}</p>}
                  <p>{opponent.name}</p>
                  <p>Total Wins: {opponent.wins}</p>
                </div>
              );
            })}
        </div> */}
      {/* The card table */}
      <div className={`flex  relative   flex-row   flex-1 `}>
        <div className={`flex-1  flex flex-col gap-4 my-4 justify-center `}>
          <div className={`flex flex-row justify-center`}>
            <div
              className={`flex border border-black rounded-lg  min-w-[30%] bg-white  w-min p-4 flex-col items-center`}
            >
              <p className={`text-lg font-bold`}>Last hand played</p>
              <div className={`flex flex-row gap-1`}>
                {[player.hand[0], player.hand[1]].map((card) => (
                  <PlayingCard
                    card={card}
                    key={card.id}
                    className="cursor-default"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`w-[30%]  self-center  h-min  relative`}>
          {/* <BarStool /> */}

          <CardTableAndAshTray />
          <div
            className={`flex  w-[20%]  flex-row absolute bottom-[50%] left-[50%] -translate-x-1/2 translate-y-1/2 rotate-[20deg] justify-center items-center`}
          >
            {player.hand.map((card, ix) => {
              const rotationDeg = ix * 100;
              return (
                <div
                  key={card.id}
                  className={`absolute `}
                  style={{ transform: `rotate(${rotationDeg}deg)` }}
                >
                  <PlayingCard card={card} className={`cursor-default `} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={`flex-1 flex flex-row my-4 justify-center`}>
          <div className={`flex flex-col items-center  `}>
            <p className={` text-center text-xl`}>It is</p>
            <p className={`text-3xl font-bold`}>
              {currentTurnPlayer?.id === player.id
                ? `Your Turn`
                : `${currentTurnPlayer?.name}'s turn`}
            </p>
          </div>
        </div>
      </div>

      {/* The current user */}
      <div className={`flex flex-row justify-center`}>
        <div className={`flex flex-col w-[80%] gap-3`}>
          <div className={`flex flex-row gap-2 justify-end`}>
            <PrezziesButton className={`p-1 bg-white rounded-md`}>
              Play Hand
            </PrezziesButton>
            <PrezziesButton className={`p-1 bg-white rounded-md`}>
              Completed It
            </PrezziesButton>
            <PrezziesButton className={`p-1 bg-white rounded-md`}>
              Pass
            </PrezziesButton>
          </div>

          <PlayerHand
            hand={player.hand}
            isFirstTurn={isPlayersTurn && room.turnCounter === 0}
            onClickCard={handleSelectionOfCards}
            selectedCards={selectedCards}
          />
        </div>
      </div>
      {/* <div className={`flex  mx-4 flex-1 flex-col gap-2 `}>
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
          <div
            className={`flex flex-col-reverse  justify-center flex-1 gap-1 md:flex-row`}
          >
            <div className={`flex-1`}>
              <PlayerHand
                hand={player.hand}
                isFirstTurn={isPlayersTurn && room.turnCounter === 0}
                selectedCards={selectedCards}
                onClickCard={handleSelectionOfCards}
              />
            </div>
            <div
              className={`flex min-w-40 flex-row md:flex-col self-center gap-1`}
            >
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
        </div> */}

      {/* <div
        ref={containerRef}
        className={`max-h-[100vh] basis-1/4 border-l border-l-black/20 ml-2 h-[100vh] flex flex-col p-3 overflow-y-scroll`}
      >
        <div className={` flex  flex-1  flex-col gap-2`}>
          {room.messages.map((m, ix) => {
            return (
              <div
                className={`${
                  ix % 2 === 0 ? "bg-slate-200" : ""
                } flex-wrap gap-4 ${
                  ix === room.messages.length - 1 ? "bg-yellow-300 " : ""
                } px-3 flex flex-row w-[100%]`}
              >
                <p className={``}>Lobby:</p>
                <p className={`flex-1 `}>{m}</p>
              </div>
            );
          })}
        </div>
        <div className={`flex flex-row gap-1 mt-2`}>
          <input type="text" className={`flex-1 pl-3`} />
          <PrezziesButton
            onClick={() => {}}
            className={`bg-white rounded-none border-0 p-2`}
          >
            Send
          </PrezziesButton>
        </div>
      </div> */}
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
