import { Container } from "../components/Container";

import { useAppSelector } from "../hooks";

import { useEffect, useState } from "react";
import { Card, Positions } from "../types";
import { updateSelectedCards } from "../helpers";
import { socket } from "../socket";
import { AshTraySVG } from "../components/AshTraySVG";
import { CardTablePlayerHand } from "../components/CardTablePlayerHand";
import { PlayingCard } from "../components/PlayingCard";
import { positionIcons } from "../const";

import { useModalContext } from "../context/ModalContext";
import { Leaderboard } from "../components/Leaderboard";
import { PrezziesButton } from "../components/PrezziesButton";
import { useNavigate } from "react-router-dom";
import { PrezziesHeading } from "../components/PrezziesHeader";

export function CardTable() {
  // const containerRef = useRef(null);
  // const dispatch = useDispatch();
  const modalCtx = useModalContext();
  const navigate = useNavigate();

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

  const numberOfCardsInLastMove = room.lastHand.length;

  const cardsPlayed = [
    ...room.cardsPlayed.slice(0, -numberOfCardsInLastMove),
    ...room.lastHand,
  ];

  console.log(room);
  useEffect(() => {
    if (room.gameIsOver && modalCtx) {
      console.log("is in here");
      modalCtx.openModal(
        <div className={`flex flex-col items-center gap-4`}>
          <PrezziesHeading level={1}>Presidents results!</PrezziesHeading>
          <div className={`w-full`}>
            <Leaderboard
              players={room.players}
              headerPosition="center"
              header="Standings"
            />
          </div>
          <PrezziesButton
            buttonText={"Go to post game"}
            buttonStyle={"Primary"}
            buttonProps={{
              onClick: () => {
                socket.emit("enteredPostGameLobby", player, room);
                navigate(`/postgame-lobby/${room.id}`);
                modalCtx.closeModal();
              },
            }}
          />
        </div>,
        { isCannotClickBlurToClose: true }
      );
    }
  }, [room.gameIsOver]);

  return (
    <Container containerStyle="flex  rounded-md  flex-col bg-gradient-to-r from-[#562B00] via-[#884400] to-[#562B00] p-4">
      <div
        className={`absolute left-0 right-0 z-[20]  px-4  flex flex-row justify-around  gap-4 top-0    p-3 `}
      >
        {opponents
          .filter((o) => o.id !== player.id)
          .map((opp) => {
            const isOpponentTurn = opp.id === room.currentTurnPlayerId;
            const Icon =
              positionIcons[(opp.position.title as Positions) || "Undecided"];
            return (
              <div
                key={opp.id}
                className={` flex max-w-fit  flex-col   ${
                  isOpponentTurn && "bg-green-600"
                } p-2  md:rounded-lg`}
              >
                <div className={`flex  flex-row gap-4   `}>
                  <div className={`flex flex-col items-center`}>
                    <Icon size={60} fill="white" />
                    <p className={`line-clamp-1  text-white`}>{opp.name}</p>
                  </div>
                  <div className={`md:flex hidden flex-col items-center`}>
                    <p className={`text-white`}>Wins: {opp.wins}</p>
                    {room.numberOfPlayers && room.numberOfPlayers <= 6 && (
                      <div className={`flex flex-row justify-center`}>
                        {[1, 2, 3, 4, 5, 6].map((c) => (
                          <div
                            key={c}
                            className={`h-[30px] bg-blue-600 w-[20px] border`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {opp.position && <p>{opp.position.title}</p>}
              </div>
            );
          })}
      </div>
      <div className={`flex flex-col relative  flex-1 `}>
        {/* <div
          className={`md:rounded-[100%]  bg-[#412a13] absolute top-10 left-9 right-9 bottom-4`}
        /> */}

        {/* <div
          className={`relative flex flex-col gap-3  flex-1    bg-gradient-to-r from-[#562B00] via-[#884400] to-[#562B00]`}
        > */}
        <AshTraySVG
          className={`absolute size-24 md:size-40 bottom-[30%] md:left-[5%]`}
        />

        <div
          className={` flex absolute w-full  top-[45%] -translate-y-1/2 flex-row justify-center items-center `}
        >
          {cardsPlayed.map((card, ix) => {
            const isLastPlayed =
              ix > cardsPlayed.length - numberOfCardsInLastMove - 1;
            const rotateNegative = ix % 2 === 0 ? 1 : -1;
            return (
              <div
                key={card.id + ix}
                id={card.id}
                className={`${
                  isLastPlayed ? "inline-flex -mx-10" : "absolute"
                } md:w-[120px] tablet:w-[100px] w-[90px]`}
                style={{
                  transform: isLastPlayed
                    ? "rotate(0deg)"
                    : `rotate(${rotateNegative * 24}deg)`,
                }}
              >
                <PlayingCard card={card} className={`cursor-default`} />
              </div>
            );
          })}
        </div>
        <div
          className={`p-0  w-full absolute md:bottom-0  bottom-5 rounded-md  `}
        >
          <CardTablePlayerHand
            isGoingFirst={isPlayersTurn && room.turnCounter === 0}
            onCompletedIt={() => {
              socket.emit("completedIt", {
                completedItHand: selectedCards,
                player: player,
                room: room,
              });
              setSelectedCards([]);
            }}
            onPass={() => {
              socket.emit("passTurn", { player: player, room: room });
            }}
            onClickCard={(card) => {
              handleSelectionOfCards(card);
            }}
            isTurn={currentTurnPlayer?.id === player.id}
            playerHand={player.hand}
            selectedCards={selectedCards}
            onPlayHand={() => {
              socket.emit("playHand", {
                hand: selectedCards,
                player: player,
                room: room,
              });
              setSelectedCards([]);
            }}
          />
        </div>
        {/* </div> */}
      </div>
    </Container>
    // </DndContext>
  );
}
